package com.example.backend.Persistence;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name="users")
public class User {


    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Column(name="username", unique = true, nullable = false)
    private String username;

    @Column(name="password", nullable = false)
    private String password;

    @Column(name="avatarId", nullable = false)
    private int avatarId;

    @Column(name="ruolo", nullable = false)
    private String ruolo;

    @Column(name="points", nullable = false)
    private int points;

    @Column(name="badge", nullable = false)
    private String badge;

    @ManyToMany
    @JoinTable(
            name = "user_completed_lessons",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "lesson_id")
    )
    private List<Lezione> completedLessons;


    @ManyToMany
    @JoinTable(
            name = "user_percorsi_completati",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "percorso_id")
    )
    private List<Percorso> bonusReceived;


    public User() {}

    public User(String username, String password, int avatarId, String ruolo, int points, String badge) {
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
    public List<Lezione> getCompletedLessons() { return this.completedLessons; }
    public List<Percorso> getBonusReceived() { return this.bonusReceived; }

    public void setAvatarId(int avatarId) { this.avatarId = avatarId; }
    public void setPoints(int points) { this.points = points; }
    public void setRuolo(String ruolo) { this.ruolo = ruolo; }
}
