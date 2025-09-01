package com.freelancer.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Certification;
import com.freelancer.mysql.model.Client;
import com.freelancer.mysql.model.Education;
import com.freelancer.mysql.model.Employer;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Language;
import com.freelancer.mysql.model.Skill;
import com.freelancer.mysql.model.User;
import com.freelancer.mysql.repository.RepositoryCertification;
import com.freelancer.mysql.repository.RepositoryClient;
import com.freelancer.mysql.repository.RepositoryEducation;
import com.freelancer.mysql.repository.RepositoryEmployer;
import com.freelancer.mysql.repository.RepositoryFreelancer;
import com.freelancer.mysql.repository.RepositoryLanguage;
import com.freelancer.mysql.repository.RepositorySkill;
import com.freelancer.mysql.repository.RepositoryUser;
import com.freelancer.security.CustomUserDetails;
import com.freelancer.security.JwtUtils;
import com.freelancer.service.ServiceCloudinary;
import com.freelancer.utils.RelationshipUtils;
import com.freelancer.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;



@RestController
@RequiredArgsConstructor
@RequestMapping("profile")
public class ControllerProfile {
        private final RepositoryUser repositoryUser;
        private final JwtUtils jwtUtils;
        private final RepositoryClient repositoryClient;
        private final RepositoryFreelancer repositoryFreelancer;
        private final RepositoryEmployer repositoryEmployer;
        private final SecurityUtil securityUtil;
        private final ServiceCloudinary serviceCloudinary;
        private final RepositorySkill repositorySkill;
        private final RepositoryLanguage repositoryLanguage;
        private final RepositoryCertification repositoryCertification;
        private final RepositoryEducation repositoryEducation;
        private final AuthenticationManager authenticationManager;

        @GetMapping("my-info")
        public ResponseEntity<?> getMyProfileInfo() {
                User user = securityUtil.getCurrentUser();

                if (user.getRole().getCode().equals("FREELANCER")) {
                        Freelancer freelancer = repositoryFreelancer.findById(user.getId())
                                        .orElseThrow(() -> new DataConflictException(
                                                        "Không tìm thấy thông tin freelancer"));
                        return ResponseEntity.ok(mapFreelancerToResponse(freelancer));
                } else if (user.getRole().getCode().equals("NHA_TUYEN_DUNG")) {
                        Employer employer = repositoryEmployer.findById(user.getId())
                                        .orElseThrow(() -> new DataConflictException(
                                                        "Không tìm thấy thông tin employer"));
                        return ResponseEntity.ok(mapEmployerToResponse(employer));
                }

                throw new DataConflictException("Role không hợp lệ");
        }

        private Map<String, Object> mapFreelancerToResponse(Freelancer freelancer) {
                Map<String, Object> response = new HashMap<>();
                response.put("id", freelancer.getId());
                response.put("fullName", freelancer.getFullName());
                response.put("email", freelancer.getEmail());
                response.put("phone", freelancer.getPhone());
                response.put("birthday", freelancer.getBirthday());
                response.put("isMale", freelancer.getIsMale());
                response.put("joinedAt", freelancer.getJoinedAt());
                response.put("status", freelancer.getStatus());
                response.put("avatar", freelancer.getAvatar());
                response.put("reputation", freelancer.getReputation());
                response.put("bio", freelancer.getBio());
                response.put("balance", freelancer.getBalance());
                response.put("role", freelancer.getRole().getCode());

                // Skills
                response.put("skills", freelancer.getSkills().stream()
                                .map(skill -> Map.of("id", skill.getId(), "name", skill.getName()))
                                .collect(Collectors.toList()));

                // Languages
                response.put("languages",
                                freelancer.getLanguages().stream()
                                                .map(language -> Map.of("id", language.getId(),
                                                                "name", language.getName()))
                                                .collect(Collectors.toList()));

                // Certifications
                response.put("certifications", freelancer.getCertifications().stream().map(cert -> {
                        Map<String, Object> certMap = new HashMap<>();
                        certMap.put("id", cert.getId());
                        certMap.put("name", cert.getName());
                        certMap.put("issueBy", cert.getIssueBy());
                        certMap.put("issueDate", cert.getIssueDate());
                        certMap.put("expiryDate", cert.getExpiryDate());
                        certMap.put("link", cert.getLink());
                        certMap.put("frontImage", cert.getFrontImage());
                        certMap.put("backImage", cert.getBackImage());

                        certMap.put("status", cert.getStatus());
                        return certMap;
                }).collect(Collectors.toList()));

                // Educations
                response.put("educations", freelancer.getEducations().stream().map(edu -> {
                        Map<String, Object> map = new HashMap<>();
                        map.put("id", edu.getId());
                        map.put("schoolName", edu.getSchoolName());
                        map.put("degree", edu.getDegree() != null ? edu.getDegree() : "");
                        map.put("major", edu.getMajor() != null ? edu.getMajor() : "");
                        map.put("gpa", edu.getGpa() != null ? edu.getGpa() : "");
                        map.put("startDate", formatDate(edu.getStartDate()));
                        map.put("endDate", edu.getEndDate() != null ? formatDate(edu.getEndDate())
                                        : "");
                        map.put("description",
                                        edu.getDescription() != null ? edu.getDescription() : "");
                        return map;
                }).collect(Collectors.toList()));


                return response;
        }

