package com.nxshxw.project.myPage.model.service;

import java.io.IOException;

import java.util.Map;

import javax.swing.border.Border;

import java.util.List;


import org.springframework.web.multipart.MultipartFile;

import com.nxshxw.project.acc.model.dto.accReserve;
import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.message.model.dto.Message;
import com.nxshxw.project.user.model.dto.User;

public interface MyPageService {

	/** 프로필 이미지 수정
	 * @param profileImage
	 * @param webPath
	 * @param filePath
	 * @param loginUser
	 * @return result
	 */
	int updateProfile(MultipartFile profileImage, String webPath, String filePath, User loginUser) throws IllegalStateException, IOException;
	
	
	/** 내 정보
	 * @param updateUser
	 * @param profileImage
	 * @return
	 */
	// int updateInfo(User updateUser, MultipartFile profileImage, String webPath, String filePath) throws IllegalStateException, IOException;

	/** 비밀번호 변경
	 * @param currentPw
	 * @param newPw
	 * @param userNo
	 * @return
	 */
	int changePw(String currentPw, String newPw, int userNo);

	/** 회원 탈퇴
	 * @param userPw
	 * @param userNo
	 * @return
	 */
	int secession(String userPw, int userNo);

	

	/** 내 정보 수정
	 * @param updateUser
	 * @return
	 */
	int updateInfo(User updateUser);


	/** 프로필 이미지(info)
	 * @param profileImage
	 * @param webPath
	 * @param filePath
	 * @return
	 */
	String uploadProfileImage(MultipartFile profileImage, String webPath, String filePath, User loginUser) throws IllegalStateException, IOException;



	/** 나의 결제내역 카테고리선택안했을때
	 * @return
	 */
	Map<String, Object> selectPurchaseList(int userNo);


	/** 나의 결제내역 카테고리 선택했을때
	 * @param paramMap
	 * @return
	 */
	Map<String, Object> selectPurchaseList(Map<String, Object> paramMap);


	/** 내 게시글 조회
	 * @param userId
	 * @return
	 */
	Map<String, Object> myPost(String userId);


	/** 내 게시글 선택했을때
	 * @param paramMap
	 * @return
	 */
	Map<String, Object> myPostDetail(Map<String, Object> paramMap);


	// 내 댓글 전체
	Map<String, Object> myComment(String userId);

	// 내 댓글 카테고리 선택
	Map<String, Object> myCommentDetail(Map<String, Object> paramMap);


	/** 받은 쪽지 리스트 조회
	 * @param userNo
	 * @return messageList
	 */
	List<Message> selectGetMessageList(int userNo);


	/** 리뷰 작성 시작일 조회
	 * @param userNo
	 * @return
	 */
	List<accReserve> selectReviewStart(int userNo);



	/** 쪽지함 카테고리 선택 목록 조회
	 * @param loginUser
	 * @param map
	 * @return messageList
	 */
	List<Message> selectMyMessageCategory(User loginUser, Map<String, Object> map);


	/** 내 게시글 삭제
	 * @param deleteArr
	 * @return
	 */
	int deleteMyPost(int[] deleteArr);


	/** 내 댓글 삭제
	 * @param deleteArr
	 * @return
	 */
	int deleteMyComment(int[] deleteArr);



	


	





}
