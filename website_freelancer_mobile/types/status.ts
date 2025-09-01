export namespace Status {
    export enum Apply {
        PENDING = 'PENDING',
        ACCEPT = 'ACCEPT',
        REJECTED = 'REJECTED',
    }

    export enum Certification {
        ACTIVE = 'ACTIVE',
        EXPIRED = 'EXPIRED',
    }

    export enum Contact {
        PENDING = 'PENDING',
        REJECTED = 'REJECTED',
        ACCEPT = 'ACCEPT',
        RECALL = 'RECALL',
    }

    export enum Dispute {
        OPEN = 'OPEN',
        PROCESSING = 'PROCESSING',
        RESOLVED = 'RESOLVED',
        REJECTED = 'REJECTED',
        CANCELLED = 'CANCELLED',
    }

    export enum Job {
        DRAFT = 'DRAFT',
        PUBLIC = 'PUBLIC',
        PRIVATE = 'PRIVATE',
        ACTIVE = 'ACTIVE',
        IN_PROGRESS = 'IN_PROGRESS',
        COMPLETED = 'COMPLETED',
        CANCELED = 'CANCELED',
    }

    export enum Language {
        ACTIVE = 'ACTIVE',
        INVALID = 'INVALID',
    }

    export enum Major {
        ACTIVE = 'ACTIVE',
        INVALID = 'INVALID',
    }

    export enum Skill {
        ACTIVE = 'ACTIVE',
        INVALID = 'INVALID',
    }

    export enum Milestone {
        DISPUTE = 'DISPUTE',
        UNPAID = 'UNPAID',
        DOING = 'DOING',
        PENDING = 'PENDING',
        REJECTED = 'REJECTED',
        DONE = 'DONE',
        REVIEWING = 'REVIEWING',
    }

    export enum Product {
        PENDING = 'PENDING',
        ACCEPT = 'ACCEPT',
        REJECTED = 'REJECTED',
    }

    export enum Report {
        PENDING = 'PENDING',
        REJECTED = 'REJECTED',
        ACCEPT = 'ACCEPT',
        RECALL = 'RECALL',
    }

    export enum RequestPayment {
        PENDING = 'PENDING',
        REJECTED = 'REJECTED',
        ACCEPT = 'ACCEPT',
    }

    export enum User {
        ACTIVE = 'ACTIVE',
        DISABLED = 'DISABLED',
        LOCKED = 'LOCKED',
    }

    export const Meta: Record<string, { label: string; color: string; hex: string }> = {
        ACTIVE: { label: 'Hoạt động', color: 'green', hex: '#52c41a' },
        INVALID: { label: 'Vô hiệu hóa', color: 'red', hex: '#f5222d' },
        DISABLED: { label: 'Tạm khóa', color: 'orange', hex: '#fa8c16' },
        LOCKED: { label: 'Khóa vĩnh viễn', color: 'volcano', hex: '#d4380d' },
        PENDING: { label: 'Đang chờ', color: 'gold', hex: '#faad14' },
        ACCEPT: { label: 'Chấp nhận', color: 'green', hex: '#52c41a' },
        REJECTED: { label: 'Từ chối', color: 'red', hex: '#f5222d' },
        RECALL: { label: 'Thu hồi', color: 'default', hex: '#d9d9d9' },
        EXPIRED: { label: 'Hết hạn', color: 'gray', hex: '#8c8c8c' },
        OPEN: { label: 'Mở', color: 'blue', hex: '#1890ff' },
        PROCESSING: { label: 'Đang xử lý', color: 'processing', hex: '#1890ff' },
        RESOLVED: { label: 'Đã giải quyết', color: 'success', hex: '#52c41a' },
        CANCELLED: { label: 'Đã hủy', color: 'default', hex: '#d9d9d9' },
        DRAFT: { label: 'Bản nháp', color: 'default', hex: '#d9d9d9' },
        PUBLIC: { label: 'Công khai', color: 'blue', hex: '#1890ff' },
        PRIVATE: { label: 'Riêng tư', color: 'purple', hex: '#722ed1' },
        IN_PROGRESS: { label: 'Đang thực hiện', color: 'processing', hex: '#1890ff' },
        COMPLETED: { label: 'Hoàn thành', color: 'cyan', hex: '#13c2c2' },
        CANCELED: { label: 'Bị hủy', color: 'red', hex: '#f5222d' },
        DISPUTE: { label: 'Tranh chấp', color: 'volcano', hex: '#d4380d' },
        UNPAID: { label: 'Chưa thanh toán', color: 'warning', hex: '#fa8c16' },
        DOING: { label: 'Đang làm', color: 'blue', hex: '#1890ff' },
        DONE: { label: 'Đã hoàn tất', color: 'green', hex: '#52c41a' },
        REVIEWING: { label: 'Đang đánh giá', color: 'magenta', hex: '#eb2f96' },
        PREPARING: { label: 'Đang chuẩn bị', color: 'cyan', hex: '#13c2c2' },
    };
}
