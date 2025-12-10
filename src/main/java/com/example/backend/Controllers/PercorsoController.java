package com.example.backend.Controllers;


import com.example.backend.Persistence.Domanda;
import com.example.backend.Persistence.Lezione;
import com.example.backend.Persistence.Percorso;
import com.example.backend.Services.DomandaService;
import com.example.backend.Services.LezioneService;
import com.example.backend.Services.PercorsoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/percorsi")
@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
public class PercorsoController {

    private final PercorsoService percorsoService;
    private final LezioneService lezioneService;
    private final DomandaService domandeService;

    public PercorsoController(PercorsoService percorsoService, LezioneService lezioneService, DomandaService domandeService) {
        this.lezioneService = lezioneService;
        this.percorsoService = percorsoService;
        this.domandeService = domandeService;
    }

    @GetMapping("")
    public ResponseEntity<List<Percorso>> getPercorsi() {
        List<Percorso> percorsi = percorsoService.getPercorsi();

        return ResponseEntity.ok(percorsi);
    }

    @PostMapping("")
    public ResponseEntity<Percorso> addNewPercorso(@RequestBody Percorso percorso) {
        Percorso nuovoPercorso = percorsoService.addNewPercorso(percorso);

        if(nuovoPercorso == null){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(nuovoPercorso);
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


    @GetMapping("/{idPercorso}/lezioni/{idLezione}/domande")
    public ResponseEntity<List<Domanda>> getDomandeFromLezione(@PathVariable int idLezione, @PathVariable int idPercorso) {

        if (percorsoService.getPercorsoById(idPercorso) == null) return ResponseEntity.notFound().build();

        Lezione lezione = lezioneService.getLezioneById(idLezione);
        if (lezione == null) {
            return ResponseEntity.notFound().build();
        }

        List<Integer> questionIds = lezione.getQuestionIds();
        if (questionIds.isEmpty()) { return ResponseEntity.noContent().build(); }

        // Recupera le domande dal servizio
        List<Domanda> domande = domandeService.getDomandeByIds(questionIds);

        return ResponseEntity.ok(domande);
    }


}
