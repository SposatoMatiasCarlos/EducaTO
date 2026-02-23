package com.example.backend.Persistence;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name="lezione")
public class Lezione {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name="titolo", nullable = false)
    private String title;

    @Column(name="description", nullable = false)
    private String description;

    @Column(name="points", nullable = false)
    private int points;

    @Column(name="difficulty", nullable = false)
    private String difficulty;

    @OneToMany(mappedBy="lezione", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Domanda> questions;


    @ManyToMany
    @JoinTable(
            name = "lezione_prerequisites",
            joinColumns = @JoinColumn(name = "lezione_id"),
            inverseJoinColumns = @JoinColumn(name = "prerequisite_id")
    )
    private List<Lezione> prerequisites;


    @ManyToOne
    @JoinColumn(name = "percorso_id", nullable = false)
    private Percorso percorso;


    public Lezione() {}

    public Lezione(String title, String descrizione, int points, String difficulty, List<Domanda> questionIds, List<Lezione>  prerequisites, Percorso percorso) {
        this.title = title;
        this.description = descrizione;
        this.points = points;
        this.difficulty = difficulty;
        this.questions = questionIds;
        this.percorso = percorso;
        this.prerequisites = prerequisites;
    }


    public int  getId() { return this.id; }
    public String getTitle() { return this.title; }
    public String getDescription() { return this.description; }
    public int getPoints() { return this.points; }
    public String getDifficulty() { return this.difficulty; }
    public List<Domanda> getQuestions() { return this.questions; }
    public List<Lezione> getPrerequisites() { return this.prerequisites; }

    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setPoints(int points) { this.points = points; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public void setQuestions(List<Domanda> questions) { this.questions = questions; }
    public void setPrerequisites(List<Lezione> prerequisites) { this.prerequisites = prerequisites; }
    public void setPercorso(Percorso percorso) { this.percorso = percorso; }
}
