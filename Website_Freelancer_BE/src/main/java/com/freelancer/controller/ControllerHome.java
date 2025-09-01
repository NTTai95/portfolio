package com.freelancer.controller;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.LongSummaryStatistics;
import java.util.Map;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.mysql.model.Apply;
import com.freelancer.mysql.model.Freelancer;
import com.freelancer.mysql.model.Job;
import com.freelancer.mysql.model.Major;
import com.freelancer.mysql.repository.RepositoryEmployer;
import com.freelancer.mysql.repository.RepositoryFreelancer;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.mysql.repository.RepositoryMajor;
import com.freelancer.mysql.repository.RepositoryReview;
import lombok.RequiredArgsConstructor;



@RestController
@RequiredArgsConstructor
public class ControllerHome {
    private final RepositoryMajor repositoryMajor;
    private final RepositoryFreelancer repositoryFreelancer;
    private final RepositoryJob repositoryJob;
    private final RepositoryEmployer repositoryEmployer;
    private final RepositoryReview repositoryReview;

    @GetMapping("/top-8-major")
    public ResponseEntity<?> mostMajor() {
        List<Major> majors = repositoryMajor.findTop8ByJobCount(PageRequest.of(0, 8));
        List<Map<String, Object>> res = new ArrayList<>();

        for (Major major : majors) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", major.getId());
            map.put("name", major.getName());
            map.put("description", major.getDescription());
            map.put("countSkill", major.getSkills().size());
            map.put("countJob", major.getJobs().size());
            res.add(map);
        }

        return ResponseEntity.ok(res);
    }

    @GetMapping("/top-5-freelancer")
    public ResponseEntity<?> getMethodName() {
        List<Freelancer> freelancers =
                repositoryFreelancer.findTop5ByReputation(PageRequest.of(0, 5));

        List<Map<String, Object>> res = new ArrayList<>();

        int index = 1;
        for (Freelancer freelancer : freelancers) {
            Map<String, Object> map = new HashMap<>();
            map.put("rank", index++);
            map.put("id", freelancer.getId());
            map.put("avatar", freelancer.getAvatar());
            map.put("fullName", freelancer.getFullName());
            Integer totalReviews = freelancer.getReviews().stream()
                    .map((r) -> r.getEmployerRating()).reduce(0, Integer::sum);
            map.put("scoreReview", totalReviews / freelancer.getReviews().size());
            map.put("totalReviews", freelancer.getReviews().size());
            map.put("skills", freelancer.getSkills().stream().map(s -> s.getName()));
            map.put("countJobs", freelancer.getApplies().stream()
                    .filter(a -> a.getStatus().equals(Apply.Status.ACCEPT))
                    .filter(a -> a.getJob().getStatus().equals(Job.Status.COMPLETED)).count());
            map.put("workingHours",
                    freelancer.getApplies().stream()
                            .filter(a -> a.getStatus().equals(Apply.Status.ACCEPT))
                            .map(a -> a.getEstimatedHours()).reduce(0, Integer::sum));

            LongSummaryStatistics stats = freelancer.getApplies().stream()
                    .filter(a -> a.getStatus().equals(Apply.Status.ACCEPT))
                    .mapToLong(Apply::getBidAmount).summaryStatistics();

            long avgIncome = stats.getCount() == 0 ? 0 : (long) stats.getAverage();
            map.put("income", avgIncome);

            map.put("latestReview", freelancer.getReviews().stream()
                    .min((r1, r2) -> r1.getCreatedAt().compareTo(r2.getCreatedAt())).map(r -> {
                        Map<String, Object> mapReview = new HashMap<>();
                        mapReview.put("id", r.getId());
                        mapReview.put("content", r.getEmployerContent());
                        mapReview.put("createdAt", r.getCreatedAt());
                        mapReview.put("rating", r.getEmployerRating());
                        return mapReview;
                    }));
            res.add(map);
        }

        return ResponseEntity.ok(res);
    }

    @GetMapping("/website/meta")
    public ResponseEntity<?> getWebsiteMeta() {
        Map<String, Object> res = new HashMap<>();

        Object[] row = (Object[]) repositoryReview.getSatisfactionStats();
        long total = row[0] == null ? 0 : ((Number) row[0]).longValue();
        long positive = row[1] == null ? 0 : ((Number) row[1]).longValue();
        long totalFreelancerRateHight = row[2] == null ? 0 : ((Number) row[2]).longValue();
        long totalEmployerRateHight = row[3] == null ? 0 : ((Number) row[3]).longValue();
        long totalFreelancerRate = row[4] == null ? 0 : ((Number) row[4]).longValue();
        long totalEmployerRate = row[5] == null ? 0 : ((Number) row[5]).longValue();

        long totalFreelancer = repositoryFreelancer.count();
        long totalEmployer = repositoryEmployer.count();
        long totalJob = repositoryJob.countByStatus(Job.Status.PUBLIC);

        float satisfactionRate = (total == 0) ? 0 : round(((float) positive / (float) total) * 100);

        float rateFreelancer = (totalFreelancer == 0) ? 0
                : round(((float) totalFreelancerRateHight / (float) totalFreelancerRate) * 100);

        float rateEmployer = (totalEmployer == 0) ? 0
                : round(((float) totalEmployerRateHight / (float) totalEmployerRate) * 100);

        res.put("totalJobs", totalJob);
        res.put("totalFreelancer", totalFreelancer);
        res.put("totalEmployer", totalEmployer);

        res.put("satisfactionRate", satisfactionRate);
        res.put("rateFreelancer", rateFreelancer);
        res.put("rateEmployer", rateEmployer);

        return ResponseEntity.ok(res);
    }

    private float round(float value) {
        return new BigDecimal(value).setScale(2, RoundingMode.HALF_UP).floatValue();
    }


}
