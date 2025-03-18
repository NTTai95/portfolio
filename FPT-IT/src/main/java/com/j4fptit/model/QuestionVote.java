package com.j4fptit.model;

import com.j4fptit.dao.QuestionVoteDAO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "QuestionVotes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Boolean isLiked;

    @ManyToOne
    @JoinColumn(name = "UserId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "QuestionId")
    private Question question;
    
    public boolean delete() {
    	return QuestionVoteDAO.deleteById(this.id);
    }
    
    public boolean update() {
    	return QuestionVoteDAO.update(this);
    }
}
