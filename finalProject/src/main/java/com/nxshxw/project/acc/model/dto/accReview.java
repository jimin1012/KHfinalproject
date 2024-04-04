package com.nxshxw.project.acc.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class accReview {
	
	private int accReviewNo;
	private String accReviewContent;
	private String accCreateDate;
	private String accReviewDelFl;
	private int accNo;
	private int userNo;
	
	private int reservationNo;
	private String userNickName;
}
