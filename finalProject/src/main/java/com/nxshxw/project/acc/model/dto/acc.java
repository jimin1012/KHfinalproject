package com.nxshxw.project.acc.model.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class acc {
	
	private int accNo;
	private String accName;
	private String accTel;
	private String accAddr;
	private String accStFl;
	private int bossNo;
	private String accCategory;
	private String openDate;
	
	private double rate;
	private String grade;
	private int price;
	private String wishCheck;
	private int reviewCount;
	private int userNo;
	
	private String profileImage;
	private String thumbnail;
	
	private List<accImage> imageList;

}
