package com.nxshxw.project.board.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.board.model.service.SearchListService;

@RequestMapping("/mainSearch")
@RestController
public class SearchListController {
	
	@Autowired
	private SearchListService service;
	
	@PostMapping(value="/autoSearchMain", produces="application/json; charset=UTF-8")
	public List<Board> autoSearchMain(@RequestBody Map<String, Object> input){
		
		 String str = (String) input.get("input");
		 return service.autoSearchMain(str);
	}
	
}
