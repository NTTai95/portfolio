package com.j4fptit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

import com.j4fptit.dao.AnswerCommentDAO;

@Entity
@Table(name = "AnswerComments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerComment {
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
    @JoinColumn(name = "AnswerId")
    private Answer answer;
    
    public boolean delete() {
    	return AnswerCommentDAO.deleteById(this.id);
    }
    
    public boolean update() {
    	return AnswerCommentDAO.update(this);
    }
}
