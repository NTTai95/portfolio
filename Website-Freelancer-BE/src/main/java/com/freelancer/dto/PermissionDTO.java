package com.freelancer.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.freelancer.model.Permission;
import com.freelancer.model.Staff;
import com.freelancer.service.StaffService;
import com.freelancer.utils.ApplicationContextProvider;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PermissionDTO implements EntityDTO<Permission> {
	private Integer id;
	private String name;
	private String description;
	private Integer status;
	private List<Integer> staffIds;

	// Chuyển đổi DTO thành Entity (cần truyền vào repository để tìm Staff)
	public Permission toEntity() {

		StaffService staffService = ApplicationContextProvider
				.getBean(StaffService.class);
		Permission permission = Permission.builder().id(this.id).name(this.name)
				.description(this.description).status(this.status).build();

		if (this.staffIds != null && !this.staffIds.isEmpty()) {
			List<Staff> staffs = staffService.getAllById(staffIds);
			permission.setStaffs(staffs);
		} else {
			permission.setStaffs(new ArrayList<>());
		}

		return permission;
	}
}
