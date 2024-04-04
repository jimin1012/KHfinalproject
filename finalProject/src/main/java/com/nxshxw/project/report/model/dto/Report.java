package com.nxshxw.project.report.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Report {

	private int userNo;
	private int boardNo;
	private int replyNo;
	private String reportStFlag;
	private String reportContent;
	private String etcContent;
	
}
