package com.nxshxw.project.myPage.model.dao;

import java.io.IOException;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import javax.swing.border.Border;

import java.util.List;


import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;


import com.nxshxw.project.reservation.model.dto.Reservation;
import com.nxshxw.project.acc.model.dto.accReserve;
import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.board.model.dto.Comment;
import com.nxshxw.project.message.model.dto.Message;
import com.nxshxw.project.user.model.dto.User;

@Repository
public class MyPageDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 프로필 업데이트(이미지)
	 * @param loginUser
	 * @return
	 */
	public int updateProfile(User loginUser) {
		return sqlSession.update("myPageMapper.updateProfile", loginUser);
	}
	
	/** 비밀번호 암호화
	 * @param userNo
	 * @return
	 */
	public String selectEncPw(int userNo) {
		return sqlSession.selectOne("myPageMapper.selectEncPw", userNo);
	}
	
	/** 비밀번호 수정
	 * @param encode
	 * @param userNo
	 * @return
	 */
	public int changePw(String newPw, int userNo) {
		
		User user = new User();
		user.setUserNo(userNo);
		user.setUserPw(newPw);
		return sqlSession.update("myPageMapper.changePw", user);
	}

	/** 회원 탈퇴
	 * @param userNo
	 * @return
	 */
	public int secession(int userNo) {
		return sqlSession.update("myPageMapper.secession", userNo);
	}

	
	/** 내 정보 수정(info)
	 * @param updateUser
	 * @return
	 */
	public int updateUser(User updateUser) {
		return sqlSession.update("myPageMapper.updateInfo", updateUser);
	}


	/** 나의결제내역 카테고리선택 안했을 때 (전체교통)
	 * @return
	 */
	public List<Reservation> selectTransportPurchaseList(int userNo) {
		return sqlSession.selectList("myPageMapper.selectTransportPurchaseList",userNo);
	}
	/** 나의결제내역 카테고리선택 안했을 때 (전체숙박)
	 * @return
	 */
	public List<Reservation>  selectAccPurchaseList(int userNo) {
		return sqlSession.selectList("myPageMapper.selectAccPurchaseList",userNo);
	}
	
	

	/** 나의결제내역 카테고리선택 했을 때 (전체교통)
	 * @param paramMap
	 * @return
	 */
	public List<Reservation>  selectTransportPurchaseListSearch(Map<String, Object> paramMap) {
		return sqlSession.selectList("myPageMapper.selectTransportPurchaseListSearch",paramMap);
	}

	/** 나의결제내역 카테고리선택 했을 때 (전체숙박)
	 * @param paramMap
	 * @return
	 */
	public List<Reservation>  selectAccPurchaseListSearch(Map<String, Object> paramMap) {
		return sqlSession.selectList("myPageMapper.selectAccPurchaseListSearch",paramMap);
	}


	/** 리뷰 등록 시작 날짜
	 * @param userNo
	 * @return
	 */
	public List<accReserve> selectReviewStart(int userNo) {
		return sqlSession.selectList("accMapper.selectReviewStart", userNo);
	}


	/** 내 게시글 전체
	 * @param userId
	 * @return
	 */
	public List<Board> myPost(String userId) {
		return sqlSession.selectList("myPageMapper.myPost", userId);
	}

	/** 내 게시글 옵션 선택
	 * @param paramMap
	 * @return
	 */
	public List<Board> myPostDetail(Map<String, Object> paramMap) {
		return sqlSession.selectList("myPageMapper.myPostDetail", paramMap);
	}

	public List<Comment> myComment(String userId) {
		return sqlSession.selectList("myPageMapper.myComment", userId);
	}

	/**
	 * @param paramMap
	 * @return
	 */
	public List<Comment> myCommentDetail(Map<String, Object> paramMap) {
		return sqlSession.selectList("myPageMapper.myCommentDetail", paramMap);
	}

	/** 받은 쪽지 목록 조회
	 * @param userNo
	 * @return messageList
	 */
	public List<Message> selectGetMessageList(int userNo) {
		return sqlSession.selectList("myPageMapper.selectGetMessageList", userNo);
	}

	/** 쪽지함 카테고리 선택 목록 조회
	 * @param map
	 * @return messageList
	 */
	public List<Message> selectMyMessageCategory(Map<String, Object> map) {
		return sqlSession.selectList("myPageMapper.selectMyMessageCategory", map);
	}

	/** 내 게시글 삭제
	 * @param deleteArr
	 * @return
	 */
	public int deleteMyPost(int[] deleteArr) {
		return sqlSession.update("myPageMapper.deleteMyPost", deleteArr);
	}

	/** 내 댓글 삭제
	 * @param deleteArr
	 * @return
	 */
	public int deleteMyComment(int[] deleteArr) {
		return sqlSession.update("myPageMapper.deleteMyComment", deleteArr);
	}
	




}
