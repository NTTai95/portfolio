package com.freelancer.mogodb.document;

import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Document("notification_schedules")
public class NotificationSchedule {
    @Id
    private String id;
    private String notificationId;
    private String userId; // nullable
    private Date scheduleTime;
    private String status; // PENDING, SENT, CANCELLED
}
