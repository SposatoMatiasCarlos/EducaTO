package com.example.backend.Session;

import com.example.backend.Services.UserService;
import com.example.backend.Persistence.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/session")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class SessionController {

    UserService userService;

    public SessionController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/login")
    public ResponseEntity<SessionData> login(@RequestParam (required = false) String username,
                                             @RequestParam (required = false) String password,
                                      HttpSession session) {

        User existingUser = (User) session.getAttribute("user");

        if(username == null || password == null) {
            if (existingUser != null) {
                return ResponseEntity.ok(
                        new SessionData(existingUser, "User already authenticated")
                );
            } else {
                return ResponseEntity.ok(
                        new SessionData(null, "User not authenticated")
                );
            }
        }

        if (existingUser != null) {
            if (existingUser.getUsername().equals(username)) {
                return ResponseEntity.ok(
                        new SessionData(existingUser, "User already authenticated")
                );
            } else {
                return ResponseEntity.badRequest().body(
                        new SessionData(null, "Another user already authenticated")
                );
            }
        }


        Optional<User> user = userService.login(username, password);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new SessionData(null, "Invalid credentials")
            );
        }

        session.setAttribute("user", user.get());

        return ResponseEntity.ok(
                new SessionData(user.get(), "Login successful")
        );
    }

    @GetMapping("/logout")
    public ResponseEntity<SessionData> logout(HttpSession session) {

        User user = (User) session.getAttribute("user");
        if(user == null) {
            return ResponseEntity.ok(new SessionData(null, "No user to log out"));
        }

        session.invalidate();
        return ResponseEntity.ok(new SessionData(null, "Logout successful"));
    }
}
