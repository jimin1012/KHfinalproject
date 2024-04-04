package com.nxshxw.project.message.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.message.model.dto.Message;

@Repository
public class MessageDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 쪽지 전송
	 * @param message
	 * @return result
	 */
	public int sendMessage(Message message) {
		return sqlSession.insert("messageMapper.sendMessage", message);
	}

	/** 쪽지 삭제
	 * @param paramMap
	 * @return result
	 */
	public int deleteMessage(int[] deleteArr) {
		return sqlSession.update("messageMapper.deleteMessage", deleteArr);
	}
	
}
