package com.example.backend.Controllers;

import com.example.backend.Persistence.Articolo;
import com.example.backend.Persistence.Cartella;
import com.example.backend.Persistence.User;
import com.example.backend.Services.ArticoloService;
import com.example.backend.Services.CartellaService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cartelle")
@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
public class CartellaController{

    private final ArticoloService articoloService;
    private final CartellaService cartellaService;

    public CartellaController(CartellaService cartellaService, ArticoloService articoloService) {
        this.cartellaService = cartellaService;
        this.articoloService = articoloService;
    }


    @GetMapping("")
    public ResponseEntity<List<Cartella>> getCartella(){
        List<Cartella> cartelle = cartellaService.getCartelle();
        return ResponseEntity.ok(cartelle);
    }


    @PostMapping("")
    public ResponseEntity<Cartella> addNewCartella(@RequestBody Cartella cartella, HttpSession session){
        Cartella nuova = cartellaService.addNewCartella(cartella);
        if (nuova == null) return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 409 Conflict

        return ResponseEntity.ok(nuova);
    }


    @GetMapping("/articoli")
    public ResponseEntity<List<Articolo>> getAllArticoli(){
        return ResponseEntity.ok(articoloService.getArticoli());
    }


    @GetMapping("/{id}/articoli")
    public ResponseEntity<List<Articolo>> getArticoliFromCartella(@PathVariable int id){
        List<Articolo> articoli = cartellaService.getArticoliFromCartella(id);
        if (articoli == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(articoli);
    }


    @PostMapping("/{id}/articoli")
    public ResponseEntity<Articolo> addNewArticolo(@PathVariable int id, @RequestBody Articolo articolo, HttpSession session) {

        User user = (User) session.getAttribute("user");
        if(user == null || user.getRuolo().equals("studente")) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Articolo nuovoArticolo = articoloService.addNewArticolo(id, articolo);
        if (nuovoArticolo == null) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(nuovoArticolo);
    }


}
