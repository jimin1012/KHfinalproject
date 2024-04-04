package com.nxshxw.project.restaurant.model.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TastyRest {
	
	private int reviewNo;
	private String restName;
	private String title;
	private String boardContent;
	private Date createDate;
	private String starPoint;
	private String thumbnail;
	
	private int userNo;
	private String userName;

}
