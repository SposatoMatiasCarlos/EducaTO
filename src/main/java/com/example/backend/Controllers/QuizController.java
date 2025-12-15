package com.example.backend.Controllers;


import com.example.backend.Persistence.Domanda;
import com.example.backend.Persistence.Lezione;
import com.example.backend.Persistence.Percorso;
import com.example.backend.Persistence.User;
import com.example.backend.Services.DomandaService;
import com.example.backend.Services.LezioneService;
import com.example.backend.Services.PercorsoService;
import com.example.backend.Services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
public class QuizController {

    private final DomandaService domandaService;
    private final LezioneService lezioneService;
    private final UserService userService;
    private final PercorsoService percorsoService;


    // ================================================ //

    public QuizController(DomandaService domandaService, UserService userService, LezioneService lezioneService, PercorsoService percorsoService) {
        this.domandaService = domandaService;
        this.percorsoService = percorsoService;
        this.userService = userService;
        this.lezioneService = lezioneService;
    }

    // ================================================ //


    public static class StartResponse {
        public List<Domanda> domande;
        public int vite;
        public int errori;
        public String message;
    }

    public static class AnswerRequest{
        public int domandaId;
        public int rispostaIndex;
    }

    public static class AnswerResponse {
        public boolean corretta;
        public int viteRimanenti;
        public int errori;
        public String spiegazione;
    }

    public static class CompleteResponse {
        public boolean superata;
        public int puntiAggiunti;
        public String message;
        public User utente;
    }


    // ================================================
    //  Nella prima versione avevo solo vite ed errori
    //  ma un utente poteva barare inviando una sola
    //  risposta con /risposta e poi facendo /risultato
    // ================================================

    @PostMapping("/start")
    public ResponseEntity<StartResponse> startQuiz(
            @RequestParam int lezioneId,
            HttpSession session) {

        User user = (User) session.getAttribute("user");
        if (user == null) return ResponseEntity.status(401).build();

        Lezione lezione = lezioneService.getLezioneById(lezioneId);
        if (lezione == null) return ResponseEntity.notFound().build();

        // Recupero domande
        List<Domanda> domande = domandaService.getDomandeByIds(lezione.getQuestionIds());

        // Imposto stato quiz nella sessione
        session.setAttribute("quizActive", true);
        session.setAttribute("quizLezioneId", lezioneId);
        session.setAttribute("vite", 3);
        session.setAttribute("errori", 0);
        session.setAttribute("domandeTotali", domande.size());
        session.setAttribute("risposteDate", 0);

        StartResponse resp = new StartResponse();
        resp.domande = domande;
        resp.vite = 3;
        resp.errori = 0;
        resp.message = "Quiz avviato";

        return ResponseEntity.ok(resp);
    }



    @PostMapping("/risposta")
    public ResponseEntity<AnswerResponse> answerQuestion(
            @RequestBody AnswerRequest request,
            HttpSession session) {

        User user = (User) session.getAttribute("user");
        if (user == null) return ResponseEntity.status(401).build();

        Boolean active = (Boolean) session.getAttribute("quizActive");
        if (active == null || !active) return ResponseEntity.status(400).build();

        Integer lezioneId = (Integer) session.getAttribute("quizLezioneId");

        // Check domanda valida nella lezione
        Lezione lezione = lezioneService.getLezioneById(lezioneId);
        if (lezione == null || !lezione.getQuestionIds().contains(request.domandaId))
            return ResponseEntity.badRequest().build();

        Domanda domanda = domandaService.getDomandaById(request.domandaId);
        if (domanda == null) return ResponseEntity.notFound().build();

        Integer vite = (Integer) session.getAttribute("vite");
        Integer errori = (Integer) session.getAttribute("errori");
        Integer risposte = (Integer) session.getAttribute("risposteDate");

        boolean corretta = domanda.getCorrectOptionIndex() == request.rispostaIndex;

        if (!corretta) {
            errori++;
            vite--;
        }

        risposte++;

        // aggiorna sessione
        session.setAttribute("vite", vite);
        session.setAttribute("errori", errori);
        session.setAttribute("risposteDate", risposte);

        AnswerResponse resp = new AnswerResponse();
        resp.corretta = corretta;
        resp.viteRimanenti = vite;
        resp.errori = errori;
        resp.spiegazione = domanda.getExplanation();

        return ResponseEntity.ok(resp);
    }



