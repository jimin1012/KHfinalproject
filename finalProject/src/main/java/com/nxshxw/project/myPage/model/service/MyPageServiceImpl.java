package com.nxshxw.project.myPage.model.service;

import java.io.File;
import java.io.IOException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.util.List;

import java.util.UUID;

import javax.swing.border.Border;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.nxshxw.project.acc.model.dto.accReserve;
import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.board.model.dto.Comment;
import com.nxshxw.project.common.utility.Util;
import com.nxshxw.project.message.model.dto.Message;
import com.nxshxw.project.myPage.model.dao.MyPageDAO;
import com.nxshxw.project.reservation.model.dto.Reservation;
import com.nxshxw.project.user.model.dto.User;

@Service
public class MyPageServiceImpl implements MyPageService {

	@Autowired
	private MyPageDAO dao;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;

	// 프로필 이미지 수정
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int updateProfile(MultipartFile profileImage, String webPath, String filePath, User loginUser)
			throws IllegalStateException, IOException {

		String temp = loginUser.getProfileImage();

		String rename = null;

		if (profileImage.getSize() > 0) {

			rename = Util.fileRename(profileImage.getOriginalFilename());

			loginUser.setProfileImage(webPath + rename);

		} else { // 없는 경우 (x버튼)

			loginUser.setProfileImage(null);

		}

		int result = dao.updateProfile(loginUser);

		if (result > 0) { // 성공

			if (rename != null) {
				profileImage.transferTo(new File(filePath + rename));
			}

		} else { // 실패

			loginUser.setProfileImage(temp);

		}

		return result;
	}

//	// 내 정보
//	@Transactional(rollbackFor = { Exception.class })
//	@Override
//	public int updateInfo(User updateUser, MultipartFile profileImage, String webPath, String filePath) 
//				throws IllegalStateException, IOException {
//
//
//		String temp = updateUser.getProfileImage();
//
//		String rename = null;
//
//		if (profileImage.getSize() > 0) {
//
//			rename = Util.fileRename(profileImage.getOriginalFilename());
//
//			updateUser.setProfileImage(webPath + rename);
//
//		}
//		
//		int result = dao.updateInfo(updateUser);
//		
//		if (result > 0) { // 성공
//
//			if (rename != null) {
//				profileImage.transferTo(new File(filePath + rename));
//			}
//
//		} else { // 실패
//
//			updateUser.setProfileImage(temp);
//
//		}
//
//		return result;
//	}
	
	
	// 비밀번호 변경
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int changePw(String currentPw, String newPw, int userNo) {

		String encPw = dao.selectEncPw(userNo);

		if (bcrypt.matches(currentPw, encPw)) {

			return dao.changePw(bcrypt.encode(newPw), userNo);
		}

		return 0;

	}

	// 회원 탈퇴
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int secession(String userPw, int userNo) {
		String encPw = dao.selectEncPw(userNo);

		if (bcrypt.matches(userPw, encPw)) {

			return dao.secession(userNo);
		}

		return 0;
	}
	
	// 프로필 이미지(info)
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public String uploadProfileImage(MultipartFile profileImage, String webPath, String filePath, User loginUser) 
			throws IllegalStateException, IOException{
		
		// 프로필 이미지 업로드 및 URL 반환 로직
        String imageUrl = null;
        if (profileImage != null && !profileImage.isEmpty()) {
            // 프로필 이미지를 저장하고 URL을 얻는 로직을 작성
            imageUrl = saveProfileImage(profileImage, webPath, filePath, loginUser);
        }
        return imageUrl;
	}
	
	private String saveProfileImage(MultipartFile profileImage, String webPath, String filePath, User loginUser) throws IOException {
        // 실제 프로필 이미지를 저장하는 로직을 작성
        // filePath 디렉토리에 파일을 저장하고, 파일의 URL을 생성하여 반환
        // 예를 들어, 파일 저장, 파일 이름 생성, URL 생성 등의 작업이 이루어져야 합니다.
        String fileName = generateFileName(profileImage);
        String fullPath = filePath + "/" + fileName;
        profileImage.transferTo(new File(fullPath)); // 파일 저장
        String imageUrl = webPath + "/" + fileName; // URL 생성
        return imageUrl;
    }

    private String generateFileName(MultipartFile profileImage) {
        // 파일 이름을 고유하게 생성하는 로직을 작성
        // 예를 들어, 현재 시간을 기반으로 한 랜덤한 이름 생성 등의 작업이 이루어져야 합니다.
        String originalFileName = profileImage.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String fileName = "profile_" + UUID.randomUUID().toString() + extension;
        return fileName;
    }

