package com.nxshxw.project.chat.model.websocket;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.nxshxw.project.chat.model.dto.Chatting;
import com.nxshxw.project.chat.model.service.ChatService;

import com.nxshxw.project.user.model.dto.User;

public class ChatWebsocketHandler extends TextWebSocketHandler{
	
	private Logger logger = LoggerFactory.getLogger(ChatWebsocketHandler.class);
	
	
	@Autowired
    private ChatService service;
   
    // 클라이언트의  최초 웹소켓 요청 시 생성
    private Set<WebSocketSession> sessions  = Collections.synchronizedSet(new HashSet<WebSocketSession>());
 
    // afterConnectionEstablished - 클라이언트와 연결이 완료되고, 통신할 준비가 되면 실행. 
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 연결 요청이 접수되면 해당 클라이언트와 통신을 담당하는 WebSocketSession 객체가 전달되어져 옴.
        // 이를 필드에 선언해준sessions에 저장
        sessions.add(session);
    }
    
    
    //handlerTextMessage - 클라이언트로부터 텍스트 메세지를 받았을때 실행
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        
        // 전달받은 내용은 JSON 형태의 String
        logger.info("전달받은 내용 : " + message.getPayload());
        
        // Jackson에서 제공하는 객체
        // JSON String -> VO Object
        // 전달받은 내용 : {"senderNo":"5","targetNo":"1","chattingNo":"3","messageContent":"ㅎㅇ\n"}
        ObjectMapper objectMapper = new ObjectMapper();
        
        Chatting chat = objectMapper.readValue( message.getPayload(), Chatting.class);
        // Message 객체 확인
        //System.out.println(chat); 
        
        // DB 삽입 서비스 호출
        int result = service.insertChat(chat);
        
        if(result > 0 ) {
            
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd hh:mm");
            chat.setSendTime(sdf.format(new Date()) );
            
            // 전역변수로 선언된 sessions에는 접속중인 모든 회원의 세션 정보가 담겨 있음
            for(WebSocketSession s : sessions) {
                // WebSocketSession은 HttpSession의 속성을 가로채서 똑같이 가지고 있기 때문에
                // 회원 정보를 나타내는 loginMember도 가지고 있음.
                
                // 로그인된 회원 정보 중 회원 번호 얻어오기
                int loginUserNo = ((User)s.getAttributes().get("loginUser")).getUserNo();
                logger.debug("loginMemberNo : " + loginUserNo);
                
                // 로그인 상태인 회원 중 targetNo가 일치하는 회원에게 메세지 전달
                if(loginUserNo == chat.getTargetNo() || loginUserNo == chat.getSenderNo()) {
                    
                    s.sendMessage(new TextMessage(new Gson().toJson(chat)));
                }
            }
        }
    }
    
    
    
    
    // afterConnectionClosed - 클라이언트와 연결이 종료되면 실행된다.
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }
    
}
