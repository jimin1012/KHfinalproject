package com.nxshxw.project.chat.model.service;

import java.util.List;
import java.util.Map;

import com.nxshxw.project.chat.model.dto.ChatRoom;
import com.nxshxw.project.chat.model.dto.Chatting;

public interface ChatService {

    /** 채팅 전송
     * @param chat
     * @return result
     */
    int insertChat(Chatting chat);

    
	/** 관리자 번호 조회
	 * @return targetNo
	 */
	int selectManagerNo();

	/** 채팅방 조회
	 * @param map
	 * @return chatRoomNo
	 */
	int selectChatRoom(Map<String, Object> map);

	/** 채팅방 생성
	 * @param map
	 * @return chatRoomNo
	 */
	int createChatRoom(Map<String, Object> map);


	/** 채팅내역 조회
	 * @param map
	 * @return chatList
	 */
	List<Chatting> selectChatList(Map<String, Object> paramMap);


	/** 관리자 - 채팅방 목록 (전체)
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectChatRoomList(int cp);

	/** 관리자 - 중요 목록 조회 + 검색(전체,중요)
	 * @param cp 
	 * @return map
	 */
	Map<String, Object> selectChatRoomList(int cp, Map<String, Object> paramMap);

	/** 관리자 - 채팅방 중요 표시 변경
	 * @param paramMap
	 * @return result
	 */
	int updateStarCheck(Map<String, Object> paramMap);

	/** 관리자 - 채팅방 차단 처리
	 * @param paramMap
	 * @return result
	 */
	int updatechatBlock(Map<String, Object> paramMap);

	/** 관리자 채팅방 차단해제
	 * @param paramMap
	 * @return result
	 */
	int updatechatCancelBlock(Map<String, Object> paramMap);

	/** 관리자 채팅방 삭제
	 * @param paramMap
	 * @return result
	 */
	int updatechatDeleteBlock(Map<String, Object> paramMap);

	/** 채팅내역 조회(관리자)
	 * @param chatRoomNo
	 * @return chatList
	 */
	List<Chatting> selectChatList(ChatRoom chatRoom);

	/** 채팅 상대방 (일반/사업자) 정보 조회
	 * @param chatRoom 
	 * @return userNo
	 */
	int selectUserNo(ChatRoom chatRoom);

	/** 채팅 상대방 (일반/사업자) 정보 조회
	 * @param chatRoom
	 * @return chatRoomInfo
	 */
	ChatRoom selectChatRoomInfo(ChatRoom chatRoom);

	/** 채팅방 상태 조회
	 * @param chatRoomNo
	 * @return chatRoomStateFl
	 */
	String selectChatRoomStateFl(int chatRoomNo);
}
