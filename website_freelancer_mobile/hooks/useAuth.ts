// hooks/useAuth.ts
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function useRole() {
    return useSelector((state: RootState) => state.persistent.auth.role);
}

export function useIsAdmin() {
    const role = useRole();
    return role === 'ROLE_ADMIN';
}

export function useIsEmployer() {
    const role = useRole();
    return role === 'ROLE_EMPLOYER';
}

export function useIsFreelancer() {
    const role = useRole();
    return role === 'ROLE_FREELANCER';
}
