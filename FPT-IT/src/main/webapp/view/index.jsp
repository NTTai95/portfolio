<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<link rel="icon" type="image/png" href="https://templates.envytheme.com/pify/default/assets/images/favicon.png" />
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
	crossorigin="anonymous">

<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/view/css/style.css">

<c:if test="${jspPath eq './component/client/userManager.jsp'}">
	<link
		href="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote.min.css"
		rel="stylesheet">
</c:if>

<c:if
	test="${jspPath eq './component/client/questionDetail.jsp' or jspPath eq './component/client/questionManager.jsp'}">
	<link
		href="https://cdn.jsdelivr.net/npm/summernote@0.9.0/dist/summernote.min.css"
		rel="stylesheet">
	<link rel="stylesheet" type="text/css"
		href="${pageContext.request.contextPath}/view/css/highlightcode.css">
	<link rel="stylesheet" type="text/css"
		href="${pageContext.request.contextPath}/view/css/select2.css">
	<link rel="stylesheet" type="text/css"
		href="${pageContext.request.contextPath}/view/css/code-input.css">
</c:if>

<title>FPT-IT</title>
</head>

<body>
	<jsp:include page="./component/header.jsp"></jsp:include>

	<jsp:include page="${jspPath}"></jsp:include>

	<jsp:include page="./component/footer.jsp"></jsp:include>

	<jsp:include page="./component/go-top.jsp"></jsp:include>

	<div id="alert-message"
		class="alert alert-danger position-fixed top-0 end-0 mt-3 me-3 slide-in"
		role="alert"></div>

	<script type="text/javascript"
		src="${pageContext.request.contextPath}/view/js/jquery.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/view/js/bootstrap.bundle.min.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/view/js/custom.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/view/js/changePerPage.js"></script>
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/view/js/showdown.js"></script>

	<c:if test="${jspPath eq './component/client/questionManager.jsp'}">
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/view/js/select2main.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/view/js/select2.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/view/js/sumbitCauHoi.js"></script>
	</c:if>

	<c:if
		test="${jspPath eq './component/client/questionDetail.jsp' or jspPath eq './component/client/questionManager.jsp'}">
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/view/js/beautify.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/view/js/code-input.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/view/js/code-input-Indent.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/view/js/summernote.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/view/js/highlight.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/view/js/codeBlock.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/view/js/markdown.js"></script>

	</c:if>

	<c:if test="${jspPath eq './component/client/questionDetail.jsp' }">
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/view/js/show-question.js"></script>
	</c:if>

	<c:if test="${jspPath eq './component/client/userManager.jsp'}">
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/view/js/summernote.js"></script>
		<script type="text/javascript"
			src="${pageContext.request.contextPath}/view/js/editprofile.js"></script>
	</c:if>

	<script type="text/javascript"
		src="${pageContext.request.contextPath}/view/js/show-alert.js"></script>
</body>

</html>