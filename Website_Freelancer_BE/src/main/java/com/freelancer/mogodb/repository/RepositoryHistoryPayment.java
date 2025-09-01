package com.freelancer.mogodb.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.freelancer.mogodb.document.HistoryPayment;

public interface RepositoryHistoryPayment extends MongoRepository<HistoryPayment, String> {
    boolean existsByFeeAndMilestoneIdAndUserId(Integer fee, Integer milestoneId, Integer userId);

    Optional<HistoryPayment> findByUserIdAndMilestoneId(Integer userId, Integer milestoneId);
}
