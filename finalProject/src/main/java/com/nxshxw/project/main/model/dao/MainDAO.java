package com.nxshxw.project.main.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.acc.model.dto.acc;
import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.common.utility.Pagination;

@Repository
public class MainDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	public List<Board> getFestivalPosts() {
		return sqlSession.selectList("boardMapper.getFestivalPosts");
	}

	public List<Board> getPollPosts() {
		return sqlSession.selectList("boardMapper.getPollPosts");
	}

	// 숙소 조회
	public List<acc> getAccList() {
		return sqlSession.selectList("accMapper.getAccList");
	}

}
