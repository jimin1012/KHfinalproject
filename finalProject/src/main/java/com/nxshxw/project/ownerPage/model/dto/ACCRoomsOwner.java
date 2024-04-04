package com.nxshxw.project.ownerPage.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ACCRoomsOwner {
	
	// 방정보 (ACC_RESN)
	
	private int accNo;
	private String accCode;
	private String accType;
	private String roomPrice;
	private String roomCapacity;
	private String roomCount;
	
	private String roomCheckIn;
	private String roomCheckOut;

}
