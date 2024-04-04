package com.nxshxw.project.board.model.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.board.model.dto.Board;

@Repository
public class SearchListDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public List<Board> autoSearchMain(String input) {
		RowBounds rowBounds = new RowBounds(0, 5);
		return sqlSession.selectList("boardMapper.autoSearchMain", input, rowBounds);
	}

}
