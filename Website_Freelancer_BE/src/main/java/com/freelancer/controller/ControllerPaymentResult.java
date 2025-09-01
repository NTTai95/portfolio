package com.freelancer.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.freelancer.exceptions.DataConflictException;
import com.freelancer.mogodb.document.HistoryPayment;
import com.freelancer.mogodb.repository.RepositoryHistoryPayment;
import com.freelancer.mysql.model.Milestone;
import com.freelancer.mysql.repository.RepositoryMilestone;
import com.freelancer.service.ServiceNotification;
import com.freelancer.service.ServiceVNPay;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class ControllerPaymentResult {
    private final RepositoryMilestone repositoryMilestone;
    private final ServiceVNPay serviceVNPay;
    private final RepositoryHistoryPayment repositoryHistoryPayment;
    private final ServiceNotification serviceNotification;

    /**
     * Endpoint FE gọi khi VNPAY redirect về: nhận tất cả param query dưới dạng JSON.
     */
    @Transactional
    @GetMapping("/result")
    public ResponseEntity<?> handlePaymentResult(@RequestParam Map<String, String> params) {
        if (params == null || params.isEmpty()) {
            throw new DataConflictException("Không nhận được dữ liệu thanh toán!");
        }

        params.forEach((k, v) -> System.out.println(k + "=" + v));

        Map<String, String> safeParams = new HashMap<>(params);

        if (!serviceVNPay.verifyIpn(safeParams)) {
            throw new DataConflictException("Invalid secure hash");
        }

        String txnRef = safeParams.get("vnp_TxnRef");
        String status = safeParams.get("vnp_TransactionStatus");
        String responseCode = safeParams.get("vnp_ResponseCode");

        if (!"00".equals(status) || !"00".equals(responseCode)) {
            throw new DataConflictException("Thanh toán thất bại");
        }

        if (txnRef != null && txnRef.startsWith("MS")) {

            txnRef = txnRef.replace("MS", "");

            int index = txnRef.indexOf("-");

            String idPart = txnRef.substring(0, index);

            int milestoneId = Integer.parseInt(idPart);

            Milestone milestone = repositoryMilestone.findById(milestoneId)
                    .orElseThrow(() -> new DataConflictException("Không tìm thấy giai đoạn!"));

            if (repositoryHistoryPayment.existsByFeeAndMilestoneIdAndUserId(
                    milestone.getBidAmount(), milestone.getId(), milestone.getEmployer().getId())) {
                throw new DataConflictException("Bạn đã tài trợ giai đoạn này rồi!");
            }

            milestone.setStatus(Milestone.Status.DOING);
            milestone.setFundedAt(LocalDateTime.now());
            repositoryMilestone.save(milestone);

            HistoryPayment historyPayment = new HistoryPayment();
            historyPayment.setCreatedAt(System.currentTimeMillis());
            historyPayment.setFee(milestone.getBidAmount());
            historyPayment.setMilestoneId(milestoneId);
            historyPayment.setUserId(milestone.getEmployer().getId());

            repositoryHistoryPayment.save(historyPayment);

            serviceNotification.sendNoticationWithUserId(milestone.getFreelancer().getId(),
                    "Tài trợ giai đoạn", "Nhà tuyển dụng đã tài trợ giai đoạn của công việc "
                            + milestone.getJob().getTitle());
        }

        return ResponseEntity
                .ok(Map.of("message", "Bạn đã thanh toán thành công!", "success", true));
    }
}
