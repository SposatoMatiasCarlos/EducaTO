package com.example.backend.Persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DomandaRepo extends JpaRepository<Domanda, Integer> {
    List<Domanda> findAllByIdIn(List<Integer> ids);
}
