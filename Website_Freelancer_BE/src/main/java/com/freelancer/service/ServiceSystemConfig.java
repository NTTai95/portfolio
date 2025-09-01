package com.freelancer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.freelancer.mogodb.document.SystemConfig;
import com.freelancer.mogodb.repository.RepositorySystemConfig;

@Service
public class ServiceSystemConfig {

    @Autowired
    private RepositorySystemConfig configRepository;

    public SystemConfig getConfig() {
        return configRepository.findById("system_config").orElseGet(() -> {
            SystemConfig defaultConfig = new SystemConfig();
            defaultConfig.setId("system_config");
            defaultConfig.setDefaultTaxRate(0.1);
            defaultConfig.setMaxUploadSizeMB(20);
            defaultConfig.setEnableRegistration(true);
            defaultConfig.setSupportEmail("support@example.com");
            defaultConfig.setServiceFee(2.0f);
            return configRepository.save(defaultConfig);
        });
    }

    public SystemConfig updateConfig(SystemConfig updatedConfig) {
        updatedConfig.setId("system_config");
        return configRepository.save(updatedConfig);
    }
}

