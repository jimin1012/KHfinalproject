package com.nxshxw.project.train.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TrainDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public List<String> selectSeats(Map<String, String> paramMap) {
		return sqlSession.selectList("reservationMapper.selectSeats", paramMap);
	}

}
