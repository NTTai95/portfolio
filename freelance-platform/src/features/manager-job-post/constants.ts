//Types
interface JobPost {
    id: number;
    title: string;
    employer: string;
    postedDate: string;
    views: number;
    status: 'active' | 'hidden';
}

//Status
const texts = [
    "Tìm bài đăng...",
    "Nhập tiêu đề bài tuyển dụng...",
];

export { texts };
export type { JobPost };