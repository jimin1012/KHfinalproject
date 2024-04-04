package com.nxshxw.project.board.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nxshxw.project.board.model.dao.SearchListDAO;
import com.nxshxw.project.board.model.dto.Board;

@Service
public class SearchListServiceImpl implements SearchListService{

	@Autowired
	private SearchListDAO dao;
	
	
	// 검색 자동완성
	@Override
	public List<Board> autoSearchMain(String input) {
		return dao.autoSearchMain(input);
	}

}
