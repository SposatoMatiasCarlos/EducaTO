package com.example.backend.Services;

import com.example.backend.Persistence.Cartella;
import com.example.backend.Persistence.Domanda;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DomandaService {

    List<Domanda> domande;

    public DomandaService() {
        domande = new ArrayList<>();

        // Domanda 1
        domande.add(new Domanda(
                "Qual è la capitale d'Italia?",
                Arrays.asList("Roma", "Milano", "Napoli", "Torino"),
                0,
                "La capitale d'Italia è Roma."
        ));

        // Domanda 2
        domande.add(new Domanda(
                "Qual è il risultato di 5 + 7?",
                Arrays.asList("10", "12", "14", "11"),
                1,
                "5 + 7 fa 12."
        ));

        // Domanda 3
        domande.add(new Domanda(
                "Quale pianeta è conosciuto come il Pianeta Rosso?",
                Arrays.asList("Terra", "Venere", "Marte", "Giove"),
                2,
                "Marte è chiamato Pianeta Rosso per via del suo colore."
        ));

        // Domanda 4
        domande.add(new Domanda(
                "In quale anno Cristoforo Colombo scoprì l'America?",
                Arrays.asList("1492", "1500", "1482", "1512"),
                0,
                "Cristoforo Colombo scoprì l'America nel 1492."
        ));

        // Domanda 5
        domande.add(new Domanda(
                "Qual è l'elemento chimico con simbolo 'O'?",
                Arrays.asList("Oro", "Ossigeno", "Osmio", "Oganesson"),
                1,
                "Il simbolo 'O' indica l'Ossigeno."
        ));
    }

    public List<Domanda> getDomandeByIds(List<Integer> ids) {
        if (ids == null || ids.isEmpty()) return new ArrayList<>();

        return domande.stream()
                .filter(d -> ids.contains(d.getId()))
                .collect(Collectors.toList());
    }

    // Utile: restituire tutte le domande
    public List<Domanda> getAllDomande() {
        return new ArrayList<>(domande);
    }

    // Utile: cercare una domanda per id
    public Domanda getDomandaById(int id) {
        return domande.stream()
                .filter(d -> d.getId() == id)
                .findFirst()
                .orElse(null);
    }
}
