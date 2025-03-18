<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String result = "questionComment" + request.getParameter("id");
request.setAttribute("result", result);
%>
<div class="w-100 mt-2 border-bottom"
	${result eq focusEl?'id="focusEl" tabindex=0':''}>
	<div class="mb-4">
		<div class="d-flex">
			<div
				class="flex-shrink-0 size-img-32 rounded-circle overflow-hidden me-2">
				<img class="w-100 w-100" src="/JAVA4_NEW/view/image/${param.avatar}"
					alt="Image">
			</div>
			<div class="flex-grow-1">
				<ul class="mb-1 ps-0">
					<li class="d-inline-block"><a
						class="text-black fw-bold text-orange-hover"
						href="/JAVA4_NEW/users/info?id=${param.userId}">${param.userDisplayName}</a>
					</li>
					<li class="d-inline-block float-end"><c:if
							test="${sessionScope.userLogin.id == param.userId}">
							<jsp:include page="../userOption.jsp">
								<jsp:param value="thisPage" name="hrefEdit" />
								<jsp:param value="editCommentQuestion${param.questionId}"
									name="elEdit" />
								<jsp:param value="commentQuestionId${param.id}"
									name="commentTextId" />
								<jsp:param value="${param.id}" name="commentId" />
								<jsp:param value="/JAVA4_NEW/questions/comment/delete" name="hrefDelete"/>
								<jsp:param value="<%=request.getQueryString()%>" name="query" />
								<jsp:param value="${param.id}" name="id"/>
							</jsp:include>
						</c:if></li>
				</ul>
				<p class="mb-0" id="commentQuestionId${param.id}">${param.content}</p>
			</div>
		</div>
	</div>
</div>