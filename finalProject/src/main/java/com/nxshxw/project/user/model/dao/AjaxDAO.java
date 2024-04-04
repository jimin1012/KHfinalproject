package com.nxshxw.project.user.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AjaxDAO {
	
	@Autowired 
	private SqlSessionTemplate sqlSession;
	
	/** 아이디 중복 검사
	 * @param id
	 * @return
	 */
	public int checkId(String id) {
		return sqlSession.selectOne("ajaxMapper.checkId", id);
	}

	
	/** 이메일 중복 검사
	 * @param email
	 * @return count 
	 */
	public int checkEmail(String email) {
		return sqlSession.selectOne("ajaxMapper.checkEmail", email);
	}


}
