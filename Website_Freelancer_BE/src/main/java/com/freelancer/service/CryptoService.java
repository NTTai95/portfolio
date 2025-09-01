package com.freelancer.service;

import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.stereotype.Service;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.utils.EncodingUtil;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CryptoService {

    private final Mac mac = Mac.getInstance("HmacSHA512");

    private String secretKey = "NF75P3X4F7NRBSTPT3OSOKZXJTMC6545";

    public CryptoService() throws NoSuchAlgorithmException {}

    @PostConstruct
    void init() throws InvalidKeyException {
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "HmacSHA512");
        mac.init(secretKeySpec);
    }


    public String sign(String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKeySpec =
                    new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
            mac.init(secretKeySpec);
            byte[] hmac = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return EncodingUtil.toHexString(hmac);
        } catch (Exception e) {
            e.printStackTrace();
            throw new DataConflictException("Đăng ký VNPay thất bại!");
        }
    }
}
