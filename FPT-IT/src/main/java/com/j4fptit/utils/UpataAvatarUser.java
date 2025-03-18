package com.j4fptit.utils;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.j4fptit.dao.UserDAO;
import com.j4fptit.model.User;

/**
 * Servlet implementation class UpataAvatarUser
 */
@WebServlet("/UpataAvatarUser")
public class UpataAvatarUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public UpataAvatarUser() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String appPath = request.getServletContext().getRealPath("");
		UserDAO.setSize(1000);
		for(User user : UserDAO.findAll()) {
			String fileName = RandomAvatar.createRandomAvatar("avatarUser"+user.getId()+".png", appPath);
			user.setAvatar(fileName);
			user.update();
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
