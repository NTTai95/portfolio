package com.freelancer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.dto.ApplyDTO;
import com.freelancer.model.Apply;
import com.freelancer.model.Freelancer;
import com.freelancer.model.HistoryTransaction;
import com.freelancer.model.JobPost;
import com.freelancer.model.Product;
import com.freelancer.model.Profile;
import com.freelancer.model.Recruiter;
import com.freelancer.model.Wallet;
import com.freelancer.service.ApplyService;
import com.freelancer.service.HistoryTransactionService;
import com.freelancer.service.JobPostService;
import com.freelancer.service.ProductService;
import com.freelancer.service.WalletService;
import com.freelancer.utils.State;

@RestController
@RequestMapping("/applies")
public class ApplyController
		extends
			EntityController<Apply, ApplyDTO, Integer> {

	private static final String ID = "id";

	@Autowired
	private ApplyService service;

	@Autowired
	private JobPostService jobPostService;

	@Autowired
	private ProductService productService;

	@Autowired
	private WalletService walletService;

	@Autowired
	private HistoryTransactionService historyTransactionService;

	@GetMapping("/jobpost/{id}")
	public Page<ApplyDTO> getAppliesByJobPost(@PathVariable Integer id,
			@RequestParam(defaultValue = "1") Integer page,
			@RequestParam(defaultValue = "10") Integer size,
			@RequestParam(required = false) String[] search,
			@RequestParam(required = false) String[] sort) {

		Pageable pageable = PageRequest.of(--page, size,
				Sort.by(Sort.Direction.ASC, "id"));

		return service.getByJobPostId(id, pageable).map((e) -> e.toDto());
	}

	@PutMapping("/{id}/select")
	public ResponseEntity<String> select(@PathVariable Integer id) {

		Apply apply = service.getById(id).orElse(null);

		if (apply == null) {
			return ResponseEntity.badRequest().body("Không tìm thấy yêu cầu!");
		}

		JobPost jobPost = jobPostService.getById(apply.getJobPost().getId())
				.orElse(null);

		if (jobPost == null) {
			return ResponseEntity.badRequest().body("Không tìm thấy bài đăng!");
		}

		service.hiddenAllByJobPostId(apply.getJobPost().getId());

		jobPost.setStatus(State.JobPost.STARTED);
		jobPostService.update(jobPost);

		apply.setStatus(State.Apply.WORKING);
		service.update(apply);

		return ResponseEntity.ok().body("Chọn yêu cầu thành công!");

	}

	@PutMapping("/{id}/finish")
	public ResponseEntity<String> finish(@PathVariable Integer id) {

		Apply apply = service.getById(id).orElse(null);
		if (apply == null) {
			return ResponseEntity.badRequest().body("Không tìm thấy yêu cầu!");
		}

		JobPost jobPost = apply.getJobPost();
		if (jobPost == null) {
			return ResponseEntity.badRequest().body("Không tìm thấy bài đăng!");
		}

		Product product = apply.getProduct();
		if (product == null) {
			return ResponseEntity.badRequest().body("Không tìm thấy sản phẩm!");
		}

		Recruiter recruiter = jobPost.getRecruiter();
		if (recruiter == null) {
			return ResponseEntity.badRequest()
					.body("Không tìm thấy recruiter!");
		}

		Freelancer freealancer = apply.getFreelancer();
		if (freealancer == null) {
			return ResponseEntity.badRequest()
					.body("Không tìm thấy freelancer!");
		}

		Profile profileFreelancer = freealancer.getProfile();
		if (profileFreelancer == null) {
			return ResponseEntity.badRequest()
					.body("Không tìm thấy profileFreelancer!");
		}

		Profile profileRecruiter = recruiter.getProfile();
		if (profileRecruiter == null) {
			return ResponseEntity.badRequest()
					.body("Không tìm thấy profileRecruiter!");
		}

		Wallet walletFreelancer = profileFreelancer.getWallet();
		if (walletFreelancer == null) {
			return ResponseEntity.badRequest()
					.body("Không tìm thấy walletFreelancer!");
		}

		Wallet walletRecruiter = profileRecruiter.getWallet();
		if (walletRecruiter == null) {
			return ResponseEntity.badRequest()
					.body("Không tìm thấy walletRecruiter!");
		}

		walletFreelancer.setBalance(
				walletFreelancer.getBalance() + jobPost.getBudget());
		walletService.update(walletFreelancer);

		HistoryTransaction historyTransaction = new HistoryTransaction();
		historyTransaction.setSentWallet(walletRecruiter);
		historyTransaction.setReceivedWallet(walletFreelancer);
		historyTransaction.setStatus(State.HistoryTransaction.USE);
		historyTransaction.setChange(jobPost.getBudget());
		historyTransactionService.add(historyTransaction);

		product.setStatus(State.Product.BLOCKED);
		productService.update(product);

		jobPost.setStatus(State.JobPost.FINISHED);
		jobPostService.update(jobPost);

		apply.setStatus(State.Apply.FINISHED);
		service.update(apply);

		return ResponseEntity.ok().body("Hoàn thành yêu cầu!");
	}

	@GetMapping("/jobpost/{id}/working")
	public ApplyDTO getWorkingByJobPost(@PathVariable Integer id) {
		Apply apply = service.getWorkingByJobPostId(id).orElse(null);
		return apply != null ? apply.toDto() : null;
	}

	@GetMapping("/jobpost/{id}/finished")
	public ApplyDTO getFinishedByJobPost(@PathVariable Integer id) {
		Apply apply = service.getFinishedByJobPostId(id).orElse(null);
		return apply != null ? apply.toDto() : null;
	}
	
	@GetMapping("/freelancer/{id}/finished")
    public ResponseEntity<Page<ApplyDTO>> getCompletedJobsByFreelancer(
            @PathVariable Integer freelancerId,
            Pageable pageable) {

        Page<Apply> completedJobs = service.getCompletedJobsByFreelancer(freelancerId, pageable);
        Page<ApplyDTO> jobDTOs = completedJobs.map(Apply::toDto);
        
        return ResponseEntity.ok(jobDTOs);
    }
	
	@GetMapping("/freelancer/{id}/completed/count")
    public ResponseEntity<Long> getTotalCompletedJobsByFreelancer(@PathVariable Integer id) {
        long totalCompleted = service.getTotalCompletedJobsByFreelancer(id);
        return ResponseEntity.ok(totalCompleted);
    }
}
