package com.freelancer.mogodb.document;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("history-payment")
public class HistoryPayment {
    private String id;
    private Integer userId;
    private Long createdAt;
    private Integer fee;
    private Integer milestoneId;
}
