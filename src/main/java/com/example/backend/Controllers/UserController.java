package com.example.backend.Controllers;

import com.example.backend.Services.UserService;
import com.example.backend.Persistence.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/utenti")
@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public static class AvatarRequest {
        private int index;
        public int getIndex() { return index; }
    }
    public static class RuoloRequest{
        private String username;
        private String ruolo;

        public String getUsername() { return username; }
        public String getRuolo() { return ruolo; }
    }



    @GetMapping("")
    public ResponseEntity<List<User>> getUsers(@RequestParam(required = false) Integer pagina,
                                                 @RequestParam(required = false) Integer limite,
                                                 HttpSession session) {

        User user = (User) session.getAttribute("user");
        if (user == null || !"admin".equals(user.getRuolo())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<User> response = userService.getUsers(pagina, limite);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/avatar")
    public ResponseEntity<User> cambiaAvatar(HttpSession session, @RequestBody AvatarRequest newavatar) {

        User user = (User) session.getAttribute("user");
        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        User updatedUser = userService.cambiaAvatarUtente(user.getId(), newavatar.getIndex());
        if(updatedUser == null) return ResponseEntity.badRequest().build();

        session.setAttribute("user", updatedUser);
        return ResponseEntity.ok(updatedUser);
    }


    @GetMapping("/classifica")
    public ResponseEntity<List<User>> getClassificaUsers() {
        List<User> top10 = userService.getTopUsers(10);
        return ResponseEntity.ok(top10);
    }


    @PostMapping("/ruolo")
    public ResponseEntity<User> cambiaRuolo(HttpSession session, @RequestBody RuoloRequest ruolo) {

        User user = (User) session.getAttribute("user");
        if( user == null || !user.getRuolo().equals("admin") ) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();


        Optional<User> usertochange = userService.getUserByUsername(ruolo.getUsername());
        if(usertochange.isEmpty()) return ResponseEntity.notFound().build();

        if(userService.cambiaRuolo(usertochange.get(), ruolo.getRuolo())){
            return ResponseEntity.ok(usertochange.get());
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
