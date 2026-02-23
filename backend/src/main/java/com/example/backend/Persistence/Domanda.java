package com.example.backend.Persistence;

import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name="domanda")
public class Domanda {


    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Column(name="text", length=100, nullable=false)
    private String text;

    @Column(name="options",  length=100, nullable=false)
    private List<String> options;

    @Column(name="correctOptionIndex", nullable = false)
    private int correctOptionIndex;

    @Column(name="explanation",  length=100)
    private String explanation;

    @ManyToOne
    @JoinColumn(name = "lezione_id", nullable = false)
    private Lezione lezione;

    public Domanda() {}

    public Domanda(String text, List<String> options, int correctOptionIndex, String explanation, Lezione lezione) {
        this.text = text;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
        this.explanation = explanation;
        this.lezione = lezione;
    }


    public int getId() { return this.id; }
    public String getText() { return this.text; }
    public List<String> getOptions() { return this.options; }
    public int getCorrectOptionIndex() { return this.correctOptionIndex; }
    public String getExplanation() { return this.explanation; }


    public void setLezione(Lezione lezione){ this.lezione = lezione; }
}
