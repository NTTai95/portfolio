package com.freelancer.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.freelancer.dto.requests.RequestPage;
import com.freelancer.dto.requests.RequestPage.PageBase.SortType;
import com.freelancer.dto.responses.ResponseRecord;
import com.freelancer.mysql.model.User;
import com.freelancer.mysql.repository.RepositoryApply;
import com.freelancer.mysql.repository.RepositoryClient;
import com.freelancer.mysql.repository.RepositoryJob;
import com.freelancer.mysql.repository.RepositoryLanguage;
import com.freelancer.mysql.repository.RepositoryMajor;
import com.freelancer.mysql.repository.RepositoryReview;
import com.freelancer.mysql.repository.RepositoryRole;
import com.freelancer.mysql.repository.RepositorySkill;
import com.freelancer.mysql.repository.RepositoryStaff;
import com.freelancer.service.mapper.DataToRecord;
import com.freelancer.utils.SecurityUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ServicePage {
    private final RepositorySkill repositorySkill;
    private final RepositoryMajor repositoryMajor;
    private final RepositoryLanguage repositoryLanguage;
    private final RepositoryRole repositoryRole;
    private final RepositoryJob repositoryJob;
    private final RepositoryClient repositoryClient;
    private final RepositoryStaff repositoryStaff;
    private final RepositoryApply repositoryApply;
    private final RepositoryReview repositoryReview;
    private final SecurityUtil securityUtil;

    public Page<ResponseRecord.Skill> skillPage(RequestPage.Skill req) {
        return repositorySkill.searchPageSkill(req.getKeyword(), req.getMajorId(), req.getStatus(),
                reqToPable(req)).map(DataToRecord::toSkill);
    }

    public Page<ResponseRecord.Major> majorPage(RequestPage.Major req) {
        return repositoryMajor.searchPageMajor(req.getKeyword(), req.getStatus(), reqToPable(req))
                .map(DataToRecord::toMajor);
    }

    public Page<ResponseRecord.Language> languagePage(RequestPage.Language req) {
        return repositoryLanguage
                .searchPageLanguage(req.getKeyword(), req.getStatus(), reqToPable(req))
                .map(DataToRecord::toLanguage);
    }

    public Page<ResponseRecord.Role> rolePage(RequestPage.Role req) {
        return repositoryRole.searchPageRole(req.getKeyword(), reqToPable(req))
                .map(DataToRecord::role);
    }

    public Page<ResponseRecord.Job> jobPage(RequestPage.Job req) {
        return repositoryJob.searchJobsPage(req.getKeyword(), req.getSkillIds(), req.getMinBudget(),
                req.getMaxBudget(), req.getMajorId(), req.getMaxDurationHours(), reqToPable(req))
                .map(DataToRecord::fromJob);
    }

    public Page<ResponseRecord.Client> clientPage(RequestPage.Cilent req) {
        return repositoryClient.searchClientPage(req.getKeyword(), req.getRoleId(), req.getStatus(),
                reqToPable(req)).map(DataToRecord::toClient);
    }

    public Page<ResponseRecord.Staff> staffPage(RequestPage.Cilent req) {
        return repositoryStaff.searchStaffPage(req.getKeyword(), req.getRoleId(), req.getStatus(),
                reqToPable(req)).map(DataToRecord::toStaff);
    }

    public Page<ResponseRecord.MeApplies> meAppliesPage(RequestPage.MeApplies req) {
        User user = securityUtil.getCurrentUser();
        return repositoryApply
                .searchPageApplies(user.getId(), req.getKeyword(), req.getStatus(), reqToPable(req))
                .map(DataToRecord::toMeApplies);
    }

    public Page<ResponseRecord.MeReviews> meReviewsPage(RequestPage.MeReviews req) {
        User user = securityUtil.getCurrentUser();
        return repositoryReview.searchPageReviews(user.getId(), req.getKeyword(), reqToPable(req))
                .map(DataToRecord::toMeReviews);
    }

    public Page<ResponseRecord.MeJobsInProgress> meJobsInProgressPage(
            RequestPage.MeJobsInProgress req) {
        User user = securityUtil.getCurrentUser();
        if (user.getRole().getCode().equals("FREELANCER")) {
            return repositoryJob.findAcceptedJobsByFreelancer(user.getId(), reqToPable(req))
                    .map(j -> DataToRecord.toMeJobsInProgress(j, true));
        } else {
            return repositoryJob.findAcceptedJobsByEmployer(user.getId(), reqToPable(req))
                    .map(j -> DataToRecord.toMeJobsInProgress(j, false));
        }
    }

    protected Pageable reqToPable(RequestPage.PageBase req) {
        Sort sort = Sort.by(req.getSortField() == null ? "id" : req.getSortField().name());
        sort = (req.getSortType() == SortType.desc || req.getSortType() == SortType.descend)
                ? sort.descending()
                : sort.ascending();
        return PageRequest.of(Math.max(0, req.getPage() - 1), req.getSize(), sort);
    }
}
