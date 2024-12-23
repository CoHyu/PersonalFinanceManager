package view;

import service.UserService;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
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
            UserService userService = new UserService(connection);

            // 控制台交互
            Scanner scanner = new Scanne(System.in);
            System.out.println("欢迎使用个人账目管理系统");
            System.out.println("1. 注册");
            System.out.println("2. 登录");

            int choice = scanner.nextInt();
            scanner.nextLine(); // 处理换行符
            if (choice == 1) {
                System.out.print("用户名: ");
                String username = scanner.nextLine();
                System.out.print("密码: ");
                String password = scanner.nextLine();
                if (userService.register(username, password)) {
                    System.out.println("注册成功！");
                } else {
                    System.out.println("注册失败！");
                }
            } else if (choice == 2) {
                System.out.print("用户名: ");
                String username = scanner.nextLine();
                System.out.print("密码: ");
                String password = scanner.nextLine();
                if (userService.login(username, password) != null) {
                    System.out.println("登录成功！");
                } else {
                    System.out.println("登录失败！");
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
