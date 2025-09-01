import { NavigationProp, useNavigation } from '@react-navigation/native';
import { JobListing } from '../types';

interface ActionItemsProps {
    job: JobListing;
    role: string;
    onRefresh: () => void;
}

export const getActionItems = (
    job: JobListing,
    role: string,
    onRefresh: () => void,
    showConfirmModal: any,
    jobActions: any
) => {
    const status = job.status.toUpperCase();
    const { handlePublishJob, handleDeleteJob, handleRevokeJob, handleRevokeApplication } = jobActions;
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    if (role === 'ROLE_NHA_TUYEN_DUNG') {
        switch (status) {
            case 'DRAFT':
                return [
                    {
                        key: 'edit',
                        label: 'Chỉnh sửa',
                        isDanger: false,
                        onPress: () => navigation.navigate('createJob', { id: Number(job.id) }),
                    },
                    {
                        key: 'publish',
                        label: 'Đăng tải',
                        isDanger: false,
                        onPress: () => {
                            showConfirmModal({
                                title: "Xác nhận đăng bài",
                                content: 'Bạn có chắc chắn muốn đăng bài công việc này?',
                                onOk: () => handlePublishJob(job.id, onRefresh),
                                okText: 'Đăng bài',
                                cancelText: 'Hủy',
                            });
                        },
                    },
                    {
                        key: 'delete',
                        label: 'Xóa',
                        isDanger: true,
                        onPress: () => {
                            showConfirmModal({
                                title: "Xác nhận xóa",
                                content: 'Bạn có chắc chắn muốn xóa công việc này?',
                                onOk: () => handleDeleteJob(job.id, onRefresh),
                                okText: 'Xóa',
                                cancelText: 'Hủy',
                            });
                        },
                    },
                ];
            case 'PUBLIC':
            case 'PRIVATE':
                return [
                    {
                        key: 'revoke',
                        label: 'Thu hồi',
                        isDanger: true,
                        onPress: () => {
                            showConfirmModal({
                                title: "Xác nhận thu hồi",
                                content: 'Bạn có chắc chắn muốn thu hồi công việc này?',
                                onOk: () => handleRevokeJob(job.id, onRefresh),
                                okText: 'Thu hồi',
                                cancelText: 'Hủy',
                            });
                        },
                    },
                    {
                        key: 'applicants',
                        label: 'Danh sách ứng viên',
                        isDanger: false,
                        // onPress: () => navigation.navigate('SelectFreelancer', { jobId: job.id }),
                    }
                ];
            case 'IN_PROGRESS':
            case 'PREPARING':
                return [
                    {
                        key: 'view_milestones',
                        label: 'Danh sách giai đoạn',
                        isDanger: false,
                        onPress: () => navigation.navigate('milestone', { id: job.id }),
                    },
                    {
                        key: 'applicants',
                        label: 'Danh sách ứng viên',
                        isDanger: false,
                        // onPress: () => navigation.navigate('SelectFreelancer', { jobId: job.id }),
                    },
                    {
                        key: 'chat',
                        label: 'Nhắn tin',
                        isDanger: false,
                        // onPress: () => navigation.navigate('Chat', { userId: job.freelancerId }),
                    }
                ];
            case 'COMPLETED':
            case 'CANCELED':
                return [];
            default:
                return [];
        }
    } else if (role === 'ROLE_FREELANCER') {
        switch (status) {
            case 'PUBLIC':
            case 'PRIVATE':
                return [
                    {
                        key: 'revoke_application',
                        label: 'Thu hồi ứng tuyển',
                        isDanger: true,
                        onPress: () => {
                            showConfirmModal({
                                title: "Xác nhận thu hồi",
                                content: 'Bạn có chắc chắn muốn thu hồi ứng tuyển cho công việc này?',
                                onOk: () => handleRevokeApplication(job.id, onRefresh),
                                okText: 'Thu hồi',
                                cancelText: 'Hủy',
                            });
                        },
                    },
                ];
            case 'IN_PROGRESS':
            case 'PREPARING':
                return [
                    {
                        key: 'view_milestones',
                        label: 'Danh sách giai đoạn',
                        isDanger: false,
                        onPress: () => navigation.navigate('milestone', { id: job.id }),
                    },
                    {
                        key: 'chat',
                        label: 'Nhắn tin',
                        isDanger: false,
                        onPress: () => navigation.navigate('chatbox', { receiverId: job.employerId }),
                    }
                ];
            case 'DRAFT':
            case 'COMPLETED':
            case 'CANCELED':
                return [];
            default:
                return [];
        }
    }
    return [];
};