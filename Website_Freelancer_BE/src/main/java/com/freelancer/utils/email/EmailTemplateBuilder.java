package com.freelancer.utils.email;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Component
public class EmailTemplateBuilder {

    private final TemplateEngine templateEngine;

    public EmailTemplateBuilder(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public String buildTemplate(EmailTemplateData data) {
        Context context = new Context();
        context.setVariables(convertToMap(data));
        return templateEngine.process("email/" + data.getTemplateName(), context);
    }

    private Map<String, Object> convertToMap(EmailTemplateData data) {
        Map<String, Object> result = new HashMap<>();
        for (var method : data.getClass().getDeclaredMethods()) {
            if (method.getName().startsWith("get") && method.getParameterCount() == 0) {
                try {
                    String field = method.getName().substring(3);
                    field = Character.toLowerCase(field.charAt(0)) + field.substring(1);
                    result.put(field, method.invoke(data));
                } catch (Exception ignored) {
                }
            }
        }
        return result;
    }
}

