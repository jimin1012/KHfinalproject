package com.nxshxw.project.acc.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class accCode {
	
	private int accCode;
	private String accType;
	private int roomCapacity;
	private int roomPrice;
	private int accNo;
	private String roomCheckIn;
	private String roomCheckOut;
	private String startDate;
	private String endDate;
	
	
	private int grNum;
	private int totalPerson;
	
	private int updateNo;

}
