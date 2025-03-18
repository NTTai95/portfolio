package com.freelancer.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancer.dto.PermissionDTO;
import com.freelancer.model.Permission;

@RestController
@RequestMapping("/permissions")
public class PermissionController
		extends
			EntityController<Permission, PermissionDTO, Integer> {
}
