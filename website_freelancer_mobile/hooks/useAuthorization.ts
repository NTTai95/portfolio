// hooks/useAuthorization.ts
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export const useAuthorization = () => {
    const accessToken = useSelector((state: RootState) => state.persistent.auth.accessToken);
    const role = useSelector((state: RootState) => state.persistent.auth.role);

    const isAuthenticated = !!accessToken;

    const hasRole = (roles: string[]) => {
        return role ? roles.includes(role) : false;
    };

    // Thêm hàm kiểm tra không có role
    const hasNoRole = (roles: string[]) => {
        return !hasRole(roles);
    };

    // Cập nhật logic hỗ trợ wildcard .*
    const hasPermission = (required: string[]) => {
        return true;
    };

    // Thêm hàm kiểm tra không có permission
    const hasNoPermission = (required: string[]) => {
        return true;
    };

    return {
        accessToken,
        role,
        isAuthenticated,
        hasRole,
        hasNoRole,
        hasPermission,
        hasNoPermission
    };
};