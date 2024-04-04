package com.nxshxw.project.report.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nxshxw.project.report.model.dto.Report;
import com.nxshxw.project.report.model.service.ReportService;

@Controller
@RequestMapping("/report")
public class ReportController {
	
	@Autowired
	private ReportService service;
	

	// 게시글 신고 삽입
	@PostMapping("/insertBoardReport")
	@ResponseBody
	public int insertBoardReport(@RequestBody Report report) {
		System.out.println("게시글 신고 : "+ report);
		return service.insertBoardReport(report);
	}
	

	// 댓글 신고 삽입
	@PostMapping("/insertCommentReport")
	@ResponseBody
	public int insertCommentReport(@RequestBody Report report) {
		System.out.println("댓글 신고 : "+ report);
		return service.insertCommentReport(report);
	}
	

	
}
