package com.example.backend.Persistence;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "percorso")
public class Percorso {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name="title",  nullable=false, unique=true)
    private String title;

    @OneToMany(mappedBy = "percorso", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Lezione> lessons;


    public Percorso() {}

    public Percorso(String title){
        this.title = title;
        this.lessons = new ArrayList<>();
    }

    public int getId() { return this.id; }
    public String getTitle() { return this.title; }
    public List<Lezione> getLessons() { return this.lessons; }

    public void setTitle(String title) { this.title = title; }
    public void setLessons(List<Lezione> lessons) { this.lessons = lessons; }
}
