<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<jsp:include page="./banner.jsp"></jsp:include>
<div class="main-content-area py-100px">
	<div class="container">
		<div class="row">
			<div class="col-2">
				<jsp:include page="../aside.jsp">
					<jsp:param value="home" name="active" />
				</jsp:include>
			</div>
			<div class="col-lg-10">
				<div>
					<div class="card-main">
						<div
							class="d-flex justify-content-between align-items-center mb-4">
							<h3>
								<svg viewBox="0 0 24 24" class="size-icon-32 fill-primary">
										<path fill-rule="evenodd"
										d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
										clip-rule="evenodd" />
									</svg>
								Câu hỏi mới nhất
							</h3>
							<c:if test="${not empty sessionScope.userLogin}">
								<a href="/JAVA4_NEW/questions/manager" class="btn-orange">
									Thêm câu hỏi </a>
							</c:if>
							<c:if test="${empty sessionScope.userLogin}">
								<a href="/JAVA4_NEW/login?prevUrl=/JAVA4_NEW/questions/manager"
									class="btn-orange"> Thêm câu hỏi </a>
							</c:if>
						</div>
						<div>
							<!--Begin::Card-QA-->
							<c:forEach items="${top10Question}" var="question">
								<jsp:include page="./questions/cardQuestion.jsp">
									<jsp:param value="${question.user.displayName}"
										name="userDisplayName" />
									<jsp:param value="${question.getCountLiked()}"
										name="countLiked" />
									<jsp:param value="${question.getCountDisliked()}"
										name="countDisliked" />
									<jsp:param value="${question.getPoint()}" name="point" />
									<jsp:param value="${question.getCountVote()}" name="countVote" />
									<jsp:param value="${question.numberView}" name="countView" />
									<jsp:param value="${question.user.id}" name="userId" />
									<jsp:param value="${question.id}" name="questionId" />
									<jsp:param value="${question.title}" name="title" />
									<jsp:param value="${question.user.avatar}" name="avatar" />
									<jsp:param value="${question.postDate}" name="postDate" />
									<jsp:param
										value="${not empty question.tags[0] ? question.tags[0].tagName : ''}"
										name="tag1" />
									<jsp:param
										value="${not empty question.tags[1] ? question.tags[1].tagName : ''}"
										name="tag2" />
									<jsp:param
										value="${not empty question.tags[2] ? question.tags[2].tagName : ''}"
										name="tag3" />
									<jsp:param
										value="${not empty question.tags[3] ? question.tags[3].tagName : ''}"
										name="tag4" />
									<jsp:param
										value="${not empty question.tags[4] ? question.tags[4].tagName : ''}"
										name="tag5" />
								</jsp:include>
							</c:forEach>
							<!--End::Card-QA-->
						</div>
					</div>
					<div class="card-main">
						<div class="">
							<ul class="d-flex flex-wrap ps-0 mb-0 list-unstyled">
								<li class="w-50 text-center bg-light p-3"><span
									class="d-block">Người dùng</span> <span
									class="fs-3 fw-bold text-primary"><fmt:formatNumber
											value="${countUserAll}"></fmt:formatNumber></span></li>
								<li class="w-50 text-center bg-light-subtle p-3"><span
									class="d-block">Câu hỏi</span> <span
									class="fs-3 fw-bold text-danger"><fmt:formatNumber
											value="${countQuestionAll}"></fmt:formatNumber></span></li>
								<li class="w-50 text-center bg-light-subtle p-3"><span
									class="d-block">Câu trả lời</span> <span
									class="fs-3 fw-bold text-success"><fmt:formatNumber
											value="${countAnswerAll}"></fmt:formatNumber></span></li>
								<li class="w-50 text-center bg-light p-3"><span
									class="d-block">Trả lời được xác thực</span> <span
									class="fs-3 fw-bold text-info"><fmt:formatNumber
											value="${countAnswerIsVerifiedAll}"></fmt:formatNumber></span></li>
							</ul>
						</div>
					</div>
					<div class="card-main">
						<div>
							<h3>
								<svg viewBox="0 0 24 24" stroke-width="1.5"
									class="size-icon-32 stroke-primary fill-transparent">
										<path stroke-linecap="round" stroke-linejoin="round"
										d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
									</svg>
								<span>Người dùng nổi bật</span>
							</h3>
							<ul class="list-unstyled">
								<c:forEach items="${top5User}" var="user">
									<li class="ps-4 mb-3"><a class="d-inline-block"
										href="/JAVA4_NEW/users/info?id=${user.id}">
											<div class="d-flex gap-3">
												<img class="size-img-user-sm rounded-circle overflow-hidden"
													src="/JAVA4_NEW/view/image/${user.avatar}" alt="Image" />
												<div class="w-100">
													<p class="mb-0 fw-bold">
														${user.displayName}<span> (<fmt:formatNumber
																value="${user.reputation}"></fmt:formatNumber> Uy tín)
														</span>
													</p>
													<span class="text-black">${user.getCountQuestion()}
														Câu hỏi</span>
												</div>
											</div>
									</a></li>
								</c:forEach>
							</ul>
						</div>
					</div>
					<div class="card-main">
						<div>
							<h3>
								<svg viewBox="0 0 24 24" class="size-icon-32 fill-primary">
										<path fill-rule="evenodd"
										d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 1 1-9 0V4.125Zm4.5 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
										clip-rule="evenodd" />
										<path
										d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257ZM12.738 17.625l6.474-6.474a1.875 1.875 0 0 0 0-2.651L15.5 4.787a1.875 1.875 0 0 0-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375Z" />
									</svg>
								Chủ đề nổi bật
							</h3>
							<ul class="list-unstyled">
								<c:forEach items="${top10Tag}" var="tag">
									<li class="d-inline-block me-2"><a class="tag-a"
										href="/JAVA4_NEW/questions?tag=${tag.tagName}">${tag.tagName}</a></li>
								</c:forEach>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

