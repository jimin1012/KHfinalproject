package com.nxshxw.project.board.model.dto;

import java.util.List;

import com.nxshxw.project.report.model.dto.Report;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Board {

	private int boardNo;
	private String boardTitle;
	private String boardContent;
	private String boardCreateDate;
	private int readCount;
	private int boardCode;
	
	private int userNo;
	private String userNickname;
	private String profileImage;
	private String thumnail;
	
	private int commentCount;
	private int likeCount;
	private double starAverage;
	private String festivalThumbnail;
	
	private String pollTitle;
	private String pollEndDate;
	private String optionContent;
	
	// 게시글 신고용
	private String reportStFlag;
	private int reportCount;
	private String boardName;
	
	
	// 댓글 목록
	private List<Comment> commentList;
	
	//페스티벌 목록
	private Festival festival;
	
	// 투표 목록
	private List<Poll> pollList;
	
	// 선택지 목록 
	private String[] option;
	
	// 신고 목록
	private List<Report> reportList;
	
}
