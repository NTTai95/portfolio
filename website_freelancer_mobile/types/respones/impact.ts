import { Status } from '@/types/status';

export namespace ResponseImpact {
  export interface Skill {
    id: number;
    name: string;
    freelancersAffected: FreelancersAffected[];
    activeJobsAffected: ActiveJobsAffected[];
  }

  export interface Major {
    id: number;
    name: string;
    activeJobsAffected: ActiveJobsAffected[];
    skillsAffected: SkillsAffected[];
  }

  export interface Language {
    id: number;
    name: string;
    freelancersAffected: FreelancersAffected[];
    activeJobsAffected: ActiveJobsAffected[];
  }

  export interface FreelancersAffected {
    id: number;
    fullName: string;
    email: string;
    status: Status.User;
    remainingCount: number;
  }

  export interface ActiveJobsAffected {
    id: number;
    title: string;
    status: Status.Job;
  }

  export interface SkillsAffected {
    id: number;
    name: string;
    status: Status.Skill;
  }
}
