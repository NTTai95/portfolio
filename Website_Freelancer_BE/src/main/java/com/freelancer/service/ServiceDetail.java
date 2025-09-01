package com.freelancer.service;

import org.springframework.stereotype.Service;
import com.freelancer.dto.responses.ResponseDetail;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.User;
import com.freelancer.mysql.repository.RepositoryEmployer;
import com.freelancer.mysql.repository.RepositoryFreelancer;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.service.mapper.DataToDetail;
import com.freelancer.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceDetail {
        private final RepositoryJob repositoryJob;
        private final RepositoryFreelancer repositoryFreelancer;
        private final RepositoryEmployer repositoryEmployer;
        private final SecurityUtil securityUtil;

        public ResponseDetail.Job jobDetailPublic(Integer id) {
                return DataToDetail.job(repositoryJob.findByIdPublic(id)
                                .orElseThrow(() -> new DataConflictException(
                                                "Không tìm thấy job với id: " + id)));
        }

        public Object getFullInfo() {
                User user = securityUtil.getCurrentUser();
                if (user.getRole().getCode().equals("FREELANCER")) {
                        return DataToDetail.toFreelancer(repositoryFreelancer.findById(user.getId())
                                        .orElseThrow(() -> new DataConflictException(
                                                        "Không tìm thấy freelancer với id: "
                                                                        + securityUtil.getCurrentUser()
                                                                                        .getId())));
                }
                
                return DataToDetail.toEmployerInfo(repositoryEmployer.findById(user.getId())
                                .orElseThrow(() -> new DataConflictException(
                                                "Không tìm thấy employer với id: " + securityUtil
                                                                .getCurrentUser().getId())));
        }
}
