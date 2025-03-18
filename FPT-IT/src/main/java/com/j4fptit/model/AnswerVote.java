package com.j4fptit.model;

import com.j4fptit.dao.AnswerVoteDAO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "AnswerVotes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Boolean isLiked;

    @ManyToOne
    @JoinColumn(name = "UserId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "AnswerId")
    private Answer answer;
    
    public boolean delete() {
    	return AnswerVoteDAO.deleteById(this.id);
    }
    
    public boolean update() {
    	return AnswerVoteDAO.update(this);
    }
}
