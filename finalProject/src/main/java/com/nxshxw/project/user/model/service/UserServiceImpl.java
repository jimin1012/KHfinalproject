package com.nxshxw.project.user.model.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nxshxw.project.user.model.dao.UserDAO;
import com.nxshxw.project.user.model.dto.User;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDAO dao;

	@Autowired
	private BCryptPasswordEncoder bcrypt;

	// 회원가입 서비스
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int signUp(User inputUser) {
		String encPw = bcrypt.encode(inputUser.getUserPw());
		inputUser.setUserPw(encPw);
		System.out.println(inputUser);
		// DAO 호출
		int result = dao.signUp(inputUser);

		return result;
	}

	@Override
	public int checkId(String id) {
		return dao.checkId(id);
	}

	// 이메일 중복 검사
	@Override
	public int checkEmail(String email) {
		return dao.checkEmail(email);
	}

	// 관리자 코드
	@Override
	public boolean validateManagerCode(String managerCode) {
		String checkCode = "123456";

		if (checkCode.equals(managerCode)) {
			return true;
		}

		return false;
	}

	// 로그인
	@Override
	public User login(User user) {

		User loginUser = dao.login(user);

		System.out.println("loginUser 서비스: " + loginUser);
		if (loginUser != null) {// 아이디가 일치하는 회원이 조회된경우

			if (bcrypt.matches(user.getUserPw(), loginUser.getUserPw())) {

				// 비밀번호를 유지하지 않기 위해서 로그인 정보에서 제거
				loginUser.setUserPw(null);

			} else { // 다를 경우
				loginUser = null; // 로그인 실패처럼 만듦
			}

		}

		return loginUser;
	}

	@Override
	public User selectSnsUser(String email) {
		return dao.selectSnsUser(email);
	}

	// 닉네임 중복검사
	@Override
	public int checkNickName(String nickName) {
		return dao.checkNickName(nickName);
	}

	// 회원 전환 정보 입력(일반회원 -> 사업자 회원)
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int changeAuthKey(User updateUser, User inputUser) {
		// return dao.changeAuthKey(updateUser);
		int bossUpdateResult = dao.updateBoss(inputUser);
		int accUpdateResult = dao.updateAcc(inputUser);
		int userUpdateResult = dao.updateUserAuthority(updateUser);

		System.out.println(bossUpdateResult);
		System.out.println(accUpdateResult);
		System.out.println(userUpdateResult);

		if (bossUpdateResult > 0 && accUpdateResult > 0 && userUpdateResult > 0) {
			return 1; // 업데이트 성공
		} else {

			return 0; // 업데이트 실패

		}
	}

	final DefaultMessageService messageService;

	public UserServiceImpl() {
		// 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
		this.messageService = NurigoApp.INSTANCE.initialize("NCSGNNU1KNFWBJN5", "UPTU5IITQJTCD6JGRVOYURZ0IADQPUCP",
				"https://api.coolsms.co.kr");
	}

	@Override
	public void telAuthKey(String userTel, int randomNumber) {
		Message message = new Message();

		message.setFrom("01065003716");
		message.setTo(userTel);
		message.setText("[NXSHXW] 인증 번호입니다\n" + randomNumber);

		SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
		System.out.println(response);
		System.out.println(randomNumber);

	}

	// sns 로그인
	@Override
	public User snsLogin(User user) {
		User loginUser = dao.snsLogin(user);
		return loginUser;
	}

	// 휴대폰 중복 검사
	@Override
	public int checkTel(String tel) {
		return dao.checkTel(tel);
	}

	// 사업자 번호 중복 검사
	@Override
	public int checkBossNo(String bossNo) {
		return dao.checkBossNo(bossNo);
	}


}
