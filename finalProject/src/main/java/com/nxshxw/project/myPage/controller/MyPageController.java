package com.nxshxw.project.myPage.controller;

import java.io.IOException;

import java.util.Map;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.swing.border.Border;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nxshxw.project.acc.model.dto.accReserve;
import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.message.model.dto.Message;
import com.nxshxw.project.myPage.model.service.MyPageService;
import com.nxshxw.project.user.model.dto.User;

@SessionAttributes({ "loginUser" })
@RequestMapping("/myPage")
@Controller
public class MyPageController {

	@Autowired
	private MyPageService service;

	// 프로필 페이지 이동
	@GetMapping("/profile")
	public String profile() {
		return "myPage/myPage-profile";
	}

	// 프로필 이미지 수정
	@PostMapping("/profile")
	public String updateProfile(@RequestParam("profileImage") MultipartFile profileImage,
			@SessionAttribute("loginUser") User loginUser, RedirectAttributes ra, HttpSession session)
			throws IllegalStateException, IOException {
		String webPath = "/resources/images/user";

		String filePath = session.getServletContext().getRealPath(webPath);

		int result = service.updateProfile(profileImage, webPath, filePath, loginUser);

		String message = null;
		if (result > 0)
			message = "프로필 이미지가 변경되었습니다.";
		else
			message = "프로필 변경 실패";

		ra.addFlashAttribute("message", message);
		return "redirect:profile";
	}

	// 내 정보 페이지 이동
	@GetMapping("/info")
	public String info() {
		return "myPage/myPage-info";
	}

	// 내 정보 페이지
	@PostMapping("/info")
	public String info(User updateUser, String[] userAddress, @SessionAttribute("loginUser") User loginUser,
			@RequestParam(value = "imageInput", required = false) MultipartFile profileImage, RedirectAttributes ra,
			HttpSession session) throws IllegalStateException, IOException {

		try {
			// 주소 합치기
			// String addr = String.join("^^^", userAddress);
			String addr = "";
	        if (userAddress != null && userAddress.length > 0) {
	            addr = String.join("·", userAddress);
	        }
			updateUser.setUserAddress(addr);

			String webPath = "/resources/images/user";

			String filePath = session.getServletContext().getRealPath(webPath);

			// 프로필 이미지 업데이트를 위한 처리
			if (profileImage != null && !profileImage.isEmpty()) {
				String imageUrl = service.uploadProfileImage(profileImage, webPath, filePath, loginUser);
				updateUser.setProfileImage(imageUrl);
			}

			// 로그인한 사용자의 번호 설정
			updateUser.setUserNo(loginUser.getUserNo());

			// 프로필 이미지 데이터를 서비스로 전달하여 정보 수정
			int result = service.updateInfo(updateUser);

			String message;

			if (result > 0) { // 성공
				message = "회원 정보가 수정되었습니다.";

				// 로그인한 사용자 정보 업데이트
				loginUser.setUserNickname(updateUser.getUserNickname());
				//loginUser.setUserTel(updateUser.getUserTel());
				loginUser.setUserAddress(updateUser.getUserAddress());
				loginUser.setProfileImage(updateUser.getProfileImage());
			} else { // 실패
				message = "회원 정보 수정 실패.";
			}

			ra.addFlashAttribute("message", message);

			// 리다이렉트될 경로 설정
			return "myPage/myPage-info"; // 내 정보 페이지로 리다이렉트

		} catch (Exception e) {
			ra.addFlashAttribute("message", "회원 정보 수정 중 오류가 발생했습니다: " + e.getMessage());
			return "redirect:/info";
		}
	}

	// 비밀번호 변경
	@GetMapping("/changePw")
	public String changePw() {
		return "myPage/myPage-changePw";
	}

	// 비밀번호 변경
	@PostMapping("/changePw")
	public String changePw(String currentPw, String newPw, @SessionAttribute("loginUser") User loginUser,
			RedirectAttributes ra) {

		int userNo = loginUser.getUserNo();

		int result = service.changePw(currentPw, newPw, userNo);

		String path = "redirect:";
		String message = null;

		if (result > 0) { // 성공
			message = "비밀번호가 변경 되었습니다.";
			path += "/myPage/info";
		} else { // 실패
			message = "비밀번호가 일치하지 않습니다..";
			path += "changePw"; // 비밀번호 변경 페이지
		}

		ra.addFlashAttribute("message", message);
		return path;
	}

	// 회원 탈퇴
	@GetMapping("/secession")
	public String secession() {
		return "myPage/myPage-secession";

	}

	// 회원 탈퇴
	@PostMapping("/secession")
	public String secession(String userPw, @SessionAttribute("loginUser") User loginUser, SessionStatus status,
			HttpServletResponse resp, RedirectAttributes ra) {

		int userNo = loginUser.getUserNo();

		int result = service.secession(userPw, userNo);

		String path = "redirect:";
		String message = null;

		if (result > 0) {

			message = "탈퇴 되었습니다.";

			status.setComplete();

			path += "/";

		} else {

			message = "현재 비밀번호가 일치하지 않습니다.";

			path += "secession";

		}

		ra.addFlashAttribute("message", message);
		return path;

	}

