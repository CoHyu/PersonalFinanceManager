package service;

import dao.UserDao;
import model.User;

import java.sql.Connection;

public class UserService {
    private UserDao userDao;

    public UserService(Connection connection) {
        this.userDao = new UserDao(connection);
    }

    public boolean register(String username, String password) {
        try {
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            return userDao.register(user);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public User login(String username, String password) {
        try {
            return userDao.login(username, password);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
