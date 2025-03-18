package com.freelancer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.freelancer.model.HistoryTransaction;
import com.freelancer.repository.RepositoryHistoryTransaction;
import com.freelancer.utils.State;

@Service
public class HistoryTransactionService extends EntityService<HistoryTransaction, Integer> {
	@Autowired
	private RepositoryHistoryTransaction historyTransactionRepository;

	 public long getTotalEarned(Integer id) {
	        Long totalEarned = historyTransactionRepository.getTotalEarned(id);
	        return (totalEarned != null) ? totalEarned : 0L;
	    }
}
	