	// ---------------------------------------------------------------------------------

	// 내 게시글 페이지 이동
	@GetMapping("/myPost")
	public String myPost(HttpSession session, Model model, @SessionAttribute("loginUser") User loginUser)
			throws Exception {

		String userId = loginUser.getUserId();

		// 사용자의 게시글을 가져오는 서비스 메서드 호출
		Map<String, Object> map = service.myPost(userId);

		// 모델에 사용자의 게시글을 담아서 전달
		model.addAttribute("map", map);

		return "myPage/myPage-myPost";
	}

	// 내 게시글 카테고리 선택
	@GetMapping("/myPostCategory")
	@ResponseBody
	public Map<String, Object> myPostDetail(@SessionAttribute("loginUser") User loginUser,
			@RequestParam("category") String category, Model model) {

		System.out.println(category);

		Map<String, Object> paramMap = new HashMap<String, Object>();

		String userId = loginUser.getUserId();
		paramMap.put("userId", userId);
		paramMap.put("category", category);

		if (paramMap.get("category") == null) {// 카테고리 선택 안했을때
			Map<String, Object> map = service.myPost(userId);
			paramMap.put("map", map);
		} else {// 했을때
			Map<String, Object> map = service.myPostDetail(paramMap);
			paramMap.put("map", map);
		}

		return paramMap;
	}

	// 내 게시글 삭제
	@PutMapping(value = "/deleteMyPost", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public int deleteMyPost(@RequestBody int[] deleteArr) {
		
		return service.deleteMyPost(deleteArr);
	}

	// 내 댓글 페이지 이동
	@GetMapping("/myComment")
	public String myComment(HttpSession session, Model model, @SessionAttribute("loginUser") User loginUser) {

		String userId = loginUser.getUserId();

		// 사용자의 게시글을 가져오는 서비스 메서드 호출
		Map<String, Object> map = service.myComment(userId);

		// 모델에 사용자의 게시글을 담아서 전달
		model.addAttribute("map", map);

		return "myPage/myPage-myComment";
	}

	// 내 댓글 카테고리 선택
	@GetMapping("/myCommentCategory")
	@ResponseBody
	public Map<String, Object> myCommentDetail(@SessionAttribute("loginUser") User loginUser,
			@RequestParam("category") String category, Model model) {

		System.out.println(category);

		Map<String, Object> paramMap = new HashMap<String, Object>();

		String userId = loginUser.getUserId();
		paramMap.put("userId", userId);
		paramMap.put("category", category);

		if (paramMap.get("category") == null) {// 카테고리 선택 안했을때
			Map<String, Object> map = service.myComment(userId);
			paramMap.put("map", map);
		} else {// 했을때
			Map<String, Object> map = service.myCommentDetail(paramMap);
			paramMap.put("map", map);
		}

		return paramMap;
	}
	
	// 내 댓글 삭제
	@PutMapping(value = "/deleteMyComment", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public int deleteMyComment(@RequestBody int[] deleteArr) {
		return service.deleteMyComment(deleteArr);
	}

	// 내 구매리스트(내가 예약한 것들)
	@GetMapping("/purchaseDetails")

	public String purchaseDetails(@SessionAttribute("loginUser") User loginUser,
								Model model
									){
		

		int userNo = loginUser.getUserNo();
		
		Map<String,Object> map = service.selectPurchaseList(userNo);
		model.addAttribute("map",map);
		
		
		List<accReserve> reviewBtn = service.selectReviewStart(userNo);
		model.addAttribute("reviewBtn", reviewBtn);
		
		return "myPage/myPage-purchaseDetails";
	}

	@GetMapping("/purchaseDetailsSearch")
	@ResponseBody

	public Map<String, Object> purchaseDetailsSearch(@SessionAttribute("loginUser") User loginUser, String category,
			Model model) {

		Map<String, Object> paramMap = new HashMap<String, Object>();

		System.out.println(category);


		int userNo = loginUser.getUserNo();
		paramMap.put("userNo", userNo);
		paramMap.put("category", category);

		if (paramMap.get("category") == null) {// 카테고리 선택 안했을때
			Map<String, Object> map = service.selectPurchaseList(userNo);
			paramMap.put("map", map);
		} else {// 했을때
			Map<String, Object> map = service.selectPurchaseList(paramMap);
			paramMap.put("map", map);
		}

		return paramMap;
	}

	
	
	// 쪽지함 이동
	@GetMapping("/myMessage")
	public String selectMyMessage(@SessionAttribute("loginUser") User loginUser, Model model) {
		
		// 받은 쪽지 목록
		List<Message> messageList = service.selectGetMessageList(loginUser.getUserNo());
		model.addAttribute("messageList", messageList);
		
		return "myPage/myPage-myMessage";
	}
	
	
	// 쪽지함 카테고리 선택
	@GetMapping(value = "/selectMyMessageCategory", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Message> selectMyMessageCategory(@SessionAttribute("loginUser") User loginUser, @RequestParam String categoryMessage){
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userNo", loginUser.getUserNo());
		map.put("categoryMessage", categoryMessage);
		
		return service.selectMyMessageCategory(loginUser, map);
		
	}
	
	
	
	

}
