package com.freelancer.mogodb.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.freelancer.mogodb.document.Notification;

public interface RepositoryNotification extends MongoRepository<Notification, String> {

    long countByUserIdAndIsReadFalse(Integer userId);

    List<Notification> findByUserId(Integer userId);

    List<Notification> findByUserIdOrderByCreatedAtDesc(Integer userId);

    List<Notification> findByUserIdAndIsReadFalse(Integer userId);

    void deleteAllByUserId(Integer userId);
}
