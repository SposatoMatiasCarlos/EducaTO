package com.example.backend.Controllers;


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

    public static class CreateLezioneRequest {
        private Lezione lezione;
        private List<Domanda> domande;

        public CreateLezioneRequest(Lezione lezione, List<Domanda> domande) {
            this.lezione = lezione;
            this.domande = domande;
        }

        // getter e setter
        public Lezione getLezione() { return lezione; }
        public void setLezione(Lezione lezione) { this.lezione = lezione; }

        public List<Domanda> getDomande() { return domande; }
        public void setDomande(List<Domanda> domande) { this.domande = domande; }
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

    @PostMapping("/{idPercorso}/lezioni")
    public ResponseEntity<CreateLezioneRequest> creaNuovaLezione(@PathVariable int idPercorso,
                                                                 @RequestBody CreateLezioneRequest request,
                                                                 HttpSession session) {

        User user = (User) session.getAttribute("user");

        if(user == null || user.getRuolo().equals("studente")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }


        Percorso percorso = percorsoService.getPercorsoById(idPercorso);
        if (percorso == null) {
            return ResponseEntity.badRequest().build();
        }

        Lezione lezione = request.getLezione();
        List<Domanda> domande = request.getDomande();

        List<Domanda> domandeCreate = domandeService.creaDomande(domande);
        if(domandeCreate == null || domandeCreate.isEmpty()){
            return ResponseEntity.badRequest().build();
        }


        List<Integer> prerequisiti = new ArrayList<>(percorso.getLessons());


        Lezione lezioneCreata = lezioneService.creaLezione(prerequisiti, lezione, domandeCreate);
        if(lezioneCreata == null){
            return  ResponseEntity.badRequest().build();
        }

        percorso.getLessons().add(lezioneCreata.getId());

        return ResponseEntity.ok(new CreateLezioneRequest(lezioneCreata, domandeCreate));
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
