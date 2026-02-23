package com.example.backend.Controllers;


import com.example.backend.Dto.AnswerRequest;
import com.example.backend.Dto.AnswerResponse;
import com.example.backend.Dto.CompleteResponse;
import com.example.backend.Dto.StartResponse;
import com.example.backend.Persistence.Domanda;
import com.example.backend.Persistence.Lezione;
import com.example.backend.Persistence.Percorso;
import com.example.backend.Persistence.User;
import com.example.backend.Services.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
public class QuizController {

    private final LezioneService lezioneService;
    private final UserService userService;
    private final QuizService quizService;

    // ================================================ //

    public QuizController(QuizService quizService, UserService userService, LezioneService lezioneService) {
        this.quizService = quizService;
        this.userService = userService;
        this.lezioneService = lezioneService;
    }

    // ================================================ //


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

        Optional<Lezione> lezioneOpt = lezioneService.getLezioneById(lezioneId);
        if (lezioneOpt.isEmpty()) return ResponseEntity.notFound().build();

        Lezione lezione = lezioneOpt.get();
        List<Domanda> domande = lezione.getQuestions();

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

        AnswerResponse response = quizService.answerQuestion(lezioneId, request, session);
        if (response == null) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(response);
    }



    @PostMapping("/risultato")
    public ResponseEntity<CompleteResponse> completeQuiz(
            @RequestParam int lezioneId,
            HttpSession session) {

        User user = (User) session.getAttribute("user");
        if (user == null) return ResponseEntity.status(401).build();

        CompleteResponse response = quizService.completeQuiz(user, lezioneId, session);
        if (response == null) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(response);
    }



    @PostMapping("/abbandona")
    public ResponseEntity<Void> abbandona(HttpSession session) {
        if(session.getAttribute("user") == null) return ResponseEntity.badRequest().build();
        QuizService.cleanup(session);
        return ResponseEntity.ok().build();
    }



    @PostMapping("/bonus")
    public ResponseEntity<User> aggiungiPuntiBonus(HttpSession session,
                                                   @RequestParam int idPercorso) {

        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).build();
        }

        User updatedUser = userService.aggiungiBonus(user.getId(), idPercorso);
        if (updatedUser == null) {
            return ResponseEntity.badRequest().body(user);
        }

        // Aggiorna la sessione
        session.setAttribute("user", updatedUser);

        return ResponseEntity.ok(updatedUser);
    }




}
