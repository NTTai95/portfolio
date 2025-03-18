package com.freelancer.utils;

/**
 * Lớp chứa các hằng số trạng thái dùng chung trong hệ thống.
 */
public class State {

	/**
	 * Trạng thái của đơn ứng tuyển (Apply).
	 */
	public static class Apply {
		/** 0 - Chờ duyệt */
		public static final Integer PENDING = 0;
		/** 1 - Đã duyệt */
		public static final Integer APPROVED = 1;
		/** 2 - Bị từ chối */
		public static final Integer REJECTED = 2;
		/** 3 - Đang làm việc */
		public static final Integer WORKING = 3;
		/** 4 - Hoàn tất */
		public static final Integer FINISHED = 4;
	}

	/**
	 * Mức độ ưu tiên (Level).
	 */
	public static class Level {
		/** 0 - Thấp */
		public static final Integer LOW = 0;
		/** 1 - Trung bình */
		public static final Integer MEDIUM = 1;
		/** 2 - Cao */
		public static final Integer HIGH = 2;
	}

	/**
	 * Quyền hiển thị nội dung.
	 */
	public static class Permission {
		/** 0 - Hiển thị */
		public static final Integer SHOW = 0;
		/** 1 - Ẩn */
		public static final Integer HIDDEN = 1;
	}

	/**
	 * Trạng thái hiển thị của hồ sơ cá nhân.
	 */
	public static class Profile {
		/** 0 - Hiển thị */
		public static final Integer SHOW = 0;
		/** 1 - Ẩn */
		public static final Integer HIDDEN = 1;
	}

	/**
	 * Trạng thái hiển thị của Freelancer.
	 */
	public static class Freelancer {
		/** 0 - Hiển thị */
		public static final Integer SHOW = 0;
		/** 1 - Ẩn */
		public static final Integer HIDDEN = 1;
	}

	/**
	 * Trạng thái hiển thị của ngôn ngữ.
	 */
	public static class Language {
		/** 0 - Hiển thị */
		public static final Integer SHOW = 0;
		/** 1 - Ẩn */
		public static final Integer HIDDEN = 1;
	}

	/**
	 * Trạng thái hiển thị của nhà tuyển dụng.
	 */
	public static class Recruiter {
		/** 0 - Hiển thị */
		public static final Integer SHOW = 0;
		/** 1 - Ẩn */
		public static final Integer HIDDEN = 1;
	}

	/**
	 * Trạng thái hiển thị của kỹ năng.
	 */
	public static class Skill {
		/** 0 - Hiển thị */
		public static final Integer SHOW = 0;
		/** 1 - Ẩn */
		public static final Integer HIDDEN = 1;
	}

	/**
	 * Trạng thái hiển thị của nhân viên.
	 */
	public static class Staff {
		/** 0 - Hiển thị */
		public static final Integer SHOW = 0;
		/** 1 - Ẩn */
		public static final Integer HIDDEN = 1;
	}

	/**
	 * Trạng thái hiển thị của sản phẩm.
	 */
	public static class Product {
		/** 0 - Hiển thị */
		public static final Integer REVIEWING = 0;
		/** 1 - Ẩn */
		public static final Integer EDITING = 1;
		/** 2 - Chấp nhận */
		public static final Integer APPROVED = 2;
		/** 3 - Bị khóa */
		public static final Integer BLOCKED = 3;
	}

	/**
	 * Trạng thái của tài khoản người dùng.
	 */
	public static class Account {
		/** 0 - Đang sử dụng */
		public static final Integer USE = 0;
		/** 1 - Bị khóa */
		public static final Integer BLOCK = 1;
	}

	/**
	 * Trạng thái của ví điện tử.
	 */
	public static class Wallet {
		/** 0 - Đang sử dụng */
		public static final Integer USE = 0;
		/** 1 - Bị khóa */
		public static final Integer BLOCK = 1;
	}

	/**
	 * Trạng thái của lịch sử giao dịch.
	 */
	public static class HistoryTransaction {
		/** 0 - Đang sử dụng */
		public static final Integer USE = 0;
		/** 1 - Đã xóa */
		public static final Integer DELETE = 1;
	}

	/**
	 * Trạng thái của bài đăng công việc (JobPost).
	 */
	public static class JobPost {
		/** 0 - Đang chờ duyệt */
		public static final Integer PENDING = 0;
		/** 1 - Đã duyệt */
		public static final Integer APPROVED = 1;
		/** 2 - Bị từ chối */
		public static final Integer REJECTED = 2;
		/** 3 - Đang tải dữ liệu */
		public static final Integer LOADING = 3;
		/** 4 - Đã đăng */
		public static final Integer PUBLISHED = 4;
		/** 5 - Đã bắt đầu */
		public static final Integer STARTED = 5;
		/** 6 - Đã hủy */
		public static final Integer CANCELED = 6;
		/** 7 - Đã hoàn thành */
		public static final Integer FINISHED = 7;
		/** 8 - Đã ẩn */
		public static final Integer HIDDEN = 8;
		/** 9 - Đã xóa */
		public static final Integer DELETED = 9;
		/** 10 - Đang thực hiện */
		public static final Integer DOING = 10;
		/** 11 - Đang chỉnh sửa */
		public static final Integer EDITING = 11;
	}
}
