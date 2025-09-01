package com.freelancer.mogodb.repository;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.freelancer.mogodb.document.IdVerificationLog;

public interface IdVerificationLogRepository extends MongoRepository<IdVerificationLog, String> {
    Optional<IdVerificationLog> findTopByUserIdOrderByCreatedAtDesc(Integer userId);
}