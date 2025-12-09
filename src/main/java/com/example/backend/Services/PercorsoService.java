package com.example.backend.Services;

import com.example.backend.Persistence.Lezione;
import com.example.backend.Persistence.Percorso;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PercorsoService {

    private List<Percorso> percorsi;
    private LezioneService lezioneService;

    public PercorsoService(LezioneService lezioneService) {
        this.lezioneService = lezioneService;

        percorsi = new ArrayList<Percorso>();

        percorsi.add(new Percorso("Finanza", List.of(1,2,3,4,17,18,19,20)));
        percorsi.add(new Percorso("Contabilità", List.of(8, 9)));

    }

    public List<Percorso> getPercorsi() { return this.percorsi; }


    public Percorso getPercorso(int id) {
        return percorsi.stream()
                .filter(p -> p.getId() == id)
                .findFirst()
                .orElse(null);
    }



    public List<Lezione> getLezioniFromPercorso(int id) {
        Percorso percorso = getPercorso(id);
        if (percorso == null) return new ArrayList<>();

        List<Lezione> result = new ArrayList<>();

        for (Integer lezId : percorso.getLessons()) {
            Lezione lezione = lezioneService.getLezione(lezId);

            if (lezione != null) {
                result.add(lezione);
            }
        }

        return result;
    }



}
