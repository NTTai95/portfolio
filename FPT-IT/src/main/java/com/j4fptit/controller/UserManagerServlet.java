package com.j4fptit.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.j4fptit.dao.UserDAO;
import com.j4fptit.model.User;
import com.j4fptit.utils.PageShow;

/**
 * Servlet implementation class UserManagerServlet
 */
@MultipartConfig
@WebServlet("/users/manager")
public class UserManagerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public UserManagerServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String jspPath = PageShow.Page404.getJspPath();
		User user = request.getSession().getAttribute("userLogin") == null ? null
				: ((User) request.getSession().getAttribute("userLogin"));
		if (user != null) {
			jspPath = PageShow.USERS_MANAGER.getJspPath();
			user = UserDAO.findById(user.getId());
			request.getSession().setAttribute("userLogin", user);
		}

		String alert = request.getSession().getAttribute("alert") == null ? null
				: (String) request.getSession().getAttribute("alert");
		request.setAttribute("alert", alert);
		request.getSession().removeAttribute("alert");

		String toTab = request.getSession().getAttribute("toTab") == null ? null
				: (String) request.getSession().getAttribute("toTab");
		request.setAttribute("toTab", toTab);
		request.getSession().removeAttribute("toTab");

		String fillPassword = request.getSession().getAttribute("fillPassword") == null ? null
				: request.getSession().getAttribute("fillPassword").toString();
		request.removeAttribute("password");
		if (fillPassword != null) {
			request.setAttribute("password", user.getPassword());
			request.getSession().removeAttribute("fillPassword");
		}

		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
		response.setHeader("Pragma", "no-cache");
		response.setDateHeader("Expires", 0);
		request.setAttribute("jspPath", jspPath);
		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String displayName = new String(
				(request.getParameter("displayName") == null ? "" : request.getParameter("displayName"))
						.getBytes("ISO-8859-1"),
				"UTF-8");
		String introduction = new String(
				(request.getParameter("introduction") == null ? "" : request.getParameter("introduction"))
						.getBytes("ISO-8859-1"),
				"UTF-8");
		String email = request.getParameter("email");

		Part imagePart = request.getPart("avatar");
		String fileName = imagePart.getSubmittedFileName();

		User userLogin = (User) request.getSession().getAttribute("userLogin");

		User user = UserDAO.findByEmail(email);

		System.out.println("----" + user.getId());
		System.out.println("----" + userLogin.getId());
		System.out.println("----2" + (user.getId() != userLogin.getId()));
		if (user != null && !(user.getId().equals(userLogin.getId()))) {
			request.setAttribute("errEmail", "*Email đã được sử dụng!");
		} else {
			userLogin.setDisplayName(displayName);
			userLogin.setIntroduction(introduction);
			userLogin.setEmail(email);
			if (fileName != null && !fileName.equals("")) {
				String newFileName = "avatarUser" + userLogin.getId() + ".png";

				String uploadPath = getServletContext().getRealPath("/view/image/");

				String filePath = uploadPath + newFileName;

				try {
					imagePart.write(filePath);
					userLogin.setAvatar(newFileName);
				} catch (IOException e) {
					response.getWriter().print("Không thể ghi tệp lên đĩa: " + e.getMessage());
					e.printStackTrace();
				}
			}
			userLogin.update();
			request.getSession().setAttribute("userLogin", userLogin);

			response.sendRedirect("/JAVA4_NEW/users/manager");
			return;
		}

		doGet(request, response);
	}

}
