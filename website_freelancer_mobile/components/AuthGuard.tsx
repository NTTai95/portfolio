// components/AuthGuard.tsx
'use client';

import { useAuthorization } from '@/hooks/useAuthorization';
import React from 'react';

type Role = 'ROLE_FREELANCER' | 'ROLE_NHA_TUYEN_DUNG' | 'ROLE_QUAN_TRI';
type Permission = 'user.read' | 'user.disable' | 'user.active' | 'skill.update' | 'skill.read' | 'skill.delete' | 'skill.create'
    | 'report.read' | 'report.handle' | 'major.update' | 'major.read' | 'major.delete' | 'major.create' | 'language.update'
    | 'language.read' | 'language.delete' | 'language.create' | 'contact.read' | 'contact.handle'

interface AuthGuardProps {
    roles?: Role[];              // các role được phép
    notRoles?: Role[];           // các role bị cấm
    permissions?: Permission[];        // cần đủ các quyền
    children: React.ReactNode;     // UI khi đủ quyền
    fallback?: React.ReactNode;    // UI khi không đủ quyền
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
    roles,
    notRoles,
    permissions,
    children,
    fallback = null,
}) => {
    const { role, hasRole, hasPermission, isAuthenticated } = useAuthorization();

    // Nếu chưa đăng nhập → fallback
    if (!isAuthenticated) return <>{fallback}</>;

    // Nếu bị cấm bởi role
    if (notRoles && notRoles.includes(role as Role)) return <>{fallback}</>;

    // Nếu yêu cầu role mà không khớp
    if (roles && !hasRole(roles)) return <>{fallback}</>;

    // Nếu yêu cầu permission mà không khớp
    if (permissions && !hasPermission(permissions)) return <>{fallback}</>;

    return <>{children}</>;
};