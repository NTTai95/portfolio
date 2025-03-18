<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%request.setCharacterEncoding("UTF-8"); %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="col-4">
	<div class="single-new-user">
		<div class="d-flex align-items-center">
			<div class="flex-shrink-0 size-img-user rounded-circle overflow-hidden">
				<img class="w-100 h-100" src="/JAVA4_NEW/view/image/${param.avatar}" alt="Image">
			</div>
			<div class="flex-grow-1 ms-3">
				<h3>
					<a class="text-orange" href="/JAVA4_NEW/users/info?id=${param.id}">${param.displayName}</a>
				</h3>
				<p>${param.reputation} Uy tín</p>
			</div>
			<div class="d-inline-block float-end align-self-start">
				<c:if test="${user.getRole() and !isMine}">
					<jsp:include page="../../admin/adminOption.jsp">
						<jsp:param value="/JAVA4_NEW/users/manager?id=${param.id}" name="hrefEdit" />
					</jsp:include>
				</c:if>
			</div>
		</div>
		<ul class="d-flex justify-content-between align-items-center">
			<li>
				<p>
					<span>${param.countQuestion}</span>
					câu hỏi
				</p>
			</li>
			<li>
				<p>
					<span>${param.countAnswer}</span>
					trả lời
				</p>
			</li>
		</ul>
	</div>
</div>