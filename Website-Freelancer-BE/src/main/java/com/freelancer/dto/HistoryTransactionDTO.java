package com.freelancer.dto;

import org.springframework.beans.factory.annotation.Autowired;

import com.freelancer.model.HistoryTransaction;
import com.freelancer.service.WalletService;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoryTransactionDTO implements EntityDTO<HistoryTransaction> {
	private Integer id;
	private Integer sentWalletId;
	private Integer receivedWalletId;
	private Integer status;
	private Integer change;

	@Autowired
	WalletService walletService;

	// Chuyển DTO thành Entity
	public HistoryTransaction toEntity() {
		return HistoryTransaction.builder().id(this.id)
				.sentWallet(
						walletService.getById(this.sentWalletId).orElse(null))
				.receivedWallet(walletService.getById(this.receivedWalletId)
						.orElse(null))
				.status(this.status).change(this.change).build();
	}
}
