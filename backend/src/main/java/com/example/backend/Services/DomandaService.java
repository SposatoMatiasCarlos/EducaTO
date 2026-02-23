package com.example.backend.Services;

import com.example.backend.Persistence.*;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DomandaService {

    private final DomandaRepo domandeRepository;
    private final LezioneRepo lezioneRepository;

    public DomandaService(DomandaRepo domandeRepository, LezioneRepo lezioneRepository) {
        this.domandeRepository = domandeRepository;
        this.lezioneRepository = lezioneRepository;
    }

    @PostConstruct
    @Transactional
    public void init(){

//        Lezione lezione = lezioneRepository.findByTitle("Lezione Base");
//
//        Domanda domanda = domandeRepository.save(new Domanda(
//                "Qual è la capitale d'Italia?",
//                Arrays.asList("Roma", "Milano", "Napoli", "Torino"),
//                0,
//                "La capitale d'Italia è Roma.",
//                lezione
//        ));
//
//        lezione.getQuestions().add(domanda);
//        lezioneRepository.save(lezione);
    }

    public List<Domanda> getDomandeByIds(List<Integer> ids) {
        if (ids == null || ids.isEmpty()) return new ArrayList<>();

        return domandeRepository.findAllByIdIn(ids);
    }

    public Optional<Domanda> getDomandaById(int id) {
        return  domandeRepository.findById(id);
    }

    @Transactional
    public List<Domanda> creaDomande(List<Domanda> nuoveDomande, Lezione lezione) {
        if (nuoveDomande == null || nuoveDomande.isEmpty()) {
            return new ArrayList<>();
        }

        List<Domanda> create = new ArrayList<>();

        for (Domanda d : nuoveDomande) {

            // Se una domanda non è valida salta alla successiva
            if (d.getText() == null || d.getText().isBlank() || d.getOptions() == null || d.getOptions().isEmpty()) {
                continue;
            }

            Domanda nuova = new Domanda(
                    d.getText(),
                    new ArrayList<>(d.getOptions()),
                    d.getCorrectOptionIndex(),
                    d.getExplanation(),
                    lezione
            );

            domandeRepository.save(nuova);
            create.add(nuova);
        }

        return create;
    }
}
