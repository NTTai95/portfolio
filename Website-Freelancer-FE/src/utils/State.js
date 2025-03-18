const State = {
    Apply: {
        PENDING: 0, // Chờ duyệt
        APPROVED: 1, // Đã duyệt
        REJECTED: 2, // Bị từ chối
        WORKING: 3, // Đang làm việc
        FINISHED: 4, // Hoàn thành
    },

    Level: {
        LOW: 0, // Thấp
        MEDIUM: 1, // Trung bình
        HIGH: 2, // Cao
    },

    Permission: {
        SHOW: 0, // Hiển thị
        HIDDEN: 1, // Ẩn
    },

    Profile: {
        SHOW: 0, // Hiển thị
        HIDDEN: 1, // Ẩn
    },

    Freelancer: {
        SHOW: 0, // Hiển thị
        HIDDEN: 1, // Ẩn
    },

    Language: {
        SHOW: 0, // Hiển thị
        HIDDEN: 1, // Ẩn
    },

    Recruiter: {
        SHOW: 0, // Hiển thị
        HIDDEN: 1, // Ẩn
    },

    Skill: {
        SHOW: 0, // Hiển thị
        HIDDEN: 1, // Ẩn
    },

    Staff: {
        SHOW: 0, // Hiển thị
        HIDDEN: 1, // Ẩn
    },

    Product: {
        REVIEWING: 0, // Đang xem xét
        EDITING: 1, // Chỉnh sửa
        APPROVED: 2, // Chấp nhận
        BLOCKED: 3, // Bị khóa
    },

    Account: {
        USE: 0, // Đang sử dụng
        BLOCK: 1, // Bị khóa
    },

    Wallet: {
        USE: 0, // Đang sử dụng
        BLOCK: 1, // Bị khóa
    },

    HistoryTransaction: {
        USE: 0, // Đang sử dụng
        DELETE: 1, // Đã xóa
    },

    JobPost: {
        PENDING: 0, // Đang chờ duyệt
        APPROVED: 1, // Đã duyệt
        REJECTED: 2, // Bị từ chối
        LOADING: 3, // Đang tải dữ liệu
        PUBLISHED: 4, // Đã đăng
        STARTED: 5, // Đã bắt đầu
        CANCELED: 6, // Đã hủy
        FINISHED: 7, // Đã hoàn thành
        HIDDEN: 8, // Đã ẩn
        DELETED: 9, // Đã xóa
        DOING: 10, // Đang thực hiện
        EDITING: 11, // Đang chỉnh sửa
    },
};


export default State;