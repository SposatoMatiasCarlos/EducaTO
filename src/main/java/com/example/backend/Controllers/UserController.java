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


    public static class Avatar {
        private int index;
        public int getIndex() { return index; }
    }



    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }



    @PostMapping("/avatar")
    public ResponseEntity<User> cambiaAvatar(HttpSession session, @RequestBody Avatar newavatar) {

        User user = (User) session.getAttribute("user");
        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        boolean changed = userService.cambiaAvatarUtente(user, newavatar.getIndex());
        if (!changed) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(user);
    }
}
