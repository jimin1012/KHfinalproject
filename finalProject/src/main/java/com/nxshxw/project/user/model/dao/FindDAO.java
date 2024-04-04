package com.nxshxw.project.user.model.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.user.model.dto.User;

@Repository
public class FindDAO {
	
	@Autowired // 등록된 Bean 중에서 SqlSessionTemplate 타입의 Bean 주입
	private SqlSessionTemplate sqlSession;
	
	public int selectPhoneNum(String phoneNum) {
		return sqlSession.selectOne("userMapper.selectPhoneNum", phoneNum);
	}
	
	public int selectUserNo(String phoneNum) {
		return sqlSession.selectOne("userMapper.selectUserNo", phoneNum);
	}

	public String selectId(int memberNo) {
		return  sqlSession.selectOne("userMapper.selectId", memberNo);

	}
	
	// ***************** 이메일 인증 ***********************8
	public int selectEmail(String emailInput) {
		return sqlSession.selectOne("userMapper.selectEmail", emailInput);
	}


	public int changePw(String newPw, int memberNo) {
		
		User member = new User();
		member.setUserNo(memberNo);
		member.setUserPw(newPw);
		
		return sqlSession.update("myPageMapper.changePw", member);
	}

	public int selectUserNo2(String emailInput) {
		
		return sqlSession.selectOne("userMapper.selectUserNo2", emailInput);
	}


}
