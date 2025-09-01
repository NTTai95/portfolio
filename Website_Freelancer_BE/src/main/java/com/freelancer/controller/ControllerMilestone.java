package com.freelancer.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.freelancer.dto.requests.InitPaymentRequest;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mogodb.document.HistoryPayment;
import com.freelancer.mogodb.repository.RepositoryHistoryPayment;
import com.freelancer.mysql.model.Apply;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Milestone;
import com.freelancer.mysql.model.Product;
import com.freelancer.mysql.model.User;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.mysql.repository.RepositoryMilestone;
import com.freelancer.service.ServiceChat;
import com.freelancer.service.ServiceFileStorage;
import com.freelancer.service.ServiceNotification;
import com.freelancer.service.ServiceVNPay;
import com.freelancer.utils.SecurityUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;



@RestController
@RequiredArgsConstructor
public class ControllerMilestone {
    private final RepositoryJob repositoryJob;
    private final RepositoryMilestone repositoryMilestone;
    private final ServiceNotification serviceNotification;
    private final SecurityUtil securityUtil;
    private final ServiceFileStorage serviceFileStorage;
    private final ServiceChat serviceChat;
    private final ServiceVNPay serviceVNPay;
    private final RepositoryHistoryPayment repositoryHistoryPayment;

    @PreAuthorize("hasAnyRole('FREELANCER', 'NHA_TUYEN_DUNG')")
    @GetMapping("/jobs/{jobId}/milestones")
    public ResponseEntity<?> getJobMilestones(@PathVariable Integer jobId) {
        User user = securityUtil.getCurrentUser();

        // Validate quyền sở hữu job
        Job job = repositoryJob.findById(jobId)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy công việc!"));

        boolean isEmployer = job.getEmployer().getId().equals(user.getId());

        boolean isAcceptedFreelancer =
                job.getApplies().stream().filter(a -> a.getStatus().equals(Apply.Status.ACCEPT))
                        .anyMatch(a -> a.getFreelancer().getId().equals(user.getId()));

        if (!isEmployer && !isAcceptedFreelancer) {
            throw new DataConflictException("Bạn không có quyền truy cập công việc này!");
        }

        Map<String, Object> res = new HashMap<>();

        // Thông tin cơ bản của job
        Map<String, Object> jobData = new HashMap<>();
        jobData.put("id", job.getId());
        jobData.put("title", job.getTitle());
        jobData.put("description", job.getDescription());
        jobData.put("status", job.getStatus());
        jobData.put("budget", job.getBudget());
        if (job.getApplies().stream().anyMatch(a -> a.getStatus().equals(Apply.Status.ACCEPT))) {
            jobData.put("totalProjectBudget",
                    job.getApplies().stream().filter(a -> a.getStatus().equals(Apply.Status.ACCEPT))
                            .findFirst()
                            .orElseThrow(
                                    () -> new DataConflictException("Không tìm thấy ứng tuyển"))
                            .getBidAmount());
        }
        res.put("job", jobData);
        res.put("employerId", job.getEmployer().getId());

        // Danh sách milestones
        List<Map<String, Object>> milestonesData =
                job.getMilestones().stream().filter(milestone -> {
                    if (isAcceptedFreelancer) {
                        return milestone.getStatus() != Milestone.Status.DRAFT;
                    }
                    return true;
                }).map(milestone -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id", milestone.getId());
                    m.put("status", milestone.getStatus());
                    m.put("percent", milestone.getPercent());
                    m.put("content", milestone.getContent());
                    m.put("startAt", milestone.getStartAt());
                    m.put("endAt", milestone.getEndAt());
                    m.put("isOverdue", milestone.getIsOverdue());
                    m.put("disputed", milestone.getDisputed());
                    m.put("createdAt", milestone.getCreatedAt());
                    m.put("fundedAt", milestone.getFundedAt());
                    m.put("document", milestone.getDocument());
                    m.put("bidAmount", milestone.getBidAmount());
                    m.put("totalProduct", milestone.getProducts().size());
                    m.put("totalDisputes", milestone.getDisputes().size());

                    boolean canDispute = milestone.getProducts().stream()
                            .anyMatch(p -> p.getStatus() == Product.Status.REJECTED)
                            && milestone.getProducts().stream()
                                    .noneMatch(p -> p.getStatus() == Product.Status.ACCEPT);

                    m.put("canDispute", canDispute);
                    return m;
                }).collect(Collectors.toList());

