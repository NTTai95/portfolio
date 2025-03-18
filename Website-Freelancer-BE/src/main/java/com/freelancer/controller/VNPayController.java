package com.freelancer.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/vnpay")
public class VNPayController {



	@GetMapping("/callback")
	public void callback(@RequestParam Map<String, String> params) {
		System.out.println(params);
	}
}
