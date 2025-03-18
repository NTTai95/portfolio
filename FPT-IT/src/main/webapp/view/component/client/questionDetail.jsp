<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String requestQuery = request.getQueryString();

String fullPath = "/JAVA4_NEW/questions/detail";
if (requestQuery != null) {
	fullPath += "?" + requestQuery;
}
%>
<div class="main-content-area py-100px">
	<div class="container">
		<div class="row">
			<div class="col-2">
				<jsp:include page="../aside.jsp">
					<jsp:param name="active" value="questions" />
				</jsp:include>
			</div>
			<div class="col-10">
				<div class="middull-content">
					<div class="question-details-area">
						<jsp:include page="./QuestionDetail/cardQuestion.jsp"></jsp:include>

						<h3 class="mb-4">${question.getCountAnswer()} Câu trả lời</h3>

						<jsp:include page="./QuestionDetail/answer.jsp"></jsp:include>

						<jsp:include page="../Pagination.jsp"></jsp:include>
						<c:if test="${question.status}">
							<c:if test="${not empty sessionScope.userLogin}">
								<div class="middull-content mt-5">
									<form class="your-answer-form"
										action="/JAVA4_NEW/questions/detail/add" method="post"
										id="formQuestionAnswer"
										onsubmit="submitFormAnswer(event,'errChiTiet')">
										<input type="hidden" name="id" value="${question.getId()}" />
										<input name="query" type="hidden"
											value="<%=request.getQueryString()%>">
										<div class="form-group">
											<h2>Trả lời</h2>
										</div>
										<div class="form-group">
											<h3>Chi tiết câu trả lời</h3>

											<p class="text-danger mb-0" id="errChiTiet"></p>
											<div id="summernote1" name="detail"></div>
										</div>
										<div class="form-group d-flex">
											<button id="submitCH" type="submit" class="btn-orange">Thêm
												trả lời</button>
										</div>
									</form>
								</div>
							</c:if>
							<c:if test="${empty sessionScope.userLogin}">
								<a href="/JAVA4_NEW/login?prevUrl=<%=fullPath%>"><b>Đăng
										nhập</b></a>
								<span> để trả lời câu hỏi này!</span>
							</c:if>
						</c:if>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>