package com.example.backend.Dto;

import com.example.backend.Persistence.Domanda;

import java.util.List;

public class StartResponse {
    public List<Domanda> domande;
    public int vite;
    public int errori;
    public String message;
}