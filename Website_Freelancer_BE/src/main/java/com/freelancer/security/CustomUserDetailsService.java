package com.freelancer.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.freelancer.mysql.model.User;
import com.freelancer.mysql.repository.RepositoryStaff;
import com.freelancer.mysql.repository.RepositoryUser;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private RepositoryUser repositoryUser;
    @Autowired
    private RepositoryStaff repositoryStaff;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user =
                repositoryUser.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(
                        "[CustomUserDetailsService] Không tìm thấy user với email: " + email));
        return new CustomUserDetails(user, repositoryStaff);
    }
}
