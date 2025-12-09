package com.example.backend.Persistence;

import java.util.ArrayList;
import java.util.List;

public class Cartella {

    private static int idcounter = 0;

    private int id;
    private String nome;
    private List<Integer> articoli;



    public Cartella() {
        this.articoli = new ArrayList<>();
        this.id = idcounter++;
    }


    public Cartella(String nome, List<Integer> articoli){
        this.id = idcounter++;
        this.nome = nome;
        this.articoli =  articoli;
    }




    public int getId(){ return this.id;}
    public void setId(){ this.id = idcounter++;}

    public String getNome(){ return this.nome;}
    public void setNome(String nome) { this.nome = nome; }


    public List<Integer> getArticoli(){ return this.articoli;}
    public void setArticoli(List<Integer> articoli) { this.articoli = articoli; }
}
