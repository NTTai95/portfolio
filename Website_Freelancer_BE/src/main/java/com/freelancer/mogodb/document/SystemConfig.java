package com.freelancer.mogodb.document;

import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "system_config")
@Getter
@Setter
public class SystemConfig {
    @Id
    private String id;

    private Double defaultTaxRate;
    private Integer maxUploadSizeMB;
    private Boolean enableRegistration;
    private String supportEmail;
    private Float serviceFee;
}
