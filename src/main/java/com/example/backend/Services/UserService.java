package com.example.backend.Services;

import com.example.backend.Persistence.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    List<User> users;

    public UserService() {
        users = new ArrayList<>();

        users.add(new User(
                "mati",
                "temp",
                0,
                "studente",
                0,
                "Barbone di dio"
        ));

        users.add(new User(
                "hudson",
                "temp",
                1,
                "admin",
                100000,
                "Challenger"
        ));
    }


    public List<User> getUsers() {
        return users;
    }


    public User findByUsername(String username) {
        return users.stream()
                .filter(u -> u.getUsername().equals(username))
                .findFirst()
                .orElse(null);
    }



    public Optional<User> login(String username, String password) {
        return users.stream()
                .filter(u -> u.getUsername().equals(username) && u.getPassword().equals(password))
                .findFirst();
    }


}
