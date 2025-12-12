package com.example.backend.Controllers;

import com.example.backend.Services.UserService;
import com.example.backend.Persistence.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public static class UserResponse {
        private List<User> users;
        private int totalCount;

        public UserResponse(List<User> users, int totalCount) {
            this.users = users;
            this.totalCount = totalCount;
        }

        public List<User> getUsers() { return users; }
        public int getTotalCount() { return totalCount; }
    }


    @GetMapping("")
    public ResponseEntity<UserResponse> getAllUsers() {
        List<User> users = userService.getUsers();
        return ResponseEntity.ok(new UserResponse(users, users.size()));
    }


    @PostMapping("/avatar")
    public ResponseEntity<User> cambiaAvatar(HttpSession session, @RequestBody AvatarRequest newavatar) {

        User user = (User) session.getAttribute("user");
        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        boolean changed = userService.cambiaAvatarUtente(user, newavatar.getIndex());
        if (!changed) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(user);
    }


    @GetMapping("/classifica")
    public ResponseEntity<List<User>> getClassificaUsers() {
        List<User> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }


    @PostMapping("/ruolo")
    public ResponseEntity<User> cambiaRuolo(HttpSession session, @RequestBody RuoloRequest ruolo) {

        User user = (User) session.getAttribute("user");
        if( user == null || !user.getRuolo().equals("admin") ) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();


        User usertochange = userService.getUserByUsername(ruolo.getUsername());
        if(usertochange == null) return ResponseEntity.notFound().build();

        if(userService.cambiaRuolo(usertochange, ruolo.getRuolo())){
            return  ResponseEntity.ok(usertochange);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
