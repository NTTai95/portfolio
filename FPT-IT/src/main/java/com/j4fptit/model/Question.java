package com.j4fptit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

import com.j4fptit.dao.QuestionDAO;

@Entity
@Table(name = "Questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String title;
	private String content;
	@Temporal(TemporalType.DATE)
	private Date postDate;
	private Long numberView;
	private Boolean status;

	@ManyToOne
	@JoinColumn(name = "UserId")
	private User user;

	@OneToMany(mappedBy = "question", fetch = FetchType.EAGER)
	private List<Answer> answers;

	@OneToMany(mappedBy = "question", fetch = FetchType.EAGER)
	private List<QuestionComment> comments;

	@OneToMany(mappedBy = "question", fetch = FetchType.EAGER)
	private List<QuestionVote> votes;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "TagQuestion", joinColumns = @JoinColumn(name = "QuestionId"), inverseJoinColumns = @JoinColumn(name = "TagId"))
	private List<Tag> tags;

	public boolean delete() {
		return QuestionDAO.deleteById(this.id);
	}

	public boolean update() {
		return QuestionDAO.update(this);
	}

	public int getCountLiked() {
		int count = 0;
		for (QuestionVote vote : votes) {
			if (vote.getIsLiked()) {
				count++;
			}
		}
		return count;
	}

	public int getCountDisliked() {
		int count = 0;
		for (QuestionVote vote : votes) {
			if (!vote.getIsLiked()) {
				count++;
			}
		}
		return count;
	}
	
	public int getPoint() {
		return (getCountLiked() * 10) - (getCountDisliked() * 2);
	}
	
	public int getCountVote() {
		return getCountLiked() + getCountDisliked();
	}
	
	public int getCountAnswer() {
		return this.answers.size();
	}
	
	public Boolean isUserLiked(int id) {
		System.out.println(id);
		for (QuestionVote vote : votes) {
			if (vote.getUser().getId() == id) {
				return vote.getIsLiked();
			}
		}
		return false;
	}

	public Boolean isUserDisliked(int id) {
		for (QuestionVote vote : votes) {
			if (vote.getUser().getId() == id) {
				return !vote.getIsLiked();
			}
		}
		return false;
	}
	
	public Boolean containsTagId(int id) {
		for (Tag tag : this.tags) {
			if (tag.getId() == id) {
				return true;
			}
		}
		return false;
	}
}
