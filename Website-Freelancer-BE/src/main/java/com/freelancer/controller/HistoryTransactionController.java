package com.freelancer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.dto.HistoryTransactionDTO;
import com.freelancer.model.HistoryTransaction;
import com.freelancer.service.HistoryTransactionService;

@RestController
@RequestMapping("/history")
public class HistoryTransactionController extends EntityController<HistoryTransaction, HistoryTransactionDTO, Integer> {

	private static final String ID = "id";

	@Autowired
	private HistoryTransactionService historyTransactionService;

	@GetMapping("/total-earned/{id}")
	public ResponseEntity<Long> getTotalEarned(@PathVariable Integer id) {
		Long totalEarned = historyTransactionService.getTotalEarned(id);
		totalEarned = (totalEarned != null) ? totalEarned : 0L;
		return ResponseEntity.ok(totalEarned);
	}
}
