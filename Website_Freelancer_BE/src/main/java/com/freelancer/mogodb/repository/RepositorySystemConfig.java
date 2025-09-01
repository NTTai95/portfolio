package com.freelancer.mogodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.freelancer.mogodb.document.SystemConfig;

public interface RepositorySystemConfig extends MongoRepository<SystemConfig, String> {
}