    @PostMapping("/risultato")
    public ResponseEntity<CompleteResponse> completeQuiz(
            @RequestParam int lezioneId,
            HttpSession session) {

        User user = (User) session.getAttribute("user");
        if (user == null) return ResponseEntity.status(401).build();

        Boolean active = (Boolean) session.getAttribute("quizActive");
        Integer storedLezioneId = (Integer) session.getAttribute("quizLezioneId");

        if (active == null || !active || storedLezioneId == null || !storedLezioneId.equals(lezioneId)) {
            return ResponseEntity.badRequest().build();
        }

        Integer errori = (Integer) session.getAttribute("errori");
        Integer vite = (Integer) session.getAttribute("vite");
        Integer risposte = (Integer) session.getAttribute("risposteDate");
        Integer tot = (Integer) session.getAttribute("domandeTotali");

        CompleteResponse resp = new CompleteResponse();

        // Validazione dello stato del quiz
        if (errori == null || vite == null || risposte == null || tot == null) {
            resp.superata = false;
            resp.message = "Quiz non valido.";
            cleanup(session);
            return ResponseEntity.badRequest().body(resp);
        }

        boolean finito = (vite <= 0) || (risposte >= tot);
        if (!finito) {
            resp.superata = false;
            resp.message = "Quiz non ancora terminato.";
            return ResponseEntity.badRequest().body(resp);
        }

        // Controllo se l'utente ha già completato la lezione
        if (userService.haCompletatoLezione(user, lezioneId)) {
            resp.superata = errori < 3;
            resp.puntiAggiunti = 0;
            resp.message = "Lezione già completata in precedenza.";
            resp.utente = user;
            cleanup(session);
            return ResponseEntity.ok(resp);
        }

        // Valutazione del quiz
        if (errori < 3) {
            boolean aggiungiLezione = userService.aggiungiLezioneCompletata(user, lezioneId);

            Lezione lezione = lezioneService.getLezioneById(lezioneId);
            int punti = lezione.getPoints();

            boolean aggiungiPunti = userService.aggiungiPunti(user, punti);

            resp.superata = true;
            resp.puntiAggiunti = (aggiungiLezione && aggiungiPunti) ? punti : 0;
            resp.message = "Lezione completata con successo!";
        } else {
            resp.superata = false;
            resp.puntiAggiunti = 0;
            resp.message = "Lezione fallita.";
        }

        resp.utente = user;

        // Pulizia e update sessione
        session.setAttribute("user", user);
        cleanup(session);

        return ResponseEntity.ok(resp);
    }



    @PostMapping("/abbandona")
    public ResponseEntity<Void> abbandona(HttpSession session) {
        if(session.getAttribute("user") == null) return ResponseEntity.badRequest().build();

        cleanup(session);
        return ResponseEntity.ok().build();
    }



    @PostMapping("/bonus")
    public ResponseEntity<User> aggiungiPuntiBonus(HttpSession session,
                                                   @RequestParam(required = true) int idPercorso) {

        User user = (User) session.getAttribute("user");

        if (user == null) { return ResponseEntity.status(401).build(); }

        Percorso percorso = percorsoService.getPercorsoById(idPercorso);
        if(percorso == null) return ResponseEntity.badRequest().build();


        List<Integer> lezioniPercorso = percorso.getLessons();
        boolean bonusAssegnato = userService.aggiungiBonus(user, idPercorso, lezioniPercorso);
        session.setAttribute("user", user);

        if (!bonusAssegnato) { return ResponseEntity.badRequest().body(user); }
        else return ResponseEntity.ok(user);
    }






    private void cleanup(HttpSession session) {
        session.removeAttribute("quizActive");
        session.removeAttribute("quizLezioneId");
        session.removeAttribute("vite");
        session.removeAttribute("errori");
        session.removeAttribute("domandeTotali");
        session.removeAttribute("risposteDate");
    }


}
