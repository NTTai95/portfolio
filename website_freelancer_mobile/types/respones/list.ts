export namespace ResponseList {
    export interface Language {
        id: number;
        name: string;
        iso: string;
    }

    export interface Skill {
        id: number;
        name: string;
        description: string;
    }

    export interface Major {
        id: number;
        name: string;
        description: string;
        countJobs: number;
    }

    export interface Role {
        id: number;
        name: string;
        code: string;
        description: string;
    }

    export interface Permission {
        id: number;
        name: string;
        description: string;
        code: string;
    }

    export interface FreelancerSkill {
        id: number;
        name: string;
    }

    export interface FreelancerLanguage {
        id: number;
        name: string;
        iso: string;
    }

    export interface FreelancerEducation {
        id: number;
        schoolName: string;
        degree: string;
        major: string;
        gpa: number;
        startDate: string;
        endDate: string;
        description: string;
    }

    export interface FreelancerCertification {
        id: number;
        name: string;
        issueBy: string;
        issueDate: string;
        expiryDate: string;
        link: string;
        frontImage: string;
        backImage: string;
        status: string;
    }
}
