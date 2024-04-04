package com.nxshxw.project.user.model.dto;

import java.util.List;

import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.board.model.dto.Comment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class User {
	
	private int userNo;
	private String userId;
	private String userPw;
	private String userName;
	private String userNickname;
	private String userTel;
	private String userEmail;
	private String userBirthDate;
	private char userGender;
	private String userAddress;
	private String profileImage;
	private String enrollDate;
	private String userDeleteFlag;
	private int authority;
	
	
	private int bossNo;
	private String accName;
	private String accTel;
	private String openDate;
	private String accAddress;
	private String bossAccount;
	
	private List<Board> myPostList;
	private List<Comment> myCommentList;
	
	private String snsState;//지우지마세요~~
}
