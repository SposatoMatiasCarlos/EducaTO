package com.example.backend.Dto;

import com.example.backend.Persistence.Domanda;
import com.example.backend.Persistence.Lezione;

import java.util.List;

public class CreateLezioneRequest {
    private Lezione lezione;
    private List<Domanda> domande;

    public CreateLezioneRequest(Lezione lezione, List<Domanda> domande) {
        this.lezione = lezione;
        this.domande = domande;
    }

    // getter e setter
    public Lezione getLezione() { return lezione; }
    public void setLezione(Lezione lezione) { this.lezione = lezione; }

    public List<Domanda> getDomande() { return domande; }
    public void setDomande(List<Domanda> domande) { this.domande = domande; }
}