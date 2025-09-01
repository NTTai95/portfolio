import { Status } from "../status";

export namespace ResponseDetail {
  export interface MeAdmin {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    joinedAt: string;
    birthday: string;
  }

  export interface MeClient {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    isMale: boolean;
    avatar: string;
    joinedAt: string;
    requtation: number;
    birthday: string;
  }

  export interface Job {
    id: number;
    employerAvatar: string;
    employerFullName: string;
    employerAge: number;
    isMale: boolean;
    employerReputation: number;
    title: string;
    description: string;
    countApplies: number;
    budget: number;
    durationHours: number;
    postedAt: string;
    closedAt: string;
    document: string;
    skillsName: string[]; // hoặc { id: number; name: string }[] nếu BE trả như vậy
    languagesName: string[];
    majorName: string;
  }

  export interface Client {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    birthday: string;
    joinedAt: string;
    avatar: string;
    isMale: boolean;
    bio: string;
    status: Status.User;
    role: Role;
    reputation: number;
  }

  export interface Employer extends Client { }

  export interface Freelancer extends Client {
    balance: number;
    scoreReview: number;
    completedJobs: number;
    totalEarnings: number;
    successRate: number;
    certifications: Certification[];
    educations: Education[];
    skills: Skill[];
    languages: Language[];
  }

  export interface Certification {
    id: number;
    name: string;
    issueBy: string;
    issueDate: string;
    expiryDate: string;
    link: string;
    frontImage: string;
    backImage: string;
    status: Status.Certification;
  }

  export interface Language {
    id: number;
    name: string;
    iso: string;
    status: Status.Language;
  }

  export interface Education {
    id: number;
    schoolName: string;
    degree: string;
    major: string;
    gpa: number;
    startDate: string;
    endDate: string;
    description: string;
  }

  export interface Skill {
    id: number;
    name: string;
    description: string;
    status: Status.Skill;
  }

  export interface Major {
    id: number;
    name: string;
    description: string;
    status: Status.Major;
  }

  export interface Role {
    id: number;
    name: string;
    description: string;
  }

  export interface EmployerProfile {
    id: number;
    avatar: string;
    fullName: string;
    birthday: string;
    age: number;
    isMale: boolean;
    joinedAt: string;
    email: string;
    phone: string;
    reputation: number;
    bio: string;
    activeJobs: ActiveJob[];
    topReviews: EmployerReview[];
    totalJobs: number;
    totalActiveJobs: number;
    totalCompletedJobs: number;
    totalReviews: number;
    averageRating: number;
  }

  export interface ActiveJob {
    id: number;
    title: string;
    budget: number;
    durationHours: number;
    postedAt: string;
    closedAt: string;
    countApplies: number;
    majorName: string;
    skills: string[];
  }

  export interface EmployerReview {
    id: number;
    freelancerAvatar: string;
    freelancerName: string;
    freelancerReputation: number;
    jobTitle: string;
    jobCompletedAt: string;
    rating: number;
    content: string;
    actualBudget: number;
  }

  export interface JobApplies {
    job: {
      id: number;
      title: string;
      description: string;
      budget: number;
      durationHours: number;
      status: string;
      step: number;
      createdAt: string;
      postedAt: string;
      closedAt: string;
      document: string;
      major: {
        id: number;
        name: string;
      };
      skills: Array<{
        id: number;
        name: string;
      }>;
      languages: Array<{
        id: number;
        name: string;
        iso: string;
      }>;
    };
    totalApplies: number;
    pendingApplies: number;
    acceptedApplies: number;
    rejectedApplies: number;
    applies: Array<{
      id: number;
      content: string;
      bidAmount: number;
      estimatedHours: number;
      status: 'PENDING' | 'ACCEPT' | 'REJECTED';
      createdAt: string;
      freelancer: {
        id: number;
        fullName: string;
        avatar: string;
        reputation: number;
        email: string;
      };
    }>;
    // Auto reject thông tin
    autoRejectedOnLoad?: boolean;
    autoRejectedCount?: number;
    autoRejectMessage?: string;
  }

  export interface MilestoneDetailResponse {
    milestone: {
      id: number;
      status: string;
      percent: number;
      content: string;
      startAt: string;
      endAt: string;
      isOverdue: boolean;
      disputed: boolean;
      fundedAt?: string;
      disburseAt?: string;
    };
    freelancer: {
      id: number;
      fullName: string;
      avatar: string;
      reputation: number;
    };
    job: {
      id: number;
      title: string;
      description: string;
    };
    products: Array<{
      id: number;
      content: string;
      description: string;
      status: string;
      createdAt: string;
    }>;
    disputes: Array<{
      id: number;
      status: string;
      reason: string;
      resolution: string;
      employerSues: boolean;
      createdAt: string;
      resolvedAt?: string;
    }>;
  }

  export interface MilestoneListResponse {
    job: {
      id: number;
      title: string;
      description: string;
      status: string;
      budget: number;
    };
    milestones: Array<{
      id: number;
      status: string;
      percent: number;
      content: string;
      startAt: string;
      endAt: string;
      isOverdue: boolean;
      disputed: boolean;
      createdAt: string;
      freelancer: {
        id: number;
        fullName: string;
        avatar: string;
      };
      totalProducts: number;
      pendingProducts: number;
      totalDisputes: number;
    }>;
    summary: {
      totalMilestones: number;
      completedMilestones: number;
      inProgressMilestones: number;
      overdueMilestones: number;
      disputedMilestones: number;
    };
  }

  export interface FreelancerSearchResponse {
    freelancers: Array<{
      id: number;
      fullName: string;
      avatar: string;
      reputation: number;
      bio: string;
      joinedAt: string;
      skills: string[];
      languages: string[];
      totalReviews: number;
      totalCompletedJobs: number;
    }>;
    currentPage: number;
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }

  export interface SelectFreelancerResponse {
    message: string;
    success: boolean;
    url: string;
  }
}
