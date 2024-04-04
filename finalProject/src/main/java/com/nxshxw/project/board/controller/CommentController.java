package com.nxshxw.project.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nxshxw.project.board.model.dto.Comment;
import com.nxshxw.project.board.model.service.CommentService;

@RestController
public class CommentController {
	@Autowired
	private CommentService service;
	
	// 댓글 목록 조회
	@GetMapping( value="/comment", produces="application/json; charset=UTF-8")
	public List<Comment> select(int boardNo) {
		return service.select(boardNo); // HttpMessageConverter -> JSON 변환
	}
	
	// 댓글 삽입
	@PostMapping("/comment")
	public int insert(@RequestBody Comment comment
			) {
		// 요청 데이터(JSON)을
		// HttpMessageConverter가 해석해서 Java 개체(comment)에 대입
		return service.insert(comment);
	}
	
	@DeleteMapping("/comment")
	public int delete(@RequestBody int commentNo) {
					// ajax 요청시 body에 담겨있는 하나 밖에 없는 데이터는
					// 매개변수 int commentNo에 담기게 된다.
		return service.delete(commentNo);
	}
	
	@PutMapping("/comment")
	public int update(@RequestBody Comment comment) {
					// ajax 요청시 body에 담겨있는 하나 밖에 없는 데이터는
					// 매개변수 int commentNo에 담기게 된다.
		
		return service.update(comment);
	}
	
	

}
