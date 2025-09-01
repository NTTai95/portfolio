package com.freelancer.mogodb.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.freelancer.mogodb.document.PushNotificationTemplate;

public interface RepositoryPushNotification
        extends MongoRepository<PushNotificationTemplate, String> {
    List<PushNotificationTemplate> findByType(String type);
}
