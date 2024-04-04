package com.nxshxw.project.chat.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nxshxw.project.chat.model.dao.ChatDAO;
import com.nxshxw.project.chat.model.dto.ChatRoom;
import com.nxshxw.project.chat.model.dto.Chatting;
import com.nxshxw.project.common.utility.Pagination;
import com.nxshxw.project.common.utility.Util;

/**
 * @author sunny
 *
 */
@Service
public class ChatServiceImpl implements ChatService {


	@Autowired
	private ChatDAO dao;
	
	// 관리자 번호 조회
	@Override
	public int selectManagerNo() {
		return dao.selectManagerNo();
	}

	// 채팅방 조회
	@Override
	public int selectChatRoom(Map<String, Object> map) {
		return dao.selectChatRoom(map);
	}

	// 채팅방 생성
	@Override
	public int createChatRoom(Map<String, Object> map) {
		return dao.createChatRoom(map);
	}

	// 채팅 내역 조회
	@Override
	public List<Chatting> selectChatList(Map<String, Object> paramMap) {
		
		List<Chatting> chatList = dao.selectChatList(paramMap);
		// 읽음 표시 처리!!!
		if(!chatList.isEmpty()) {
			int result = dao.updateReadFlag(paramMap);
		}
		
		
		return chatList;
	}
	
	// 채팅 전송
	@Override
	public int insertChat(Chatting chat) {
		chat.setChatContent(Util.XSSHandling(chat.getChatContent()));
		chat.setChatContent(Util.badLanguageHandling(chat.getChatContent()));
		
		return dao.insertChat(chat);
	}
	
	
	// 관리자 - 채팅방 목록 조회 (전체)
	@Override
	public Map<String, Object> selectChatRoomList(int cp) {

		// 1. 채팅방 개수 조회 (일반+중요)
		int roomCount = dao.getRoomCount();
		
		// 2. Pagination 객체 생성
		Pagination pagination = new Pagination(cp, roomCount);
		
		// 3. 현재 페이지 채팅방 목록 조회 (일반+중요)
		List<ChatRoom> chatRoomList = dao.selectChatRoomList(pagination);
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("pagination", pagination);
		map.put("chatRoomList", chatRoomList);
	
		return map;
	}

	// 관리자 - 중요 목록 조회 + 검색(전체,중요)
	@Override
	public Map<String, Object> selectChatRoomList(int cp, Map<String, Object> paramMap) {
		
		// 1. 채팅방 개수 조회 (일반+중요)
		int roomCount = dao.getRoomCountSearch(paramMap);

		// 2. Pagination 객체 생성
		Pagination pagination = new Pagination(cp, roomCount);

		// 3. 현재 페이지 채팅방 목록 조회 (일반+중요)
		List<ChatRoom> chatRoomList = dao.selectChatRoomListSearch(pagination, paramMap);

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("pagination", pagination);
		map.put("chatRoomList", chatRoomList);


		return map;
	}

	// 관리자 - 채팅방 중요 표시 변경
	@Override
	public int updateStarCheck(Map<String, Object> paramMap) {
		return dao.updateStarCheck(paramMap);
	}

	
	// 관리자 - 채팅방 차단 처리
	@Override
	public int updatechatBlock(Map<String, Object> paramMap) {
		return dao.updatechatBlock(paramMap);
	}

	// 관리자 채팅방 차단해제
	@Override
	public int updatechatCancelBlock(Map<String, Object> paramMap) {
		return dao.updatechatCancelBlock(paramMap);
	}

	// 관리자 채팅방 삭제
	@Override
	public int updatechatDeleteBlock(Map<String, Object> paramMap) {
		return dao.updatechatDeleteBlock(paramMap);
	}
	
	// 채팅내역 조회 (관리자)
	@Override
	public List<Chatting> selectChatList(ChatRoom chatRoom) {
		
		
		
		// 채팅 내역 조회
		List<Chatting> chatList = dao.selectChatList(chatRoom);
		// 읽음 표시 처리!!!
		if(!chatList.isEmpty()) {
			int result = dao.updateReadFlag(chatRoom);
		}
		
		return chatList;
	}

	// 채팅 상대방 (일반/사업자) 정보 조회
	@Override
	public int selectUserNo(ChatRoom chatRoom) {
		return dao.selectUserNo(chatRoom);
	}

	// 채팅 상대방 (일반/사업자) 정보 조회
	@Override
	public ChatRoom selectChatRoomInfo(ChatRoom chatRoom) {
		return dao.selectChatRoomInfo(chatRoom);
	}

	// 채팅방 상태 조회
	@Override
	public String selectChatRoomStateFl(int chatRoomNo) {
		return dao.selectChatRoomStateFl(chatRoomNo);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
