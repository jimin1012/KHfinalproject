package com.nxshxw.project.ownerPage.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ACCResnOwner {
	
	private int accNo;
	
	// 숙소 등급 
	private String accType;
	private int roomPrice;
	private int roomCapacity;
	
	// 숙소예약 인포 (ACC_RESN)
	private int resPeople;
	private int accCode;
	
	private int reservationNo; // 예약번호
	
	//예약 테이블
	private String reservationName; //예약명(상품명)
	private String reservationDelFl; // 예약상태
	private String reservationStartDate; // 예약한 날짜 (숙소는 체크인날짜, 기차버스는 출발날짜(시간)
	private String reservationEndDate; // 예약한 날짜 (숙소는 체크아웃날짜, 기차버스는 도착날짜(시간)
	private int price; // 결제금액
	private String payTime; // 결제시간
	private int userNo; // 예약한사람번호
	
	// USER테이블
	private String userName; //예약자명
	private String userTel; // 예약자 번호

	
	
//	private String reservType; // 예약한 상품 종류(숙소인지, 기차인지, 버스인지)
	

}
