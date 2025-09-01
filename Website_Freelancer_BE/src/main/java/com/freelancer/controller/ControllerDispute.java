package com.freelancer.controller;

import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mysql.model.Dispute;
import com.freelancer.mysql.model.Employer;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Milestone;
import com.freelancer.mysql.model.Product;
import com.freelancer.mysql.model.Staff;
import com.freelancer.mysql.model.User;
import com.freelancer.mysql.repository.RepositoryDispute;
import com.freelancer.mysql.repository.RepositoryMilestone;
import com.freelancer.service.ServiceNotification;
import com.freelancer.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ControllerDispute {
    private final RepositoryMilestone repositoryMilestone;
    private final RepositoryDispute repositoryDispute;
    private final ServiceNotification serviceNotification;
    private final SecurityUtil securityUtil;

    @PostMapping("/milestone/{id}/dispute")
    public ResponseEntity<?> postDisputeMilestone(@PathVariable Integer id,
            @RequestBody Map<String, Object> req) {
        User user = securityUtil.getCurrentUser();
        Milestone milestone = repositoryMilestone.findById(id)
                .orElseThrow(() -> new DataConflictException("Milestone không tồn tại"));

        // Kiểm tra người dùng có quyền mở tranh chấp
        boolean isEmployer = user.getRole().getCode().equals("NHA_TUYEN_DUNG");
        boolean isFreelancer = user.getRole().getCode().equals("FREELANCER");

        if (!(isEmployer && milestone.getEmployer().getId().equals(user.getId()))
                && !(isFreelancer && milestone.getFreelancer().getId().equals(user.getId()))) {
            throw new DataConflictException("Bạn không có quyền mở tranh chấp cho milestone này");
        }

        // Kiểm tra trạng thái hiện tại
        if (milestone.getStatus() == Milestone.Status.DISPUTE) {
            throw new DataConflictException("Milestone đang trong trạng thái tranh chấp");
        }

        // Tạo tranh chấp
        Dispute dispute = new Dispute();
        dispute.setEmployerSues(isEmployer);
        dispute.setMilestone(milestone);
        dispute.setReason((String) req.get("reason"));
        dispute.setStatus(Dispute.Status.OPEN);
        repositoryDispute.save(dispute);

        // Cập nhật trạng thái milestone
        milestone.setStatus(Milestone.Status.DISPUTE);
        milestone.setDisputed(true);
        repositoryMilestone.save(milestone);

        // Gửi thông báo
        String openerName = isEmployer ? milestone.getEmployer().getFullName()
                : milestone.getFreelancer().getFullName();

        Integer receiverId =
                isEmployer ? milestone.getFreelancer().getId() : milestone.getEmployer().getId();

        serviceNotification.sendNoticationWithUserId(receiverId, "Tranh chấp",
                openerName + " đã mở tranh chấp với bạn. Lý do: " + dispute.getReason());

        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping("/admin/disputes")
    public ResponseEntity<?> getDisputesForTable(@RequestParam Integer page,
            @RequestParam Dispute.Status status) {

        int pageIndex = Math.max(page - 1, 0);

        Page<Map<String, Object>> res = repositoryDispute
                .findByStatus(status,
                        PageRequest.of(pageIndex, 10, Sort.by("createdAt").descending()))
                .map(this::mapDisputeForTable);

        return ResponseEntity.ok(res);
    }

    private Map<String, Object> mapDisputeForTable(Dispute d) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", d.getId());

        Map<String, Object> complainant = new LinkedHashMap<>();
        if (d.getEmployerSues()) {
            Employer e = d.getMilestone().getEmployer();
            complainant.put("id", e.getId());
            complainant.put("fullName", e.getFullName());
            complainant.put("avatar", e.getAvatar());
            complainant.put("isEmployer", true);
        } else {
            Freelancer f = d.getMilestone().getFreelancer();
            complainant.put("id", f.getId());
            complainant.put("fullName", f.getFullName());
            complainant.put("avatar", f.getAvatar());
            complainant.put("isEmployer", false);
        }
        map.put("complainant", complainant);

        map.put("createdAt", d.getCreatedAt());

        map.put("solver", d.getSolver() != null ? mapSolver(d.getSolver()) : null);
        map.put("resolvedAt", d.getResolvedAt());

        return map;
    }

    @PreAuthorize("hasRole('QUAN_TRI')")
    @GetMapping("/admin/disputes/{id}")
    public ResponseEntity<?> getDisputeDetail(@PathVariable Integer id) {
        Dispute d = repositoryDispute.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return ResponseEntity.ok(mapDisputeDetail(d));
    }

    private Map<String, Object> mapDisputeDetail(Dispute d) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", d.getId());
        map.put("isEmployer", d.getEmployerSues());
        map.put("resolution", d.getResolution());
        map.put("resolvedAt", d.getResolvedAt());
        map.put("status", d.getStatus());
        map.put("reason", d.getReason());
        map.put("solver", mapSolver(d.getSolver()));
        map.put("milestone", mapMilestone(d.getMilestone()));
        map.put("createdAt", d.getCreatedAt());
        return map;
    }


   
    private Map<String, Object> mapSolver(Staff solver) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", solver != null ? solver.getId() : null);
        map.put("fullName", solver != null ? solver.getFullName() : null);
        return map;
    }

    private Map<String, Object> mapMilestone(Milestone m) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", m.getId());
        map.put("content", m.getContent());
        map.put("createdAt", m.getCreatedAt());
        map.put("document", m.getDocument()); // url document
        map.put("employer", mapEmployer(m.getEmployer()));
        map.put("freelancer", mapFreelancer(m.getFreelancer()));
        map.put("endAt", m.getEndAt());
        map.put("fundedAt", m.getFundedAt());
        map.put("status", m.getStatus());
        map.put("bidAmount", m.getBidAmount());
        map.put("job", mapJob(m.getJob()));
        map.put("products", m.getProducts().stream().map(this::mapProduct).toList());
        return map;
    }

    private Map<String, Object> mapEmployer(Employer e) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", e != null ? e.getId() : null);
        map.put("fullName", e != null ? e.getFullName() : null);
        return map;
    }

    private Map<String, Object> mapFreelancer(Freelancer f) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", f != null ? f.getId() : null);
        map.put("fullName", f != null ? f.getFullName() : null);
        return map;
    }

    private Map<String, Object> mapJob(Job j) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", j.getId());
        map.put("title", j.getTitle());
        map.put("budget", j.getBudget());
        map.put("closedAt", j.getClosedAt());
        map.put("createdAt", j.getCreatedAt());
        map.put("description", j.getDescription());
        map.put("document", j.getDocument());
        map.put("durationHours", j.getDurationHours());
        map.put("postedAt", j.getPostedAt());
        map.put("status", j.getStatus());
        map.put("languages", j.getLanguages().stream().map(l -> {
            Map<String, Object> lang = new LinkedHashMap<>();
            lang.put("id", l.getId());
            lang.put("name", l.getName());
            lang.put("iso", l.getIso());
            return lang;
        }).toList());
        map.put("major",
                j.getMajor() != null
                        ? Map.of("id", j.getMajor().getId(), "name", j.getMajor().getName())
                        : null);
        map.put("skill", j.getSkills().stream().map(s -> {
            Map<String, Object> skill = new LinkedHashMap<>();
            skill.put("id", s.getId());
            skill.put("name", s.getName());
            return skill;
        }).toList());
        return map;
    }

    private Map<String, Object> mapProduct(Product p) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", p.getId());
        map.put("content", p.getContent()); // url content
        map.put("createdAt", p.getCreatedAt());
        map.put("description", p.getDescription());
        map.put("status", p.getStatus());
        return map;
    }
}
