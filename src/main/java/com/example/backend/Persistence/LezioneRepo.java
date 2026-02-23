package com.example.backend.Persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LezioneRepo extends JpaRepository<Lezione, Integer> {
    Lezione findByTitle(String lezioneBase);
}
