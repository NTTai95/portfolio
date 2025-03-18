<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="main-content-area py-100px">
	<div class="container">
		<div class="row">
			<div class="col-2">
				<jsp:include page="../aside.jsp">
					<jsp:param name="active" value="tags" />
				</jsp:include>
			</div>
			<div class="col-lg-10">
				<div class="middull-content">
					<div class="d-flex flex-row w-100 justify-content-between mb-4">
						<form action="/JAVA4_NEW/tags" method="get" id="search" class="mb-0 w-50 d-flex align-items-center">
							<input type="text" class="form-control"
								placeholder="Tìm kiếm chủ đề..." name="search"
								value="${search != null ? search : ''}">
							<button type="submit" class="ms-2 bg-transparent">
								<svg viewBox="0 0 20 20" class="size-icon-32 fill-orange-hover">
                                        <path fill-rule="evenodd"
										d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
										clip-rule="evenodd" />
                                    </svg>
							</button>
						</form>
						<c:if test="${sessionScope.userLogin.reputation >= 200 or sessionScope.userLogin.role}">
							<a class="btn btn-orange" href="/JAVA4_NEW/tags/manager">Thêm
								chủ đề</a>
						</c:if>
					</div>
					<div class="tag-content">
						<div class="row">
							<c:forEach items="${Tags}" var="tag">
								<jsp:include page="./tags/cardTag.jsp">
									<jsp:param value="${tag.tagName}" name="tagName" />
									<jsp:param value="${tag.getCountQuestions()}"
										name="countQuestions" />
									<jsp:param value="${tag.description}" name="description" />
									<jsp:param value="${tag.id}" name="id" />
								</jsp:include>
							</c:forEach>
						</div>
					</div>
				</div>
				<div class="d-flex justify-content-between align-items-center mt-4">
					<jsp:include page="../Pagination.jsp"></jsp:include>
					<jsp:include page="../PerPage.jsp"></jsp:include>
				</div>
			</div>
		</div>
	</div>
</div>