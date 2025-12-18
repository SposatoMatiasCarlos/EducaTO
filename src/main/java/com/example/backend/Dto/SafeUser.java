package com.example.backend.Dto;

import com.example.backend.Persistence.Lezione;
import com.example.backend.Persistence.User;

import java.util.List;

public class SafeUser {
    private String username;
    private int avatarId;
    private String ruolo;
    private int points;
    private List<Lezione> completedLessons;

    public SafeUser(User user) {
        this.username = user.getUsername();
        this.avatarId = user.getAvatarId();
        this.ruolo = user.getRuolo();
        this.points = user.getPoints();
        this.completedLessons = user.getCompletedLessons();
    }

    public String getUsername() { return username; }
    public int getAvatarId() { return avatarId; }
    public String getRuolo() { return ruolo; }
    public int getPoints() { return points; }
    public List<Lezione> getCompletedLessons() { return completedLessons; }
}
