export namespace EndPoint {
    export namespace Admin {
        export const ME = 'admin/me';

        export namespace Skill {
            export const BASE = 'admin/skills';
            export const ID = `${BASE}/{id}`;
            export const FILTER = `${BASE}/filter`;
            export const VALIDATION = `${BASE}/validation`;
            export const FORM = `${ID}/form`;
            export const ACTIVE = `${ID}/active`;
            export const SORT = `${BASE}/sort`;
            export const IMPACT = `${ID}/impact`;
            export const INVALID = `${ID}/invalid`;
        }

        export namespace Major {
            export const BASE = 'admin/majors';
            export const ID = `${BASE}/{id}`;
            export const FILTER = `${BASE}/filter`;
            export const SORT = `${BASE}/sort`;
            export const VALIDATION = `${BASE}/validation`;
            export const FORM = `${ID}/form`;
            export const ACTIVE = `${ID}/active`;
            export const IMPACT = `${ID}/impact`;
            export const INVALID = `${ID}/invalid`;
        }

        export namespace Language {
            export const BASE = 'admin/languages';
            export const ID = `${BASE}/{id}`;
            export const FILTER = `${BASE}/filter`;
            export const SORT = `${BASE}/sort`;
            export const VALIDATION = `${BASE}/validation`;
            export const FORM = `${ID}/form`;
            export const ACTIVE = `${ID}/active`;
            export const IMPACT = `${ID}/impact`;
            export const INVALID = `${ID}/invalid`;
        }

        export namespace Role {
            export const BASE = 'admin/roles';
            export const ID = `${BASE}/{id}`;
            export const FILTER = `${BASE}/filter`;
            export const SORT = `${BASE}/sort`;
            export const VALIDATION = `${BASE}/validation`;
            export const FORM = `${ID}/form`;
            export const ACTIVE = `${ID}/active`;
            export const INVALID = `${ID}/invalid`;
        }

        export namespace Client {
            export const BASE = 'admin/clients';
            export const ID = `${BASE}/{id}`;
            export const FILTER = `${BASE}/filter`;
            export const VALIDATION = `${BASE}/validation`;
            export const SORT = `${BASE}/sort`;
            export const FORM = `${ID}/form`;
        }

        export namespace Staff {
            export const BASE = 'admin/staffs';
            export const ID = `${BASE}/{id}`;
            export const FILTER = `${BASE}/filter`;
            export const VALIDATION = `${BASE}/validation`;
            export const SORT = `${BASE}/sort`;
            export const FORM = `${ID}/form`;
            export const INVALID = `${ID}/invalid`;
            export const ACTIVE = `${ID}/active`;
        }
    }

    export namespace Auth {
        export const LOGIN = 'auth/login';
        export const FORGOT = 'auth/forgot';
        export const REGISTER = 'auth/register/{role}';
        export const LOGIN_VALIDATION = 'auth/login/validation';
        export const REGISTER_VALIDATION = 'auth/register/validation';
    }

    export namespace Job {
        export const BASE = 'jobs';
        export const ID = `${BASE}/{id}`;
        export const FILTER = `${BASE}/filter`;
        export const SORT = `${BASE}/sort`;
        export const POST_PUBLIC = `${ID}/post-public`;
        export const POST_PRIVATE = `${ID}/post-private`;
        export const PUBLIC = `${ID}/public`;

        export namespace Step1 {
            const BASE_STEP = `${Job.BASE}/step1`;
            export const VALIDATION = `${BASE_STEP}/validation`;
            export const ID = `${BASE_STEP}/{id}`;
        }

        export namespace Step2 {
            const BASE_STEP = `${Job.BASE}/step2`;
            export const VALIDATION = `${BASE_STEP}/validation`;
            export const ID = `${BASE_STEP}/{id}`;
        }

        export namespace Step3 {
            const BASE_STEP = `${Job.BASE}/step3`;
            export const VALIDATION = `${BASE_STEP}/validation`;
            export const ID = `${BASE_STEP}/{id}`;
        }

        export namespace Step4 {
            const BASE_STEP = `${Job.BASE}/step4`;
            export const VALIDATION = `${BASE_STEP}/validation`;
            export const ID = `${BASE_STEP}/{id}`;
        }
    }

    export namespace Freelancer {
        export const BASE = 'freelancers';
        export const SEARCH = `${BASE}/search`;
        export const ID = `${BASE}/{id}`;
    }

    export namespace List {
        const BASE = 'list';
        export const MAJOR = `${BASE}/majors`;
        export const LANGUAGE = `${BASE}/languages`;
        export const SKILL = `${BASE}/skills`;
        export const ROLE = `${BASE}/roles`;
        export const PERMISSION = `${BASE}/permissions`;
    }

    export namespace Me {
        export const BASE = 'me';
        export const FULL_INFO = `${BASE}/full-info`;
        export const APPLIES = `${BASE}/applies`;
        export const REVIEWS = `${BASE}/reviews`;
        export const JOBS_IN_PROGRESS = `${BASE}/jobs-in-progress`;
        export const JOBS_COMPLETED = `${BASE}/jobs-completed`;
    }

    export namespace Home {
        const BASE = 'home';
        export const MAJOR = `${BASE}/top-10-most-reputable-freelancers`;
    }

    export namespace Employer {
        const BASE = 'employer';
        export const RECRUITING_JOBS = `${BASE}/recruiting-jobs`;
        export const INVITE_FREELANCER = `${BASE}/invite-freelancer/{freelancerId}`;
    }
}
