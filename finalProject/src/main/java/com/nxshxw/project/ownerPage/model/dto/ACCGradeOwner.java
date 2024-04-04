package com.nxshxw.project.ownerPage.model.dto;

import java.sql.Date;
import java.util.List;

import com.nxshxw.project.board.model.dto.Comment;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class ACCGradeOwner {
	
	// 숙소 등급 
	private int accCode;
	private String accType;
	private int roomPrice;
	private int roomCapacity;
	private int accNo;
	private String roomCheckIn;
	private String roomCheckOut;
	
	
	// 객실 수
	private int standardRoom;
	private int deluxeRoom;
	private int sweetRoom;
	
}
