package com.j4fptit.utils;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebFilter("/*")
public class FilterParam implements HttpFilter {
	@Override
	public void doFilter(HttpServletRequest request, HttpServletResponse resp, FilterChain chain)
			throws IOException, ServletException {
		String linkHref = "";
		String search = request.getParameter("search");
		int page = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));

		request.setAttribute("currentPage", page);

		String perPage = request.getParameter("perPage");
		if (search != null) {
			linkHref += "&search=" + search;
			request.setAttribute("search", search);
		}

		if (perPage != null) {
			linkHref += "&perPage=" + perPage;
			request.setAttribute("perPage", perPage);
		}

		request.setAttribute("linkHref", linkHref);
		request.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");

		chain.doFilter(request, resp);
	}

}
