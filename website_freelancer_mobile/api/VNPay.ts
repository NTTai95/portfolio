import crypto from "crypto";
import moment from "moment";
import qs from "qs";

type Options = {
  amount: number;
  bankCode?: string;
  language?: string;
  orderId?: string;
  ipAddr?: string;
  expireMinutes?: number;
};

export function createVnpayPaymentUrl(opts: Options) {
  const {
    amount,
    bankCode = "",
    language = "vn",
    orderId = moment().format("DDHHmmss"),
    ipAddr = "127.0.0.1",
    expireMinutes = 15,
  } = opts;

  const now = moment();
  const createDate = now.format("YYYYMMDDHHmmss");
  const expireDate = now.add(expireMinutes, "minutes").format("YYYYMMDDHHmmss");

  const tmnCode = "RTXVC5HE";
  const secretKey = "P36L9FGDXBVCHWIHMI8W85IHBRD93LWD";
  const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  const returnUrl = "http://localhost:3000/api/vnpay/return";

  // 1. Tập hợp tất cả params (chưa có SecureHash, SecureHashType)
  const vnp_Params: Record<string, string> = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: language,
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}`,
    vnp_OrderType: "other",
    vnp_Amount: (amount * 100).toString(),
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
    vnp_ExpireDate: expireDate,
  };
  if (bankCode) {
    vnp_Params.vnp_BankCode = bankCode;
  }

  // 2. Sắp xếp và tạo chuỗi để ký
  const signData = qs.stringify(sortObject(vnp_Params), { encode: false });

  // 3. Tạo chữ ký HMAC‑SHA256
  const hmac = crypto.createHmac("sha256", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  // 4. Thêm vnp_SecureHashType và vnp_SecureHash vào params trả về
  const vnp_ParamsWithHash = {
    ...vnp_Params,
    vnp_SecureHashType: "SHA256",
    vnp_SecureHash: signed,
  };

  // 5. Ghép URL (encode=true để URL an toàn)
  const paymentUrl =
    vnpUrl +
    "?" +
    qs.stringify(sortObject(vnp_ParamsWithHash), { encode: true });

  return paymentUrl;
}

// Helper: sắp xếp object theo key a→z
function sortObject(obj: Record<string, string>) {
  return Object.keys(obj)
    .sort()
    .reduce<Record<string, string>>((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}
