export namespace RequestForm {
    export interface Certification {
        name: string;
        issueBy: string;
        issueDate?: string;
        expiryDate?: string;
        link?: string;
        frontImage?: File;
        backImage?: File;
    }

    export interface Contact {
        title: string;
        content: string;
    }

    export interface Education {
        shoolName: string;
        degree: string;
        major: string;
        gpa: number;
        startDate: string;
        endDate: string;
        description?: string;
    }

    export interface Report {
        title: string;
        content: string;
        reportId: number;
    }

    export interface RequestPayment {
        amount: number;
    }

    export interface Register {
        fullName: string;
        email: string;
        password: string;
        isMale: boolean;
        birthday: string;
    }

    export interface Login {
        email: string;
        password: string;
    }

    export interface Skill {
        name: string;
        description: string;
        majorId: number;
    }

    export interface Major {
        name: string;
        description: string;
    }

    export interface Language {
        name: string;
        iso: string;
    }

    export interface JobStep1 {
        title: string;
        majorId: number;
    }

    export interface JobStep2 {
        skillIds: number[];
        languageIds: number[];
    }

    export interface JobStep3 {
        budget: number;
        durationHours: number;
        closedAt: string;
    }

    export interface JobStep4 {
        description: string;
        document?: File;
        isPublic: string;
    }

    export interface Apply {
        content: string;
        bidAmount: number;
        estimatedHours: number;
    }

    export interface Milestone {
        percent: number;
        content: string;
        startAt: string;
        durationHours: number;
        document?: File;
    }

    export interface Product {
        content: File;
        description: string;
    }

    export interface Dispute {
        reason: string;
        milestoneId: number;
    }

    export interface Resolve {
        resolution: string;
    }

    export interface Review {
        content: string;
        rating: number;
    }

    export interface Staff {
        fullName: string;
        roleId: number;
        email: string;
        password: string;
        phone?: string;
        birthday: string;
    }

    export interface Role {
        name: string;
        description: string;
        permissionIds: number[];
    }
}
