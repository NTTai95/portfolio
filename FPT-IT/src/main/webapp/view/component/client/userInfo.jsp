<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="main-content-area py-100px">
	<div class="container">
		<div class="row">
			<div class="col-2">
				<jsp:include page="../aside.jsp"></jsp:include>
			</div>
			<div class="col-lg-10">
				<div class="user-profile-area">
					<div
						class="profile-content d-flex justify-content-between align-items-center mb-3">
						<div class="profile-img d-flex flex-row ps-0">
							<div class="size-img-info rounded size-img-150 overflow-hidden">
								<img class="object-fit-cover w-100 h-100"
									src="/JAVA4_NEW/view/image/${user.avatar}" alt="Image">
							</div>
							<div class="ps-2">
								<h3>${user.displayName}</h3>
								<span>Ngày tham gia: <fmt:formatDate value="${user.dateJoin}" pattern="dd/MM/yyyy" /></span>
							</div>
						</div>
						<c:if test="${sessionScope.userLogin.id == user.id}">
							<div class="edit-btn align-self-start">
								<a href="/JAVA4_NEW/users/manager" class="btn-orange">Chỉnh
									sửa</a>
							</div>
						</c:if>
					</div>
					<div class="profile-achive">
						<div class="row">
							<div class="col-xl-3 col-sm-6">
								<div class="single-achive">
									<h2>${user.getCountAnswer()}</h2>
									<span>Trả lời</span>
								</div>
							</div>
							<div class="col-xl-3 col-sm-6">
								<div class="single-achive">
									<h2>${user.getCountQuestion()}</h2>
									<span>Câu hỏi</span>
								</div>
							</div>
							<div class="col-xl-3 col-sm-6">
								<div class="single-achive">
									<h2>${user.getCountAnswerIsVerified()}</h2>
									<span>Trả lời được xác nhận</span>
								</div>
							</div>
							<div class="col-xl-3 col-sm-6">
								<div class="single-achive">
									<h2>${user.reputation}</h2>
									<span>Uy tín</span>
								</div>
							</div>
						</div>
					</div>
					<div class="about">
						<h3>Giới thiệu</h3>
						<p id="show-introduction-2" data-value="${user.introduction}"></p>
					</div>
					<div class="top-posts-list mt-5">
						<div class="d-flex justify-content-between">
							<h3>Câu hỏi nổi bật</h3>
						</div>
						<div class="tab-content" id="myTabContent">
							<div class="tab-pane fade show active" id="view-all"
								role="tabpanel" aria-labelledby="view-all-tab">
								<ul class="ps-0">
									<c:forEach items="${user.getTop10Question()}" var="question">
										<jsp:include page="./userInfo/questionHighLight.jsp">
										<jsp:param value="${question.getPoint()}" name="point" />
										<jsp:param value="${question.title}" name="title" />
										<jsp:param value="${question.id}" name="id" />
										</jsp:include>
									</c:forEach>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>