package com.nxshxw.project.main.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nxshxw.project.acc.model.dto.acc;
import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.common.utility.Pagination;
import com.nxshxw.project.main.model.dao.MainDAO;

@Service
public class MainServiceImpl implements MainService{
	
	@Autowired
	private MainDAO dao;

	// 축제 게시글
	@Override
	public List<Board> getFestivalPosts() {
		//return dao.getFestivalPosts();
		
		List<Board> boardList = dao.getFestivalPosts(); // dao에서 게시글 목록을 가져옴
	    
	    if (boardList != null && !boardList.isEmpty()) { // 가져온 게시글 목록이 비어있지 않은 경우에만 처리
	        for (Board fBoard : boardList) {
	            int index1 = fBoard.getBoardContent().indexOf("src=\"");
	            int index2 = fBoard.getBoardContent().indexOf("jpg\"");
	            int index3 = fBoard.getBoardContent().indexOf("png\"");
	                
	            // 이미지가 있는 경우에만
	            if (index1 != -1 && index2 != -1) {
	                fBoard.setFestivalThumbnail(fBoard.getBoardContent().substring(index1 + 5, index2 + 3));
	            } else if (index1 != -1 && index3 != -1) {
	                fBoard.setFestivalThumbnail(fBoard.getBoardContent().substring(index1 + 5, index3 + 3));
	            }
	        }
	    }
	    
	    return boardList;
	}

	// 투표 게시글
	@Override
	public List<Board> getPollPosts() {
		return dao.getPollPosts();
	}

	// 숙소 조회
	@Override
	public List<acc> getAccList() {
		return dao.getAccList();
	}


}
