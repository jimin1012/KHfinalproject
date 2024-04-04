package com.nxshxw.project.reservation.model.dto;

import java.util.List;

import com.nxshxw.project.board.model.dto.Comment;
import com.nxshxw.project.board.model.dto.Festival;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Reservation {
	
	//예약 테이블
	private int reservationNo; // 예약번호
	private String reservationName; //예약명(상품명)
	private String reservationDelFl; // 예약상태
	private String reservationStartDate; // 예약한 날짜 (숙소는 체크인날짜, 기차버스는 출발날짜(시간)
	private String reservationEndDate; // 예약한 날짜 (숙소는 체크아웃날짜, 기차버스는 도착날짜(시간)
	private int price; // 결제금액
	private String payTime; // 결제시간
	private int userNo; // 예약한사람번호
	private String reservType; // 예약한 상품 종류(숙소인지, 기차인지, 버스인지)
	private String reservUID; // 포트원 결제고유아이디 (결제취소에 사용)
	
	//기차,버스
	private String depPlace; // 출발지
	private String arrPlace; // 도착지
	private String seatNo; // 좌석번호 (ex: A7)
	private int transpCode; // 교통수단종류 (기차 :1, 버스 : 2)
	private String grade; // 등급
	private int trainCarNo; // 몇호차인지 (기차만 포함)
	
	
	
	//숙소
	private int resPeople; // 예약인원
	private int accCode; // 객실 뭐 선택했는지 알기위해
	private int accNo; // 어디숙소인지알기위해
	private String accAddr;// 숙소주소
	
	// 부가정보(영수증땜시)
	private String userName;
	private String userTel;
}
