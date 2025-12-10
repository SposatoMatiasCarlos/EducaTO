package com.example.backend.Persistence;

import java.util.List;

public class Percorso {

    private static int idcounter = 0;

    private int id;
    private String title;
    private List<Integer> lessons;


    public Percorso(String title, List<Integer> lezioni){
        this.id = idcounter++;
        this.title = title;
        this.lessons = lezioni;
    }


    public int getId() { return this.id; }
    public void setId() { this.id = idcounter++; }

    public String getTitle() { return this.title; }

    public List<Integer> getLessons() { return this.lessons; }
    public void setLessons(List<Integer> lessons) { this.lessons = lessons; }
}
