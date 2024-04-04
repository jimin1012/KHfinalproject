package com.nxshxw.project.board.model.service;

import java.util.List;

import com.nxshxw.project.board.model.dto.Board;

public interface SearchListService {

	/** 검색 자동 완성
	 * @param str
	 * @return
	 */
	List<Board> autoSearchMain(String str);

}
