package com.example.backend.Persistence;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name="cartella")
public class Cartella {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name="nome", unique=true, nullable=false)
    private String nome;


    @OneToMany(mappedBy = "cartella", cascade = CascadeType.ALL)
    private List<Articolo> articoli;


    public Cartella() { this.articoli = new ArrayList<>(); }

    public Cartella(String nome, List<Articolo> articoli){
        this.nome = nome;
        this.articoli =  articoli;
    }

    public Cartella(String nome){
        this.nome = nome;
        this.articoli = new ArrayList<>();
    }



    public int getId(){ return this.id;}

    public String getNome(){ return this.nome;}
    public void setNome(String nome) { this.nome = nome; }

    public List<Articolo> getArticoli(){ return this.articoli;}
    public void setArticoli(List<Articolo> articoli){ this.articoli = articoli; }
}
