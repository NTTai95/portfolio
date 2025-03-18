package com.freelancer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.freelancer.model.Account;
import com.freelancer.model.Permission;
import com.freelancer.model.Staff;
import com.freelancer.service.AccountService;
import com.freelancer.service.PermissionService;
import com.freelancer.utils.ApplicationContextProvider;
import com.freelancer.utils.State;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StaffDTO implements EntityDTO<Staff> {
	private Integer id;
	private String fullName;
	private String email;
	private String password;
	private Date joinDate;
	private Date birthday;
	private String phone;
	private Integer status;
	private Boolean isAdmin;
	private Integer accountId; // ID của tài khoản liên kết
	private List<Integer> permissionIds; // Danh sách ID của quyền (permissions)

	/**
	 * Chuyển đổi từ `StaffDTO` sang `Staff`
	 */
	public Staff toEntity() {
		AccountService accountService = ApplicationContextProvider
				.getBean(AccountService.class);
		PermissionService permissionService = ApplicationContextProvider
				.getBean(PermissionService.class);

		Staff staff = new Staff();

		staff.setId(this.id != null ? this.id : null);
		staff.setFullName(this.fullName != null ? this.fullName : null);
		staff.setBirthday(this.birthday != null ? this.birthday : null);
		staff.setPhone(this.phone != null ? this.phone : null);
		staff.setStatus(this.status != null ? this.status : State.Staff.SHOW);
		staff.setIsAdmin(this.isAdmin != null ? this.isAdmin : false);

		Account account = (accountId == null
				|| !accountService.existsById(accountId))
						? new Account()
						: accountService.getById(accountId)
								.orElse(new Account());

		account.setEmail(this.email != null ? this.email : null);
		account.setPassword(this.password != null ? this.password : null);
		staff.setAccount(account);

		if (this.permissionIds != null && !this.permissionIds.isEmpty()) {
			List<Permission> permissions = permissionService
					.getAllById(this.permissionIds);

			staff.setPermissions(permissions);
		} else {
			staff.setPermissions(new ArrayList<Permission>());
		}

		return staff;
	}
}
