<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="main-content-area py-100px">
	<div class="container">
		<div class="row">
			<div class="col-2">
				<jsp:include page="../aside.jsp"></jsp:include>
			</div>
			<div class="col-10">
				<div class="edit-profile-area">
					<div class="profile-tabs">
						<ul class="nav nav-tabs" id="myTab" role="tablist">
							<li class="nav-item" role="presentation">
								<button
									class="nav-link ${empty errPassword and empty toTab ? 'active' : ''}"
									id="edit-profile-tab" data-bs-toggle="tab"
									data-bs-target="#edit-profile" type="button" role="tab"
									aria-controls="edit-profile" aria-selected="true">Chỉnh
									sửa thông tin</button>
							</li>
							<li class="nav-item" role="presentation">
								<button
									class="nav-link ${not empty errPassword or toTab eq 'changePassword' ? 'active' : ''}"
									id="change-password-tab" data-bs-toggle="tab"
									data-bs-target="#change-password" type="button" role="tab"
									aria-controls="change-password" aria-selected="false"
									tabindex="-1">Đổi mật khẩu</button>
							</li>
							<li class="nav-item" role="presentation">
								<button class="nav-link ${toTab eq 'question' ? 'active' : '' }"
									id="list-question-tab" data-bs-toggle="tab"
									data-bs-target="#list-question" type="button" role="tab"
									aria-controls="list-question" aria-selected="false"
									tabindex="-1">Câu hỏi</button>
							</li>
						</ul>
						<div class="tab-content" id="myTabContent">
							<div
								class="tab-pane fade ${empty errPassword and empty toTab ? 'show active' : ''}"
								id="edit-profile" role="tabpanel"
								aria-labelledby="edit-profile-tab">
								<jsp:include page="./userManager/editProfile.jsp"></jsp:include>
							</div>
							<div
								class="tab-pane fade ${not empty errPassword or toTab eq 'changePassword' ? 'show active' : ''}"
								id="change-password" role="tabpanel"
								aria-labelledby="change-password-tab">
								<jsp:include page="./userManager/changePassword.jsp"></jsp:include>
							</div>
							<div
								class="tab-pane fade ${toTab eq 'question' ? 'show active' : '' }"
								id="list-question" role="tabpanel"
								aria-labelledby="change-password-tab">
								<ul>
									<c:forEach items="${sessionScope.userLogin.questions}"
										var="question">
										<jsp:include page="./userManager/listQuestion.jsp">
											<jsp:param value="${question.id}" name="id" />
											<jsp:param value="${question.title}" name="title" />
											<jsp:param value="${question.getPoint()}" name="point" />
											<jsp:param value="${question.status}" name="status" />
										</jsp:include>
									</c:forEach>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<c:if test="${not empty alert}">
			<p id="show-alert">${alert}</p>
		</c:if>
	</div>
</div>