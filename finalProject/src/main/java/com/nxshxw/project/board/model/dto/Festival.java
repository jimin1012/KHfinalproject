package com.nxshxw.project.board.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Festival {

	private int boardNo;
	private String festivalStartDate;
	private String festivalEndtDate;
	private String festivalAddress;
	private String festivalPrice;
	private String festivalHost;
	
	private double commentStar;
	
}
