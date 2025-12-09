package com.example.backend.Persistence;

public class Articolo {

    private static int idcounter;

    private int id;
    private String title;
    private String author;
    private String content;


    public Articolo(String author, String title, String content){
        this.title = title;
        this.author = author;
        this.content = content;
        this.id = idcounter++;
    }


    public int getId(){ return this.id; }
    public String getTitle(){ return this.title; }
    public String getAuthor(){ return this.author; }
    public String getContent(){ return this.content; }
}
