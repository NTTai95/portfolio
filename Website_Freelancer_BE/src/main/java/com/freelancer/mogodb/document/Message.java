package com.freelancer.mogodb.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("messages")
public class Message {
    @Id
    private String id;
    private Integer senderId;
    private Integer receiverId;
    private String content;
    private Long timestamp;
    private boolean isRead;
    private boolean isRecall;
}
