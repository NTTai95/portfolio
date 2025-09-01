import { Status } from "../status";

export namespace RequestPage {
    export type SortType = 'asc' | 'desc' | 'ascend' | 'descend';

    interface PageBase {
        keyword?: string;
        page?: number;
        size?: number;
        sortType?: SortType;
    }

    export interface Skill extends PageBase {
        majorId?: number;
        status?: Status.Skill;
        sortField?: 'id' | 'name' | 'createdAt';
    }

    export interface Major extends PageBase {
        status?: Status.Major;
        sortField?: 'id' | 'name' | 'createdAt';
    }

    export interface Language extends PageBase {
        status?: Status.Language;
        sortField?: 'name' | 'iso' | 'createdAt';
    }

    export interface Client extends PageBase {
        roleId?: number;
        status?: Status.User;
        sortField?: 'id' | 'birthday' | 'joinedAt';
    }

    export interface Staff extends PageBase {
        roleId?: number;
        status?: Status.User;
        sortField?: 'id' | 'birthday' | 'joinedAt';
    }

    export interface Role extends PageBase {
        sortField?: 'id' | 'name';
    }

    export interface Job extends PageBase {
        skillIds?: number[];
        languageIds?: number[];
        minBudget?: number;
        maxBudget?: number;
        majorId?: number;
        maxDurationHours?: number;
        sortField?: 'id' | 'budget' | 'durationHours' | 'postedAt' | 'closedAt';
    }

    export interface MeApplies extends PageBase {
        status?: Status.Apply;
        sortField?: 'id' | 'createdAt' | 'bidAmount';
    }

    export interface MeReviews extends PageBase {
        sortField?: 'id' | 'rating' | 'createdAt';
    }

    export interface MeJobsInProgress extends PageBase {
        sortField?: 'id' | 'budget' | 'durationHours' | 'postedAt' | 'closedAt'
    }
}
