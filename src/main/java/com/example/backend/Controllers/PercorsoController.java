package com.example.backend.Controllers;


import com.example.backend.Persistence.Lezione;
import com.example.backend.Persistence.Percorso;
import com.example.backend.Services.LezioneService;
import com.example.backend.Services.PercorsoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/percorsi")
@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
public class PercorsoController {

    private final PercorsoService percorsoService;
    private final LezioneService lezioneService;

    public PercorsoController(PercorsoService percorsoService, LezioneService lezioneService) {
        this.lezioneService = lezioneService;
        this.percorsoService = percorsoService;
    }

    @GetMapping
    public ResponseEntity<List<Percorso>> getPercorsi() {
        List<Percorso> percorsi = percorsoService.getPercorsi();

        return ResponseEntity.ok(percorsi);
    }


    @GetMapping("/{id}/lezioni")
    public ResponseEntity<List<Lezione>> getLezioniFromPercorso(@PathVariable int id) {

        List<Lezione> lezioni = percorsoService.getLezioniFromPercorso(id);
        if (lezioni.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(lezioni);
    }


    @GetMapping("/lezioni")
    public ResponseEntity<List<Lezione>> getLezioni() {
        List<Lezione> lezioni =  lezioneService.getLezioni();
        return  ResponseEntity.ok(lezioni);
    }

    @GetMapping("/lezioni/count")
    public ResponseEntity<Integer> getNumeroLezioni(){
        int numerolezioni = lezioneService.getNumeroLezioni();
        return ResponseEntity.ok(numerolezioni);
    }

}
