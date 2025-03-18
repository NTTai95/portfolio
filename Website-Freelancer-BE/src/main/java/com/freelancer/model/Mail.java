package com.freelancer.model;

import java.io.File;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Mail {
	private String to;
	private String subject;
	private String content;
	private File attachment; // Có thể null nếu không có file đính kèm
}
