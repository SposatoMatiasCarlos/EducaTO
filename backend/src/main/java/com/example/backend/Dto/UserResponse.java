package com.example.backend.Dto;

import com.example.backend.Persistence.User;

import java.util.List;

public class UserResponse {

    private List<User> users;
    private int totalNum;

    public UserResponse(List<User> users, int num){
        this.users = users;
        this.totalNum = num;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public int getTotalNum() {
        return totalNum;
    }

    public void setTotalNum(int totalNum) {
        this.totalNum = totalNum;
    }
}
