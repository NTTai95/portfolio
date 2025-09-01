type RootStackParamList = {
    login: undefined;
    jobs: undefined;
    milestone: {
        id: string;
    }
    findJob: undefined;
    apply: {
        id: number;
    },
    jobDetail: {
        jobId: number;
    },
    freelancer: {
        id: number;
    },
    employer: {
        id: number;
    },
    freelancerSearch: undefined;
    menu: undefined;
    conversations: undefined
    chatbox: {
        receiverId: number | string | undefined;
    }
    notifications: undefined;
    workSubmit: { id: number | string | undefined, milestoneId: number | string | undefined };
    products: { milestoneId: number | string | undefined }
    personalInfo: {}
    createJob: { id: number | undefined }
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}