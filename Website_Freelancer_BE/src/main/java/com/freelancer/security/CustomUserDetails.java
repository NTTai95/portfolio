package com.freelancer.security;

import java.beans.Transient;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.freelancer.mysql.model.Permission;
import com.freelancer.mysql.model.Staff;
import com.freelancer.mysql.model.User;
import com.freelancer.mysql.repository.RepositoryStaff;

public class CustomUserDetails implements UserDetails {
    private final RepositoryStaff repositoryStaff;

    private final User user;

    public CustomUserDetails(User user, RepositoryStaff repositoryStaff) {
        this.user = user;
        this.repositoryStaff = repositoryStaff;
    }

    @Transient
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String roleName = user.getRole().getCode(); // vd: "FREELANCER"
        List<GrantedAuthority> authorities = new ArrayList<>();

        // Luôn thêm ROLE_*
        String authorityRole = toAuthority(roleName); // vd: "ROLE_FREELANCER"
        authorities.add(new SimpleGrantedAuthority(authorityRole));

        // Nếu KHÔNG phải 3 vai trò cứng thì mới thêm permission
        if (!isFixedRole(authorityRole)) {
            // Thêm quyền từ Role
            for (Permission permission : user.getRole().getPermissions()) {
                authorities.add(new SimpleGrantedAuthority(permission.getCode()));
            }

            // Thêm quyền từ staff cá nhân
            Staff staff = repositoryStaff.findByIdWithPermissions(user.getId())
                    .orElseThrow(() -> new RuntimeException("Staff not found"));
            for (Permission permission : staff.getPermissions()) {
                authorities.add(new SimpleGrantedAuthority(permission.getCode()));
            }
        }

        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public User getUser() {
        return user;
    }

    public static String toAuthority(String roleName) {
        return "ROLE_" + Normalizer.normalize(roleName, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "").replaceAll("[^\\w]", "_").toUpperCase();
    }

    private boolean isFixedRole(String roleAuthority) {
        return roleAuthority.equals("ROLE_FREELANCER")
                || roleAuthority.equals("ROLE_NHA_TUYEN_DUNG")
                || roleAuthority.equals("ROLE_QUAN_TRI");
    }

}
