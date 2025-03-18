<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<!-- <div class="d-flex align-items-center pagination-area">
	<a href="../html/questions.html" class="next page-numbers">
		<svg viewBox="0 0 24 24" stroke-width="1.5" class="size-icon-32 stroke-dis hover:stroke-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
				d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
			/>
                            </svg>
	</a>
	<span class="page-numbers current" aria-current="page">1</span>
	<a href="../html/questions.html" class="page-numbers">2</a>
	<a href="../html/questions.html" class="page-numbers">3</a>
	<a href="../html/questions.html" class="next page-numbers">
		<svg viewBox="0 0 24 24" stroke-width="1.5" class="size-icon-32 stroke-dis hover:stroke-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
				d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
			/>
                            </svg>
	</a>
</div> -->
<nav aria-label="Page navigation example">
	<c:if test="${totalPages > 1 }">
		<ul class="d-flex align-items-center pagination-area m-0 list-unstyled">
			<li class="next page-numbers ${currentPage == 1 ? 'li-disabled' : ''}">
				<a class="page-link ${currentPage == 1 ? 'pointer-events-none' : ''}" href="?page=${currentPage - 1}${linkHref}"
					aria-label="Previous"
				>
					<svg viewBox="0 0 24 24" stroke-width="1.5" class="size-icon-32 stroke-dis hover:stroke-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
							d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
						/>
                            </svg>
				</a>
			</li>

			<c:if test="${totalPages <= 5}">
				<c:forEach var="i" begin="1" end="${totalPages}">
					<li class="page-numbers ${i == currentPage ? 'current' : ''}">
						<a class="page-link" href="?page=${i}${linkHref}">${i}</a>
					</li>
				</c:forEach>
			</c:if>

			<c:if test="${totalPages > 5}">
				<c:choose>
					<c:when test="${currentPage <= 3}">
						<c:forEach var="i" begin="1" end="5">
							<li class="page-numbers ${i == currentPage ? 'current' : ''}">
								<a class="page-link" href="?page=${i}${linkHref}">${i}</a>
							</li>
						</c:forEach>
						<li class="px-3">
							<a class="page-link">...</a>
						</li>
						<li class="page-numbers">
							<a class="page-link" href="?page=${totalPages}${linkHref}">${totalPages}</a>

						</li>
					</c:when>

					<c:when test="${currentPage > 3 && currentPage <= totalPages - 3}">
						<li class="page-numbers">
							<a class="page-link" href="?page=1${linkHref}">1</a>

						</li>
						<li class="px-3">
							<a class="page-link">...</a>
						</li>
						<c:forEach var="i" begin="${currentPage - 2}" end="${currentPage + 2}">
							<li class="page-numbers ${i == currentPage ? 'current' : ''}">
								<a class="page-link" href="?page=${i}${linkHref}">${i}</a>
							</li>
						</c:forEach>
						<li class="px-3">
							<a class="page-link">...</a>
						</li>
						<li class="page-numbers">
							<a class="page-link" href="?page=${totalPages}${linkHref}">${totalPages}</a>
						</li>
					</c:when>

					<c:when test="${currentPage > totalPages - 3}">
						<li class="page-numbers">
							<a class="page-link" href="?page=1${linkHref}">1</a>

						</li>
						<li class="px-3">
							<a class="page-link">...</a>
						</li>
						<c:forEach var="i" begin="${totalPages - 4}" end="${totalPages}">
							<li class="page-numbers ${i == currentPage ? 'current' : ''}">
								<a class="page-link" href="?page=${i}${linkHref}">${i}</a>
							</li>
						</c:forEach>
					</c:when>
				</c:choose>
			</c:if>

			<li class="page-numbers ${currentPage == totalPages ? 'li-disabled' : ''}">
				<a class="page-link ${currentPage == totalPages ? 'pointer-events-none' : ''}"
					href="?page=${currentPage + 1}${linkHref}" aria-label="Next"
				>
					<svg viewBox="0 0 24 24" stroke-width="1.5" class="size-icon-32 stroke-dis hover:stroke-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
							d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
						/>
                            </svg>
				</a>
			</li>
		</ul>
	</c:if>
</nav>
