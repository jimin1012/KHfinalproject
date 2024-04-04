package com.nxshxw.project.user.controller;

import java.util.Date;
import java.util.Map;
import java.util.Properties;
import java.util.Random;

import javax.activation.CommandMap;
import javax.activation.MailcapCommandMap;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;
import javax.servlet.http.HttpSession;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nxshxw.project.user.model.dto.User;
import com.nxshxw.project.user.model.service.FindService;
import com.nxshxw.project.user.model.service.UserService;

import oracle.jdbc.proxy.annotation.Post;

@Controller
@SessionAttributes("loginUser") // Model의 이름(key)을 적으면 session으로 추가
public class UserController {

	@Autowired
	private UserService service;

	@Autowired
	private FindService service2;

	// 로그인 페이지로 이동
	@GetMapping("/login")
	public String login() {
		return "user/login";
	}

	// 로그인 시도
	@PostMapping("/login")
	public String login(User user, Model model, RedirectAttributes ra,
			@RequestHeader(value = "referer") String referer) {

		User loginUser = new User();
		if (user.getSnsState().equals("N")) {
			loginUser = service.login(user);
		}
		if (user.getSnsState().equals("Y")) {
			loginUser = service.snsLogin(user);
		}

		System.out.println("컨트롤러 : " + loginUser);
		String path = "redirect:";

		if (loginUser != null) {
			path += "/";
			model.addAttribute("loginUser", loginUser);
		} else {
			path += referer;
			ra.addFlashAttribute("message", "아이디 혹은 비밀번호를 잘못 입력하셨습니다.");
		}

		return path;
	}

	@GetMapping("/logout")
	public String logout(SessionStatus status) {
		status.setComplete();

		return "redirect:/";
	}

	// 회원가입 약관동의 페이지 이동
	@GetMapping("/agree")
	public String agree() {
		return "user/agree";
	}

	// 회원가입 기본정보 입력 페이지 이동
	@GetMapping("/signUp")
	public String signUp() {
		return "user/signUp";
	}

	// 가입 완료 페이지
	@GetMapping("/success")
	public String success() {
		return "user/success";
	}

	// 회원가입
	@PostMapping("/signUp")
	public String signUp(User inputUser, String[] userAddress, RedirectAttributes ra) {

		if (inputUser.getUserAddress().equals(",,")) {
			inputUser.setUserAddress(null);

		} else {

			// String.join("구분자", String[])
			// 배열의 요소를 하나의 문자열로 변경
			// 단, 요소 사이에 "구분자" 추가
			String addr = String.join("·", userAddress);
			inputUser.setUserAddress(addr);
		}

		// authority 값을 설정
		// inputUser.setAuthority(authority); // 일반 사용자로 초기화

		// System.out.println("관리자 코드" + authority);
		System.out.println("컨트롤 : " + inputUser);
		// 회원 가입 서비스 호출
		// (DB에 DML 수행 시 성공 행의 개수(int형) 반환)
		int result = service.signUp(inputUser);

		// 가입 성공 여부에 따라 주소 결정
		String path = "redirect:";
		String message = null;

		if (result > 0) { // 가입 성공

			path += "/"; // 메인 페이지
			message = inputUser.getUserNickname() + "님의 가입을 환영합니다.";

		} else { // 가입 실패
			// 회원 가입 페이지

			// path += "/member/signUp"; // 절대경로
			path += "signUp"; // 상대경로

			message = "회원 가입 실패!";
		}

		// 리다이랙트 시 session에 잠까 올라갔다가 내려오도록 세팅
		ra.addFlashAttribute("message", message);
		return path += "success";
	}

	// 휴대폰 인증
	// 휴대폰 번호를 받아서 인증 문자를 전송합니다.
	@GetMapping("/telAuthKey")
	@ResponseBody
	public String sendSMS(@RequestParam("userTel") String userTel) {
		// 4자리의 랜덤한 숫자 생성
		int randomNumber = (int) ((Math.random() * (9999 - 1000 + 1)) + 1000);
		// 사용자의 휴대폰 번호와 생성된 랜덤 숫자를 인증 서비스로 전달합니다.
		 service.telAuthKey(userTel, randomNumber);
		System.out.println(randomNumber);
		// 생성된 랜덤 숫자를 문자열로 반환합니다.
		return Integer.toString(randomNumber);
	}

