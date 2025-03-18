<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
String requestQuery = request.getQueryString();

String fullPath = "/JAVA4_NEW/questions/detail";
if (requestQuery != null) {
	fullPath += "?" + requestQuery;
}

%>
<div
	class="single-qa-box mb-4 ${!question.status ? 'bg-secondary-subtle' : '' }">
	<div class="d-flex">
		<div class="flex-shrink-0">
			<div class="size-img-user-sm rounded-circle overflow-hidden">
				<img class="w-100 h-100"
					src="/JAVA4_NEW/view/image/${question.user.avatar}" alt="Image">
			</div>
			<c:if test="${not empty sessionScope.userLogin}">
				<div class="d-flex flex-column my-3 align-items-center">
					<c:if test="${question.status}">
						<input class="d-none btn-like-checked" type="checkbox"
							data-id="${question.id}" data-point="pointQuestion${question.id}"
							data-count="questionCountLiked${question.id}"
							id="like2-${question.id}" data-pointchange="10"
							name="vote2-${question.id}" value="10"
							onchange="likeQuestion(this)"
							${question.isUserLiked(sessionScope.userLogin.id)?'checked':''}>
					</c:if>
					<label for="like2-${question.id}" class="btn-like-hover"> <svg
							viewBox="0 0 24 24" class="size-icon-32 mx-auto">
            <path
								d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z">
                                                        </path>
        </svg>
					</label> <span id="questionCountLiked${question.id}">${question.getCountLiked()}</span>
				</div>
			</c:if>
			<c:if test="${empty sessionScope.userLogin}">
				<div class="d-flex flex-column my-3 align-items-center">
					<a href="/JAVA4_NEW/login?prevUrl=<%=fullPath%>"
						class="btn-like-hover"> <svg viewBox="0 0 24 24"
							class="size-icon-32 mx-auto">
            <path
								d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z">
                                                        </path>
        </svg>
					</a> <span id="questionCountLiked${question.id}">${question.getCountLiked()}</span>
				</div>
			</c:if>
			<c:if test="${not empty sessionScope.userLogin}">
				<div class="d-flex flex-column my-3 align-items-center">
					<c:if test="${question.status}">
						<input type="checkbox" id="dislike2-${question.id}"
							data-id="${question.id}" data-point="pointQuestion${question.id}"
							data-count="questionCountDisliked${question.id}"
							class="d-none btn-dislike-checked" name="vote2-${question.id}"
							data-pointchange="-2" value="-2" onchange="dislikeQuestion(this)"
							${question.isUserDisliked(sessionScope.userLogin.id)?'checked':''}>
					</c:if>
					<label for="dislike2-${question.id}" class="btn-dislike-hover">
						<svg viewBox="0 0 24 24" class="size-icon-32 mx-auto">
            <path
								d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z">
                                                        </path>
        </svg>
					</label> <span id="questionCountDisliked${question.id}">${question.getCountDisliked()}</span>
				</div>
			</c:if>
			<c:if test="${empty sessionScope.userLogin}">
				<div class="d-flex flex-column my-3 align-items-center">
					<a href="/JAVA4_NEW/login?prevUrl=<%=fullPath%>"
						class="btn-dislike-hover"> <svg viewBox="0 0 24 24"
							class="size-icon-32 mx-auto">
            <path
								d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z">
                                                        </path>
        </svg>
					</a> <span id="questionCountLiked${question.id}">${question.getCountDisliked()}</span>
				</div>
			</c:if>
		</div>
		<div class="flex-grow-1 ms-3">
			<ul class="mb-3 ps-0">
				<li class="d-inline-block"><a
					class="text-black fs-5 fw-bold text-orange-hover"
					href="/JAVA4_NEW/users/info?id=${question.user.id}">${question.user.displayName}</a>
				</li>
				<li class="d-inline-block ms-4">Ngày đăng: <fmt:formatDate value="${question.postDate}" pattern="dd/MM/yyyy" /></li>
				<c:if test="${not empty question.status}">
					<li class="d-inline-block float-end"><c:if
							test="${sessionScope.userLogin.role and !(question.user.id == sessionScope.userLogin.id)}">
							<jsp:include page="../../admin/adminOption.jsp">
								<jsp:param value="/JAVA4_NEW/admin/questions/manager/delete"
									name="hrefDelete" />
								<jsp:param value="${question.id}" name="id" />
							</jsp:include>
						</c:if> <c:if test="${question.user.id == sessionScope.userLogin.id}">
							<c:if test="${question.status}">
								<jsp:include page="../userOption.jsp">
									<jsp:param
										value="/JAVA4_NEW/questions/manager?id=${question.id}"
										name="hrefEdit" />
									<jsp:param value="/JAVA4_NEW/questions/manager/delete"
										name="hrefDelete" />
									<jsp:param value="${question.id}" name="id" />
									<jsp:param value="true" name="isDelete" />
								</jsp:include>
							</c:if>
							<c:if test="${!question.status}">
								<jsp:include page="../userOption.jsp">
									<jsp:param
										value="/JAVA4_NEW/questions/manager?id=${question.id}"
										name="hrefEdit" />
									<jsp:param value="/JAVA4_NEW/questions/manager/restore"
										name="hrefDelete" />
									<jsp:param value="${question.id}" name="id" />
									<jsp:param value="false" name="isDelete" />
								</jsp:include>
							</c:if>
						</c:if></li>
				</c:if>
				<c:if test="${empty question.status}">
					<li class="d-inline-block float-end" data-bs-toggle="tooltip"
						data-bs-placement="left"
						data-bs-title="Câu hỏi đã bị xóa bởi quản trị viên" data-bs-custom-class="custom-tooltip"><span>
							<svg class="size-icon-32 fill-danger" viewBox="0 0 32 32">
							<g stroke-width="1"></g>
							<g stroke-linecap="round" stroke-linejoin="round"></g>
							<g> <path
									d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.776 2.24-6.912l16.704 16.704q-3.168 2.208-6.944 2.208-3.264 0-6.016-1.6t-4.384-4.352-1.6-6.048zM9.056 6.24q3.168-2.24 6.944-2.24 3.264 0 6.016 1.632t4.384 4.352 1.6 6.016q0 3.808-2.24 6.944z"></path> </g></svg>
					</span></li>
				</c:if>
			</ul>
			<h3>
				<p class="fs-5">${question.title}</p>
			</h3>
			<p class="showMarkDown">${question.content}</p>
			<div class="ps-0 border-bottom border-secondary-subtle pb-4 mb-4">
				<ul>
					<c:forEach items="${question.tags}" var="tag">
						<li class="d-inline-block me-3"><a class="tag-a"
							href="/JAVA4_NEW/questions?tag=${tag.tagName}">${tag.tagName}</a></li>
					</c:forEach>
				</ul>
			</div>
			<div class="d-flex flex-column">
				<p class="mb-3 fw-bold">
					Điểm: <span id="pointQuestion${question.id}">${question.getPoint()}</span>
				</p>
				<a class="text-decoration-underline w-100 d-block"
					data-bs-toggle="collapse" href="#collapseQuestion" role="button"
					aria-expanded="false" aria-controls="collapseExample"> bình
					luận</a>
				<div class="collapse" id="collapseQuestion">
					<c:forEach items="${question.comments}" var="comment">
						<jsp:include page="./commentQuestion.jsp">
							<jsp:param value="${comment.id}" name="id" />
							<jsp:param value="${comment.content}" name="content" />
							<jsp:param value="${comment.user.displayName}"
								name="userDisplayName" />
							<jsp:param value="${comment.user.id}" name="userId" />
							<jsp:param value="${question.id}" name="questionId" />
							<jsp:param value="${comment.user.avatar}" name="avatar" />
						</jsp:include>
					</c:forEach>
					<c:if test="${question.status}">
						<div class="w-100 my-2">
							<c:if test="${not empty sessionScope.userLogin}">
								<form action="/JAVA4_NEW/questions/comment/add" method="post"
									id="editCommentQuestion${question.id}"
									onsubmit="submitForm(event,'errQuestionComment')">
									<span class="text-danger" id="errQuestionComment"></span>
									<div class="form-floating d-flex flex-column">
										<input name="id" type="hidden" value="${question.id}">
										<textarea name="content" class="form-control"
											placeholder="Leave a comment here"></textarea>
										<label for="floatingTextarea2">Bình luận</label>
										<div
											class="d-flex justify-content-end mt-2 align-items-center">
											<input name="query" type="hidden"
												value="<%=request.getQueryString()%>">
											<button type="submit" class="btn btn-orange p-1 px-2">Thêm
												bình luận</button>
										</div>
									</div>
								</form>
							</c:if>
							<c:if test="${empty sessionScope.userLogin}">
								<span>Vui lòng <a href="/JAVA4_NEW/login"><b>đăng
											nhập</b></a> để có thể bình luận!
								</span>
							</c:if>
						</div>
					</c:if>
				</div>
			</div>
		</div>
	</div>
</div>