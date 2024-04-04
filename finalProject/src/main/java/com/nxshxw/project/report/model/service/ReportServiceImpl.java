package com.nxshxw.project.report.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.board.model.dto.Comment;
import com.nxshxw.project.report.model.dao.ReportDAO;
import com.nxshxw.project.report.model.dto.Report;

/**
 * @author user1
 *
 */
@Service
public class ReportServiceImpl implements ReportService{

	@Autowired
	private ReportDAO dao;

	// 게시글 신고 삽입
	@Override
	public int insertBoardReport(Report report) {
		if(report.getEtcContent() != "") {
			report.setReportContent(report.getReportContent() + " : "+ report.getEtcContent());;
		}
		return dao.insertBoardReport(report);
	}

	
	// 게시글 신고 목록 조회
	@Override
	public List<Board> selectBoardReportList() {
		return dao.selectBoardReportList();
	}


	// 신고된 게시글 처리
	@Override
	@Transactional(rollbackFor = {Exception.class})
	public int updateBoardReportSt(Map<String, Object> paramMap) {
		
		int result = dao.updateBoardReportSt(paramMap);
		
		if(paramMap.get("state").equals("delete")) {
			result = dao.deleteBoard(paramMap);
		}
		return result;
	}


	// 게시글 신고 목록 조회(정렬)
	@Override
	public List<Board> selectBoardReportList(Map<String, Object> paramMap) {
		return dao.selectBoardReportList(paramMap);
	}


	// 댓글 신고 목록 조회
	@Override
	public List<Comment> selectCommentReportList() {
		return dao.selectCommentReportList();
	}


	// 댓글 신고 목록 조회(정렬)
	@Override
	public List<Comment> selectCommentReportList(Map<String, Object> paramMap) {
		return dao.selectCommentReportList(paramMap);
	}


	// 댓글 신고 처리
	@Override
	@Transactional(rollbackFor = {Exception.class})
	public int updateCommentReportSt(Map<String, Object> paramMap) {
		
		int result = dao.updateCommentReportSt(paramMap);
		
		if(paramMap.get("state").equals("delete")) {
			result = dao.deleteComment(paramMap);
		}
		
		return result;
	}


	// 댓글 신고 삽입
	@Override
	public int insertCommentReport(Report report) {
		if(report.getEtcContent() != "") {
			report.setReportContent(report.getReportContent() + " : "+ report.getEtcContent());;
		}
		return dao.insertCommentReport(report);
	}
	
	
	
	
	
	
	
	
	
}
