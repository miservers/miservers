package lab.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import lab.spring.jpa.User;
import lab.spring.jpa.UserDao;

public class UserService {

    @Autowired
    private UserDao userDao;

    public List<User> findAll() {
        List<User> users = userDao.findAll();
        return users;
    }


    public UserDao getUserDao() {
        return userDao;
    }

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}
