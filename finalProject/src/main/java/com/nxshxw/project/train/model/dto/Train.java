package com.nxshxw.project.train.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Train{
	
	private String depName;
	private String arrName;
	private String depTime;
	private String trainGrade;
	private String carNo;
	
	
	
	private String charge;
	private String realDate;
	private String arrTime;
}


