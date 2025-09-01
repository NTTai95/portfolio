package com.freelancer.mogodb.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.freelancer.mogodb.document.NotificationSchedule;

public interface NotificationScheduleRepository
        extends MongoRepository<NotificationSchedule, String> {
    List<NotificationSchedule> findByStatus(String status);
}