        res.put("milestones", milestonesData);

        // Thống kê tổng quan
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalMilestones", milestonesData.size());
        summary.put("completedMilestones", milestonesData.stream().mapToLong(
                m -> "DONE".equals(((Map<String, Object>) m).get("status").toString()) ? 1 : 0)
                .sum());
        summary.put("inProgressMilestones", milestonesData.stream().mapToLong(
                m -> "DOING".equals(((Map<String, Object>) m).get("status").toString()) ? 1 : 0)
                .sum());
        summary.put("overdueMilestones", milestonesData.stream().mapToLong(
                m -> Boolean.TRUE.equals(((Map<String, Object>) m).get("isOverdue")) ? 1 : 0)
                .sum());
        summary.put("disputedMilestones",
                milestonesData.stream().mapToLong(
                        m -> Boolean.TRUE.equals(((Map<String, Object>) m).get("disputed")) ? 1 : 0)
                        .sum());
        res.put("summary", summary);

        // Trả về kết quả
        return ResponseEntity.ok(res);
    }

    // @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    // @GetMapping("/jobs/{jobId}/milestones/{milestoneId}")
    // public ResponseEntity<?> getMilestoneDetail(@PathVariable Integer jobId,
    // @PathVariable Integer milestoneId) {
    // Integer employerId = securityUtil.getCurrentUser().getId();

    // // Validate quyền sở hữu job
    // Job job = repositoryJob.findById(jobId)
    // .orElseThrow(() -> new DataConflictException("Không tìm thấy công việc!"));
    // if (!job.getEmployer().getId().equals(employerId)) {
    // throw new DataConflictException("Bạn không có quyền truy cập công việc này!");
    // }

    // // Validate milestone thuộc về job
    // Milestone milestone = repositoryMilestone.findById(milestoneId)
    // .orElseThrow(() -> new DataConflictException("Không tìm thấy milestone!"));
    // if (!milestone.getJob().getId().equals(jobId)) {
    // throw new DataConflictException("Milestone không thuộc về công việc này!");
    // }

    // Map<String, Object> res = new HashMap<>();

    // // Thông tin giai đoạn
    // Map<String, Object> milestoneData = new HashMap<>();
    // milestoneData.put("id", milestone.getId());
    // milestoneData.put("status", milestone.getStatus());
    // milestoneData.put("percent", milestone.getPercent());
    // milestoneData.put("content", milestone.getContent());
    // milestoneData.put("startAt", milestone.getStartAt());
    // milestoneData.put("endAt", milestone.getEndAt());
    // milestoneData.put("isOverdue", milestone.getIsOverdue());
    // milestoneData.put("disputed", milestone.getDisputed());
    // milestoneData.put("fundedAt", milestone.getFundedAt());
    // milestoneData.put("disburseAt", milestone.getDisburseAt());
    // res.put("milestone", milestoneData);

    // // Thông tin freelancer
    // Map<String, Object> freelancerData = new HashMap<>();
    // freelancerData.put("id", milestone.getFreelancer().getId());
    // freelancerData.put("fullName", milestone.getFreelancer().getFullName());
    // freelancerData.put("avatar", milestone.getFreelancer().getAvatar());
    // freelancerData.put("reputation", milestone.getFreelancer().getReputation());
    // res.put("freelancer", freelancerData);

    // // Thông tin công việc
    // Map<String, Object> jobData = new HashMap<>();
    // jobData.put("id", job.getId());
    // jobData.put("title", job.getTitle());
    // jobData.put("description", job.getDescription());
    // res.put("job", jobData);

    // // Sản phẩm bàn giao
    // List<Map<String, Object>> products = milestone.getProducts().stream().map(product -> {
    // Map<String, Object> p = new HashMap<>();
    // p.put("id", product.getId());
    // p.put("content", product.getContent());
    // p.put("description", product.getDescription());
    // p.put("status", product.getStatus());
    // p.put("createdAt", product.getCreatedAt());
    // return p;
    // }).collect(Collectors.toList());
    // res.put("products", products);

    // // Tranh chấp (nếu có)
    // List<Map<String, Object>> disputes = milestone.getDisputes().stream().map(dispute -> {
    // Map<String, Object> d = new HashMap<>();
    // d.put("id", dispute.getId());
    // d.put("status", dispute.getStatus());
    // d.put("reason", dispute.getReason());
    // d.put("resolution", dispute.getResolution());
    // d.put("employerSues", dispute.getEmployerSues());
    // d.put("createdAt", dispute.getCreatedAt());
    // d.put("resolvedAt", dispute.getResolvedAt());
    // return d;
    // }).collect(Collectors.toList());
    // res.put("disputes", disputes);

    // // Trả về kết quả
    // return ResponseEntity.ok(res);
    // }

    @PutMapping(value = "/milestones/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> putMilestone(@PathVariable Integer id,
            @RequestParam Map<String, Object> req,
            @RequestParam(required = false) MultipartFile attachments) {

        try {
            Milestone milestone = repositoryMilestone.findById(id)
                    .orElseThrow(() -> new DataConflictException("Không tìm thấy giai đoạn!"));

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
            milestone.setContent((String) req.get("content"));
            milestone.setStartAt(LocalDateTime.parse((String) req.get("startAt"), formatter));
            milestone.setEndAt(LocalDateTime.parse((String) req.get("endAt"), formatter));

            if (attachments != null) {
                milestone.setDocument(serviceFileStorage.uploadFileWithName(attachments,
                        "milestone-" + milestone.getId()));
            }

            repositoryMilestone.save(milestone);

            return ResponseEntity.ok("Cập nhật giai đoạn thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            throw new DataConflictException("Có lỗi xảy ra khi cập nhật giai đoạn!");
        }
    }

    @PostMapping(value = "/milestones/{id}/split", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> postMilestoneSplit(@PathVariable Integer id,
            @RequestParam Map<String, Object> req,
            @RequestParam(required = false) MultipartFile files) {
        try {

            Milestone milestone = repositoryMilestone.findById(id)
                    .orElseThrow(() -> new DataConflictException("Không tìm thấy giai đoạn!"));

            Object percentObj = req.get("percent");
            if (percentObj == null) {
                throw new DataConflictException("Phần trăm không được để trống!");
            }

            int percent;
            if (percentObj instanceof Number) {
                percent = ((Number) percentObj).intValue();
            } else {
                try {
                    percent = Integer.parseInt(percentObj.toString());
                } catch (NumberFormatException e) {
                    throw new DataConflictException("Phần trăm không hợp lệ!");
                }
            }

            if (percent < 0 || percent > 100 || percent >= milestone.getPercent()) {
                throw new DataConflictException("Phần trăm không hợp lệ!");
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

            int totalBidAmount =
                    (int) (milestone.getBidAmount() / (milestone.getPercent().floatValue() / 100));

            int newBidAmount = Math.round((totalBidAmount * (((float) percent) / 100)));

            byte newPercent = (byte) (milestone.getPercent() - percent);

            int bidAmount = Math.round((totalBidAmount * (((float) newPercent) / 100)));


            if (newBidAmount < 10000 || bidAmount < 10000) {
                throw new DataConflictException("Số tiền không hợp lệ!");
            }

            Milestone newMilestone = new Milestone();
            newMilestone.setEmployer(milestone.getEmployer());
            newMilestone.setFreelancer(milestone.getFreelancer());
            newMilestone.setContent((String) req.get("content"));
            newMilestone.setStartAt(LocalDateTime.parse((String) req.get("startAt"), formatter));
            newMilestone.setEndAt(LocalDateTime.parse((String) req.get("endAt"), formatter));
            newMilestone.setPercent((byte) percent);
            newMilestone.setStatus(Milestone.Status.DRAFT);
            newMilestone.setJob(milestone.getJob());
            newMilestone.setBidAmount(newBidAmount);

            if (files != null) {
                newMilestone.setDocument(serviceFileStorage.uploadFileWithName(files,
                        "milestone-" + newMilestone.getId()));
            }

            repositoryMilestone.save(newMilestone);

            milestone.setPercent(newPercent);
            milestone.setBidAmount(bidAmount);
            repositoryMilestone.save(milestone);

            return ResponseEntity.ok("Tạo giai đoạn thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            throw new DataConflictException("Có lỗi xảy ra khi tạo giai đoạn!");
        }
    }

    @DeleteMapping("/milestones/{id}/transfer-to-milestone/{newId}")
    public ResponseEntity<?> deleteMilestoneTransferToMilestone(@PathVariable Integer id,
            @PathVariable Integer newId) {
        Milestone milestone = repositoryMilestone.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy giai đoạn!"));
        Milestone newMilestone = repositoryMilestone.findById(newId)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy giai đoạn!"));

        if (milestone.getJob().getId() != newMilestone.getJob().getId()) {
            throw new DataConflictException("Giai đoạn không thuộc công việc!");
        }

        Byte totalPercent = (byte) (newMilestone.getPercent() + milestone.getPercent());
        Integer totalBidAmount = (newMilestone.getBidAmount() + milestone.getBidAmount());

        newMilestone.setPercent(totalPercent);
        newMilestone.setBidAmount(totalBidAmount);
        repositoryMilestone.save(newMilestone);
        repositoryMilestone.delete(milestone);
        return ResponseEntity.ok("Chuyển giai đoạn thành công!");
    }

    @Transactional
    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PutMapping("/jobs/{id}/send-freelancer")
    public ResponseEntity<?> putSendFreelancer(@PathVariable Integer id) {
        Job job = repositoryJob.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy công việc!"));
        if (!job.getStatus().equals(Job.Status.PREPARING)) {
            throw new DataConflictException("Công việc không thể gửi nhà tuyển dụng!");
        }

        boolean allDraft = job.getMilestones().stream()
                .allMatch(m -> m.getStatus().equals(Milestone.Status.DRAFT));

        boolean allRejected = job.getMilestones().stream()
                .allMatch(m -> m.getStatus().equals(Milestone.Status.REJECTED));

        if (!(allDraft || allRejected)) {
            throw new DataConflictException("Công việc không thể gửi nhà tuyển dụng!");
        }

        job.getMilestones().forEach(m -> {
            m.setStatus(Milestone.Status.PENDING);
            repositoryMilestone.save(m);
        });

        Freelancer freelancer = job.getMilestones().get(0).getFreelancer();

        serviceNotification.sendNoticationWithUserId(freelancer.getId(), "Danh sách giai đoạn",
                job.getEmployer().getFullName() + " đã gửi danh sách giai đoạn cho công việc '"
                        + job.getTitle() + "'");

        return ResponseEntity.ok("Gửi nhà tuyển dụng thành công!");
    }

    @PreAuthorize("hasRole('FREELANCER')")
    @PutMapping("jobs/{id}/reject-milestone")
    public ResponseEntity<?> putRejectMilestone(@PathVariable Integer id,
            @RequestBody Map<String, Object> req) {
        User user = securityUtil.getCurrentUser();

        Job job = repositoryJob.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy công việc!"));

        if (!job.getStatus().equals(Job.Status.PREPARING)) {
            throw new DataConflictException("Công việc không thể từ chối giai đoạn!");
        }

        if (!job.getMilestones().stream()
                .allMatch(m -> m.getStatus().equals(Milestone.Status.PENDING))) {
            throw new DataConflictException("Công việc không thể từ chối giai đoạn!");
        }

        if (!job.getApplies().stream().filter(a -> a.getStatus().equals(Apply.Status.ACCEPT))
                .allMatch(a -> a.getFreelancer().getId().equals(user.getId()))) {
            throw new DataConflictException("Công việc không thể từ chối giai đoạn!");
        }

        job.getMilestones().forEach(m -> {
            m.setStatus(Milestone.Status.REJECTED);
            repositoryMilestone.save(m);
        });

        serviceNotification.sendNoticationWithUserId(job.getEmployer().getId(), "Từ chối giai đoạn",
                user.getFullName() + " đã từ chối giai đoạn công việc '" + job.getTitle() + "'");
        String reason = (String) req.get("reason");
        if (reason != null) {
            serviceChat.sendMessage(user.getId(), job.getEmployer().getId(), reason);
        }

        return ResponseEntity.ok("Từ chối giai đoạn thành công!");
    }

    @PreAuthorize("hasRole('FREELANCER')")
    @PutMapping("jobs/{id}/accept-milestone")
    public ResponseEntity<?> putAcceptMilestone(@PathVariable Integer id) {
        User user = securityUtil.getCurrentUser();
        Job job = repositoryJob.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy công việc!"));

        if (!job.getStatus().equals(Job.Status.PREPARING)) {
            throw new DataConflictException("Công việc không thể từ chối giai đoạn!");
        }

        if (!job.getMilestones().stream()
                .allMatch(m -> m.getStatus().equals(Milestone.Status.PENDING))) {
            throw new DataConflictException("Công việc không thể từ chối giai đoạn!");
        }

        if (!job.getApplies().stream().filter(a -> a.getStatus().equals(Apply.Status.ACCEPT))
                .allMatch(a -> a.getFreelancer().getId().equals(user.getId()))) {
            throw new DataConflictException("Công việc không thể từ chối giai đoạn!");
        }

        serviceNotification.sendNoticationWithUserId(job.getEmployer().getId(),
                "Chấp nhận giai đoạn",
                user.getFullName() + " đã chấp nhận giai đoạn công việc '" + job.getTitle() + "'");

        job.setStatus(Job.Status.IN_PROGRESS);
        repositoryJob.save(job);

        job.getMilestones().stream().forEach(m -> {
            m.setStatus(Milestone.Status.UNPAID);
            repositoryMilestone.save(m);
        });

        return ResponseEntity.ok("Chấp nhận giai đoạn thành công!");
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @PostMapping("/payment-milestone/{id}")
    public ResponseEntity<Map<String, String>> postPaymentMilestone(@PathVariable Integer id,
            @RequestBody Map<String, Object> req, HttpServletRequest httpRequest) {
        // Lấy user hiện tại
        User user = securityUtil.getCurrentUser();

        // Tìm milestone
        Milestone milestone = repositoryMilestone.findById(id)
                .orElseThrow(() -> new DataConflictException("Không tìm thấy giai đoạn!"));

        // Kiểm tra quyền và trạng thái
        if (!milestone.getEmployer().getId().equals(user.getId())) {
            throw new DataConflictException("Giai đoạn không thể thanh toán!");
        }
        if (!milestone.getStatus().equals(Milestone.Status.UNPAID)) {
            throw new DataConflictException("Giai đoạn không thể thanh toán!");
        }

        // Build InitPaymentRequest
        InitPaymentRequest payRequest =
                InitPaymentRequest.builder().requestId(UUID.randomUUID().toString())
                        .userId(user.getId()).ipAddress(httpRequest.getRemoteAddr())
                        .txnRef("MS" + milestone.getId() + "-" + System.currentTimeMillis())
                        .amount(milestone.getBidAmount().longValue())
                        .returnUrl((String) req.get("urlReturn")).build();

        // Gọi service Khởi tạo URL VNPAY
        String paymentUrl = serviceVNPay.init(payRequest);

        // Trả về cho FE
        Map<String, String> responseBody = Map.of("url", paymentUrl);
        return ResponseEntity.ok(responseBody);
    }

    @PreAuthorize("hasRole('NHA_TUYEN_DUNG')")
    @GetMapping("/payment-milestone/{id}")
    public ResponseEntity<?> getPaymentMilestone(@PathVariable Integer id) {
        try {
            Thread.sleep(3000);

            User user = securityUtil.getCurrentUser();

            HistoryPayment historyPayment = repositoryHistoryPayment
                    .findByUserIdAndMilestoneId(user.getId(), id)
                    .orElseThrow(() -> new DataConflictException("Chưa thanh toán giai đoạn!"));

            return ResponseEntity.ok(historyPayment);

        } catch (InterruptedException e) {
            e.printStackTrace();
            throw new DataConflictException("Lỗi hệ thống!");
        }
    }
}
