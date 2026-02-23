package com.example.backend.Services;

import com.example.backend.Persistence.*;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PercorsoService {

    private final PercorsoRepo percorsoRepo;


    public PercorsoService(PercorsoRepo percorsoRepo) {
        this.percorsoRepo = percorsoRepo;
    }

    @PostConstruct
    public void init(){
        percorsoRepo.save(new Percorso("Finanza"));
        percorsoRepo.save(new Percorso("Informatica"));
    }

    public List<Percorso> getPercorsi() {
        return this.percorsoRepo.findAll();
    }


    public List<Lezione> getLezioniFromPercorso(int id) {
        Percorso percorso = percorsoRepo.findById(id).orElse(null);
        if (percorso == null) return List.of();

        return percorso.getLessons();
    }


    @Transactional
    public Percorso addNewPercorso(Percorso percorso) {

        if (percorso == null || percorso.getTitle() == null) return null;

        String titolo = percorso.getTitle().trim();
        if (titolo.isEmpty()) return null;

        // controllo duplicati nel DB
        if (percorsoRepo.existsByTitleIgnoreCase(titolo)) {
            return null;
        }

        Percorso nuovoPercorso = new Percorso();
        nuovoPercorso.setTitle(percorso.getTitle());
        nuovoPercorso.setLessons(new ArrayList<>());
        return percorsoRepo.save(nuovoPercorso);
    }


}
