package com.example.backend.Session;

import com.example.backend.Persistence.User;

public class SessionData {

    private User user;
    private String message;

    public SessionData(User user, String message){
        this.user = user;
        this.message = message;
    }

    public User getUser() { return user; }
    public String getMessage() { return message; }

}
