package com.example.backend.Controllers;

import com.example.backend.Persistence.Articolo;
import com.example.backend.Persistence.Cartella;
import com.example.backend.Services.CartellaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cartelle")
@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
public class CartellaController{

    CartellaService cartellaService;



    public CartellaController(CartellaService cartellaService) {
        this.cartellaService = cartellaService;
    }




    @GetMapping("")
    public ResponseEntity<List<Cartella>> getCartella(){
        List<Cartella> cartelle = cartellaService.getCartelle();

        return ResponseEntity.ok(cartelle);
    }



    @PostMapping("")
    public ResponseEntity<Cartella> addNewCartella(@RequestBody Cartella cartella){

        Cartella nuova = cartellaService.addNewCartella(cartella);
        if (nuova == null) return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 409 Conflict

        return ResponseEntity.ok(nuova);
    }



    @GetMapping("/{id}/articoli")
    public ResponseEntity<List<Articolo>> getArticoliFromCartella(@PathVariable int id){
        List<Articolo> articoli = cartellaService.getArticoliFromCartella(id);

        if (articoli == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(articoli);
    }



}
