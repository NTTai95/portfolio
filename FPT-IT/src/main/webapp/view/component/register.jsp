<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="container col-6">
	<form id="formRes" action="/JAVA4_NEW/register" method="post" class="user-form m-auto bg-white my-5">
		<h5 class="modal-title">Đăng ký</h5>
		<div class="row">
			<div class="col-12">
				<div class="form-group">
					<label>Họ tên</label><i id="errorDisplayName" class="ms-2 text-danger"></i>
					<input class="form-control input-ct w-100" type="text" name="displayName" value="${displayName}"/>
				</div>
			</div>
			<div class="col-12">
				<div class="form-group">
					<label>Email</label><i id="errorEmail" class="ms-2 text-danger">${errorEmail}</i>
					<input class="form-control input-ct w-100" type="text" name="email" value="${email}"/>
				</div>
			</div>
			<div class="col-12">
				<div class="form-group">
					<label>Mật khẩu</label><i id="errorPassword" class="ms-2 text-danger"></i>
					<input class="form-control input-ct w-100" type="password" name="password" value="${password}"/>
				</div>
			</div>
			<div class="col-12">
				<div class="form-group">
					<label>Nhập lại</label><i id="errorConfirmPassword" class="ms-2 text-danger"></i>
					<input class="form-control input-ct w-100" type="password" name="confirmPassword" />
				</div>
			</div>
			<div class="col-12">
				<div class="login-action">
					<div class="form-check">
						<input class="form-check-input" type="checkbox" name="Agree" />
						<label class="form-check-label" for="flexCheckDefault">
							Tôi đồng ý với
							<a href="#">Điều khoản sử dụng</a>
							và
							<a href="#">Chính sách bảo mật</a>
						</label>
					</div>
				</div>
			</div>
			<div class="col-12">
				<button class="btn-orange" type="submit">Đăng ký</button>
			</div>
			<div class="col-12">
				<p class="create">
					Bạn đã có tài khoản?
					<a href="/JAVA4_NEW/login">Đăng nhập</a>
				</p>
			</div>
		</div>
	</form>
</div>