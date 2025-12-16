package com.example.backend.Controllers;


import com.example.backend.Dto.CreateLezioneRequest;
import com.example.backend.Persistence.Domanda;
import com.example.backend.Persistence.Lezione;
import com.example.backend.Persistence.Percorso;
import com.example.backend.Persistence.User;
import com.example.backend.Services.DomandaService;
import com.example.backend.Services.LezioneService;
import com.example.backend.Services.PercorsoService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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




    @GetMapping("")
    public ResponseEntity<List<Percorso>> getPercorsi() {
        List<Percorso> percorsi = percorsoService.getPercorsi();
        return ResponseEntity.ok(percorsi);
    }

    @PostMapping("")
    public ResponseEntity<Percorso> addNewPercorso(@RequestBody Percorso percorso, HttpSession session) {

        User user = (User) session.getAttribute("user");
        if(user == null || user.getRuolo().equals("studente")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Percorso nuovoPercorso = percorsoService.addNewPercorso(percorso);
        if(nuovoPercorso == null)return ResponseEntity.badRequest().build();


        return ResponseEntity.ok(nuovoPercorso);
    }


    @GetMapping("/{id}/lezioni")
    public ResponseEntity<List<Lezione>> getLezioniFromPercorso(@PathVariable int id) {
        List<Lezione> lezioni = percorsoService.getLezioniFromPercorso(id);
        return ResponseEntity.ok(lezioni);
    }



    @PostMapping("/{idPercorso}/lezioni")
    public ResponseEntity<CreateLezioneRequest> creaNuovaLezione(
            @PathVariable int idPercorso,
            @RequestBody CreateLezioneRequest request,
            HttpSession session) {

        User user = (User) session.getAttribute("user");
        if (user == null || user.getRuolo().equals("studente")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        CreateLezioneRequest response = lezioneService.creaLezione(idPercorso, request);
        if (response == null) return ResponseEntity.badRequest().build();


        return ResponseEntity.ok(response);
    }



    @GetMapping("/lezioni/count")
    public ResponseEntity<Integer> getNumeroLezioni(){
        int numerolezioni = lezioneService.getNumeroLezioni();
        return ResponseEntity.ok(numerolezioni);
    }


    @GetMapping("/{idPercorso}/lezioni/{idLezione}/domande")
    public ResponseEntity<List<Domanda>> getDomandeFromLezione(
            @PathVariable int idPercorso,
            @PathVariable int idLezione) {

        List<Domanda> domande = lezioneService.getDomandeFromLezione(idPercorso, idLezione);

        if (domande == null) return ResponseEntity.notFound().build();
        else if(domande.isEmpty()) return ResponseEntity.noContent().build();

        return ResponseEntity.ok(domande);
    }

}
