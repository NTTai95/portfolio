package com.freelancer.service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;
import org.springframework.stereotype.Service;
import com.freelancer.dto.Currency;
import com.freelancer.dto.Locale;
import com.freelancer.dto.VNPayParams;
import com.freelancer.dto.requests.InitPaymentRequest;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

/**
 * Service khởi tạo URL thanh toán VNPay và xác thực IPN.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class ServiceVNPay {

    public static final String VERSION = "2.1.0";
    public static final String COMMAND = "pay";
    public static final String ORDER_TYPE = "190000";
    public static final long DEFAULT_MULTIPLIER = 100L;

    private String tmnCode = "06L1D4HR";

    private String initPaymentPrefixUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

    private Integer paymentTimeout = 15;

    private final CryptoService cryptoService;

    public String init(InitPaymentRequest request) {
        var amount = request.getAmount() * DEFAULT_MULTIPLIER; // 1. amount * 100
        var txnRef = request.getTxnRef(); // 2. bookingId
        var returnUrl = request.getReturnUrl(); // 3. FE redirect by returnUrl
        var vnCalendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        vnCalendar.add(Calendar.MINUTE, paymentTimeout);// 4. expiredDate for secure

        var ipAddress = request.getIpAddress();
        var orderInfo = buildPaymentDetail(request);
        var requestId = request.getRequestId();

        var createdDate = getVnPayTime(0);
        var expiredDate = getVnPayTime(paymentTimeout);

        Map<String, String> params = new HashMap<>();

        params.put(VNPayParams.VERSION, VERSION);
        params.put(VNPayParams.COMMAND, COMMAND);

        params.put(VNPayParams.TMN_CODE, tmnCode);
        params.put(VNPayParams.AMOUNT, String.valueOf(amount));
        params.put(VNPayParams.CURRENCY, Currency.VND.getValue());

        params.put(VNPayParams.TXN_REF, txnRef);
        params.put(VNPayParams.RETURN_URL, returnUrl);

        params.put(VNPayParams.CREATED_DATE, createdDate);
        params.put(VNPayParams.EXPIRE_DATE, expiredDate);

        params.put(VNPayParams.IP_ADDRESS, ipAddress);
        params.put(VNPayParams.LOCALE, Locale.VIETNAM.getCode());

        params.put(VNPayParams.ORDER_INFO, orderInfo);
        params.put(VNPayParams.ORDER_TYPE, ORDER_TYPE);

        var initPaymentUrl = buildInitPaymentUrl(params);
        log.debug("[request_id={}] Init payment url: {}", requestId, initPaymentUrl);
        return initPaymentUrl;
    }

    public boolean verifyIpn(Map<String, String> params) {

        var reqSecureHash = params.remove(VNPayParams.SECURE_HASH);
        params.remove(VNPayParams.SECURE_HASH_TYPE);

        var fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);

        var hashPayload = new StringBuilder();

        for (int i = 0; i < fieldNames.size(); i++) {
            String key = fieldNames.get(i);
            String value = params.get(key);

            if (value != null && !value.isEmpty()) {
                hashPayload.append(key).append("=")
                        .append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
                if (i < fieldNames.size() - 1) {
                    hashPayload.append("&");
                }
            }
        }

        String payload = hashPayload.toString();
        String secureHash = cryptoService.sign(payload);

        return secureHash.equals(reqSecureHash);
    }

    private String buildPaymentDetail(InitPaymentRequest request) {
        return String.format("Thanh toan don %s", request.getTxnRef());
    }

    @SneakyThrows
    private String buildInitPaymentUrl(Map<String, String> params) {
        var hashPayload = new StringBuilder();
        var query = new StringBuilder();
        var fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames); // 1. Sort field names

        var itr = fieldNames.iterator();
        while (itr.hasNext()) {
            var fieldName = itr.next();
            var fieldValue = params.get(fieldName);
            if ((fieldValue != null) && (!fieldValue.isEmpty())) {
                // 2.1. Build hash data
                hashPayload.append(fieldName);
                hashPayload.append("=");
                hashPayload.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

                // 2.2. Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append("=");
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

                if (itr.hasNext()) {
                    query.append("&");
                    hashPayload.append("&");
                }
            }
        }

        // 3. Build secureHash
        var secureHash = cryptoService.sign(hashPayload.toString());

        // 4. Finalize query
        query.append("&vnp_SecureHash=");
        query.append(secureHash);

        return initPaymentPrefixUrl + "?" + query;
    }

    /**
     * Trả về thời gian theo format VNPAY (yyyyMMddHHmmss) + cộng thêm phút. Dùng múi giờ
     * Asia/Ho_Chi_Minh.
     */
    private String getVnPayTime(int plusMinutes) {
        ZonedDateTime vnTime =
                ZonedDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")).plusMinutes(plusMinutes);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        return vnTime.format(formatter);
    }

    // @PostConstruct
    // void init() {
    // var resp = init(InitPaymentRequest.builder()
    // .requestId("r45")
    // .ipAddress("127.0.0.1")
    // .userId(34L)
    // .txnRef("b02")
    // .amount(100000)
    // .build());
    // log.info("Init payment url: {}", resp.getVnpUrl());
    // }
}
