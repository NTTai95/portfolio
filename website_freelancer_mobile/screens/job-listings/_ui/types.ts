// type.ts
export const STATUSES = [
    'DRAFT',
    'PUBLIC',
    'PRIVATE',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELED',
] as const;

export type JobStatus = typeof STATUSES[number];

export interface JobListing {
    id: string;
    title: string;
    budget: number;
    bidAmount?: number;
    createdAt: string;
    postedAt?: string;
    description: string;
    status: JobStatus;
    closedAt?: string;
    durationHours: number;
    estimatedHours?: number;
    document?: string;
    employerAvatar?: string;
    employerFullName?: string;
    employerId?: number;
    employerEmail?: string;
    freelancerId?: string;
    // Thêm các trường mới từ BE
    countMilestones: number;
    milestoneStatusCounts: Record<string, number>;
    countApplicants: number;
}

export interface ApiResponse {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    jobs: JobListing[];
}