	// 내 정보 수정(info)
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int updateInfo(User updateUser) {
		 return dao.updateUser(updateUser);
	}


	// 나의결제내역 카테고리선택 안했을 때 (전체)
	@Override
	public Map<String, Object> selectPurchaseList(int userNo) {
		
		List<Reservation> list = new ArrayList<Reservation>();
		
		
		System.out.println("aaa :"+dao.selectTransportPurchaseList(userNo));
		System.out.println("ccc :"+dao.selectAccPurchaseList(userNo));
		list.addAll(dao.selectTransportPurchaseList(userNo));
		list.addAll(dao.selectAccPurchaseList(userNo));
	
		
		System.out.println("list :"+list);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("list", list);
		return map;
	}

	// 나의 결제내역 카테고리 선택 했을 때
	@Override
	public Map<String, Object> selectPurchaseList(Map<String, Object> paramMap) {
		
		
		List<Reservation> list = new ArrayList<Reservation>();
		
		
		
		if(paramMap.get("category").equals("train")||paramMap.get("category").equals("bus")) {
			list.addAll(dao.selectTransportPurchaseListSearch(paramMap));
		}else if(paramMap.get("category").equals("acc")) {
			list.addAll(dao.selectAccPurchaseListSearch(paramMap));
		}else {
			int userNo = (int) paramMap.get("userNo");
			list.addAll(dao.selectTransportPurchaseList(userNo));
			list.addAll(dao.selectAccPurchaseList(userNo));
		}
	
		
		System.out.println("카테고리 선택 list : "+list);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("list", list);
		
		return map;
  }

	// 내 게시글 조회 (전체)
	@Override
	public Map<String, Object> myPost(String userId) {
		
		List<Board> list = new ArrayList<Board>();
		list.addAll(dao.myPost(userId));
		
		Map<String, Object> myPost = new HashMap<String, Object>();
		myPost.put("list", list);
		return myPost;
	}

	@Override
	public Map<String, Object> myPostDetail(Map<String, Object> paramMap) {
		List<Board> list = new ArrayList<Board>();
		
		if((paramMap.get("category").equals("2"))|| (paramMap.get("category").equals("3")) || (paramMap.get("category").equals("4")) ) {
			list.addAll(dao.myPostDetail(paramMap));
		} else {
			String userId = (String) paramMap.get("userId");
			list.addAll(dao.myPost(userId));
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("list", list);
		
		return map;
	}

	// 내 댓글 전체
	@Override
	public Map<String, Object> myComment(String userId) {
		List<Comment> list = new ArrayList<Comment>();
		
		list.addAll(dao.myComment(userId));
		
		Map<String, Object> myComment = new HashMap<String, Object>();
		myComment.put("list", list);
		return myComment;
	}

	// 내 댓글 카테고리
	@Override
	public Map<String, Object> myCommentDetail(Map<String, Object> paramMap) {
		
		List<Comment> list = new ArrayList<Comment>();
		
		if((paramMap.get("category").equals("2"))|| (paramMap.get("category").equals("3")) || (paramMap.get("category").equals("4")) ) {
			list.addAll(dao.myCommentDetail(paramMap));
		} else {
			String userId = (String) paramMap.get("userId");
			list.addAll(dao.myComment(userId));
		}
		
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("list", list);
		
		return map;
	}

	// 받은 쪽지 목록 조회
	@Override
	public List<Message> selectGetMessageList(int userNo) {
		return dao.selectGetMessageList(userNo);
	}

	// 리뷰 등록 시작일 조회
	@Override
	public List<accReserve> selectReviewStart(int userNo) {
		
		List<accReserve> selectReviewStart = dao.selectReviewStart(userNo);
		
		return selectReviewStart;
	}

	
	// 쪽지함 카테고리 선택 목록 조회
	@Override
	public List<Message> selectMyMessageCategory(User loginUser, Map<String, Object> map) {
		return dao.selectMyMessageCategory(map);
	}

	// 내 게시글 삭제
	@Override
	public int deleteMyPost(int[] deleteArr) {
		return dao.deleteMyPost(deleteArr);
	}

	// 내 댓글 삭제
	@Override
	public int deleteMyComment(int[] deleteArr) {
		return dao.deleteMyComment(deleteArr);
	}

	
	

	


}
