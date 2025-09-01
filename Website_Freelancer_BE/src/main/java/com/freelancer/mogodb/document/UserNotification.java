package com.freelancer.mogodb.document;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "user_notifications")
public class UserNotification {
    @Id
    private String id;
    private String userId;
    private String notificationId;
    private boolean viewed;
    private LocalDateTime scheduledTime;
}
