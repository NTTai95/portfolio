package com.freelancer.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.dto.requests.RequestForm;
import com.freelancer.utils.EndPoint;
import com.freelancer.utils.MetaValidation;
import com.freelancer.utils.MetaValidation.FieldValidation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerValidation {
    @GetMapping(EndPoint.Auth.LOGIN_VALIDATION)
    public ResponseEntity<List<FieldValidation>> validationLogin() {
        return ResponseEntity.ok(MetaValidation.convert(RequestForm.Login.class));
    }

    @GetMapping(EndPoint.Auth.REGISTER_VALIDATION)
    public ResponseEntity<List<FieldValidation>> validationRegister() {
        return ResponseEntity.ok(MetaValidation.convert(RequestForm.Register.class));
    }

    @GetMapping(EndPoint.Admin.Skill.VALIDATION)
    public ResponseEntity<List<FieldValidation>> getSkillValidation() {
        return ResponseEntity.ok(MetaValidation.convert(RequestForm.Skill.class));
    }

    @GetMapping(EndPoint.Admin.Major.VALIDATION)
    public ResponseEntity<List<FieldValidation>> getMajorValidation() {
        return ResponseEntity.ok(MetaValidation.convert(RequestForm.Major.class));
    }

    @GetMapping(EndPoint.Admin.Language.VALIDATION)
    public ResponseEntity<List<FieldValidation>> getLanguageValidation() {
        return ResponseEntity.ok(MetaValidation.convert(RequestForm.Language.class));
    }

    @GetMapping(EndPoint.Admin.Role.VALIDATION)
    public ResponseEntity<List<FieldValidation>> getRoleValidation() {
        return ResponseEntity.ok(MetaValidation.convert(RequestForm.Role.class));
    }

    @GetMapping(EndPoint.Admin.Staff.VALIDATION)
    public ResponseEntity<List<FieldValidation>> getStaffValidation() {
        return ResponseEntity.ok(MetaValidation.convert(RequestForm.Staff.class));
    }
}
