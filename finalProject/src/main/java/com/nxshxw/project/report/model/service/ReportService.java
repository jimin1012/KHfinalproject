package com.nxshxw.project.report.model.service;

import java.util.List;
import java.util.Map;

import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.board.model.dto.Comment;
import com.nxshxw.project.report.model.dto.Report;

public interface ReportService {

	/** 게시글 신고 삽입
	 * @param paramMap
	 * @return result
	 */
	int insertBoardReport(Report report);

	/** 게시글 신고 목록 조회
	 * @return reportBoardList
	 */
	List<Board> selectBoardReportList();

	/** 게시글 신고 처리
	 * @param paramMap
	 * @return result
	 */
	int updateBoardReportSt(Map<String, Object> paramMap);

	/** 게시글 신고 목록 조회(정렬)
	 * @param paramMap
	 * @return reportList
	 */
	List<Board> selectBoardReportList(Map<String, Object> paramMap);

	/** 댓글 신고 목록 조회
	 * @return reportCommentList
	 */
	List<Comment> selectCommentReportList();

	/** 댓글 신고 목록 조회(정렬)
	 * @param paramMap
	 * @return reportList
	 */
	List<Comment> selectCommentReportList(Map<String, Object> paramMap);

	/** 댓글 신고 처리
	 * @param paramMap
	 * @return result
	 */
	int updateCommentReportSt(Map<String, Object> paramMap);

	/** 댓글 신고 삽입
	 * @param paramMap
	 * @return result
	 */
	int insertCommentReport(Report report);

	
}
