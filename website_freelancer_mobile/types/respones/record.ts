import { Status } from "../status";

export namespace ResponseRecord {
  export interface ReportJobPost {
    id: number;
    title: string;
    content: string;
    dateReport: string;
    status: string;
    reporter: string;
  }

  export interface Skill {
    id: number;
    name: string;
    description: string;
    status: Status.Skill;
    createdAt: string;
    majorName: string;
  }

  export interface Major {
    id: number;
    name: string;
    description: string;
    status: Status.Major;
    createdAt: string;
    skillCount: number;
  }

  export interface Language {
    id: number;
    name: string;
    iso: string;
    status: Status.Language;
    createdAt: string;
  }

  export interface Staff {
    id: number;
    fullName: string;
    email: string;
    status: Status.User;
    role: {
      id: number;
      name: string;
      code: string;
    };
    joinedAt: string;
    birthday: string;
  }

  export interface Client extends Staff {
    avatar: string;
    isMale: boolean;
  }

  export interface Role {
    id: number;
    name: string;
    code: string;
    description: string;
    countUsers: number;
  }

  export interface Job {
    id: number;
    employerId: number;
    employerAvatar: string;
    employerFullName: string;
    title: string;
    description: string;
    budget: number;
    postedAt: string;
    closedAt: string;
    durationHours: number;
    countApplies: number;
    skills: { id: number; name: string }[];
    languages: { id: number; name: string }[];
    major: { id: number; name: string };
  }

  export interface EmployerJob {
    id: number;
    title: string;
    budget: number;
    status: string;
    postedAt: string;
    majorName: string;
  }

  export interface EmployerReview {
    id: number;
    employerContent: string;
    employerRating: number;
    createdAt: string;
    freelancerName: string;
    jobTitle: string;
  }

  export interface EmployerMilestone {
    id: number;
    content: string;
    status: string;
    percent: number;
    disputed: boolean;
    isOverdue: boolean;
    startAt: string;
    endAt: string;
    document: string;
    jobTitle: string;
    freelancerName: string;
  }

  export interface EmployerContact {
    id: number;
    title: string;
    content: string;
    status: string;
    createdAt: string;
  }

  export interface MeApplies {
    id: number;
    jobId: number;
    jobTitle: string;
    createdAt: string;
    jobBudget: number;
    bidAmount: number;
    jobDurationHours: number;
    estimatedHours: number;
    status: Status.Apply;
  }

  export interface MeReviews {
    id: number;
    meContent: string;
    meRating: number;
    partnerContent: string;
    partnerRating: number;
    jobId: number;
    jobTitle: string;
    partnerFullName: string;
    partnerId: number;
  }

  export interface MeJobsInProgress {
    id: number;
    title: string;
    budget: number;
    postedAt: string;
    closedAt: string;
    durationHours: number;
    skills: { id: number; name: string }[];
    languages: { id: number; name: string }[];
    major: { id: number; name: string };
    partnerAvatar: string;
    partnerFullName: string;
    statusMilestones: Status.Milestone[];
  }
}