        private String formatDate(LocalDate date) {
                return date.format(DateTimeFormatter.ofPattern("yyyy-MM"));
        }

        private Map<String, Object> mapEmployerToResponse(Employer employer) {
                Map<String, Object> response = new HashMap<>();
                response.put("id", employer.getId());
                response.put("fullName", employer.getFullName());
                response.put("email", employer.getEmail());
                response.put("phone", employer.getPhone());
                response.put("birthday", employer.getBirthday());
                response.put("isMale", employer.getIsMale());
                response.put("joinedAt", employer.getJoinedAt());
                response.put("status", employer.getStatus());
                response.put("avatar", employer.getAvatar());
                response.put("reputation", employer.getReputation());
                response.put("bio", employer.getBio());

                // Jobs
                response.put("jobs", employer.getJobs().stream()
                                .map(job -> Map.of("id", job.getId(), "title", job.getTitle(),
                                                "status", job.getStatus(), "createdAt",
                                                job.getCreatedAt()))
                                .collect(Collectors.toList()));

                // Reviews
                response.put("reviews", employer.getReviews().stream().map(review -> Map.of("id",
                                review.getId(), "rating", review.getEmployerRating(), "comment",
                                review.getFreelancerContent(), "createdAt", review.getCreatedAt(),
                                "reviewerName", review.getFreelancer().getFullName()))
                                .collect(Collectors.toList()));

                return response;
        }

