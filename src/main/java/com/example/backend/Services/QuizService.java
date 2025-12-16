package com.example.backend.Services;

import com.example.backend.Dto.AnswerRequest;
import com.example.backend.Dto.AnswerResponse;
import com.example.backend.Dto.CompleteResponse;
import com.example.backend.Persistence.*;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class QuizService {

    private final LezioneRepo lezioneRepository;
    private final DomandaRepo domandaRepository;
    private final UserService userService;

    public QuizService(UserService userService, LezioneRepo lezioneRepository, DomandaRepo domandaRepository) {
        this.lezioneRepository = lezioneRepository;
        this.userService = userService;
        this.domandaRepository = domandaRepository;
    }

    @Transactional
    public AnswerResponse answerQuestion(
            Integer lezioneId,
            AnswerRequest request,
            HttpSession session) {

        Optional<Lezione> lezioneOpt = lezioneRepository.findById(lezioneId);
        if (lezioneOpt.isEmpty()) return null;

        Lezione lezione = lezioneOpt.get();

        Optional<Domanda> domandaOpt = domandaRepository.findById(request.domandaId);
        if (domandaOpt.isEmpty()) return null;

        Domanda domanda = domandaOpt.get();

        if (!lezione.getQuestions().contains(domanda)) {
            return null;
        }

        Integer vite = (Integer) session.getAttribute("vite");
        Integer errori = (Integer) session.getAttribute("errori");
        Integer risposte = (Integer) session.getAttribute("risposteDate");

        boolean corretta = domanda.getCorrectOptionIndex() == request.rispostaIndex;

        if (!corretta) {
            vite--;
            errori++;
        }

        risposte++;

        session.setAttribute("vite", vite);
        session.setAttribute("errori", errori);
        session.setAttribute("risposteDate", risposte);

        AnswerResponse resp = new AnswerResponse();
        resp.corretta = corretta;
        resp.viteRimanenti = vite;
        resp.errori = errori;
        resp.spiegazione = domanda.getExplanation();

        return resp;
    }



    @Transactional
    public CompleteResponse completeQuiz(User user, int lezioneId, HttpSession session) {

        Optional<Lezione> lezioneOpt = lezioneRepository.findById(lezioneId);
        if (lezioneOpt.isEmpty()) return null;

        Lezione lezione = lezioneOpt.get();

        Boolean active = (Boolean) session.getAttribute("quizActive");
        Integer storedLezioneId = (Integer) session.getAttribute("quizLezioneId");

        if (active == null || !active || storedLezioneId == null || !storedLezioneId.equals(lezioneId)) {
            return null;
        }

        Integer errori = (Integer) session.getAttribute("errori");
        Integer vite = (Integer) session.getAttribute("vite");
        Integer risposte = (Integer) session.getAttribute("risposteDate");
        Integer tot = (Integer) session.getAttribute("domandeTotali");

        CompleteResponse resp = new CompleteResponse();

        if (errori == null || vite == null || risposte == null || tot == null) {
            resp.superata = false;
            resp.message = "Quiz non valido.";
            cleanup(session);
            return resp;
        }

        boolean finito = (vite <= 0) || (risposte >= tot);
        if (!finito) {
            resp.superata = false;
            resp.message = "Quiz non ancora terminato.";
            return resp;
        }

        // Controllo se l'utente ha già completato la lezione
        if (userService.haCompletatoLezione(user.getId(), lezioneId)) {
            resp.superata = errori < 3;
            resp.puntiAggiunti = 0;
            resp.message = "Lezione già completata in precedenza.";
            resp.utente = user;
            cleanup(session);
            return resp;
        }

        // Valutazione del quiz
        if (errori < 3) {
            boolean aggiungiLezione = userService.aggiungiLezioneCompletata(user.getId(), lezioneId);
            resp.superata = true;
            resp.puntiAggiunti = (aggiungiLezione) ? lezione.getPoints() : 0;
            resp.message = "Lezione completata con successo!";
        } else {
            resp.superata = false;
            resp.puntiAggiunti = 0;
            resp.message = "Lezione fallita.";
        }


        Optional<User> updatedUser = userService.getUserById(user.getId());
        if(updatedUser.isEmpty()) return null;

        resp.utente = updatedUser.get();

        // Aggiorna sessione
        session.setAttribute("user", updatedUser.get());
        cleanup(session);

        return resp;
    }


    public static void cleanup(HttpSession session) {
        session.removeAttribute("quizActive");
        session.removeAttribute("quizLezioneId");
        session.removeAttribute("vite");
        session.removeAttribute("errori");
        session.removeAttribute("risposteDate");
        session.removeAttribute("domandeTotali");
    }
}


