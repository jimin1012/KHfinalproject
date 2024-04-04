package com.nxshxw.project.acc.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class accRate {	
	private int rateNo;
	private int accCleanRate;
	private int accFacRate;
	private int accKindRate;
	private int accReviewNo;	
	
	private double avgKindRate;
	private double avgFacRate;
	private double avgCleanRate;
}
