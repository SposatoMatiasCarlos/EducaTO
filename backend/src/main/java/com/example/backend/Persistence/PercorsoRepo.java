package com.example.backend.Persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PercorsoRepo extends JpaRepository<Percorso, Integer> {
    boolean existsByTitleIgnoreCase(String title);
    Percorso findByTitle(String finanza);
}
