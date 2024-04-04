package com.nxshxw.project.chat.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatRoom {

	private int chatRoomNo; // 채팅방 번호
    private String chatRoomStateFL; // 채팅방 상태 (일반:N, 중요:S, 차단:B)
    private int userNo; // 회원 번호
    private int managerNo; // 매니저 번호
    
    private String userNickname; // 회원 닉네임
    private String userProfile; // 회원 프로필사진
    private int notReadCount; // 읽음 표시
    
    private String lastMessage; // 마지막으로 보낸 채팅
    private String sendTime; // 채팅 전송 시간
    private int authority; // 회원권한(일반 : 1, 사업자 : 2, 관리자 : 3)
}
