package com.example.backend.Persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    Optional<User> findByUsernameAndPassword(String username, String password);
    List<User> findAllByOrderByPointsDesc();
    Optional<User> findUserByUsername(String username);
}
