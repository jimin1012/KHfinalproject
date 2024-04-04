package com.nxshxw.project.chat.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Chatting {

	private int chatNo; // 채팅 메세지 번호
    private String chatContent; // 채팅 내역
    private String sendDate; // 전송 날짜
    private String sendTime; // 전송 시간
    private int senderNo; // 보낸 회원 번호
    private int chatRoomNo; // 채팅 방 번호
    private String readFlag; // 읽음 표시 (N:안읽음, Y:읽음)
    
    private int targetNo; // 받는 회원 번호
	private int authority; // 회원권한(일반 : 1, 사업자 : 2, 관리자 : 3)
	
	
}
