/**
 * QUẢN LÝ ACCESS TOKEN CỦA ZALO OA
 * ------------------------------------------------------------------
 * Khác với Messenger (Page Token gần như vĩnh viễn), Access Token của
 * Zalo OA chỉ sống ~25 giờ. Refresh Token sống lâu hơn nhưng MỖI LẦN
 * refresh, Zalo trả về refresh_token MỚI — nên phải lưu lại cả 2 giá
 * trị vào một nơi bền vững, không thể chỉ để trong biến môi trường
 * tĩnh (vì mỗi lần refresh sẽ đổi khác, mà .env thì không tự ghi lại).
 *
 * Ở đây dùng Vercel KV để lưu — đọc/ghi được, sống xuyên suốt giữa
 * các lần chạy serverless function.
 */

import { Redis } from "@upstash/redis";

// Tích hợp Upstash qua Vercel Marketplace đặt tên biến theo kiểu
// KV_REST_API_URL / KV_REST_API_TOKEN (kế thừa từ Vercel KV cũ),
// khác với tên mặc định UPSTASH_REDIS_REST_URL của thư viện — nên
// truyền thẳng vào đây thay vì dùng Redis.fromEnv().
const kv = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const KEY_ACCESS = "zalo:access_token";
const KEY_REFRESH = "zalo:refresh_token";
const KEY_EXPIRES_AT = "zalo:expires_at";

interface ZaloTokenResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: string; // giây, dạng chuỗi
  error?: number;
  error_name?: string;
  error_description?: string;
}

async function goiOAuthZalo(body: Record<string, string>): Promise<ZaloTokenResponse> {
  const appId = process.env.ZALO_APP_ID;
  const appSecret = process.env.ZALO_APP_SECRET;
  if (!appId || !appSecret) {
    throw new Error("Thiếu ZALO_APP_ID hoặc ZALO_APP_SECRET trong biến môi trường.");
  }

  const res = await fetch("https://oauth.zaloapp.com/v4/oa/access_token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      secret_key: appSecret,
    },
    body: new URLSearchParams({ ...body, app_id: appId }).toString(),
  });

  const data = (await res.json()) as ZaloTokenResponse;
  if (!res.ok || data.error) {
    throw new Error(
      `Zalo OAuth lỗi: ${data.error_name ?? res.status} — ${data.error_description ?? "không rõ nguyên nhân"}`,
    );
  }
  return data;
}

async function luuToken(data: ZaloTokenResponse) {
  const thoiGianSong = Number(data.expires_in ?? "3600");
  const hetHanLuc = Date.now() + thoiGianSong * 1000;

  await kv.set(KEY_ACCESS, data.access_token);
  await kv.set(KEY_REFRESH, data.refresh_token);
  await kv.set(KEY_EXPIRES_AT, hetHanLuc);
}

/**
 * Lần đầu tiên duy nhất (chưa có gì trong KV): lấy refresh_token gốc
 * từ biến môi trường ZALO_REFRESH_TOKEN (giá trị bạn lấy được ở Bước 3
 * khi làm OAuth thủ công lần đầu), đổi lấy access_token và lưu vào KV.
 * Từ lần thứ 2 trở đi, luôn đọc refresh_token mới nhất từ KV.
 */
async function layRefreshTokenHienTai(): Promise<string> {
  const tuKV = await kv.get<string>(KEY_REFRESH);
  if (tuKV) return tuKV;

  const tuEnv = process.env.ZALO_REFRESH_TOKEN;
  if (!tuEnv) {
    throw new Error(
      "Chưa có refresh_token nào trong KV lẫn biến môi trường ZALO_REFRESH_TOKEN. " +
        "Cần lấy refresh_token gốc qua bước OAuth thủ công trước.",
    );
  }
  return tuEnv;
}

async function lamMoiAccessToken(): Promise<string> {
  const refreshToken = await layRefreshTokenHienTai();
  const data = await goiOAuthZalo({
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
  await luuToken(data);
  if (!data.access_token) throw new Error("Zalo không trả về access_token khi refresh.");
  return data.access_token;
}

const NGUONG_LAM_MOI_SOM_MS = 5 * 60 * 1000; // làm mới sớm 5 phút trước khi hết hạn

/** Trả về access token còn hiệu lực — tự động refresh nếu sắp/đã hết hạn. */
export async function layAccessTokenHopLe(): Promise<string> {
  const [accessToken, hetHanLuc] = await Promise.all([
    kv.get<string>(KEY_ACCESS),
    kv.get<number>(KEY_EXPIRES_AT),
  ]);

  const conHan = accessToken && hetHanLuc && Date.now() < hetHanLuc - NGUONG_LAM_MOI_SOM_MS;
  if (conHan) return accessToken;

  return lamMoiAccessToken();
}
