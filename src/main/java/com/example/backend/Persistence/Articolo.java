package com.example.backend.Persistence;


import jakarta.persistence.*;

@Entity
@Table(name="articolo")
public class Articolo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name="title", unique = true,  nullable = false)
    private String title;

    @Column(name="author", nullable = false)
    private String author;

    @Column(name="content", nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "cartella_id", nullable = false)
    private Cartella cartella;

    public Articolo(){}

    public Articolo(String author, String title, String content, Cartella cartella){
        this.title = title;
        this.author = author;
        this.content = content;
        this.cartella = cartella;
    }


    public int getId(){ return this.id; }
    public void setId(int id){ this.id = id; }

    public String getTitle(){ return this.title; }
    public String getAuthor(){ return this.author; }
    public String getContent(){ return this.content; }
}
