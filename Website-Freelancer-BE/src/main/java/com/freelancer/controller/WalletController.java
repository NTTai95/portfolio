package com.freelancer.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.config.VNPayConfig;
import com.freelancer.dto.WalletDTO;
import com.freelancer.model.Profile;
import com.freelancer.model.Wallet;
import com.freelancer.service.ProfileService;
import com.freelancer.service.WalletService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/wallets")
public class WalletController extends EntityController<Wallet, WalletDTO, Integer> {

	@Autowired
	private WalletService service;

	@Autowired
	private ProfileService profileService;

	@Autowired
	private VNPayConfig vnPayConfig;

	@PostMapping
	public WalletDTO add(@RequestBody WalletDTO dto) {
		Wallet wallet = new Wallet();
		Wallet walletNew = service.add(wallet);

		Profile profile = profileService.getById(dto.getProfileId()).orElse(null);
		profile.setWallet(walletNew);

		profileService.update(profile);

		return walletNew.toDto();
	}

	@PostMapping("/{id}/deposit")
	public String createPayment(HttpServletRequest req, @RequestBody Integer amount, @PathVariable Integer id) {
		return vnPayConfig.getPaymentUrl(req, amount * 100, "DEPOSIT_" + id);
	}

	@GetMapping("/callback")
	public ResponseEntity<?> callback(@RequestParam Map<String, String> params) {
		Integer amount = Integer.parseInt(params.get("vnp_Amount"));
		String orderInfo = params.get("vnp_OrderInfo");
		String[] arr = orderInfo.split("_");
		String mode = arr[0];
		Integer id = Integer.parseInt(arr[1]);
		Wallet wallet = service.getById(id).orElse(null);
		if (wallet != null && mode.equals("DEPOSIT")) {
			wallet.setBalance(wallet.getBalance() + (amount / 100));
			service.update(wallet);
			return ResponseEntity.ok().body("Bạn đã nạp tiền vào ví thành công!");
		}
		return ResponseEntity.status(400).body("Nạp tiền đã xảy ra lỗi!");
	}

	@GetMapping("/profile/{id}")
	public ResponseEntity<WalletDTO> getWalletByProfileId(@PathVariable Integer id) {
		return service.getByProfileId(id).map(wallet -> ResponseEntity.ok(wallet.toDto()))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}
}
