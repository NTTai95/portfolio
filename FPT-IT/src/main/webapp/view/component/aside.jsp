<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="menu-ul-wrap nav-left p-2">
	<div class="offcanvas-body">
		<div class="position-sticky top-0">
			<nav class="menu-nav" data-simplebar="">
				<ul id="menu-ul" class="menu-ul ps-0 mb-0">
					<li><a href="/JAVA4_NEW/home"
						class="box-style ${param.active eq 'home'?'active':''}"> <svg
								stroke-width="1.5"
								class="stroke-primary fill-transparent size-icon-32">
													<path stroke-linecap="round" stroke-linejoin="round"
									d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
												</svg> <span>Trang chủ</span>
					</a></li>
					<li><a href="/JAVA4_NEW/questions"
						class="box-style ${param.active eq 'questions'?'active':''}">
							<svg stroke-width="1.5"
								class="fill-transparent stroke-primary size-icon-32">
													<path stroke-linecap="round" stroke-linejoin="round"
									d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
												</svg> <span>Câu hỏi</span>
					</a></li>
					<li><a href="/JAVA4_NEW/tags"
						class="box-style ${param.active eq 'tags'?'active':''}"> <svg
								stroke-width="1.5"
								class="size-icon-32 stroke-primary fill-transparent">
													<path stroke-linecap="round" stroke-linejoin="round"
									d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
												</svg> <span>Chủ đề</span>
					</a></li>
					<li><a href="/JAVA4_NEW/users"
						class="box-style ${param.active eq 'users'?'active':''}"> <svg
								stroke-width="1.5"
								class="size-icon-32 stroke-primary fill-transparent">
													<path stroke-linecap="round" stroke-linejoin="round"
									d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
												</svg> <span>Mọi người</span>
					</a></li>
					<c:if test="${sessionScope.userLogin.role}">
						<li>Quản trị viên</li>
						<li><a href="/JAVA4_NEW/admin/setting"
							class="box-style ${param.active eq 'setting'?'active':''}"> <svg
									stroke-width="1.5"
									class="size-icon-32 stroke-primary fill-transparent">
													<path stroke-linecap="round" stroke-linejoin="round"
										d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
													<path stroke-linecap="round" stroke-linejoin="round"
										d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
												</svg> <span>Cấu hình</span>
						</a></li>
					</c:if>
				</ul>
			</nav>
		</div>
	</div>
</div>