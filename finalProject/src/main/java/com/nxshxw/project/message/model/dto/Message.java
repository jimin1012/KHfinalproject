package com.nxshxw.project.message.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Message {

	private int messageNo; // 쪽지 번호
	private String messageContent; // 쪽지 내용
	private String messageCreateDate; // 쪽지 작성 날짜
	private String messageDelFlag; // 쪽지 삭제 여부
	private int senderNo; // 보내는 이
	private int recieverNo; // 받는 이
	
	private String userNickname;
}
