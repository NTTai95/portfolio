package com.freelancer.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.mogodb.document.PushNotificationTemplate;
import com.freelancer.mogodb.repository.RepositoryPushNotification;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerTest {
    private final RepositoryPushNotification repositoryPushNotification;

    @GetMapping("/test")
    public List<PushNotificationTemplate> test() {
        return repositoryPushNotification.findByType("welcome");
    }
    
    @GetMapping("/test/all-templates")
    public List<PushNotificationTemplate> getAllTemplates() {
        return repositoryPushNotification.findAll();
    }
    
    @GetMapping("/test/templates/count")
    public String getTemplatesCount() {
        long count = repositoryPushNotification.count();
        return "MongoDB có " + count + " notification templates";
    }
}
