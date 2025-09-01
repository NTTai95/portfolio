package com.freelancer.utils.email;

import java.time.LocalDateTime;

public class ApplyNewEmailData implements EmailTemplateData {

    private String freelancerFullName;
    private String freelancerAvatar;
    private String jobTitle;
    private String jobDescription;
    private LocalDateTime createdAt;
    private String applyContent;
    private String bidAmount;
    private String estimatedHours;
    private String detailLink;

    @Override
    public String getTemplateName() {
        return "apply-new";
    }

    // Getters và Setters
    public String getFreelancerFullName() {
        return freelancerFullName;
    }

    public void setFreelancerFullName(String freelancerFullName) {
        this.freelancerFullName = freelancerFullName;
    }

    public String getFreelancerAvatar() {
        return freelancerAvatar;
    }

    public void setFreelancerAvatar(String freelancerAvatar) {
        this.freelancerAvatar = freelancerAvatar;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getApplyContent() {
        return applyContent;
    }

    public void setApplyContent(String applyContent) {
        this.applyContent = applyContent;
    }

    public String getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(String bidAmount) {
        this.bidAmount = bidAmount;
    }

    public String getEstimatedHours() {
        return estimatedHours;
    }

    public void setEstimatedHours(String estimatedHours) {
        this.estimatedHours = estimatedHours;
    }

    public String getDetailLink() {
        return detailLink;
    }

    public void setDetailLink(String detailLink) {
        this.detailLink = detailLink;
    }
}