	// 휴대폰 중복검사
	@GetMapping("/dupCheck/tel")
	@ResponseBody // HttpMessageConverter를 이용해
	public int checkTel(String tel) {
		return service.checkTel(tel);
	}

	// 아이디 중복검사
	@GetMapping("/dupCheck/id")
	@ResponseBody // HttpMessageConverter를 이용해
	public int checkId(String id) {
		return service.checkId(id);
	}

	// 닉네임 중복검사
	@GetMapping("/dupCheck/nickName")
	@ResponseBody // HttpMessageConverter를 이용해
	public int checkNickName(String nickName) {
		return service.checkNickName(nickName);
	}

	// 이메일 중복 검사
	// !! produces 속성은 한글 깨질 때 사용 !!
	@GetMapping("/dupCheck/email")
	@ResponseBody
	public int checkEmail(String email) {
		return service.checkEmail(email);
	}

	// 이메일 인증
	@PostMapping("/mailSend")
	@ResponseBody
	public String mail(@RequestBody Map<String, Object> map) {

		System.out.println((String) map.get("userEmail"));
		// 대문자만 나오도록
		int leftLimit = 65; // letter 'A'
		int rightLimit = 90; // letter 'Z'
		int targetStringLength = 5; // 인증코드 최대길이
		Random random = new Random(); // 랜덤 함수 호출
		String AuthenticationCode = random.ints(leftLimit, rightLimit + 1).limit(targetStringLength)
				.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();

		service2.sendEmail((String) map.get("userEmail"), AuthenticationCode);

		return AuthenticationCode;
	}

	@PostMapping(value = "/selectSnsUser", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public User selectSnsUser(@RequestBody String email) {

		System.out.println("email : " + email);

		return service.selectSnsUser(email);
	}

	// 회원 전환 약관동의 페이지(일반회원 -> 사업자 회원)
	@GetMapping("/changeAuthKeyAgree")
	public String changeAuthKeyAgree() {
		return "/user/changeAuthKeyAgree";
	}

	// 회원 전환 정보 입력 페이지(일반회원 -> 사업자 회원)
	@GetMapping("/changeAuthKey")
	public String changeAuthKey() {
		return "/user/changeAuthKey";
	}

	// 회원 전환 정보 입력(일반회원 -> 사업자 회원)
	@PostMapping("/changeAuthKey")
	public String changeAuthKey(User updateUser, User inputUser, String[] accAddress,
			@SessionAttribute("loginUser") User loginUser,
			@RequestParam(value = "imageInput", required = false) MultipartFile profileImage, RedirectAttributes ra,
			HttpSession session) {
		String addr = String.join("^^^", accAddress);
		updateUser.setAccAddress(addr);

		// 로그인한 회원의 번호를 updateMember에 추가
		updateUser.setUserNo(loginUser.getUserNo());

		// DB에 회원 정보 수정(UPDATE) 서비스 호출
		int result = service.changeAuthKey(updateUser, inputUser);

		String message = null;

		if (result > 0) { // 성공
			message = "회원 정보가 수정되었습니다.\n다시 로그인 후 이용해주세요.";

			loginUser.setAuthority(2);

		} else { // 실패
			message = "회원 정보 수정 실패.";
		}
		ra.addFlashAttribute("message", message);

		return "redirect:/"; // 상대 경로(/myPage/info GET방식)
	}

	// 사업자 번호 중복확인
	@GetMapping("/dupCheck/bossNo")
	@ResponseBody
	public int checkBossNo(String bossNo) {
		return service.checkBossNo(bossNo);
	}

	@GetMapping("/error")
	public String errorPage() {
		return "user/error";
	}

}
