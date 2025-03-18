<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<form action="/JAVA4_NEW/users/manager" method="post"
	class="edit-content" enctype="multipart/form-data"
	onsubmit="submitFormUser(event)">
	<div class="d-flex flex-row align-items-center">
		<div>
			<h3>Thông tin công khai</h3>
			<div class="d-flex flex-column mb-3">
				<label class="cursor-pointer d-block size-img-150 overflow-hidden"
					for="img-profile"> <img id="show-img-profile"
					class="w-100 h-100"
					src="/JAVA4_NEW/view/image/${sessionScope.userLogin.avatar}"
					alt="Image">
				</label> <input type="file" name="avatar" id="img-profile" class="d-none"
					accept="image/*"> <span class="text-danger"> <i>*Kích cỡ tối đa 3MB</i>
				</span>
			</div>
		</div>
		<span class="d-none" id="warning-save-img"><b>Hình ảnh chưa được lưu.</b><br>Bấm <b class="text-orange cursor-pointer" onclick="scollToBtn('btnEdit')">cập nhật</b> để lưu!</span>
	</div>

	<div class="form-group">
		<label class="fs-5 mt-4">Email</label><span class="text-danger ms-2"
			id="errEmail">${errEmail}</span> <input type="text"
			class="form-control" name="email"
			value="${sessionScope.userLogin.email}">
	</div>
	<div class="form-group">
		<label class="fs-5 mt-4">Tên hiển thị</label><span
			class="text-danger ms-2" id="errDisplayName"></span> <input
			type="text" class="form-control" name="displayName"
			value="${sessionScope.userLogin.displayName}">
	</div>
	<div class="form-group">
		<label class="fs-5 mt-4">Giới thiệu</label><span
			class="text-danger ms-2" id="errIntroduction"></span> <input
			value="${sessionScope.userLogin.introduction}" type="hidden"
			id="show-introduction" />
		<div id="summernote1"></div>
	</div>
	<button id="btnEdit" type="submit" class="btn btn-orange w-100 mt-3">Cập
		nhật</button>
</form>