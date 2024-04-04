package com.nxshxw.project.board.model.dto;

import java.util.List;

import com.nxshxw.project.report.model.dto.Report;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Comment {
	
	private int commentNo;
	private String commentContent;
	private String commentCreateDate;
	private int userNo;
	private String userNickName;
	private int boardNo;
	private int commentStar;
	private int parentNo;
	private String commentDeleteFlag;
	private String profileImage;
	
	private String boardName;
	private int reportCount;
	
	private String boardTitle;
	private String boardContent;
	private String boardCode;
	private String boardCreateDate;
	private int readCount;
	private int boardDelFl;
	
	// 신고 목록
	private List<Report> reportList;

}

