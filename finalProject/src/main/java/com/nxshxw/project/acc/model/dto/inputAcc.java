package com.nxshxw.project.acc.model.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class inputAcc {
	
	private String where;
	private String dates;
	private String startDate;
	private String endDate;
	private int adultNum;
	private int childNum;
	private int grNum;
	private int userNo;
	private int accNo;
	private int totalPerson;
	
	private String accName;
	
}
