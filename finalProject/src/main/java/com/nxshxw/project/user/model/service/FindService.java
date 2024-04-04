package com.nxshxw.project.user.model.service;

import java.util.Map;

public interface FindService {

	
	int selectPhoneNum(String phoneNum);
	
	void sendMessage(String randomNum, String phoneNum);


	String selectId(int memberNo);
	
	int selectEmail(String emailInput);

	void sendEmail(String emailInput, String authCode);

	// 비밀번호 변경 
	int changePw(Map<String, Object> paramMap);

}
