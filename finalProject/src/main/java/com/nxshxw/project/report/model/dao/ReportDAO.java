package com.nxshxw.project.report.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.board.model.dto.Comment;
import com.nxshxw.project.report.model.dto.Report;

@Repository
public class ReportDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 게시글 신고 삽입
	 * @param report
	 * @return result
	 */
	public int insertBoardReport(Report report) {
		return sqlSession.insert("reportMapper.insertBoardReport", report);
	}

	/** 신고된 게시글 목록 조회
	 * @return reportBoardList
	 */
	public List<Board> selectBoardReportList() {
		return sqlSession.selectList("reportMapper.selectBaordReportList");
	}

	/** 신고된 게시글 처리
	 * @param paramMap
	 * @return result
	 */
	public int updateBoardReportSt(Map<String, Object> paramMap) {
		return sqlSession.update("reportMapper.updateBoardReportSt", paramMap);
	}

	/** 신고된 게시글 처리 -> 삭제
	 * @param paramMap
	 * @return result
	 */
	public int deleteBoard(Map<String, Object> paramMap) {
		return sqlSession.update("reportMapper.deleteBoard", paramMap);
	}

	/** 게시글 신고 목록 조회(정렬)
	 * @param paramMap
	 * @return reportList
	 */
	public List<Board> selectBoardReportList(Map<String, Object> paramMap) {
		return sqlSession.selectList("reportMapper.selectBaordReportList", paramMap);
	}

	/** 게시글 신고 목록 조회
	 * @return reportCommentList
	 */
	public List<Comment> selectCommentReportList() {
		return sqlSession.selectList("reportMapper.selectCommentReportList");
	}

	/** 댓글 신고 목록 조회(정렬)
	 * @param paramMap
	 * @return reportList
	 */
	public List<Comment> selectCommentReportList(Map<String, Object> paramMap) {
		return sqlSession.selectList("reportMapper.selectCommentReportList", paramMap);
	}

	/** 신고된 댓글 처리
	 * @param paramMap
	 * @return result
	 */
	public int updateCommentReportSt(Map<String, Object> paramMap) {
		return sqlSession.update("reportMapper.updateCommentReportSt", paramMap);
	}
 
	/** 신고된 댓글 처리 -> 삭제
	 * @param paramMap
	 * @return result
	 */
	public int deleteComment(Map<String, Object> paramMap) {
		return sqlSession.update("reportMapper.deleteComment", paramMap);
	}

	/** 댓글글 신고 삽입
	 * @param report
	 * @return result
	 */
	public int insertCommentReport(Report report) {
		return sqlSession.insert("reportMapper.insertCommentReport", report);
	}

}
