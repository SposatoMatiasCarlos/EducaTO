package com.example.backend.Persistence;

import java.util.ArrayList;
import java.util.List;

public class User {

    static int idcounter;

    private int id;
    private String username;
    private String password;
    private int avatarId;
    private String ruolo;
    private int points;
    private String badge;
    private List<Integer> completedLessons;
    private List<Integer> bonusReceived;

    public User(String username, String password, int avatarId, String ruolo, int points, String badge) {
        this.id = idcounter++;
        this.username = username;
        this.password = password;
        this.avatarId = avatarId;
        this.ruolo = ruolo;
        this.points = points;
        this.badge = badge;
        this.completedLessons = new ArrayList<>();
        this.bonusReceived = new ArrayList<>();
    }


    public int getId() {return this.id; }
    public String getUsername() { return this.username; }
    public String getPassword() { return this.password; }
    public int getAvatarId() { return this.avatarId; }
    public String getRuolo() { return this.ruolo; }
    public int getPoints() { return this.points; }
    public String getBadge() { return this.badge; }
    public List<Integer> getCompletedLessons() { return this.completedLessons; }
    public List<Integer> getBonusReceived() { return this.bonusReceived; }

    public void setAvatarId(int avatarId) { this.avatarId = avatarId; }
    public void setPoints(int points) { this.points = points; }
    public void setRuolo(String ruolo) { this.ruolo = ruolo; }
}
