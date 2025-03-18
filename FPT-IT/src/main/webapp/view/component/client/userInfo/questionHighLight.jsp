<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<li class="d-flex justify-content-between">
	<div class="top-posts-list d-flex align-items-center">
		<i class="ri-chat-2-fill"></i> <span class="badge bg-text-orange me-2">${param.point}</span>
		<span> <a href="/JAVA4_NEW/questions/detail?id=${param.id}">${param.title}</a>
		</span>
	</div>
</li>