package com.example.backend.Services;

import com.example.backend.Persistence.Articolo;
import com.example.backend.Persistence.Cartella;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CartellaService {

    private List<Cartella> cartelle;
    private final ArticoloService articoloService;

    public CartellaService(ArticoloService articoloService){
        this.articoloService = articoloService;
        cartelle = new ArrayList<Cartella>();


        cartelle.add(new Cartella("Economia", new ArrayList<>(Arrays.asList(1, 2, 3))));
        cartelle.add(new Cartella( "Arte", new ArrayList<>()));
        cartelle.add(new Cartella( "Finanza", new ArrayList<>()));

    }


    public List<Cartella> getCartelle(){
        return cartelle;
    }


    public Cartella getCartella(int id){
        for (Cartella c : cartelle) {
            if (c.getId() == id) {
                return c;
            }
        }
        return null;
    }



    public List<Articolo> getArticoliFromCartella(int id) {

        Cartella cartella = getCartella(id);

        if (cartella == null) {
            return null;
        }

        List<Articolo> result = new ArrayList<>();


        for (Integer artId : cartella.getArticoli()) {
            Articolo a = articoloService.getArticolo(artId);
            if (a != null) {
                result.add(a);
            }
        }

        return result;
    }



    public Cartella addNewCartella(Cartella cartella) {

        boolean exists = cartelle.stream().anyMatch(c -> c.getNome().equalsIgnoreCase(cartella.getNome().trim()));

        if (exists) {
            return null;
        }

        cartella.setArticoli(new ArrayList<>());
        cartella.setId();
        cartelle.add(cartella);
        return cartella;
    }


    public boolean addArticoloToCartella(Cartella cartella, int articoloId) {

        List<Integer> articoli = cartella.getArticoli();

        if(!articoli.contains(articoloId)){
            articoli.add(articoloId);
            return true;
        }

        return false;
    }


}
