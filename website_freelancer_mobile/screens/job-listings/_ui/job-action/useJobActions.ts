import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { addMessage } from '@/store/volatile/messageSlice';
import { apiPost, apiDelete, apiPut } from '@/api/baseApi';

export const useJobActions = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handlePublishJob = async (jobId: string, onSuccess: () => void) => {
        try {
            await apiPut(`/jobs/${jobId}/publish`);
            dispatch(addMessage({
                key: 'public-job',
                type: 'success',
                content: 'Công việc đã được đăng thành công'
            }));
            onSuccess();
        } catch (error: any) {
            console.log(error);
            dispatch(addMessage({
                key: 'public-job',
                type: 'error',
                content: (error?.data?.message || 'Có lỗi xảy ra khi đăng bài') + "!"
            }));
        }
    };

    const handleDeleteJob = async (jobId: string, onSuccess: () => void) => {
        try {
            await apiDelete(`/jobs/${jobId}`);
            dispatch(addMessage({
                key: 'delete-job',
                type: 'success',
                content: 'Công việc đã được xóa thành công'
            }));
            onSuccess();
        } catch (error: any) {
            dispatch(addMessage({
                key: 'delete-job',
                type: 'error',
                content: 'Có lỗi xảy ra khi xóa công việc'
            }));
        }
    };

    const handleRevokeJob = async (jobId: string, onSuccess: () => void) => {
        try {
            await apiPut(`/jobs/${jobId}/revoke`);
            dispatch(addMessage({
                key: 'revoke-job',
                type: 'success',
                content: 'Công việc đã được thu hồi thành công'
            }));
            onSuccess();
        } catch (error: any) {
            dispatch(addMessage({
                key: 'revoke-job',
                type: 'error',
                content: 'Có lỗi xảy ra khi thu hồi công việc'
            }));
        }
    };

    const handleRevokeApplication = async (jobId: string, onSuccess: () => void) => {
        apiPut(`/jobs/${jobId}/applications/revoke`).then(() => {
            dispatch(addMessage({
                key: 'revoke-application',
                type: 'success',
                content: 'Ứng tuyển đã được thu hồi thành công'
            }));
            onSuccess();
        }).catch((error: any) => {
            dispatch(addMessage({
                key: 'revoke-application',
                type: 'error',
                content: 'Có lỗi xảy ra khi thu hồi ứng tuyển'
            }));
        })
    };

    return {
        handlePublishJob,
        handleDeleteJob,
        handleRevokeJob,
        handleRevokeApplication,
    };
};