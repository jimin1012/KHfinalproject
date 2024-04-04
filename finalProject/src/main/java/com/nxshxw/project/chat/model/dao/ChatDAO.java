package com.nxshxw.project.chat.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.chat.model.dto.ChatRoom;
import com.nxshxw.project.chat.model.dto.Chatting;
import com.nxshxw.project.common.utility.Pagination;

@Repository
public class ChatDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 관리자 번호 조회
	 * @return targetNo
	 */
	public int selectManagerNo() {
		return sqlSession.selectOne("chatMapper.selectManagerNo");
	}

	/** 채팅방 조회
	 * @param map
	 * @return chatRoomNo
	 */
	public int selectChatRoom(Map<String, Object> map) {
		return sqlSession.selectOne("chatMapper.selectChatRoom", map);
	}

	/** 채팅방 생성
	 * @param map
	 * @return chatRoomNo
	 */
	public int createChatRoom(Map<String, Object> map) {
		
		int result = sqlSession.insert("chatMapper.createChatRoom", map);
		
		int chatRoomNo = 0;
		if(result > 0) {
			chatRoomNo = sqlSession.selectOne("chatMapper.selectChatRoom", map);			
		}
		
		return chatRoomNo;
	}

	/** 채팅 내역 조회
	 * @param map
	 * @return chatList
	 */
	public List<Chatting> selectChatList(Map<String, Object> paramMap) {
		return sqlSession.selectList("chatMapper.selectChatList", paramMap);
	}

	
	/** 채팅 전송
	 * @param chat
	 * @return result
	 */
	public int insertChat(Chatting chat) {
		return sqlSession.insert("chatMapper.insertChat", chat);
	}

	/** 채팅 읽음 처리
	 * @param paramMap
	 * @return result
	 */
	public int updateReadFlag(Map<String, Object> paramMap) {
		return sqlSession.update("chatMapper.updateReadFlag", paramMap);
	}

	

	/** 채팅방 개수 조회 (전체)
	 * @return roomCount
	 */
	public int getRoomCount() {
		return sqlSession.selectOne("chatMapper.getRoomCount");
	}

	/** 현재 페이지 채팅방 목록 조회 (전체)
	 * @param pagination
	 * @return chatRoomList
	 */
	public List<ChatRoom> selectChatRoomList(Pagination pagination) {
		
		// 1. offset 계산
		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();
		
		// 2. RowBounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		
		return sqlSession.selectList("chatMapper.selectChatRoomListAll", null, rowBounds);
	}

	/** 채팅방 개수 조회 (중요 목록 조회 + 검색(전체,중요))
	 * @return listCount
	 */
	public int getRoomCountSearch(Map<String, Object> paramMap) {
		return sqlSession.selectOne("chatMapper.getRoomCountSearch", paramMap);
	}

	/** 현재 페이지 채팅방 중요 목록 조회 + 검색(전체,중요)
	 * @param pagination
	 * @return chatRoomList
	 */
	public List<ChatRoom> selectChatRoomListSearch(Pagination pagination, Map<String, Object> paramMap) {
		// 1. offset 계산
		int offset = (pagination.getCurrentPage() -1) * pagination.getLimit();

		// 2. RowBounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());


		return sqlSession.selectList("chatMapper.selectChatRoomListSearch", paramMap, rowBounds);
	}

	/** 관리자 - 채팅방 중요 표시 변경
	 * @param paramMap
	 * @return result
	 */
	public int updateStarCheck(Map<String, Object> paramMap) {
		return sqlSession.update("chatMapper.updateStarCheck", paramMap);
	}

	/** 관리자 - 채팅방 차단 처리
	 * @param paramMap
	 * @return result
	 */
	public int updatechatBlock(Map<String, Object> paramMap) {
		return sqlSession.update("chatMapper.updatechatBlock", paramMap);
	}

	/** 관리자 - 채팅방 차단 해제
	 * @param paramMap
	 * @return result
	 */
	public int updatechatCancelBlock(Map<String, Object> paramMap) {
		return sqlSession.update("chatMapper.updatechatCancelBlock", paramMap);
	}

	/** 관리자 - 채팅방 차단 삭제
	 * @param paramMap
	 * @return result
	 */
	public int updatechatDeleteBlock(Map<String, Object> paramMap) {
		return sqlSession.update("chatMapper.updatechatDeleteBlock", paramMap);
	}

	/** 관리자 - 채팅 내역 조회
	 * @param chatRoomNo
	 * @return chatList
	 */
	public List<Chatting> selectChatList(ChatRoom chatRoom) {
		return sqlSession.selectList("chatMapper.selectChatList", chatRoom);
	}

	/** 관리자 - 채팅 읽음 처리
	 * @param chatRoom
	 * @return
	 */
	public int updateReadFlag(ChatRoom chatRoom) {
		return sqlSession.update("chatMapper.updateReadFlagAdmin", chatRoom);
	}

	/** 채팅 상대방 (일반/사업자) 정보 조회
	 * @param chatRoom
	 * @return userNo
	 */
	public int selectUserNo(ChatRoom chatRoom) {
		return sqlSession.selectOne("chatMapper.selectUserNo", chatRoom);
	}

	/** 채팅 상대방 (일반/사업자) 정보 조회
	 * @param chatRoom
	 * @return chatRoomInfo
	 */
	public ChatRoom selectChatRoomInfo(ChatRoom chatRoom) {
		return sqlSession.selectOne("chatMapper.selectChatRoomInfo", chatRoom);
	}

	/** 채팅방 상태 조회
	 * @param chatRoomNo
	 * @return chatRoomStateFl
	 */
	public String selectChatRoomStateFl(int chatRoomNo) {
		return sqlSession.selectOne("chatMapper.selectChatRoomStateFl", chatRoomNo);
	}



}
