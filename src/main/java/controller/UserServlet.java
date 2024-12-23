package controller;

import service.UserService;
import model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;

@WebServlet("/user")
public class UserServlet extends HttpServlet {
    private UserService userService;

    @Override
    public void init() throws ServletException {
        try {
            // 显式加载 MySQL JDBC 驱动
            Class.forName("com.mysql.jdbc.Driver");

            // 连接数据库
            Connection connection = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/book?useSSL=false&serverTimezone=UTC",
                    "root",  // 数据库用户名
                    "root"   // 数据库密码
            );

            // 创建 UserService 对象
            userService = new UserService(connection);
        } catch (Exception e) {
            throw new ServletException("初始化数据库连接失败", e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String action = request.getParameter("action");
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            if ("register".equals(action)) {
                boolean success = userService.register(username, password);
                response.getWriter().write("{\"success\":" + success + "}");
            } else if ("login".equals(action)) {
                User user = userService.login(username, password);
                response.getWriter().write("{\"success\":" + (user != null) + "}");
            }
        } catch (Exception e) {
            response.getWriter().write("{\"success\":false, \"error\":\"" + e.getMessage() + "\"}");
        }
    }
}