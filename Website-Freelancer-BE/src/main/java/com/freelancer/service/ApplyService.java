package com.freelancer.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.freelancer.model.Apply;
import com.freelancer.repository.RepositoryApply;
import com.freelancer.utils.State;

@Service
public class ApplyService extends EntityService<Apply, Integer> {
	@Autowired
	private RepositoryApply repositoryApply;

	public Page<Apply> getByJobPostId(Integer jobPostId, Pageable pageable) {
		return repositoryApply.findByJobPost_Id(jobPostId, pageable);
	}

	public void hiddenAllByJobPostId(Integer jobPostId) {
		repositoryApply.updateAllStatusByJobPostId(jobPostId,
				State.Apply.REJECTED);
	}

	public Optional<Apply> getWorkingByJobPostId(Integer jobPostId) {
		return repositoryApply.findByStatusAndJobPost_Id(State.Apply.WORKING,
				jobPostId);
	}

	public Optional<Apply> getFinishedByJobPostId(Integer jobPostId) {
		return repositoryApply.findByStatusAndJobPost_Id(State.Apply.FINISHED,
				jobPostId);
	}
	
	public Page<Apply> getCompletedJobsByFreelancer(Integer freelancerId, Pageable pageable) {
        return repositoryApply.findCompletedJobsByFreelancer(
                freelancerId, State.Apply.FINISHED, pageable);
    }
	
	public long getTotalCompletedJobsByFreelancer(Integer freelancerId) {
        return repositoryApply.countCompletedJobsByFreelancer(
                freelancerId, State.Apply.FINISHED);
    }
}
