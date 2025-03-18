package com.j4fptit.model;

import java.util.Date;
import java.util.List;

import com.j4fptit.dao.UserDAO;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String email;
	private String displayName;
	private String password;
	private String avatar;
	private String introduction;
	private Integer reputation;
	private Boolean role;
	private Date dateJoin;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private List<Question> questions;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private List<Answer> answers;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private List<QuestionComment> questionComments;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private List<AnswerComment> answerComments;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private List<QuestionVote> questionVotes;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
	private List<AnswerVote> answerVotes;

	public boolean delete() {
		return UserDAO.deleteById(this.id);
	}

	public boolean update() {
		return UserDAO.update(this);
	}

	public int getCountQuestion() {
		return questions.size();
	}

	public int getCountAnswer() {
		return answers.size();
	}

	public int getCountAnswerIsVerified() {
		int count = 0;
		for (Answer answer : answers) {
			if (answer.getIsVerified()) {
				count += 1;
			}
		}
		return count;
	}

	public List<Question> getTop10Question() {
		questions.sort((q1, q2) -> Integer.compare(q2.getPoint(), q1.getPoint()));
		return questions.stream().filter(Question::getStatus).toList();
	}
}
