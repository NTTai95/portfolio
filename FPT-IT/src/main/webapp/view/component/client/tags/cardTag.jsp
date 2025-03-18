<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!--Begin::Tag-->
<div class="col-4">
	<div class="single-tags-box">
		<ul class="tag-mark">
			<li class="me-2"><span class="bg-orange-hover p-1"> <a
					href="/JAVA4_NEW/questions?tag=${param.tagName}">${param.tagName}</a>
			</span></li>
			<li>${param.countQuestions} câu hỏi</li>
			<li class="d-inline-block float-end"><c:if
					test="${(sessionScope.userLogin.role or sessionScope.userLogin.reputation > 200) and !(param.countQuestions == 0)}">
					<jsp:include page="../../admin/adminOption.jsp">
						<jsp:param value="/JAVA4_NEW/tags/manager?id=${param.id}"
							name="hrefEdit" />
					</jsp:include>
				</c:if> <c:if
					test="${(sessionScope.userLogin.role or sessionScope.userLogin.reputation > 200) and param.countQuestions == 0}">
					<jsp:include page="../../admin/adminOption.jsp">
						<jsp:param value="/JAVA4_NEW/tags/manager?id=${param.id}"
							name="hrefEdit" />
						<jsp:param value="/JAVA4_NEW/tags/manager/delete"
							name="hrefDelete" />
						<jsp:param value="${param.id}" name="id" />
						<jsp:param value="true" name="isDelete" />
					</jsp:include>
				</c:if></li>
		</ul>
		<p>${param.description}</p>
	</div>
</div>
<!--End::Tag-->