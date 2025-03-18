<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String tag = request.getParameter("tag");
String search = request.getParameter("searchQuestion");
String searchText = "";
if (tag != null) {
	searchText += "[" + tag.replace(",", "][") + "]";
}
if (search != null) {
	searchText += search;
}
%>
<div class="navbar-black">
	<div class="pt-0 pb-0">
		<div class="container">
			<div class="navbar navbar-ct navbar-expand-md navbar-light">
				<div>
					<a class="navbar-brand" href="/JAVA4_NEW/home"> <img
						src="/JAVA4_NEW/view/image/logo.png" alt="logo">
					</a>
				</div>
				<div class="collapse mean-menu d-block" id="navbarSupportedContent">
					<div class="options-orange">
						<ul>
							<li>
								<form id="searchQuestion"
									class="d-flex align-items-center postion-relative search-box">
									<div>
										<input type="text" name="searchQuestion"
											placeholder="Tìm kiếm câu hỏi..."
											class="form-control input-ct w-580px" value="<%=searchText%>">
									</div>
									<div>
										<button type="submit" class="search-btn">
											<svg viewBox="0 0 24 24" class="fill-light size-icon-32">
													<path fill-rule="evenodd"
													d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
													clip-rule="evenodd"></path>
												</svg>
										</button>
									</div>
								</form>
							</li>
							<c:choose>
								<c:when test="${empty sessionScope.userLogin}">
									<li><a href="/JAVA4_NEW/login" class="active"> Đăng
											nhập </a></li>
									<li><a href="/JAVA4_NEW/register"> Đăng ký </a></li>
								</c:when>
								<c:otherwise>
									<li>
										<div class="dropdown">
											<button
												class="bg-transparent text-white d-flex flex-row align-items-center"
												type="button" id="dropdownMenuButton2"
												data-bs-toggle="dropdown" aria-expanded="false">
												<div
													class="size-img-header rounded-circle overflow-hidden d-block">
													<img class="w-100 h-100"
														src="/JAVA4_NEW/view/image/${sessionScope.userLogin.avatar}" alt="Image">
												</div>
												<span class="ms-3 fs-5">${sessionScope.userLogin.displayName}</span>
											</button>
											<ul class="dropdown-menu p-0 overflow-hidden"
												aria-labelledby="dropdownMenuButton2">
												<li class="w-100 m-0 bg-orange-hover"><a
													class="bg-transparent-hover text-light-hover text-dark border-0 p-2 w-100"
													href="/JAVA4_NEW/users/info?id=${sessionScope.userLogin.id}">Trang cá nhân</a></li>
												<li class="w-100 m-0 bg-orange-hover"><a
													class="bg-transparent-hover text-light-hover text-dark border-0 p-2 w-100"
													href="/JAVA4_NEW/login"> Đăng xuất </a></li>
											</ul>
										</div>
									</li>
								</c:otherwise>
							</c:choose>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>