package com.example.backend.Persistence;

import java.util.ArrayList;
import java.util.List;

public class Lezione {

    private static int idcounter = 0;

    private int id;
    private String title;
    private String description;
    private int points;
    private String difficulty;
    private List<Integer> questionIds;
    private List<Integer> prerequisites;


    public Lezione(String title, String descrizione, int points, String difficulty,
                   List<Integer> questionid, List<Integer> prerequisites) {
        this.id = idcounter++;
        this.title = title;
        this.description = descrizione;
        this.points = points;
        this.difficulty = difficulty;
        this.questionIds = questionid != null ? questionid : new ArrayList<>();
        this.prerequisites = prerequisites != null ? prerequisites : new ArrayList<>();
    }


    public int  getId() { return this.id; }
    public String getTitle() { return this.title; }
    public String getDescription() { return this.description; }
    public int getPoints() { return this.points; }
    public String getDifficulty() { return this.difficulty; }
    public List<Integer> getQuestionIds() { return this.questionIds; }
    public List<Integer> getPrerequisites() { return this.prerequisites; }
}
