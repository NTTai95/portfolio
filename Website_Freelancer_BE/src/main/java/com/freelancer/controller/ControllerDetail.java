package com.freelancer.controller;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.dto.responses.ResponseDetail;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Apply;
import com.freelancer.mysql.model.Employer;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Review;
import com.freelancer.mysql.model.User;
import com.freelancer.mysql.repository.RepositoryEmployer;
import com.freelancer.mysql.repository.RepositoryFreelancer;
import com.freelancer.service.ServiceDetail;
import com.freelancer.utils.EndPoint;
import com.freelancer.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class ControllerDetail {
        private final ServiceDetail serviceDetail;
        private final RepositoryEmployer repositoryEmployer;
        private final RepositoryFreelancer repositoryFreelancer;
        private final SecurityUtil securityUtil;

        @PreAuthorize("hasAnyRole('FREELANCER', 'NHA_TUYEN_DUNG')")
        @GetMapping(EndPoint.Me.FULL_INFO)
        public ResponseEntity<?> getFullInfo() {
                User user = securityUtil.getCurrentUser();

                // Nếu là FREELANCER, sử dụng logic cũ qua service
                if (user.getRole().getCode().equals("FREELANCER")) {
                        return ResponseEntity.ok(serviceDetail.getFullInfo());
                }

                // Nếu là NHA_TUYEN_DUNG, sử dụng logic mới
                Integer employerId = user.getId();
                Employer employer = repositoryEmployer.findById(employerId)
                                .orElseThrow(() -> new DataConflictException(
                                                "Không tìm thấy thông tin employer!"));

                Map<String, Object> res = new HashMap<>();

                // Thông tin cá nhân
                res.put("id", employer.getId());
                res.put("avatar", employer.getAvatar());
                res.put("fullName", employer.getFullName());
                res.put("birthday", employer.getBirthday());
                res.put("age", Period.between(employer.getBirthday(), LocalDate.now()).getYears());
                res.put("isMale", employer.getIsMale());
                res.put("joinedAt", employer.getJoinedAt());
                res.put("email", employer.getEmail());
                res.put("phone", employer.getPhone());
                res.put("reputation", employer.getReputation());
                res.put("bio", employer.getBio());

                // Hoạt động trên hệ thống

                // Top 5 công việc đang được đăng tuyển dụng (PUBLIC)
                res.put("activeJobs",
                                employer.getJobs().stream()
                                                .filter(job -> job.getStatus() == Job.Status.PUBLIC)
                                                .limit(5).map(job -> {
                                                        Map<String, Object> jobData =
                                                                        new HashMap<>();
                                                        jobData.put("id", job.getId());
                                                        jobData.put("title", job.getTitle());
                                                        jobData.put("budget", job.getBudget());
                                                        jobData.put("durationHours",
                                                                        job.getDurationHours());
                                                        jobData.put("postedAt", job.getPostedAt());
                                                        jobData.put("closedAt", job.getClosedAt());
                                                        jobData.put("countApplies",
                                                                        job.getApplies().size());
                                                        jobData.put("majorName",
                                                                        job.getMajor().getName());
                                                        jobData.put("skills", job.getSkills()
                                                                        .stream()
                                                                        .map(skill -> skill
                                                                                        .getName())
                                                                        .collect(Collectors
                                                                                        .toList()));
                                                        return jobData;
                                                }).collect(Collectors.toList()));

                // Top 3 Reviews có rating cao nhất
                res.put("topReviews",
                                employer.getReviews().stream()
                                                .filter(review -> review.getEmployerRating() != null
                                                                && review.getEmployerRating() > 0)
                                                .sorted((r1, r2) -> r2.getEmployerRating()
                                                                .compareTo(r1.getEmployerRating()))
                                                .limit(3).map(review -> {
                                                        Map<String, Object> reviewData =
                                                                        new HashMap<>();
                                                        reviewData.put("id", review.getId());
                                                        reviewData.put("freelancerAvatar", review
                                                                        .getFreelancer()
                                                                        .getAvatar());
                                                        reviewData.put("freelancerName", review
                                                                        .getFreelancer()
                                                                        .getFullName());
                                                        reviewData.put("freelancerReputation",
                                                                        review.getFreelancer()
                                                                                        .getReputation());
                                                        reviewData.put("jobTitle",
                                                                        review.getJob().getTitle());
                                                        reviewData.put("jobCompletedAt",
                                                                        review.getCreatedAt());
                                                        reviewData.put("rating",
                                                                        review.getEmployerRating());
                                                        reviewData.put("content", review
                                                                        .getEmployerContent());
                                                        reviewData.put("actualBudget", review
                                                                        .getJob().getBudget());
                                                        return reviewData;
                                                }).collect(Collectors.toList()));

                // Thống kê tổng quan
                res.put("totalJobs", employer.getJobs().size());
                res.put("totalActiveJobs",
                                employer.getJobs().stream().mapToLong(
                                                job -> job.getStatus() == Job.Status.PUBLIC ? 1 : 0)
                                                .sum());
                res.put("totalCompletedJobs", employer.getJobs().stream()
                                .mapToLong(job -> job.getStatus() == Job.Status.COMPLETED ? 1 : 0)
                                .sum());
                res.put("totalReviews", employer.getReviews().size());

                // Điểm đánh giá trung bình
                Double avgRating = employer.getReviews().stream()
                                .filter(review -> review.getEmployerRating() != null)
                                .mapToDouble(Review::getEmployerRating).average().orElse(0.0);
                res.put("averageRating", Math.round(avgRating * 100.0) / 100.0);

                return ResponseEntity.ok(res);
        }

        @GetMapping("/freelancer/{id}")
        public ResponseEntity<ResponseDetail.Freelancer> getFreelancer(@PathVariable Integer id) {
                Freelancer freelancer = repositoryFreelancer.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy freelancer"));

                ResponseDetail.Freelancer res = new ResponseDetail.Freelancer();
                res.setAvatar(freelancer.getAvatar());
                res.setBalance(freelancer.getBalance());
                res.setBio(freelancer.getBio());
                res.setBirthday(freelancer.getBirthday());
                res.setCertifications(freelancer.getCertifications().stream().map(c -> {
                        ResponseDetail.Certification certification =
                                        new ResponseDetail.Certification();
                        certification.setBackImage(c.getBackImage());
                        certification.setExpiryDate(c.getExpiryDate());
                        certification.setFrontImage(c.getFrontImage());
                        certification.setId(c.getId());
                        certification.setIssueBy(c.getIssueBy());
                        certification.setIssueDate(c.getIssueDate());
                        certification.setLink(c.getLink());
                        certification.setName(c.getName());
                        certification.setStatus(c.getStatus());
                        return certification;
                }).collect(Collectors.toList()));

                res.setEducations(freelancer.getEducations().stream().map(e -> {
                        ResponseDetail.Education education = new ResponseDetail.Education();
                        education.setDegree(e.getDegree());
                        education.setDescription(e.getDescription());
                        education.setEndDate(e.getEndDate());
                        education.setGpa(e.getGpa());
                        education.setId(e.getId());
                        education.setMajor(e.getMajor());
                        education.setSchoolName(e.getSchoolName());
                        education.setStartDate(e.getStartDate());
                        return education;
                }).collect(Collectors.toList()));

                res.setEmail(freelancer.getEmail());
                res.setFullName(freelancer.getFullName());
                res.setId(freelancer.getId());
                res.setIsMale(freelancer.getIsMale());
                res.setJoinedAt(freelancer.getJoinedAt());
                res.setLanguages(freelancer.getLanguages().stream().map(l -> {
                        ResponseDetail.Language language = new ResponseDetail.Language();
                        language.setId(l.getId());
                        language.setIso(l.getIso());
                        language.setName(l.getName());
                        language.setStatus(l.getStatus());
                        return language;
                }).collect(Collectors.toList()));

                res.setPhone(freelancer.getPhone());
                res.setReputation(freelancer.getReputation());
                ResponseDetail.Role role = new ResponseDetail.Role();
                role.setId(freelancer.getRole().getId());
                role.setName(freelancer.getRole().getName());
                role.setDescription(freelancer.getRole().getDescription());
                res.setRole(role);
                Integer totalReviews = freelancer.getReviews().stream()
                                .map(Review::getEmployerRating).reduce(0, Integer::sum);
                Float scoreReview = (float) totalReviews / freelancer.getReviews().size();
                res.setScoreReview(scoreReview);
                List<Apply> applyCompleted = freelancer.getApplies().stream()
                                .filter(a -> a.getStatus().equals(Apply.Status.ACCEPT))
                                .filter(a -> a.getJob().getStatus().equals(Job.Status.COMPLETED))
                                .toList();
                res.setTotalEarnings(applyCompleted.stream().map(Apply::getBidAmount).reduce(0,
                                Integer::sum));
                res.setCompletedJobs(applyCompleted.size());
                Float successRate = (((float) applyCompleted.size())
                                / ((float) freelancer.getApplies().size())) * 100;
                res.setSuccessRate(successRate);

                res.setSkills(freelancer.getSkills().stream().map(s -> {
                        ResponseDetail.Skill skill = new ResponseDetail.Skill();
                        skill.setId(s.getId());
                        skill.setName(s.getName());
                        skill.setStatus(s.getStatus());
                        skill.setDescription(s.getDescription());
                        return skill;
                }).collect(Collectors.toList()));

                res.setStatus(freelancer.getStatus());

                return ResponseEntity.ok(res);
        }

        @GetMapping("/employers/{id}")
        public ResponseEntity<?> getEmployer(@PathVariable Integer id) {
                Employer employer = repositoryEmployer.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy freelancer"));

                Map<String, Object> res = new HashMap<>();

                res.put("id", employer.getId());
                res.put("avatar", employer.getAvatar());
                res.put("fullName", employer.getFullName());
                res.put("birthday", employer.getBirthday());
                res.put("age", Period.between(employer.getBirthday(), LocalDate.now()).getYears());
                res.put("isMale", employer.getIsMale());
                res.put("joinedAt", employer.getJoinedAt());
                res.put("email", employer.getEmail());
                res.put("phone", employer.getPhone());
                res.put("reputation", employer.getReputation());
                res.put("bio", employer.getBio());

                res.put("activeJobs",
                                employer.getJobs().stream()
                                                .filter(job -> job.getStatus() == Job.Status.PUBLIC)
                                                .limit(5).map(job -> {
                                                        Map<String, Object> jobData =
                                                                        new HashMap<>();
                                                        jobData.put("id", job.getId());
                                                        jobData.put("title", job.getTitle());
                                                        jobData.put("budget", job.getBudget());
                                                        jobData.put("durationHours",
                                                                        job.getDurationHours());
                                                        jobData.put("postedAt", job.getPostedAt());
                                                        jobData.put("closedAt", job.getClosedAt());
                                                        jobData.put("countApplies",
                                                                        job.getApplies().size());
                                                        jobData.put("majorName",
                                                                        job.getMajor().getName());
                                                        jobData.put("skills", job.getSkills()
                                                                        .stream()
                                                                        .map(skill -> skill
                                                                                        .getName())
                                                                        .collect(Collectors
                                                                                        .toList()));
                                                        return jobData;
                                                }).collect(Collectors.toList()));

                res.put("topReviews",
                                employer.getReviews().stream()
                                                .filter(review -> review.getEmployerRating() != null
                                                                && review.getEmployerRating() > 0)
                                                .sorted((r1, r2) -> r2.getEmployerRating()
                                                                .compareTo(r1.getEmployerRating()))
                                                .limit(3).map(review -> {
                                                        Map<String, Object> reviewData =
                                                                        new HashMap<>();
                                                        reviewData.put("id", review.getId());
                                                        reviewData.put("freelancerAvatar", review
                                                                        .getFreelancer()
                                                                        .getAvatar());
                                                        reviewData.put("freelancerName", review
                                                                        .getFreelancer()
                                                                        .getFullName());
                                                        reviewData.put("freelancerReputation",
                                                                        review.getFreelancer()
                                                                                        .getReputation());
                                                        reviewData.put("jobTitle",
                                                                        review.getJob().getTitle());
                                                        reviewData.put("jobCompletedAt",
                                                                        review.getCreatedAt());
                                                        reviewData.put("rating",
                                                                        review.getEmployerRating());
                                                        reviewData.put("content", review
                                                                        .getEmployerContent());
                                                        reviewData.put("actualBudget", review
                                                                        .getJob().getBudget());
                                                        return reviewData;
                                                }).collect(Collectors.toList()));

                res.put("totalJobs", employer.getJobs().size());
                res.put("totalActiveJobs",
                                employer.getJobs().stream().mapToLong(
                                                job -> job.getStatus() == Job.Status.PUBLIC ? 1 : 0)
                                                .sum());
                res.put("totalCompletedJobs", employer.getJobs().stream()
                                .mapToLong(job -> job.getStatus() == Job.Status.COMPLETED ? 1 : 0)
                                .sum());
                res.put("totalReviews", employer.getReviews().size());

                Double avgRating = employer.getReviews().stream()
                                .filter(review -> review.getEmployerRating() != null)
                                .mapToDouble(Review::getEmployerRating).average().orElse(0.0);
                res.put("averageRating", Math.round(avgRating * 100.0) / 100.0);

                return ResponseEntity.ok(res);
        }

}
