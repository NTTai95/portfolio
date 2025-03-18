package com.freelancer.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.freelancer.dto.HistoryTransactionDTO;
import com.freelancer.utils.State;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "HistoryTransactions")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class HistoryTransaction implements EntityBase<HistoryTransactionDTO> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "SentWalletId", nullable = false)
	private Wallet sentWallet;

	@ManyToOne
	@JoinColumn(name = "ReceivedWalletId", nullable = false)
	private Wallet receivedWallet;

	@Column(nullable = false)
	@Default
	private Integer status = State.HistoryTransaction.USE;

	@Column(nullable = false)
	private Integer change;

	public HistoryTransactionDTO toDto() {
		return HistoryTransactionDTO.builder().id(this.id).sentWalletId(
				this.sentWallet != null ? this.sentWallet.getId() : null)
				.receivedWalletId(this.receivedWallet != null
						? this.receivedWallet.getId()
						: null)
				.status(this.status).change(this.change).build();
	}
}
