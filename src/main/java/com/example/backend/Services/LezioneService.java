package com.example.backend.Services;


import com.example.backend.Persistence.Lezione;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LezioneService {

    List<Lezione> lezioni;

    public LezioneService() {
        lezioni = new ArrayList<>();

        lezioni.add(new Lezione("Interesse semplice", "Concetti base: entrate, uscite, risparmio e investimenti.", 10, "easy", List.of(101,102,103,104,105), List.of()));
        lezioni.add(new Lezione("Interesse composto", "Come creare un budget efficace e risparmiare senza sforzi.", 10, "easy", List.of(201,202,203,204,205), List.of(0)));
        lezioni.add(new Lezione("Investimenti base", "Azioni, obbligazioni, ETF e diversificazione.", 20, "medium", List.of(301,302,303,304,305), List.of(1)));
        lezioni.add(new Lezione("Mercati finanziari moderni", "Derivati, fintech e nuovi strumenti digitali.", 30, "hard", List.of(401,402,403,404,405), List.of(2)));
        lezioni.add(new Lezione("Risparmio e budgeting", "Creare un piano di risparmio efficace.", 10, "easy", List.of(501,502,503,504,505), List.of(3)));
        lezioni.add(new Lezione("Debito e credito", "Gestire prestiti e carte di credito.", 20, "medium", List.of(506,507,508,509,510), List.of(4)));
        lezioni.add(new Lezione("ETF avanzati", "Tipi di ETF e strategie di investimento.", 30, "hard", List.of(511,512,513,514,515), List.of(5)));
        lezioni.add(new Lezione("Criptovalute e blockchain", "Investimenti digitali e sicurezza.", 30, "hard", List.of(516,517,518,519,520), List.of(6)));

        lezioni.add(new Lezione("Fondamenti di contabilità", "Attività, passività, patrimonio netto e principi contabili.", 10, "easy", List.of(101), List.of()));
        lezioni.add(new Lezione("Partita doppia", "Come funzionano movimenti dare e avere.", 10, "easy", List.of(101), List.of(8)));
    }

    public List<Lezione> getLezioni() {
        return lezioni;
    }

    public Lezione getLezione(int id){
        return lezioni.stream()
                .filter(a -> a.getId() == id)
                .findFirst()
                .orElse(null);
    }

    public int getNumeroLezioni(){
        return lezioni.size();
    }
}