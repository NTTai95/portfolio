package com.freelancer.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.freelancer.model.HistoryTransaction;

@Repository
public interface RepositoryHistoryTransaction extends RepositoryEntity<HistoryTransaction, Integer> {
	@Query("SELECT SUM(h.change) FROM HistoryTransaction h WHERE h.receivedWallet.id = :id")
	public Long getTotalEarned(@Param("id") Integer id);
}
