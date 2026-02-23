package com.example.backend.Services;


import com.example.backend.Dto.CreateLezioneRequest;
import com.example.backend.Persistence.*;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LezioneService {

    private final LezioneRepo lezioneRepository;
    private final PercorsoRepo percorsoRepository;
    private final DomandaService domandaService;

    public LezioneService(DomandaService domandaService, LezioneRepo lezioneRepository, PercorsoRepo percorsoRepository) {
        this.lezioneRepository = lezioneRepository;
        this.percorsoRepository = percorsoRepository;
        this.domandaService = domandaService;
    }

    @PostConstruct
    @Transactional
    public void init() {
//        Percorso percorso2 = percorsoRepository.findByTitle("Informatica");
//
//        // Creiamo lezioni
//        Lezione lezione1 = lezioneRepository.save(new Lezione(
//                "Lezione Base",
//                "Introduzione alla programmazione",
//                10,
//                "Facile",
//                new ArrayList<>(),
//                new ArrayList<>(),
//                percorso2
//        ));
//
//        percorso2.getLessons().add(lezione1);
//        percorsoRepository.save(percorso2);


    }

    public Optional<Lezione> getLezioneById(int id) {
        return lezioneRepository.findById(id);
    }

    public int getNumeroLezioni() {
        return (int) lezioneRepository.count();
    }


    @Transactional
    public CreateLezioneRequest creaLezione(int idPercorso, CreateLezioneRequest request) {

        Percorso percorso = percorsoRepository.findById(idPercorso).orElse(null);
        if (percorso == null) return null;

        Lezione lezioneRequest = request.getLezione();
        List<Domanda> nuoveDomande = request.getDomande();

        if (lezioneRequest == null || nuoveDomande == null || nuoveDomande.isEmpty()) {
            return null;
        }

        List<Lezione> prerequisiti = percorso.getLessons()
                .stream()
                .filter(l -> l.getId() > 0)
                .toList();

        Lezione nuovaLezione = new Lezione();
        nuovaLezione.setTitle(lezioneRequest.getTitle());
        nuovaLezione.setDescription(lezioneRequest.getDescription());
        nuovaLezione.setDifficulty(lezioneRequest.getDifficulty());
        nuovaLezione.setPoints(lezioneRequest.getPoints());
        nuovaLezione.setPrerequisites(prerequisiti);
        nuovaLezione.setPercorso(percorso);

        Lezione salvata = lezioneRepository.save(nuovaLezione);

        List<Domanda> domandeCreate = domandaService.creaDomande(nuoveDomande, salvata);
        if (domandeCreate.isEmpty()) return null;

        salvata.setQuestions(domandeCreate);
        // niente secondo save necessario se cascade è corretto

        return new CreateLezioneRequest(salvata, domandeCreate);
    }

    public List<Domanda> getDomandeFromLezione(int idPercorso, int idLezione) {

        Percorso percorso = percorsoRepository.findById(idPercorso)
                .orElse(null);
        if (percorso == null) return null;

        Lezione lezione = lezioneRepository.findById(idLezione)
                .orElse(null);
        if (lezione == null) return null;

        if (!percorso.getLessons().contains(lezione)) {
            return null;
        }

        return lezione.getQuestions();
    }

}