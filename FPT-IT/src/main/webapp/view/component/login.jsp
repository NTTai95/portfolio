<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="container col-6">
	<form id="formLogin" action="/JAVA4_NEW/login" method="post"
		class="user-form m-auto bg-white my-5">
		<c:if test="${not empty error}">
			<div class="alert alert-danger" role="alert">${error}</div>
		</c:if>
		<h5 class="mb-4" id="exampleModalLabel">Đăng nhập</h5>
		<div class="row">
			<div class="col-12">
				<div class="form-group">
					<label>Email</label><i id="errorEmail" class="ms-2 text-danger"></i>
					<input class="form-control input-ct w-100" type="text" name="email" value="${email}"/>
				</div>
			</div>
			<div class="col-12">
				<div class="form-group">
					<label>Mật khẩu</label><i id="errorPassword"
						class="ms-2 text-danger"></i> <input
						class="form-control input-ct w-100" type="password"
						name="password" value="${password}"/>
				</div>
			</div>
			<div class="col-12">
				<div class="login-action">
					<span class="forgot-login"> <a
						href="/JAVA4_NEW/forgetPassword">Quên mật khẩu?</a>
					</span>
				</div>
			</div>
			<div class="col-12">
				<button class="btn-orange" type="submit">Đăng nhập</button>
			</div>
			<div class="col-12">
				<p class="create">
					Bạn chưa có tài khoản? <a href="/JAVA4_NEW/register">Đăng ký </a>
				</p>
			</div>
		</div>
	</form>
</div>