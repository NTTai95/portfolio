package com.freelancer.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.freelancer.dto.WalletDTO;
import com.freelancer.utils.State;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "Wallets")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Wallet implements EntityBase<WalletDTO> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	@Default
	private Integer balance = 0;

	@Column(nullable = false)
	@Default
	private Integer status = State.Wallet.USE;

	@OneToOne(mappedBy = "wallet")
	private Profile profile;

	@OneToMany(mappedBy = "sentWallet")
	private List<HistoryTransaction> historySent;

	@OneToMany(mappedBy = "receivedWallet")
	private List<HistoryTransaction> historyReceived;

	// Chuyển từ Entity sang DTO
	public WalletDTO toDto() {
		List<Integer> historySentIds = historySent != null
				? historySent.stream().map(HistoryTransaction::getId)
						.collect(Collectors.toList())
				: List.of();

		List<Integer> historyReceivedIds = historyReceived != null
				? historyReceived.stream().map(HistoryTransaction::getId)
						.collect(Collectors.toList())
				: List.of();

		return WalletDTO.builder().id(this.id).balance(this.balance)
				.status(this.status)
				.profileId(this.profile != null ? this.profile.getId() : null)
				.historySentIds(historySentIds)
				.historyReceivedIds(historyReceivedIds).build();
	}
}
