<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:if test="${param.status && not empty param.status}">
	<li class="single-qa-box p-2 d-flex justify-content-between">
		<div class="top-posts-list d-flex align-items-center">
			<span class="badge bg-text-orange me-2 fs-6">${param.point}</span> <span>
				<a href="/JAVA4_NEW/questions/detail?id=${param.id}">${param.title}</a>
			</span>
		</div>
	</li>
</c:if>
<c:if test="${!param.status && not empty param.status}">
	<li
		class="single-qa-box p-2 d-flex justify-content-between align-items-center">
		<div class="top-posts-list d-flex align-items-center">
			<span class="badge bg-text-orange opacity-50 me-2 fs-6">${param.point}</span>
			<a class="opacity-50"
				href="/JAVA4_NEW/questions/detail?id=${param.id}">${param.title}</a>
		</div>
		<form action="/JAVA4_NEW/questions/manager/restore" method="post">
			<input type="hidden" name="id" value="${param.id}">
			<button class="btn btn-orange p-1 px-2 ms-2">khôi phục</button>
		</form>
	</li>
</c:if>
<c:if test="${empty param.status}">
	<li class="d-flex justify-content-between">
		<div class="top-posts-list d-flex align-items-center">
			<i class="ri-chat-2-fill"></i> <span
				class="badge bg-text-orange opacity-50 me-2">${param.point}</span> <span>
				<a class="opacity-50 text-decoration-line-through"
				href="/JAVA4_NEW/questions/detail?id=${param.id}">${param.title}</a><span
				data-bs-toggle="tooltip" data-bs-placement="top"
				data-bs-title="Câu hỏi đã bị xóa bởi quản trị viên"
				data-bs-custom-class="custom-tooltip2"> <svg
						class="size-icon-16 fill-danger" viewBox="0 0 32 32">
							<g stroke-width="1"></g>
							<g stroke-linecap="round" stroke-linejoin="round"></g>
							<g> <path
							d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.776 2.24-6.912l16.704 16.704q-3.168 2.208-6.944 2.208-3.264 0-6.016-1.6t-4.384-4.352-1.6-6.048zM9.056 6.24q3.168-2.24 6.944-2.24 3.264 0 6.016 1.632t4.384 4.352 1.6 6.016q0 3.808-2.24 6.944z"></path> </g></svg>
			</span>
			</span>
		</div>
	</li>
</c:if>
