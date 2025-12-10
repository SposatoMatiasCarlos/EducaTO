package com.example.backend.Services;

import com.example.backend.Persistence.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    List<User> users;

    public UserService() {
        users = new ArrayList<>();

        users.add(new User(
                "mati",
                "temp",
                0,
                "studente",
                0,
                "Barbone di dio"
        ));

        users.add(new User(
                "hudson",
                "temp",
                1,
                "admin",
                100000,
                "Challenger"
        ));
    }


    public List<User> getUsers() {
        return users;
    }


    public Optional<User> login(String username, String password) {
        return users.stream()
                .filter(u -> u.getUsername().equals(username) && u.getPassword().equals(password))
                .findFirst();
    }



    public boolean cambiaAvatarUtente(User user, int index){
        // Controllo validità index
        if(index < 0 || index > 3){
            return false;
        }

        Optional<User> optionalUser = users.stream()
                .filter(u -> u.getUsername().equals(user.getUsername()))
                .findFirst();

        if(optionalUser.isEmpty()) return false;

        // Aggiorna l’avatar
        optionalUser.get().setAvatarId(index);

        // Se usi sessione, aggiorna anche l’oggetto in sessione
        user.setAvatarId(index);

        return true;
    }


    public boolean aggiungiLezioneCompletata(User user, int lezioneId) {

        Optional<User> optionalUser = users.stream()
                .filter(u -> u.getUsername().equals(user.getUsername()))
                .findFirst();

        if (optionalUser.isEmpty()) return false;

        User realUser = optionalUser.get();

        // Evita duplicati
        if (!realUser.getCompletedLessons().contains(lezioneId)) {
            realUser.getCompletedLessons().add(lezioneId);
        }


        return true;
    }


    public boolean aggiungiPunti(User user, int punti) {

        Optional<User> optionalUser = users.stream()
                .filter(u -> u.getUsername().equals(user.getUsername()))
                .findFirst();

        if (optionalUser.isEmpty()) return false;

        User realUser = optionalUser.get();

        realUser.setPoints(realUser.getPoints() + punti);

        // aggiorna anche la copia in sessione
        user.setPoints(user.getPoints() + punti);

        return true;
    }


}
