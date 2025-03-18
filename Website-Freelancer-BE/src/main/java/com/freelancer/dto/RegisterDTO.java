package com.freelancer.dto;

import java.util.Date;

import lombok.Data;

@Data
public class RegisterDTO {
    private String fullName;
    private String email;
    private String password;
    private String confirmPassword;
    private String phone;
    private Date birthday;
    private Boolean agree; 
}

