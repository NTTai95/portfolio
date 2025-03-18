<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<form class="d-flex align-items-center" id="autoSubmitForm" action="/updateItemsPerPage" method="POST">
	<label for="perPage" class="form-label text-nowrap me-2 mb-0">Hiện thị:</label>
	<select id="perPage" name="perPage" class="form-select">
		<option value="10" ${perPage==10?'selected':''}>10</option>
		<option value="20" ${perPage==20?'selected':''}>20</option>
		<option value="30" ${perPage==30?'selected':''}>30</option>
		<option value="40" ${perPage==40?'selected':''}>40</option>
		<option value="50" ${perPage==50?'selected':''}>50</option>
	</select>
</form>