        @PutMapping(value = "update/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<?> updateAvatar(@RequestParam MultipartFile file) {
                User user = securityUtil.getCurrentUser();
                Client client = repositoryClient.findById(user.getId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy user!"));

                String url = serviceCloudinary.uploadFile(file, "client-avatar-" + client.getId());
                client.setAvatar(url);
                repositoryClient.save(client);

                return ResponseEntity.ok(Map.of("url", url));
        }

        @PutMapping("update/full-name")
        public ResponseEntity<?> updateFullName(@RequestBody Map<String, Object> req) {
                User user = securityUtil.getCurrentUser();
                Client client = repositoryClient.findById(user.getId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy user!"));

                String fullName = (String) req.get("fullName");
                client.setFullName(fullName);
                repositoryClient.save(client);
                return ResponseEntity.ok(Map.of("fullName", fullName));
        }

        @PutMapping("update/bio")
        public ResponseEntity<?> updateBio(@RequestBody Map<String, Object> req) {
                User user = securityUtil.getCurrentUser();
                Client client = repositoryClient.findById(user.getId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy user!"));

                String bio = (String) req.get("bio");
                client.setBio(bio);
                repositoryClient.save(client);
                return ResponseEntity.ok(Map.of("bio", bio));
        }

        @PutMapping("update/email")
        public ResponseEntity<?> updateEmail(@RequestBody Map<String, Object> req) {
                String newEmail = (String) req.get("email");
                String password = (String) req.get("password");

                User user = securityUtil.getCurrentUser();

                try {
                        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                                        user.getEmail(), password));
                } catch (Exception ex) {
                        throw new DataConflictException("Mật khẩu không chính xác!");
                }

                if (!newEmail.equals(user.getEmail()) && repositoryUser.existsByEmail(newEmail)) {
                        throw new DataConflictException("Email đã tồn tại!");
                }

                Client client = repositoryClient.findById(user.getId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy user!"));

                client.setEmail(newEmail);
                repositoryClient.save(client);

                Authentication newAuth = authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(newEmail, password));

                SecurityContextHolder.getContext().setAuthentication(newAuth);

                CustomUserDetails userDetails = (CustomUserDetails) newAuth.getPrincipal();
                String token = jwtUtils.generateJwtToken(userDetails);

                return ResponseEntity.ok(Map.of("email", newEmail, "token", token));
        }

        @PutMapping("update/phone")
        public ResponseEntity<?> updatePhone(@RequestBody Map<String, Object> req) {
                User user = securityUtil.getCurrentUser();
                Client client = repositoryClient.findById(user.getId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy user!"));

                String phone = (String) req.get("phone");
                client.setPhone(phone);
                repositoryClient.save(client);
                return ResponseEntity.ok(Map.of("phone", phone));
        }

        @PutMapping("update/is-male")
        public ResponseEntity<?> updateIsMale(@RequestBody Map<String, Object> req) {
                User user = securityUtil.getCurrentUser();
                Client client = repositoryClient.findById(user.getId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy user!"));
                try {
                        boolean isMale = (boolean) req.get("isMale");
                        client.setIsMale(isMale);
                        repositoryClient.save(client);
                        return ResponseEntity.ok(Map.of("isMale", isMale));
                } catch (Exception e) {
                        throw new DataConflictException("Lỗi cập nhật giới tính");
                }
        }

        @PutMapping("update/birthday")
        public ResponseEntity<?> updateBirthday(@RequestBody Map<String, Object> req) {
                User user = securityUtil.getCurrentUser();
                Client client = repositoryClient.findById(user.getId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy user!"));
                try {
                        LocalDate birthday = LocalDate.parse((String) req.get("birthday"));
                        client.setBirthday(birthday);
                        repositoryClient.save(client);
                        return ResponseEntity.ok(Map.of("birthday", birthday));
                } catch (Exception e) {
                        throw new DataConflictException("Lỗi cập nhật ngày sinh!");
                }
        }

        @PutMapping("update/skills")
        public ResponseEntity<?> updateSkills(@RequestBody Map<String, Object> req) {
                User user = securityUtil.getCurrentUser();
                Freelancer freelancer = repositoryFreelancer.findById(user.getId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy freelancer!"));
                try {
                        @SuppressWarnings("unchecked")
                        List<Skill> skills = repositorySkill
                                        .findAllById((List<Integer>) req.get("skills"));
                        RelationshipUtils.updateManyToMany(freelancer, skills,
                                        Freelancer::getSkills, Skill::getFreelancers);
                        repositoryFreelancer.save(freelancer);
                        return ResponseEntity.ok(Map.of("skills", skills));
                } catch (Exception e) {
                        throw new DataConflictException("Lỗi cập nhật skill!");
                }
        }

        @PutMapping("update/languages")
        public ResponseEntity<?> updateLanguage(@RequestBody Map<String, Object> req) {
                User user = securityUtil.getCurrentUser();
                Freelancer freelancer = repositoryFreelancer.findById(user.getId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy freelancer!"));
                try {
                        @SuppressWarnings("unchecked")
                        List<Language> languages = repositoryLanguage
                                        .findAllById((List<Integer>) req.get("languages"));
                        RelationshipUtils.updateManyToMany(freelancer, languages,
                                        Freelancer::getLanguages, Language::getFreelancers);
                        repositoryFreelancer.save(freelancer);
                        return ResponseEntity.ok(Map.of("languages", languages));
                } catch (Exception e) {
                        throw new DataConflictException("Lỗi cập nhật langauges!");
                }
        }

        @PostMapping("/certification")
        public ResponseEntity<?> createCertifications(@RequestBody Map<String, Object> req) {
                User user = securityUtil.getCurrentUser();
                Freelancer freelancer = repositoryFreelancer.findById(user.getId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy freelancer!"));

                Certification certification = new Certification();
                validateAndSetCertificationFields(certification, req);
                certification.setFreelancer(freelancer);

                handleCertificationImages(certification, req, freelancer.getId());
                updateCertificationStatus(certification);

                repositoryCertification.save(certification);
                return ResponseEntity.ok(Map.of("message", "Thêm chứng chỉ thành công",
                                "certificationId", certification.getId()));
        }

        @PutMapping("/certification/{id}")
        public ResponseEntity<?> updateCertifications(@PathVariable Integer id,
                        @RequestBody Map<String, Object> req) {
                User user = securityUtil.getCurrentUser();
                Integer certificationId = (Integer) req.get("id");
                if (!id.equals(certificationId)) {
                        throw new DataConflictException("ID trong path và body không khớp");
                }

                Certification certification = repositoryCertification.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy chứng chỉ"));

                if (!certification.getFreelancer().getId().equals(user.getId())) {
                        throw new DataConflictException("Bạn không có quyền sửa chứng chỉ này");
                }

                validateAndSetCertificationFields(certification, req);
                handleCertificationImages(certification, req, user.getId());
                updateCertificationStatus(certification);

                repositoryCertification.save(certification);
                return ResponseEntity.ok(Map.of("message", "Cập nhật chứng chỉ thành công",
                                "certificationId", certification.getId()));
        }

        @DeleteMapping("/certification/{id}")
        public ResponseEntity<?> deleteCertifications(@PathVariable Integer id) {
                User user = securityUtil.getCurrentUser();
                Certification certification = repositoryCertification.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy chứng chỉ"));

                if (!certification.getFreelancer().getId().equals(user.getId())) {
                        throw new DataConflictException("Bạn không có quyền xóa chứng chỉ này");
                }

                deleteCertificationImages(certification);
                repositoryCertification.delete(certification);
                return ResponseEntity.ok(Map.of("message", "Xóa chứng chỉ thành công"));
        }

        private void validateAndSetCertificationFields(Certification certification,
                        Map<String, Object> req) {
                if (req.get("name") == null || ((String) req.get("name")).isEmpty()) {
                        throw new DataConflictException("Tên chứng chỉ không được trống");
                }
                certification.setName((String) req.get("name"));

                certification.setIssueBy((String) req.get("issueBy"));

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                if (req.get("issueDate") == null) {
                        throw new DataConflictException("Ngày cấp chứng chỉ không được trống");
                }
                certification.setIssueDate(
                                LocalDate.parse((String) req.get("issueDate"), formatter));

                if (req.get("expiryDate") != null && !((String) req.get("expiryDate")).isEmpty()) {
                        certification.setExpiryDate(
                                        LocalDate.parse((String) req.get("expiryDate"), formatter));
                } else {
                        certification.setExpiryDate(null);
                }

                certification.setLink((String) req.get("link"));
        }

        private void handleCertificationImages(Certification certification, Map<String, Object> req,
                        Integer userId) {
                if (req.containsKey("frontImage")) {
                        Object frontImage = req.get("frontImage");
                        if (frontImage == null) {
                                if (certification.getFrontImage() != null) {
                                        deleteImageFromCloudinary(certification.getFrontImage(),
                                                        userId);
                                        certification.setFrontImage(null);
                                }
                        } else if (frontImage instanceof String) {
                                String base64 = (String) frontImage;
                                if (base64.startsWith("data:image")) {
                                        String publicId = "certifications/" + userId + "/"
                                                        + (certification.getId() != null
                                                                        ? certification.getId()
                                                                        : "temp")
                                                        + "_front";
                                        String url = uploadBase64Image(base64, publicId);
                                        certification.setFrontImage(url);
                                } else {
                                        throw new DataConflictException(
                                                        "Dữ liệu hình ảnh mặt trước không hợp lệ");
                                }
                        }
                }

                if (req.containsKey("backImage")) {
                        Object backImage = req.get("backImage");
                        if (backImage == null) {
                                if (certification.getBackImage() != null) {
                                        deleteImageFromCloudinary(certification.getBackImage(),
                                                        userId);
                                        certification.setBackImage(null);
                                }
                        } else if (backImage instanceof String) {
                                String base64 = (String) backImage;
                                if (base64.startsWith("data:image")) {
                                        String publicId = "certifications/" + userId + "/"
                                                        + (certification.getId() != null
                                                                        ? certification.getId()
                                                                        : "temp")
                                                        + "_back";
                                        String url = uploadBase64Image(base64, publicId);
                                        certification.setBackImage(url);
                                } else {
                                        throw new DataConflictException(
                                                        "Dữ liệu hình ảnh mặt sau không hợp lệ");
                                }
                        }
                }
        }

        private String uploadBase64Image(String base64, String publicId) {
                try {
                        String[] parts = base64.split(",");
                        if (parts.length < 2) {
                                throw new DataConflictException("Chuỗi base64 không hợp lệ");
                        }
                        String imageData = parts[1];
                        byte[] imageBytes = Base64.getDecoder().decode(imageData);
                        return serviceCloudinary.uploadFile(imageBytes, publicId);
                } catch (Exception e) {
                        throw new DataConflictException(
                                        "Lỗi khi tải lên hình ảnh: " + e.getMessage());
                }
        }

        private void deleteCertificationImages(Certification certification) {
                if (certification.getFrontImage() != null) {
                        deleteImageFromCloudinary(certification.getFrontImage(),
                                        certification.getFreelancer().getId());
                }
                if (certification.getBackImage() != null) {
                        deleteImageFromCloudinary(certification.getBackImage(),
                                        certification.getFreelancer().getId());
                }
        }

        private void deleteImageFromCloudinary(String imageUrl, Integer userId) {
                try {
                        String[] parts = imageUrl.split("/");
                        String publicId = parts[parts.length - 1].split("\\.")[0];
                        publicId = "certifications/" + userId + "/" + publicId;
                        serviceCloudinary.deleteFile(publicId);
                } catch (Exception e) {
                        System.err.println("Lỗi khi xóa hình ảnh: " + e.getMessage());
                }
        }

        private void updateCertificationStatus(Certification certification) {
                if (certification.getExpiryDate() != null
                                && certification.getExpiryDate().isBefore(LocalDate.now())) {
                        certification.setStatus(Certification.Status.EXPIRED);
                } else {
                        certification.setStatus(Certification.Status.ACTIVE);
                }
        }

        @PostMapping("/education")
        public ResponseEntity<?> createEducation(@RequestBody Map<String, Object> req) {
                User user = securityUtil.getCurrentUser();
                Freelancer freelancer = repositoryFreelancer.findById(user.getId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy freelancer!"));

                Education education = new Education();
                education.setFreelancer(freelancer);

                ResponseEntity<?> validationResult = populateEducation(education, req);
                if (validationResult != null)
                        return validationResult;

                repositoryEducation.save(education);
                return ResponseEntity.ok("Thêm học vấn thành công");
        }

        @PutMapping("/education/{id}")
        public ResponseEntity<?> updateEducation(@PathVariable Integer id,
                        @RequestBody Map<String, Object> req) {
                User user = securityUtil.getCurrentUser();
                Freelancer freelancer = repositoryFreelancer.findById(user.getId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy freelancer!"));

                Education education = repositoryEducation.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy học vấn!"));

                if (!education.getFreelancer().getId().equals(freelancer.getId())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body("Bạn không có quyền cập nhật học vấn này");
                }

                ResponseEntity<?> validationResult = populateEducation(education, req);
                if (validationResult != null)
                        return validationResult;

                repositoryEducation.save(education);
                return ResponseEntity.ok("Cập nhật học vấn thành công");
        }

        private ResponseEntity<?> populateEducation(Education education, Map<String, Object> req) {
                try {
                        String schoolName = (String) req.get("schoolName");
                        String degree = (String) req.get("degree");
                        String major = (String) req.get("major");
                        String description = (String) req.get("description");

                        if (schoolName == null || degree == null || major == null) {
                                return ResponseEntity.badRequest().body("Thiếu trường bắt buộc");
                        }

                        Double gpa = Double.valueOf(req.get("gpa").toString());
                        if (gpa < 0 || gpa > 10) {
                                return ResponseEntity.badRequest().body("GPA phải từ 0 đến 10");
                        }

                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                        LocalDate startDate =
                                        LocalDate.parse((String) req.get("startDate"), formatter);
                        LocalDate endDate = (String) req.get("endDate") != null
                                        ? LocalDate.parse((String) req.get("endDate"), formatter)
                                        : null;

                        education.setSchoolName(schoolName);
                        education.setDegree(degree);
                        education.setMajor(major);
                        education.setGpa(BigDecimal.valueOf(gpa));
                        education.setStartDate(startDate);
                        education.setEndDate(endDate);
                        education.setDescription(description);

                        return null; // success
                } catch (Exception e) {
                        return ResponseEntity.badRequest()
                                        .body("Dữ liệu đầu vào không hợp lệ: " + e.getMessage());
                }
        }

        @DeleteMapping("/education/{id}")
        public ResponseEntity<?> deleteEducation(@PathVariable Integer id) {
                User user = securityUtil.getCurrentUser();
                Freelancer freelancer = repositoryFreelancer.findById(user.getId()).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy freelancer!"));

                Education education = repositoryEducation.findById(id).orElseThrow(
                                () -> new DataConflictException("Không tìm thấy học vấn!"));

                if (!education.getFreelancer().getId().equals(freelancer.getId())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                        .body("Bạn không có quyền xóa học vấn này");
                }

                repositoryEducation.delete(education);
                return ResponseEntity.ok("Xóa học vấn thành công");
        }

}
