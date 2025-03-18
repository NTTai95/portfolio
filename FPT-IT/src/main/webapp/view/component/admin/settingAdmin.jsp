<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="main-content-area py-100px">
	<div class="container">
		<div class="row">
			<div class="col-2">
				<jsp:include page="../aside.jsp">
					<jsp:param value="setting" name="active" />
				</jsp:include>
			</div>
			<div class="col-lg-10">
				<div class="edit-profile-area">
					<div class="profile-tabs">
						<ul class="nav nav-tabs" id="myTab" role="tablist">
							<li class="nav-item" role="presentation">
								<button class="nav-link ${empty toTab ? 'active' : '' }"
									id="edit-profile-tab" data-bs-toggle="tab"
									data-bs-target="#chart" type="button" role="tab"
									aria-controls="edit-profile" aria-selected="true">Thống
									kê</button>
							</li>
							<li class="nav-item" role="presentation">
								<button class="nav-link ${toTab == 1 ? 'active' : '' }"
									id="black-list-tab" data-bs-toggle="tab"
									data-bs-target="#black-list" type="button" role="tab"
									aria-controls="black-list" aria-selected="false" tabindex="-1">Danh
									sách đen</button>
							</li>
						</ul>
						<div class="tab-content" id="myTabContent">
							<div class="tab-pane fade ${empty toTab ? 'show active' : '' }" id="chart" role="tabpanel"
								aria-labelledby="edit-profile-tab">
								<div>
									<div class="profile-achive">
										<div class="row">
											<div class="col-6">
												<div class="single-achive">
													<h2>1984</h2>
													<span>Tổng câu hỏi</span>
												</div>
											</div>
											<div class="col-6">
												<div class="single-achive">
													<h2>507</h2>
													<span>Tổng trả lời</span>
												</div>
											</div>
											<div class="col-6">
												<div class="single-achive">
													<h2>124</h2>
													<span>Tổng bình luận</span>
												</div>
											</div>
											<div class="col-6">
												<div class="single-achive">
													<h2>654</h2>
													<span>Tổng người dùng</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="tab-pane fade ${toTab == 1 ? 'show active' : '' }" id="black-list" role="tabpanel"
								aria-labelledby="black-list-tab">
								<c:forEach items="${blackList}" var="item">
									<div class="single-qa-box p-2 mb-4">
										<span class="bg-orange text-white px-2 py-1">Câu hỏi</span> <span
											class="px-2 py-1">Điểm: ${item.getPoint()}</span> <span
											class="px-2 py-1">Trả lời: ${item.getCountAnswer()}</span>
										<div class="d-flex align-items-center mt-2 border-top pt-2">
											<div class="size-img-user-sm rounded-circle overflow-hidden">
												<img class="w-100 h-100"
													src="/JAVA4_NEW/view/image/${item.user.avatar}" alt="Image">
											</div>
											<div class="d-flex flex-column ms-2">
												<a href="/JAVA4_NEW/users/detail?id=${item.user.id}"
													class="fw-bold">${item.user.displayName}</a> <a
													href="/JAVA4_NEW/questions/detail?id=${item.id}"
													class="ms-2">${item.title}</a>
											</div>
											<form action="/JAVA4_NEW/admin/questions/manager/restore"
												method="post" class="ms-auto">
												<input type="hidden" name="id" value="${item.id}" />
												<button type="submit" class="btn btn-sm btn-orange ms-auto">Khôi
													phục</button>
											</form>
										</div>
									</div>
								</c:forEach>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>