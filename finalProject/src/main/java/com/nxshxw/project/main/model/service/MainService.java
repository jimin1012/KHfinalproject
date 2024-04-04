package com.nxshxw.project.main.model.service;

import java.util.List;
import java.util.Map;

import com.nxshxw.project.acc.model.dto.acc;
import com.nxshxw.project.board.model.dto.Board;

public interface MainService {

	List<Board> getFestivalPosts();

	List<Board> getPollPosts();

	List<acc> getAccList();

}
