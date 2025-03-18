package com.freelancer.service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.freelancer.model.JobPost;
import com.freelancer.repository.RepositoryJobPost;
import com.freelancer.utils.State;

@Service
public class JobPostService extends EntityService<JobPost, Integer> {
	@Autowired
	RepositoryJobPost repository;

	public Page<JobPost> getByStatus(Integer status, Pageable pageable) {

		return repository.findByStatus(
				status != null ? status : State.JobPost.PUBLISHED, pageable);
	}

	public Page<JobPost> page(Integer id, Pageable pageable) {
		return repository.findByRecruiter_Profile_Account_Id(id, pageable);

	}

	public Page<JobPost> search(String keyword, Pageable pageable) {
		return repository.searchJobPosts(keyword, pageable);
	}

	public Page<JobPost> getActiveByAccountId(Integer id, Pageable pageable) {
		return repository.findByStatusInAndRecruiter_Profile_Account_Id(
				List.of(State.JobPost.PUBLISHED, State.JobPost.STARTED), id,
				pageable);
	}

	public Page<JobPost> getDraftByAccountId(Integer id, Pageable pageable) {
		return repository.findByStatusInAndRecruiter_Profile_Account_Id(
				List.of(State.JobPost.EDITING), id, pageable);
	}

	public Page<JobPost> getActive(Pageable pageable) {
		return repository.findByStatusIn(List.of(State.JobPost.PUBLISHED,
				State.JobPost.FINISHED, State.JobPost.STARTED), pageable);
	}

	public Page<JobPost> getFinishByAccountId(Integer id, Pageable pageable) {
		return repository.findByStatusInAndRecruiter_Profile_Account_Id(
				List.of(State.JobPost.FINISHED), id, pageable);
	}

	public Page<JobPost> searchWithStatus(String keyword, Pageable pageable) {
		return repository.searchJobPostsWithStatus(keyword,
				List.of(State.JobPost.PUBLISHED), pageable);
	}

	public Long countInCurrentMonth() {
		YearMonth currentMonth = YearMonth.now();
		LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();
		LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(23, 59,
				59);

		return repository.countInCurrentMonth(startOfMonth, endOfMonth);
	}

	public Long countFinishedInCurrentMonth() {
		YearMonth currentMonth = YearMonth.now();
		LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();
		LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(23, 59,
				59);
		return repository.countInCurrentMonthByStatus(startOfMonth, endOfMonth,
				List.of(State.JobPost.FINISHED));
	}

	public Long countWrokingInCurrentMonth() {
		YearMonth currentMonth = YearMonth.now();
		LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();
		LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(23, 59,
				59);
		return repository.countInCurrentMonthByStatus(startOfMonth, endOfMonth,
				List.of(State.JobPost.STARTED));
	}

	public Long countPendingInCurrentMonth() {
		YearMonth currentMonth = YearMonth.now();
		LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();
		LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(23, 59,
				59);
		return repository.countInCurrentMonthByStatus(startOfMonth, endOfMonth,
				List.of(State.JobPost.PENDING));
	}
	
	public long getTotalJobPostsByRecruiter(Integer id) {
        return repository.countJobPostsByRecruiter(id);
    }

}
