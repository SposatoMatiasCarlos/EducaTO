package com.example.backend.Services;

import com.example.backend.Persistence.Articolo;
import com.example.backend.Persistence.ArticoloRepo;
import com.example.backend.Persistence.Cartella;
import com.example.backend.Persistence.CartellaRepo;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartellaService {

    private final CartellaRepo cartelleRepo;

    public CartellaService(CartellaRepo cartelleRepo) {
        this.cartelleRepo = cartelleRepo;
    }

    @PostConstruct
    public void init(){
        cartelleRepo.save(new Cartella("Economia"));
        cartelleRepo.save(new Cartella( "Informatica"));
        cartelleRepo.save(new Cartella( "Finanza"));
    }

    public List<Cartella> getCartelle(){
        return cartelleRepo.findAll();
    }


    public List<Articolo> getArticoliFromCartella(int id) {
        return cartelleRepo.findById(id)
                .map(Cartella::getArticoli)
                .orElse(Collections.emptyList());
    }


    @Transactional
    public Cartella addNewCartella(Cartella cartella) {
        boolean exists = cartelleRepo.existsByNomeIgnoreCase(cartella.getNome());
        if (exists) { return null; }

        Cartella nuovaCartella = new Cartella(cartella.getNome());
        return cartelleRepo.save(nuovaCartella);
    }


}
