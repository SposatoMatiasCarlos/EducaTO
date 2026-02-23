package com.example.backend.Persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartellaRepo extends JpaRepository<Cartella, Integer> {
    boolean existsByNomeIgnoreCase(String nome);
    Cartella findByNome(String name);
}