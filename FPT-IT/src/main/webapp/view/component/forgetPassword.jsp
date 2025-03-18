<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="container col-6">
	<form class="user-form m-auto bg-white my-5" action="/JAVA4_NEW/forgetPassword" method="post">
		<h5 class="mb-4" id="exampleModalLabel">Quên mật khẩu</h5>
		<div class="row">
			<c:if test="${not empty sendSuccess}">
				<div class="alert alert-success alert-dismissible fade show"
					role="alert">
					Kiểm tra email và bấm vào liên kết để đổi mật khẩu!
					<button type="button" class="btn-close" data-bs-dismiss="alert"
						aria-label="Close"></button>
				</div>
			</c:if>
			<div class="col-12">
				<div class="form-group">
					<label class="form-label">Email</label><span
						class="text-danger ms-3">${not empty error? error : ''}</span> <input
						class="form-control input-ct w-100" type="text" name="email" value="${email}" />
				</div>
			</div>
			<div class="col-12">
				<button class="btn-orange" type="submit">Đổi mật khẩu</button>
			</div>
			<div class="col-12">
				<p class="create">
					Quay trở lại <a href="/JAVA4_NEW/login"> Đăng nhập </a>
				</p>
			</div>
		</div>
	</form>
</div>