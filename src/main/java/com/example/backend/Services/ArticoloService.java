package com.example.backend.Services;

import com.example.backend.Persistence.Articolo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class ArticoloService {

    private List<Articolo> articoli;
    public ArticoloService() {
        articoli = new ArrayList<>();

        articoli.add(new Articolo(
                "hudson",
                "Domanda e Offerta",
                "La legge della domanda e dell’offerta descrive come i prezzi si determinano nei mercati."
        ));

        articoli.add(new Articolo(
                "hudson",
                "Inflazione e Deflazione",
                "L’inflazione indica un aumento generale dei prezzi, la deflazione una loro diminuzione."
        ));

        articoli.add(new Articolo(
                "hudson",
                "PIL e Indicatori Economici",
                "Il PIL misura la ricchezza prodotta in un paese. Altri indicatori includono disoccupazione e tassi di interesse."
        ));
    }


    public List<Articolo> getArticoli() {
        return this.articoli;
    }

    public Articolo getArticolo(int id) {
        return articoli.stream()
                .filter(a -> a.getId() == id)
                .findFirst()
                .orElse(null);
    }

}
