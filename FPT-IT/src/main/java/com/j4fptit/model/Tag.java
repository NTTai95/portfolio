package com.j4fptit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

import com.j4fptit.dao.TagDAO;

@Entity
@Table(name = "Tags")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String tagName;
    private String description;

    @ManyToMany(mappedBy = "tags" , fetch = FetchType.EAGER)
    private List<Question> questions;
    
    public int getCountQuestions() {
    	return questions.size();
    }
    
    public boolean delete() {
    	return TagDAO.deleteById(this.id);
    }
    
    public boolean update() {
    	return TagDAO.update(this);
    }
    
    public int getCountQuestion() {
    	return questions.size();
    }
}

