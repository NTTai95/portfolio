package com.freelancer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.dto.requests.InitPaymentRequest;
import com.freelancer.service.ServiceVNPay;
import com.freelancer.utils.RequestUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ControllerVNPay {
    private final ServiceVNPay serviceVNPay;

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestParam long amount,
            @RequestParam String orderInfo, @RequestParam String returnUrl,
            HttpServletRequest httpServletRequest) {
        var ipAddress = RequestUtil.getIpAddress(httpServletRequest);
        InitPaymentRequest initPaymentRequest = new InitPaymentRequest();
        initPaymentRequest.setAmount(amount);
        initPaymentRequest.setIpAddress(ipAddress);
        initPaymentRequest.setRequestId("Payment-milestone");
        initPaymentRequest.setReturnUrl(returnUrl);
        initPaymentRequest.setTxnRef(orderInfo);

        return ResponseEntity.ok(serviceVNPay.init(initPaymentRequest));
    }
}
