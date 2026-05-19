package com.example.gorido.Repository;

import com.example.gorido.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndStatusId_Id(String email, Integer statusId);
    Optional<User> findByEmailAndStatusId_IdAndId(String email, Integer statusId, int id);
}
