package com.freelancer.mogodb.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

@Document("notification_templates")
@Getter
@Setter
public class PushNotificationTemplate {
    @Id
    private String id;
    private String title;
    private String message;
    private String type;
}

