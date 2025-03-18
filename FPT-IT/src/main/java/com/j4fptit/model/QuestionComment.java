package com.j4fptit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

import com.j4fptit.dao.QuestionCommentDAO;

@Entity
@Table(name = "QuestionComments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String content;
    @Temporal(TemporalType.DATE)
    private Date postDate;
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "UserId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "QuestionId")
    private Question question;
    
    public boolean delete() {
    	return QuestionCommentDAO.deleteById(this.id);
    }
    
    public boolean update() {
    	return QuestionCommentDAO.update(this);
    }
}
