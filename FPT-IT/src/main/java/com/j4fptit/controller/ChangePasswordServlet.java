package com.j4fptit.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.UserDAO;
import com.j4fptit.model.User;
import com.j4fptit.utils.PageShow;

/**
 * Servlet implementation class ChangePasswordServlet
 */
@WebServlet("/users/manager/changePassword")
public class ChangePasswordServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ChangePasswordServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String jspPath = PageShow.Page404.getJspPath();
		
		request.setAttribute("jspPath", jspPath);
		
		request.getRequestDispatcher("/view/index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String password = request.getParameter("password");
		String newPassword = request.getParameter("newPassword");
		String newPasswordAgain = request.getParameter("newPasswordAgain");
		User user = (User) request.getSession().getAttribute("userLogin");
		
		if(!user.getPassword().equals(password)) {
			request.getSession().setAttribute("errPassword", "*Mật khẩu không đúng!");
			request.getSession().setAttribute("password", password);
			request.getSession().setAttribute("newPassword", newPassword);
			request.getSession().setAttribute("newPasswordAgain", newPasswordAgain);
			response.sendRedirect("/JAVA4_NEW/users/manager");
		}else {
			request.getSession().removeAttribute("errPassword");
			request.getSession().removeAttribute("password");
			request.getSession().removeAttribute("newPassword");
			request.getSession().removeAttribute("newPasswordAgain");
			user.setPassword(newPassword);
			UserDAO.update(user);
			request.getSession().setAttribute("userLogin", user);
			request.getSession().setAttribute("alert", "Đổi mật khẩu thành công!");
			response.sendRedirect("/JAVA4_NEW/users/manager");
		}
	}

}
