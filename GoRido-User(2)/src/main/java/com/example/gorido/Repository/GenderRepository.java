package com.example.gorido.Repository;
import com.example.gorido.Model.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GenderRepository extends JpaRepository<Gender, Integer> {
    @Query("SELECT g.name FROM Gender g")
    List<String> findAllNames();
}