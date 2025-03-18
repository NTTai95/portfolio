<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String url = "/JAVA4_NEW/questions/manager/add";
url = request.getParameter("question") != null ? "/JAVA4_NEW/questions/manager/edit" : "";
%>
<div class="main-content-area py-100px">
	<div class="container">
		<div class="row">
			<div class="col-2">
				<jsp:include page="../aside.jsp">
					<jsp:param value="questions" name="active" />
				</jsp:include>
			</div>
			<div class="col-lg-10">
				<div class="middull-content">
					<form id="formCauHoi" class="your-answer-form"
						action="${not empty question ? '/JAVA4_NEW/questions/manager/edit' : '/JAVA4_NEW/questions/manager/add'}"
						method="post">
						<c:if test="${not empty question.id}">
							<input type="hidden" name="id" value="${question.id}">
						</c:if>
						<div class="form-group">
							<h2>${empty question?'Tạo câu hỏi':'Chỉnh sửa câu hỏi' }</h2>
						</div>
						<div class="form-group">
							<h3>Tiêu đề</h3>
							<span id="errTieuDe" class="text-danger"></span> <input
								id="tieuDe" type="text" class="form-control"
								value="${question.title}">
						</div>
						<div class="form-group">
							<h3>Chủ đề</h3>
							<p class="mb-0">(Thêm chủ đề liên quan đến câu hỏi của bạn)</p>
							<p class="text-danger mb-0" id="errChuDe"></p>
							<select id="multiSelect" class="form-select w-100"
								multiple="multiple">
								<c:forEach items="${tags}" var="tag">
									<c:choose>
										<c:when test="${question.containsTagId(tag.id)}">
											<option value="${tag.id}"
												data-description="${tag.description}" selected>${tag.tagName}</option>
										</c:when>
									</c:choose>
									<option value="${tag.id}" data-description="${tag.description}">${tag.tagName}</option>
								</c:forEach>
							</select>
						</div>
						<div class="form-group">
							<h3>Chi tiết vấn đề của bạn</h3>
							<p class="mb-0">Hãy mô tả những gì bạn đã thử, những gì bạn
								mong đợi sẽ xảy ra và kết quả thực tế.</p>
							<p class="text-danger mb-0" id="errChiTiet"></p>
							<input type="hidden" id="edit-question"
								value="${question.content}" />
							<div id="summernote1"></div>
						</div>
						<div class="form-group">
							<button id="submitCH" type="submit" class="btn-orange">${empty question?'Đăng
								câu hỏi':'Cập nhật câu hỏi'}</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>