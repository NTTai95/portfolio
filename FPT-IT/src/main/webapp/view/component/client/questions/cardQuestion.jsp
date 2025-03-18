<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
String postDate = request.getParameter("postDate");
String[] date = postDate.split("-");
postDate = date[2] + "/" + date[1] + "/" + date[0];
%>
<!--Begin::Card-QA-->
<div class="single-qa-box mb-4">
	<div class="d-flex">
		<div class="flex-shrink-0">
			<a href="/JAVA4_NEW/users/info?id=${param.userId}">
				<div class="size-img-user-sm rounded-circle overflow-hidden">
					<img class="w-100 h-100"
						src="/JAVA4_NEW/view/image/${param.avatar}" alt="Image" />
				</div>
			</a>
			<div class="d-flex flex-column my-3">
				<svg viewBox="0 0 24 24" class="size-icon-32 fill-succes mx-auto">
                                                <path
						d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                                            </svg>
				<span class="text-success mx-auto">${param.countLiked}</span>
			</div>
			<div class="d-flex flex-column my-3">
				<svg viewBox="0 0 24 24" class="size-icon-32 fill-danger mx-auto">
                                                <path
						d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                                            </svg>
				<span class="text-danger  mx-auto">${param.countDisliked}</span>
			</div>
		</div>
		<div class="flex-grow-1 ms-3">
			<ul class="mb-3 ps-0">
				<li class="d-inline-block"><a
					class="text-black fs-5 fw-bold text-orange-hover"
					href="/JAVA4_NEW/users/info?id=${param.userId}">${param.userDisplayName}</a>
				</li>
				<li class="d-inline-block ms-3">Ngày đăng: <%=postDate%></li>
				<c:if test="${jspPath ne './component/client/home.jsp'}">
					<li class="d-inline-block float-end"><c:if
							test="${sessionScope.userLogin.role and !(param.userId == sessionScope.userLogin.id)}">
							<jsp:include page="../../admin/adminOption.jsp">
								<jsp:param value="/JAVA4_NEW/admin/questions/manager/delete"
									name="hrefDelete" />
								<jsp:param value="${param.questionId}" name="id" />
							</jsp:include>
						</c:if> <c:if test="${param.userId == sessionScope.userLogin.id}">
							<jsp:include page="../userOption.jsp">
								<jsp:param
									value="/JAVA4_NEW/questions/manager?id=${param.questionId}"
									name="hrefEdit" />
								<jsp:param value="/JAVA4_NEW/questions/manager/delete"
									name="hrefDelete" />
								<jsp:param value="${param.questionId}" name="id" />
								<jsp:param value="true" name="isDelete" />
							</jsp:include>
						</c:if></li>
				</c:if>
			</ul>
			<h3>
				<a href="/JAVA4_NEW/questions/detail?id=${param.questionId}">${param.title}
				</a>
			</h3>
			<c:if test="${jspPath ne './component/client/home.jsp'}">
				<p class="text-line-3 markdowntoText">${param.content}</p>
			</c:if>
			<ul class="ps-0 border-bottom border-secondary-subtle pb-4 mb-4">
				<c:if test="${not empty param.tag1}">
					<li class="d-inline-block me-3"><a class="tag-a"
						href="/JAVA4_NEW/questions?tag=${param.tag1}">${param.tag1}</a></li>
				</c:if>
				<c:if test="${not empty param.tag2}">
					<li class="d-inline-block me-3"><a class="tag-a"
						href="/JAVA4_NEW/questions?tag=${param.tag2}">${param.tag2}</a></li>
				</c:if>
				<c:if test="${not empty param.tag3}">
					<li class="d-inline-block me-3"><a class="tag-a"
						href="/JAVA4_NEW/questions?tag=${param.tag3}">${param.tag3}</a></li>
				</c:if>
				<c:if test="${not empty param.tag4}">
					<li class="d-inline-block me-3"><a class="tag-a"
						href="/JAVA4_NEW/questions?tag=${param.tag4}">${param.tag4}</a></li>
				</c:if>
				<c:if test="${not empty param.tag5}">
					<li class="d-inline-block me-3"><a class="tag-a"
						href="/JAVA4_NEW/questions?tag=${param.tag5}">${param.tag5}</a></li>
				</c:if>
			</ul>
			<div class="d-flex justify-content-between align-items-center">
				<ul class="anser-list ps-0 mb-0">
					<li class="d-inline-block me-4">${param.point} điểm</li>
					<li class="d-inline-block me-4">${param.countVote} bình chọn</li>
					<li class="d-inline-block me-4">${param.countView} Người xem</li>
				</ul>
				<a href="/JAVA4_NEW/questions/detail?id=${param.questionId}"
					class="btn-orange"> Trả lời </a>
			</div>
		</div>
	</div>
</div>
<!--End::Question-->