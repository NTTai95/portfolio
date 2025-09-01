package com.freelancer.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.freelancer.dto.requests.RequestForm;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Apply;
import com.freelancer.mysql.model.Employer;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Major;
import com.freelancer.mysql.model.Permission;
import com.freelancer.mysql.model.Role;
import com.freelancer.mysql.repository.RepositoryApply;
import com.freelancer.mysql.repository.RepositoryEmployer;
import com.freelancer.mysql.repository.RepositoryFreelancer;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.mysql.repository.RepositoryLanguage;
import com.freelancer.mysql.repository.RepositoryMajor;
import com.freelancer.mysql.repository.RepositoryPermission;
import com.freelancer.mysql.repository.RepositoryRole;
import com.freelancer.mysql.repository.RepositorySkill;
import com.freelancer.mysql.repository.RepositoryStaff;
import com.freelancer.service.mapper.FormToModel;
import com.freelancer.utils.EmailUtil;
import com.freelancer.utils.SecurityUtil;
import com.freelancer.utils.email.ApplyNewEmailData;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServiceCreate {
        private final RepositorySkill repositorySkill;
        private final RepositoryMajor repositoryMajor;
        private final RepositoryLanguage repositoryLanguage;
        private final RepositoryRole repositoryRole;
        private final RepositoryPermission repositoryPermission;
        private final RepositoryJob repositoryJob;
        private final RepositoryStaff repositoryStaff;
        private final RepositoryFreelancer repositoryFreelancer;
        private final RepositoryApply repositoryApply;
        private final RepositoryEmployer repositoryEmployer;
        private final SecurityUtil securityUtil;
        private final ServiceNotification serviceNotification;
        private final EmailUtil emailUtil;

        public void createSkill(RequestForm.Skill req) {
                Major major = repositoryMajor.findById(req.getMajorId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy chuyên ngành"));
                repositorySkill.save(FormToModel.fromToSkill(null, req, major));
        }

        public void createMajor(RequestForm.Major req) {
                repositoryMajor.save(FormToModel.fromToMajor(null, req));
        }

        public void createLanguage(RequestForm.Language req) {
                repositoryLanguage.save(FormToModel.fromToLanguage(null, req));
        }

        public void createRole(RequestForm.Role req) {
                List<Permission> permissons = (List<Permission>) repositoryPermission
                                .findAllById(req.getPermissionIds());
                repositoryRole.save(FormToModel.fromToRole(null, req, permissons));
        }

        public Integer createJob(RequestForm.JobStep1 req) {
                Major major = repositoryMajor.findById(req.getMajorId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy chuyên ngành"));
                Employer employer =
                                repositoryEmployer.findById(securityUtil.getCurrentUser().getId())
                                                .orElseThrow(() -> new DataConflictException(
                                                                "Không tìm thấy nhà tuyển dụng"));
                Job job = repositoryJob
                                .save(FormToModel.fromToJobStep1(null, req, major, employer));

                return job.getId();
        }

        public void createStaff(RequestForm.Staff req) {
                Role role = repositoryRole.findById(req.getRoleId())
                                .orElseThrow(() -> new DataConflictException(
                                                "Không tìm thấy role id: " + req.getRoleId()));
                repositoryStaff.save(FormToModel.fromToStaff(null, req, role));
        }

        public void createApply(Integer id, RequestForm.Apply req) {
                Job job = repositoryJob.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy job id: " + id));

                if (!job.getStatus().equals(Job.Status.PUBLIC)) {
                        throw new DataConflictException("Không thể ứng tuyển vào job này");
                }

                Freelancer freelancer =
                                repositoryFreelancer.findById(securityUtil.getCurrentUser().getId())
                                                .orElseThrow(() -> new DataConflictException(
                                                                "Không tìm thấy freelancer"));

                if (freelancer.getApplies().stream()
                                .anyMatch(apply -> apply.getJob().getId().equals(job.getId()))) {
                        throw new DataConflictException("Bạn đã ứng tuyển vào job này");
                }

                Apply apply = FormToModel.fromToApply(null, req, job, freelancer);
                repositoryApply.save(apply);

                String link = "/jobs/" + job.getId()
                                + "/select-freelancer?select=" + freelancer.getFullName();

                ApplyNewEmailData emailData = new ApplyNewEmailData();
                emailData.setDetailLink(link);
                emailData.setApplyContent(apply.getContent());
                emailData.setBidAmount(apply.getBidAmount().toString());
                emailData.setCreatedAt(apply.getCreatedAt());
                emailData.setEstimatedHours(apply.getEstimatedHours().toString());
                emailData.setFreelancerAvatar(freelancer.getAvatar());
                emailData.setFreelancerFullName(freelancer.getFullName());
                emailData.setJobDescription(job.getDescription());
                emailData.setJobTitle(job.getTitle());

                serviceNotification.sendNoticationWithUserId(job.getEmployer().getId(), "Ứng tuyển",
                                "Bạn có 1 ứng tuyển mới từ '" + freelancer.getFullName() + "'",
                                link);

                emailUtil.sendEmail(job.getEmployer().getEmail(),
                                "[Ứng tuyển] Bạn có một ứng tuyển mới cho công việc!", emailData);
        }
}
