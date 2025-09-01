// app/(client)/profile/personal-info/_ui/education/types.ts
export interface Education {
    id: number;
    schoolName: string;
    degree: string;
    major: string;
    gpa?: number;
    startDate: string;
    endDate?: string | null;
    description?: string;
}

export interface EducationListProps {
    educations: Education[];
    onAdd: () => void;
    onEdit: (edu: Education) => void;
    onDelete: (id: number) => void;
}

export interface EducationItemProps {
    edu: Education;
    onEdit: () => void;
    onDelete: () => void;
}