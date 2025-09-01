package com.freelancer.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.freelancer.dto.requests.RequestForm;
import com.freelancer.dto.responses.ResponseDetail;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.exceptions.EmailAlreadyExistsException;
import com.freelancer.mysql.model.Client;
import com.freelancer.mysql.model.Employer;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Role;
import com.freelancer.mysql.repository.RepositoryClient;
import com.freelancer.mysql.repository.RepositoryEmployer;
import com.freelancer.mysql.repository.RepositoryFreelancer;
import com.freelancer.mysql.repository.RepositoryRole;
import com.freelancer.mysql.repository.RepositoryStaff;
import com.freelancer.mysql.repository.RepositoryUser;
import com.freelancer.security.CustomUserDetails;
import com.freelancer.security.JwtUtils;
import com.freelancer.service.mapper.DataToDetail;
import com.freelancer.service.mapper.FormToModel;
import com.freelancer.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceAuth {
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final RepositoryUser repositoryUser;
    private final RepositoryFreelancer repositoryFreelancer;
    private final RepositoryEmployer repositoryEmployer;
    private final RepositoryRole repositoryRole;
    private final PasswordEncoder passwordEncoder;
    private final SecurityUtil securityUtil;
    private final RepositoryClient repositoryProfile;
    private final RepositoryStaff repositoryStaff;

    public String login(RequestForm.Login req) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        String token = jwtUtils.generateJwtToken(userDetails);

        return token;
    }

    public String register(RequestForm.Register req, String StringRole) {
        if (repositoryUser.existsByEmail(req.getEmail())) {
            throw new EmailAlreadyExistsException("Email đã tồn tại trong hệ thống.");
        }

        RequestForm.Login reqLogin = new RequestForm.Login();
        reqLogin.setEmail(req.getEmail());
        reqLogin.setPassword(req.getPassword());

        String encodedPassword = passwordEncoder.encode(req.getPassword());
        req.setPassword(encodedPassword);

        Role role = repositoryRole
                .findByCode(StringRole.toUpperCase().equals("EMPLOYER") ? "NHA_TUYEN_DUNG"
                        : "FREELANCER")
                .orElseThrow(() -> new RuntimeException("Role mặc định không tồn tại"));

        if (role.getCode().equals("FREELANCER")) {
            Client profile = new Freelancer();
            FormToModel.registerToProfile(profile, req, role);
            repositoryFreelancer.save((Freelancer) profile);
        } else if (role.getCode().equals("NHA_TUYEN_DUNG")) {
            Client profile = new Employer();
            FormToModel.registerToProfile(profile, req, role);
            repositoryEmployer.save((Employer) profile);
        } else {
            throw new RuntimeException("Role không hợp lệ.");
        }

        return login(reqLogin);
    }

    public ResponseDetail.MeClient meClient() {
        return DataToDetail
                .meClient(repositoryProfile.findById(securityUtil.getCurrentUser().getId())
                        .orElseThrow(() -> new DataConflictException("Không tìm thấy user")));

    }

    public ResponseDetail.MeAdmin meAdmin() {
        return DataToDetail.meAdmin(repositoryStaff.findById(securityUtil.getCurrentUser().getId())
                .orElseThrow(() -> new DataConflictException("Không tìm thấy user")));
    }
}
