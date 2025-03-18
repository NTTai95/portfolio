<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
request.setCharacterEncoding("UTF-8");
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="main-content-area py-100px">
	<div class="container">
		<div class="row">
			<div class="col-2">
				<jsp:include page="../aside.jsp">
					<jsp:param value="users" name="active" />
				</jsp:include>
			</div>
			<div class="col-lg-10">
				<div class="d-flex justify-content-between align-items-center mb-3">
					<h3>Mọi người</h3>
					<div class="d-flex align-items-center">
						<form id="search" class="d-flex align-items-center">
							<input name="search" type="text" class="form-control me-2 w-100" placeholder="Tìm kiếm mọi người!" value="${search != null ? search : ''}">
							<button type="submit" class="bg-transparent">
								<svg viewBox="0 0 20 20" class="size-icon-32 fill-orange-hover">
                                <path fill-rule="evenodd"
										d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
										clip-rule="evenodd"
									/>
                            </svg>
							</button>
						</form>
					</div>
				</div>
				<div class="row">
					<c:forEach items="${listUser}" var="user">
						<jsp:include page="./users/cardUser.jsp">
							<jsp:param value="${user.displayName}" name="displayName" />
							<jsp:param value="${user.id}" name="id" />
							<jsp:param value="${user.getCountQuestion()}" name="countQuestion" />
							<jsp:param value="${user.getCountAnswer()}" name="countAnswer" />
							<jsp:param value="${user.reputation}" name="reputation" />
							<jsp:param value="${user.avatar}" name="avatar"/>
						</jsp:include>
					</c:forEach>


					<div class="d-flex justify-content-between align-items-center mt-4">
						<jsp:include page="../Pagination.jsp"></jsp:include>
						<jsp:include page="../PerPage.jsp"></jsp:include>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>