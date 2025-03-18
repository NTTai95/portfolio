package com.j4fptit.utils;

public enum PageShow {
	QUESTIONS("/JAVA4_NEW/questions", "./component/client/questions.jsp"),
	USERS("/JAVA4_NEW/users", "./component/client/users.jsp"), TAGS("/JAVA4_NEW/tags", "./component/client/tags.jsp"),
	ADMIN_SETTING("/JAVA4_NEW/admin/setting", "./component/admin/settingAdmin.jsp"),
	REGISTER("/JAVA4_NEW/register", "./component/register.jsp"), LOGIN("/JAVA4_NEW/login", "./component/login.jsp"),
	QUESTIONS_DETAIL("/JAVA4_NEW/questions/detail", "./component/client/questionDetail.jsp"),
	QUESTIONS_MANAGER("/JAVA4_NEW/questions/manager", "./component/client/questionManager.jsp"),
	USERS_INFO("/JAVA4_NEW/users/info", "./component/client/userInfo.jsp"),
	USERS_MANAGER("/JAVA4_NEW/users/manager", "./component/client/userManager.jsp"),
	HOME("/JAVA4_NEW/home", "./component/client/home.jsp"),
	TAGS_MANAGER("/JAVA4_NEW/tags/manager", "./component/client/tagManager.jsp"),
	FORGET_PASSWORD("/JAVA4_NEW/forgetPassword", "./component/forgetPassword.jsp"),
	Page404("/JAVA4_NEW/404", "./component/page404.jsp");

	private final String uri;
	private final String jspPath;

	PageShow(String uri, String jspPath) {
		this.uri = uri;
		this.jspPath = jspPath;
	}

	public String getUri() {
		return uri;
	}

	public String getJspPath() {
		return jspPath;
	}
}
