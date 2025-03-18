<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="public-information">
	<form class="edit-content" action="/JAVA4_NEW/users/manager/changePassword" method="post" onsubmit="submitFormChangePassword(event)">
		<div class="form-group">
			<label class="fs-5 mt-3">Mật khẩu hiện tại</label><span class="text-danger ms-2" id="errPassword">${errPassword}</span>
			<input type="password" class="form-control" name="password" id="password" value="${password}">
		</div>
		<div class="form-group">
			<label class="fs-5 mt-3">Mật khẩu mới</label><span class="text-danger ms-2" id="errNewPassword"></span>
			<input type="password" class="form-control" name="newPassword" id="new-password" value="${newPassword}">
		</div>
		<div class="form-group">
			<label class="fs-5 mt-3">Nhập lại mật khẩu</label><span class="text-danger ms-2" id="errNewPasswordAgain"></span>
			<input type="password" class="form-control" name="newPasswordAgain" id="new-password-again" value="${newPasswordAgain}">
		</div>
		<div class="form-group mt-3">
			<button type="submit" class="btn-orange">Đổi mật khẩu</button>
		</div>
	</form>
</div>