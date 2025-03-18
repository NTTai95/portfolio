package com.freelancer.controller;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.dto.JobPostDTO;
import com.freelancer.model.JobPost;
import com.freelancer.model.Wallet;
import com.freelancer.service.JobPostService;
import com.freelancer.service.WalletService;
import com.freelancer.utils.State;

@RestController
@RequestMapping("/jobposts")
public class JobPostController
		extends
			EntityController<JobPost, JobPostDTO, Integer> {
	@Autowired
	private JobPostService service;

	@Autowired
	private WalletService walletService;

	@GetMapping("/account/{id}")
	public Page<JobPostDTO> getByAcountId(@PathVariable("id") Integer id,
			@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "10") Integer size,
			@RequestParam(required = false) String[] search,
			@RequestParam(required = false) String[] sort) {
		Pageable pageable = PageRequest.of(--page, size,
				Sort.by(Sort.Direction.ASC, "id"));

		return service.page(id, pageable).map((e) -> e.toDto());
	}

	@GetMapping("/{id}/status")
	public Integer getStatus(@PathVariable Integer id) {
		JobPost jobPost = service.getById(id).orElse(null);

		return jobPost == null ? null : jobPost.getStatus();
	}

	@PostMapping("/{id}/post")
	public ResponseEntity<?> post(@PathVariable Integer id) {
		JobPost jobPost = service.getById(id).orElse(null);
		try {
			Boolean isFullInfo = jobPost.getTitle() != null
					&& jobPost.getDescription() != null
					&& jobPost.getStartDate() != null
					&& jobPost.getEndDate() != null
					&& jobPost.getBudget() != null
					&& jobPost.getStatus() != null
					&& jobPost.getRecruiter() != null
					&& jobPost.getSkills() != null;

			if (!isFullInfo) {
				return ResponseEntity.status(HttpStatus.SC_UNPROCESSABLE_ENTITY)
						.body("Bài đăng không đủ thông tin!");
			}

			Wallet wallet = walletService
					.getByRecruiterId(jobPost.getRecruiter().getId())
					.orElse(null);

			if (wallet == null) {
				return ResponseEntity.status(HttpStatus.SC_UNPROCESSABLE_ENTITY)
						.body("Bạn cần tạo ví trước khi đăng bài!");
			}

			if (wallet.getBalance() < jobPost.getBudget()) {
				return ResponseEntity.status(HttpStatus.SC_UNPROCESSABLE_ENTITY)
						.body("Số dư trong ví không đủ bạn cần nạp thêm!");
			}

			wallet.setBalance(wallet.getBalance() - jobPost.getBudget());
			walletService.update(wallet);
			jobPost.setStatus(State.JobPost.PUBLISHED);
			service.update(jobPost);
			return ResponseEntity.status(HttpStatus.SC_OK)
					.body("Đăng bài đăng thành công!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.SC_NOT_FOUND)
					.body("Bài đăng không tìm thấy!");
		}
	}

	@GetMapping("/status/{status}")
	public Page<JobPostDTO> getByStatus(
			@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "10") Integer size,
			@PathVariable Integer status) {
		Pageable pageable = PageRequest.of(--page, size,
				Sort.by(Sort.Direction.ASC, "id"));

		return service.getByStatus(status, pageable).map((e) -> e.toDto());
	}

	@GetMapping
	public Page<JobPostDTO> getPage(
			@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "10") Integer size,
			@RequestParam(required = false) String[] search,
			@RequestParam(required = false) String[] sort) {
		Pageable pageable = PageRequest.of(--page, size,
				Sort.by(Sort.Direction.ASC, "id"));

		String keyword = "";

		if (search != null) {
			for (int i = 0; i < search.length - 1; i += 2) {
				String key = search[i].toLowerCase().trim();
				String value = search[i + 1];

				if (key.equals("keyword")) {
					keyword = value;
				}
			}
		}

		return service.search(keyword, pageable).map((e) -> e.toDto());
	}

	@GetMapping("/account/{id}/active")
	public Page<JobPostDTO> getActive(
			@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "10") Integer size,
			@PathVariable("id") Integer id) {

		Pageable pageable = PageRequest.of(--page, size,
				Sort.by(Sort.Direction.ASC, "id"));

		return service.getActiveByAccountId(id, pageable).map((e) -> e.toDto());
	}

	@GetMapping("/status/active")
	public Page<JobPostDTO> getActive(
			@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "10") Integer size,
			@RequestParam(required = false) String[] search) {

		Pageable pageable = PageRequest.of(--page, size,
				Sort.by(Sort.Direction.ASC, "id"));

		String keyword = "";

		if (search != null) {
			for (int i = 0; i < search.length - 1; i += 2) {
				String key = search[i].toLowerCase().trim();
				String value = search[i + 1];

				if (key.equals("keyword")) {
					keyword = value;
				}
			}
		}
		return service.searchWithStatus(keyword, pageable)
				.map((e) -> e.toDto());
	}

	@GetMapping("/account/{id}/draft")
	public Page<JobPostDTO> getDraft(
			@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "10") Integer size,
			@PathVariable("id") Integer id) {

		Pageable pageable = PageRequest.of(--page, size,
				Sort.by(Sort.Direction.ASC, "id"));

		return service.getDraftByAccountId(id, pageable).map((e) -> e.toDto());
	}

	@GetMapping("/account/{id}/finish")
	public Page<JobPostDTO> getFinish(
			@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "10") Integer size,
			@PathVariable("id") Integer id) {

		Pageable pageable = PageRequest.of(--page, size,
				Sort.by(Sort.Direction.ASC, "id"));

		return service.getFinishByAccountId(id, pageable).map((e) -> e.toDto());
	}

	@GetMapping("/count/current-month")
	public Long countCurrentMonth() {
		return service.countInCurrentMonth();
	}

	@GetMapping("/count/current-month/finished")
	public Long countFinishedInCurrentMonth() {
		return service.countFinishedInCurrentMonth();
	}

	@GetMapping("/count/current-month/working")
	public Long countWorkingInCurrentMonth() {
		return service.countWrokingInCurrentMonth();
	}

	@GetMapping("/count/current-month/pending")
	public Long countPendingInCurrentMonth() {
		return service.countPendingInCurrentMonth();
	}
	
	@GetMapping("/count/{id}")
    public ResponseEntity<Long> getTotalJobPosts(@PathVariable Integer id) {
        long count = service.getTotalJobPostsByRecruiter(id);
        return ResponseEntity.ok(count);
    }

}
