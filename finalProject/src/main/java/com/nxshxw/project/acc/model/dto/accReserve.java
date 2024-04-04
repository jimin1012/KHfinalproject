package com.nxshxw.project.acc.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class accReserve {
	
	private int reservationNo;
	private String reservationName;
	private char reservationDelFl;
	private String reservStartDate;
	private String reservEndDate;
	private int price;
	private char reservType;
	private String payTime;
	private String reservUid;
	private int userNo;
	private int accNo;
	private int resPeople;
	private int accCode;
	private String reviewStartDate;


}
