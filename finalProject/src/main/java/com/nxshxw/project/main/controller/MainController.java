package com.nxshxw.project.main.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.nxshxw.project.acc.model.dto.acc;
import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.main.model.service.MainService;

@Controller
public class MainController {

	@Autowired
	private MainService service;

	@RequestMapping("/")
	public String mainForward(Model model) {
		// 기본 결과 페이지 설정
		String result = "common/main";

		// 축제 게시글 (조회순) 5개 가져오기
        List<Board> festivalBoardList = service.getFestivalPosts(); // 서비스에서 축제 게시글 가져오기
        model.addAttribute("festivalBoardList", festivalBoardList);
        

        // 투표 게시글 가져오기
        List<Board> pollBoardList = service.getPollPosts(); // 서비스에서 투표 게시글 가져오기
        model.addAttribute("pollBoardList", pollBoardList);
        
        // 숙소 조회(특가 이벤트)
        List<acc> accBoardList = service.getAccList();
        model.addAttribute("accBoardList", accBoardList);
        return result;
	}
	
}
