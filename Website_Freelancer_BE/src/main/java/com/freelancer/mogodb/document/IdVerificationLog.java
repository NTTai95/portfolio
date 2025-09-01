package com.freelancer.mogodb.document;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document(collection = "id_verification_logs")
@Getter
@Setter
public class IdVerificationLog {
    @Id
    private String id;
    private Integer userId;
    private Object apiResponse;
    private LocalDateTime createdAt;
    private Boolean status;
    
}
