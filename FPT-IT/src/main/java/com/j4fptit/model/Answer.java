package com.j4fptit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;

import com.j4fptit.dao.AnswerDAO;

@Entity
@Table(name = "Answers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String content;
	@Temporal(TemporalType.DATE)
	private Date postDate;
	private Boolean isVerified;
	private Boolean status;

	@ManyToOne
	@JoinColumn(name = "UserId")
	private User user;

	@ManyToOne
	@JoinColumn(name = "QuestionId")
	private Question question;

	@OneToMany(mappedBy = "answer", fetch = FetchType.EAGER,  cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<AnswerComment> comments;

	@OneToMany(mappedBy = "answer", fetch = FetchType.EAGER,  cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<AnswerVote> votes;

	public boolean delete() {
		return AnswerDAO.deleteById(this.id);
	}

	public boolean update() {
		return AnswerDAO.update(this);
	}

	public int getCountLiked() {
		int count = 0;
		for (AnswerVote vote : votes) {
			if (vote.getIsLiked()) {
				count++;
			}
		}
		return count;
	}

	public int getCountDisliked() {
		int count = 0;
		for (AnswerVote vote : votes) {
			if (!vote.getIsLiked()) {
				count++;
			}
		}
		return count;
	}

	public int getPoint() {
		return (getCountLiked() * 10) - (getCountDisliked() * 2);
	}

	public Boolean isUserLiked(int id) {
		for (AnswerVote vote : votes) {
			if (vote.getUser().getId() == id) {
				return vote.getIsLiked();
			}
		}
		return false;
	}

	public Boolean isUserDisliked(int id) {
		for (AnswerVote vote : votes) {
			if (vote.getUser().getId() == id) {
				return !vote.getIsLiked();
			}
		}
		return false;
	}
}
