package com.nxshxw.project.user.model.service;

import com.nxshxw.project.user.model.dto.User;

public interface UserService {

	// 회원 회원가입
	int signUp(User inputUser);
	
	/** 아이디 중복검사 
	 * @param id
	 * @return
	 */
	int checkId(String id);
	
	/** 이메일 중복 검사
	 * @param email
	 * @return count
	 */
	int checkEmail(String email);
	
	// 관리자 코드
	boolean validateManagerCode(String managerCode);

	/** 로그인 서비스
	 * @param user
	 * @return user
	 */
	User login(User user);

	/** SNS 로그인 시도 시 기존에 있는 회원인지 체크 서비스
	 * @param email
	 * @return
	 */
	User selectSnsUser(String email);

	int checkNickName(String nickName);

	
	/** 회원 전환 정보 입력(일반회원 -> 사업자 회원)
	 * @param updateUser
	 * @return
	 */
	int changeAuthKey(User updateUser, User inputUser);

	/** 휴대폰 인증
	 * @param userTel
	 * @param randomNumber
	 */
	void telAuthKey(String userTel, int randomNumber);

	/** sns 로그인
	 * @param user
	 * @return
	 */
	User snsLogin(User user);

	/** 휴대폰 중복검사
	 * @param tel
	 * @return
	 */
	int checkTel(String tel);

	/** 사업자 번호 중복확인
	 * @param bossNo
	 * @return
	 */
	int checkBossNo(String bossNo);



	
	
	
	//****************** 휴대폰 인증 *********************
	

	

}
