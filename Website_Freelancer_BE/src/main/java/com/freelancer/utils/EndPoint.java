package com.freelancer.utils;

public class EndPoint {
    public class Unique {
        public static class Skill {
            public static final String NAME = "unique/skills/name";
        }

        public static class Major {
            public static final String NAME = "unique/major/name";
        }

        public static class Language {
            public static final String NAME = "unique/languages/name";
            public static final String ISO = "unique/languages/iso";
        }

        public static class User {
            public static final String EMAIL = "unique/users/email";
            public static final String PHONE = "unique/users/phone";
        }

        public static class Role {
            public static final String NAME = "unique/roles/name";
        }
    }

    public class Admin {
        public static final String ME = "admin/me";

        public static class Skill {
            public static final String BASE = "admin/skills";
            public static final String ID = BASE + "/{id}";
            public static final String FILTER = BASE + "/filter";
            public static final String VALIDATION = BASE + "/validation";
            public static final String FORM = ID + "/form";
            public static final String ACTIVE = ID + "/active";
            public static final String SORT = BASE + "/sort";
            public static final String IMPACT = ID + "/impact";
            public static final String INVALID = ID + "/invalid";
        }

        public static class Major {
            public static final String BASE = "admin/majors";
            public static final String ID = BASE + "/{id}";
            public static final String FILTER = BASE + "/filter";
            public static final String SORT = BASE + "/sort";
            public static final String VALIDATION = BASE + "/validation";
            public static final String FORM = ID + "/form";
            public static final String ACTIVE = ID + "/active";
            public static final String IMPACT = ID + "/impact";
            public static final String INVALID = ID + "/invalid";
        }

        public static class Language {
            public static final String BASE = "admin/languages";
            public static final String ID = BASE + "/{id}";
            public static final String FILTER = BASE + "/filter";
            public static final String SORT = BASE + "/sort";
            public static final String VALIDATION = BASE + "/validation";
            public static final String FORM = ID + "/form";
            public static final String ACTIVE = ID + "/active";
            public static final String IMPACT = ID + "/impact";
            public static final String INVALID = ID + "/invalid";
        }

        public static class Role {
            public static final String BASE = "admin/roles";
            public static final String ID = BASE + "/{id}";
            public static final String FILTER = BASE + "/filter";
            public static final String SORT = BASE + "/sort";
            public static final String VALIDATION = BASE + "/validation";
            public static final String FORM = ID + "/form";
            public static final String ACTIVE = ID + "/active";
            public static final String INVALID = ID + "/invalid";
        }

        public static class Client {
            public static final String BASE = "admin/clients";
            public static final String ID = BASE + "/{id}";
            public static final String FILTER = BASE + "/filter";
            public static final String VALIDATION = BASE + "/validation";
            public static final String SORT = BASE + "/sort";
            public static final String FORM = ID + "/form";
        }

        public static class Staff {
            public static final String BASE = "admin/staffs";
            public static final String ID = BASE + "/{id}";
            public static final String FILTER = BASE + "/filter";
            public static final String VALIDATION = BASE + "/validation";
            public static final String SORT = BASE + "/sort";
            public static final String FORM = ID + "/form";
            public static final String INVALID = ID + "/invalid";
            public static final String ACTIVE = ID + "/active";
        }
    }

    public static class Auth {
        public static final String LOGIN = "auth/login";
        public static final String FORGOT = "auth/forgot";
        public static final String REGISTER = "auth/register/{role}";
        public static final String LOGIN_VALIDATION = "auth/login/validation";
        public static final String REGISTER_VALIDATION = "auth/register/validation";
    }

    public static class Job {
        public static final String BASE = "jobs";
        public static final String ID = BASE + "/{id}";
        public static final String FILTER = BASE + "/filter";
        public static final String SORT = BASE + "/sort";
        public static final String POST_PUBLIC = ID + "/post-public";
        public static final String POST_PRIVATE = ID + "/post-private";
        public static final String PUBLIC = ID + "/public";
        public static final String APPLY = ID + "/apply";
        public static final String SELECT_FREELANCER = ID + "/select-freelancer/{applyId}";
        public static final String APPLIES = ID + "/applies";
        public static final String REJECT_APPLY = ID + "/reject-apply/{applyId}";

        public static class Step1 {
            private static final String BASE = Job.BASE + "/step1";
            public static final String VALIDATION = BASE + "/validation";
            public static final String ID = BASE + "/{id}";
        }

        public static class Step2 {
            private static final String BASE = Job.BASE + "/step2";
            public static final String VALIDATION = BASE + "/validation";
            public static final String ID = BASE + "/{id}";
        }

        public static class Step3 {
            private static final String BASE = Job.BASE + "/step3";
            public static final String VALIDATION = BASE + "/validation";
            public static final String ID = BASE + "/{id}";
        }

        public static class Step4 {
            private static final String BASE = Job.BASE + "/step4";
            public static final String VALIDATION = BASE + "/validation";
            public static final String ID = BASE + "/{id}";
        }
    }

    public static class Product {
        public static final String BASE = "products";
        public static final String ID = BASE + "/{id}";
        public static final String ACCEPT = ID + "/accept";
        public static final String REJECT = ID + "/reject";
    }

    public static class List {
        private static final String BASE = "list";
        public static final String MAJOR = BASE + "/majors";
        public static final String LANGUAGE = BASE + "/languages";
        public static final String SKILL = BASE + "/skills";
        public static final String ROLE = BASE + "/roles";
        public static final String PERMISSION = BASE + "/permissions";
    }

    public static class Me {
        public static final String BASE = "me";
        public static final String FULL_INFO = BASE + "/full-info";
        public static final String APPLIES = BASE + "/applies";
        public static final String REVIEWS = BASE + "/reviews";
        public static final String JOBS_IN_PROGRESS = BASE + "/jobs-in-progress";
        public static final String JOBS_COMPLETED = BASE + "/jobs-completed";
    }

    public static class Home {
        private static final String BASE = "home";
        public static final String MAJOR = BASE + "/top-10-most-reputable-freelancers";

    }
}
