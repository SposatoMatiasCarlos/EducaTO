package com.example.backend.Services;

import com.example.backend.Persistence.Articolo;
import com.example.backend.Persistence.ArticoloRepo;
import com.example.backend.Persistence.Cartella;
import com.example.backend.Persistence.CartellaRepo;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ArticoloService {

    private final ArticoloRepo articoliRepo;
    private final CartellaRepo cartellaRepo;

    public ArticoloService(ArticoloRepo articoliRepo, CartellaRepo cartellaRepo) {
        this.articoliRepo = articoliRepo;
        this.cartellaRepo = cartellaRepo;
    }


    @PostConstruct
    @Transactional
    public void init(){
//        Cartella cartella = cartellaRepo.findByNome("Finanza");
//
//        Articolo articolo = articoliRepo.save(new Articolo(
//                "hudson",
//                "Domanda e Offerta",
//                "La legge della domanda e dell’offerta descrive come i prezzi si determinano nei mercati.",
//                cartella
//        ));
//
//        cartella.getArticoli().add(articolo);
//        cartellaRepo.save(cartella);
    }


    public List<Articolo> getArticoli() {
        return articoliRepo.findAll();
    }

    public Optional<Articolo> getArticolo(int id) {
        return articoliRepo.findById(id);
    }


    @Transactional
    public Articolo addNewArticolo(int cartellaId, Articolo articolo) {
        // Validazioni base
        if (articolo.getTitle() == null || articolo.getTitle().isBlank()
                || articolo.getContent() == null || articolo.getContent().isBlank()
                || articolo.getAuthor() == null || articolo.getAuthor().isBlank()) {
            return null;
        }

        // Trova la cartella
        Cartella cartella = cartellaRepo.findById(cartellaId).orElse(null);
        if (cartella == null) return null;

        Articolo nuovoArticolo = new Articolo(articolo.getAuthor(), articolo.getTitle(), articolo.getContent(), cartella);
        articoliRepo.save(nuovoArticolo);

        // Aggiungi alla cartella
        if (cartella.getArticoli() == null) {
            cartella.setArticoli(new ArrayList<>());
        }
        cartella.getArticoli().add(nuovoArticolo);


        return nuovoArticolo;
    }

}
