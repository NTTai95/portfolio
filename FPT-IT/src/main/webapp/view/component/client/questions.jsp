<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="main-content-area py-100px">
	<div class="container">
		<div class="row">
			<div class="col-2">
				<jsp:include page="../aside.jsp">
					<jsp:param name="active" value="questions" />
				</jsp:include>
			</div>
			<div class="col-lg-10">
				<div class="middull-content">
					<div class="d-flex justify-content-between align-items-center mb-4">
						<div>
							<c:if test="${not empty param.tag}">
								<h4>Tags [${param.tag}]</h4>
							</c:if>
							<c:if test="${not empty param.search}">
								<h4>Search: ${param.search}</h4>
							</c:if>
							<c:if test="${empty param.tag and empty param.search}">
								<h3>Tất cả câu hỏi</h3>
							</c:if>
						</div>
						<c:if test="${not empty sessionScope.userLogin}">
							<a href="/JAVA4_NEW/questions/manager" class="btn-orange">
								Thêm câu hỏi </a>
						</c:if>
						<c:if test="${empty sessionScope.userLogin}">
						<a href="/JAVA4_NEW/login?prevUrl=/JAVA4_NEW/questions/manager" class="btn-orange">
								Thêm câu hỏi </a>
						</c:if>
					</div>
					<div>
						<!--Begin::Card-QA-->
						<c:forEach items="${listQuestion}" var="question">
							<jsp:include page="./questions/cardQuestion.jsp">
								<jsp:param value="${question.user.displayName}"
									name="userDisplayName" />
								<jsp:param value="${question.getCountLiked()}" name="countLiked" />
								<jsp:param value="${question.getCountDisliked()}"
									name="countDisliked" />
								<jsp:param value="${question.content}" name="content" />
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
				<div class="d-flex justify-content-between align-items-center mt-4">
					<jsp:include page="../Pagination.jsp"></jsp:include>
					<jsp:include page="../PerPage.jsp"></jsp:include>
				</div>
			</div>
		</div>
	</div>
</div>