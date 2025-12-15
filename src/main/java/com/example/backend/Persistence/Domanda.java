package com.example.backend.Persistence;

import java.util.List;

public class Domanda {

    private static int idcounter = 0;

    private int id;
    private String text;
    private List<String> options;
    private int correctOptionIndex;
    private String explanation;


    public Domanda(String text, List<String> options, int correctOptionIndex, String explanation) {
        this.text = text;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
        this.explanation = explanation;
        this.id = idcounter++;
    }


    public int getId() { return this.id; }
    public void setId() { this.id = idcounter++; }

    public String getText() { return this.text; }
    public List<String> getOptions() { return this.options; }
    public int getCorrectOptionIndex() { return this.correctOptionIndex; }
    public String getExplanation() { return this.explanation; }

}
