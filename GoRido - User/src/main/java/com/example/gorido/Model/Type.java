package com.example.gorido.Model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "type")
public class Type {

    @Id
    private int id;
    private String name;

    public Type(){}

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setName(String type_name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
