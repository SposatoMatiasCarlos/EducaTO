package com.example.backend.Services;

import com.example.backend.Dto.SafeUser;
import com.example.backend.Dto.UserResponse;
import com.example.backend.Persistence.*;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepo userRepository;
    private final LezioneRepo lezioneRepository;
    private final PercorsoRepo percorsoRepository;

    public UserService(UserRepo userRepository, LezioneRepo lezioneRepository, PercorsoRepo percorsoRepository) {
        this.userRepository = userRepository;
        this.percorsoRepository = percorsoRepository;
        this.lezioneRepository = lezioneRepository;
    }

    @PostConstruct
    void init() {
        userRepository.save(new User(
                "mati",
                "temp",
                0,
                "studente",
                0,
                "Barbone di dio"));

        userRepository.save(new User(
                "hudson",
                "temp",
                1,
                "admin",
                100000,
                "Challenger"
        ));

        userRepository.save(new User(
                "mario",
                "password123",
                1,
                "studente",
                1500,
                "Silver"
        ));

        userRepository.save(new User(
                "luigi",
                "luigiPass",
                1,
                "studente",
                3200,
                "Gold"
        ));

        userRepository.save(new User(
                "peach",
                "peachSecret",
                1,
                "mod",
                5400,
                "Platinum"
        ));

        userRepository.save(new User(
                "toad",
                "toadPwd",
                1,
                "studente",
                800,
                "Bronze"
        ));

        userRepository.save(new User(
                "bowser",
                "bowserKing",
                1,
                "admin",
                12000,
                "Diamond"
        ));

        userRepository.save(new User(
                "yoshi",
                "yoshi123",
                1,
                "studente",
                2600,
                "Gold"
        ));

        userRepository.save(new User(
                "link",
                "hyrule",
                1,
                "studente",
                9000,
                "Platinum"
        ));

        userRepository.save(new User(
                "zelda",
                "wisdom",
                1,
                "mod",
                11000,
                "Diamond"
        ));

        userRepository.save(new User(
                "samus",
                "metroid",
                1,
                "studente",
                7000,
                "Platinum"
        ));

        userRepository.save(new User(
                "kirby",
                "poyo",
                1,
                "studente",
                400,
                "Bronze"
        ));
    }

    public UserResponse getUsers(Integer pagina, Integer limite) {
        List<User> tuttiUtenti = userRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));

        int totalCount = tuttiUtenti.size();
        int page = (pagina == null || pagina < 1) ? 1 : pagina;
        int limit = (limite == null || limite < 1) ? totalCount : limite;

        int start = (page - 1) * limit;
        int end = Math.min(start + limit, totalCount);



        if (start >= totalCount) {
            return new UserResponse(List.of(), 0);
        }

        return new UserResponse(tuttiUtenti.subList(start, end), tuttiUtenti.size());
    }


    public Optional<User> login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Transactional
    public User cambiaAvatarUtente(int userId, int index) {
        if (index < 0 || index > 3) {
            return null;
        }

        Optional<User> utenteOpt = userRepository.findById(userId);
        if(utenteOpt.isEmpty()) return null;

        User utente = utenteOpt.get();
        utente.setAvatarId(index);

        return utente; // ritorna l'entità aggiornata
    }


    public boolean haCompletatoLezione(int userId, int lezioneId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) return false;

        User realUser = optionalUser.get();
        return realUser.getCompletedLessons().stream()
                .anyMatch(l -> l.getId() == lezioneId);
    }


    @Transactional
    public boolean aggiungiLezioneCompletata(int userId, int lezioneId) {

        User user = userRepository.findById(userId).orElse(null);
        Lezione lezione = lezioneRepository.findById(lezioneId).orElse(null);
        if(user == null || lezione == null) return false;

        boolean completata = user.getCompletedLessons()
                .stream()
                .anyMatch(l -> l.getId() == lezioneId);

        if (completata) return false;

        user.getCompletedLessons().add(lezione);
        user.setPoints(user.getPoints() + lezione.getPoints());
        userRepository.save(user);

        return true;
    }


    @Transactional
    public User aggiungiBonus(int userId, int percorsoId) {

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return null;

        Percorso percorso = percorsoRepository.findById(percorsoId).orElse(null);
        if (percorso == null) return null;

        // Controlla se l’utente ha già ricevuto il bonus
        if (user.getBonusReceived().contains(percorso)) return null;

        // Controlla che tutte le lezioni del percorso siano completate
        if (!user.getCompletedLessons().containsAll(percorso.getLessons())) return null;

        // Assegna bonus
        int puntiBonus = 50;
        user.setPoints(user.getPoints() + puntiBonus);

        // Segna il percorso come bonus già ricevuto
        user.getBonusReceived().add(percorso);
        return user;
    }


    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }


    @Transactional
    public boolean cambiaRuolo(User user, String nuovoRuolo) {

        if (user == null) return false;

        Optional<User> optionalUser = userRepository.findById(user.getId());
        if (optionalUser.isEmpty()) return false;

        User realUser = optionalUser.get();

        // Verifica validità ruolo
        if (!nuovoRuolo.equals("studente") && !nuovoRuolo.equals("admin") && !nuovoRuolo.equals("mod")) {
            return false;
        }

        // Aggiorna ruolo
        realUser.setRuolo(nuovoRuolo);
        return true;
    }


    public List<SafeUser> getTopUsers(int topN) {
        return userRepository.findAllByOrderByPointsDesc()
                .stream()
                .limit(topN)
                .map(SafeUser::new)
                .toList();
    }


}
