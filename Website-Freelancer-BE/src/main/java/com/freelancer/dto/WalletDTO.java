package com.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.freelancer.model.HistoryTransaction;
import com.freelancer.model.Profile;
import com.freelancer.model.Wallet;
import com.freelancer.service.HistoryTransactionService;
import com.freelancer.service.ProfileService;
import com.freelancer.utils.ApplicationContextProvider;
import com.freelancer.utils.State;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WalletDTO implements EntityDTO<Wallet> {
	private Integer id;
	private Integer balance;
	private Integer status;
	private Integer profileId;
	private List<Integer> historySentIds;
	private List<Integer> historyReceivedIds;

	// Chuyển từ DTO sang Entity
	public Wallet toEntity() {
		ProfileService profileService = ApplicationContextProvider
				.getBean(ProfileService.class);
		HistoryTransactionService historyTransactionService = ApplicationContextProvider
				.getBean(HistoryTransactionService.class);

		Profile profile = profileService.getById(this.profileId).orElse(null);

		List<HistoryTransaction> sentTransactions = this.historySentIds != null
				? historyTransactionService.getAllById(this.historySentIds)
				: null;
		List<HistoryTransaction> receivedTransactions = this.historyReceivedIds != null
				? historyTransactionService.getAllById(this.historyReceivedIds)
				: null;

		return Wallet.builder().id(this.id)
				.balance(this.balance != null ? this.balance : 0)
				.status(this.status != null ? this.status : State.Wallet.USE)
				.profile(profile).historySent(sentTransactions)
				.historyReceived(receivedTransactions).build();
	}
}
