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
					<form id="formCauHoi" class="your-answer-form"
						action="${not empty tag ? '/JAVA4_NEW/tags/manager/edit' : '/JAVA4_NEW/tags/manager/add'}"
						method="post" onsubmit="submitFormTag(event)">
						<c:if test="${not empty tag}">
							<input type="hidden" name="id" value="${tag.id}" />
						</c:if>
						<div class="form-group">
							<h2>${not empty tag ? 'Chỉnh sửa chủ đề' : 'Thêm chủ đề' }</h2>
						</div>
						<div class="form-group">
							<h3>Tiêu đề</h3>
							<span id="errTagName" class="text-danger">${errTagName}</span> <input
								id="tieuDe" name="tagName" type="text" class="form-control"
								value="${tag.tagName}">
						</div>
						<span id="errDescription" class="text-danger"></span>
						<div class="form-floating d-flex flex-column mb-4">
							<textarea class="form-control" placeholder="Leave a comment here"
								id="floatingTextarea2" name="description">${tag.description}</textarea>
							<label for="floatingTextarea2">Mô tả</label>
						</div>
						<div class="form-group">
							<button id="submitCH" type="submit" class="btn-orange">${not
								empty tag ? 'Chỉnh sửa' : 'Thêm chủ đề' }</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div id="alert-message"
		class="alert alert-danger position-fixed top-0 end-0 mt-3 me-3 slide-in"
		role="alert"></div>
</div>
