<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="dropdown">
	<a href="#" role="button" data-bs-toggle="dropdown"
		aria-expanded="false"> <svg viewBox="0 0 24 24" stroke-width="1.5"
			class="size-icon-32 fill-transparent stroke-dis">
                                                                                    <path
				stroke-linecap="round" stroke-linejoin="round"
				d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z">
                                                                                    </path>
                                                                                </svg>
	</a>
	<ul class="dropdown-menu mt-2">
		<c:if test="${jspPath eq './component/client/users.jsp'}">
			<li><a class="dropdown-item" href="#">Vô hiệu hóa</a></li>
		</c:if>
		<c:if test="${not empty param.hrefEdit}">
			<li><a class="dropdown-item" href="${param.hrefEdit}">Chỉnh
					sửa</a></li>
		</c:if>
		<c:if test="${not empty param.hrefDelete}">
			<li><form action="${param.hrefDelete}" method="post">
					<input type="hidden" name="id" value="${param.id}" />
					<button class="text-hover dropdown-item">${not empty
						param.  isDelete? 'Xóa' : 'Ẩn' }</button>
				</form></li>
		</c:if>
	</ul>
</div>
