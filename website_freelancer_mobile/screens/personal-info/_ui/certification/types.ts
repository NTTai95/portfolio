// app/(client)/profile/personal-info/_ui/certification/types.ts
export interface CertificationListProps {
    certifications: Certification[];
    onAdd: () => void;
    onEdit: (cert: Certification) => void;
    onDelete: (id: number) => void;
}

export interface CertificationItemProps {
    cert: Certification;
    onEdit: () => void;
    onDelete: () => void;
}

export interface Certification {
    id: number;
    name: string;
    issueBy: string;
    issueDate: string;
    expiryDate?: string;
    link?: string;
    frontImage?: string;
    backImage?: string;
    status?: 'ACTIVE' | 'EXPIRED';
}