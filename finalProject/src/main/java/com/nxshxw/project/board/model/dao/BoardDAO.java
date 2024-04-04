package com.nxshxw.project.board.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.board.model.dto.Festival;
import com.nxshxw.project.board.model.dto.Option;
import com.nxshxw.project.board.model.dto.Poll;
import com.nxshxw.project.common.utility.Pagination;

@Repository
public class BoardDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	public int boardInsert(Board board) {
		int result =  sqlSession.insert("boardMapper.boardInsert",board);
		if(result>0) result = board.getBoardNo();
		return result;
		

	}


	/** 게시판 삭제되지 않은 게시글 수 조회
	 * @param boardCode
	 * @return listCount
	 */
	public int getListCount(int boardCode) {
		return sqlSession.selectOne("boardMapper.getListCount", boardCode);
	}

	/** 특정 게시판의 현재 페이지 목록 조회(검색x)
	 * @param pagination
	 * @param boardCode
	 * @return boardList
	 */
	public List<Board> selectBoardList(Pagination pagination, int boardCode) {
		
		// 1) offset 계산
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();

		// 2) RowBounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("boardMapper.selectBoardList", boardCode, rowBounds);
	}
 
	/** 특정 게시판의 현재 페이지 목록 조회(검색O)
	 * @param paramMap
	 * @return listCount
	 */
	public int getListCount(Map<String, Object> paramMap) {
		return sqlSession.selectOne("boardMapper.getListCountSearch", paramMap);
	}

	/** 특정 게시판의 현재 페이지 목록 조회(검색O)
	 * @param pagination
	 * @param paramMap
	 * @return boardList
	 */
	public List<Board> selectBoardList(Pagination pagination, Map<String, Object> paramMap) {
		// 1) offset 계산
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();

		// 2) RowBounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("boardMapper.selectBoardListSearch", paramMap, rowBounds);
	}

	
	/** 공지사항 게시글 상세 조회
	 * @param map
	 * @return
	 */
	public Board selectBoardDetail(Map<String, Object> map) {
		return sqlSession.selectOne("boardMapper.selectBoardDetail",map);
	}

	/** 조회수 증가
	 * @param boardNo
	 * @return
	 */
	public int updateReadCount(int boardNo) {
		return sqlSession.update("boardMapper.updateReadCount",boardNo);
	}

	
	
	
	/** 축제 게시판 게시판의 시기, 장소별 목록 조회
	 * @param paramMap
	 * @return listcount
	 */
	public int getFestivalListCountSearch(Map<String, Object> paramMap) {
		return sqlSession.selectOne("boardMapper.getFestivalListCountSearch", paramMap);
	}

	
	
	/** 축제 게시판 게시판의 시기, 장소별 목록 조회
	 * @param pagination
	 * @param paramMap
	 * @return boardList
	 */
	public List<Board> searchFestivalBoardList(Pagination pagination, Map<String, Object> paramMap) {
		// 1) offset 계산
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();

		// 2) RowBounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());

		return sqlSession.selectList("boardMapper.searchFestivalBoardList", paramMap, rowBounds);
		
	}

	/** 자유게시판 상세 조회
	 * @param map
	 * @return
	 */
	public Board selectFreeBoard(Map<String, Object> map) {
		return sqlSession.selectOne("boardMapper.selectNoticeBoard",map);
	}

	/** 게시글 삭제(공용)
	 * @param map
	 * @return result
	 */
	public int boardDelete(Map<String, Object> map) {
		return sqlSession.update("boardMapper.boardDelete",map);
	}

	public int boardUpdate(Board board) {
		return sqlSession.update("boardMapper.boardUpdate",board);
	}

	
	/** 투표 게시글 작성
	 * @param board
	 * @return 
	 */
	public int pollInsert(Board board) {
		return sqlSession.insert("boardMapper.pollInsert",board);
	}
	
	
	/** 투표게시판 삽입
	 * @param board
	 * @return
	 */
	public int insertOption(Board board) {
		return sqlSession.insert("boardMapper.optionInsert",board);
	}

	/** 투표 조회
	 * @param map
	 * @return
	 */
	public Board selectPollDetail(Map<String, Object> map) {
		return sqlSession.selectOne("boardMapper.pollDetail",map);
	}

	/** 투표 조회
	 * @param map
	 * @return
	 */
	public Poll selectPoll(Map<String, Object> map) {
		return sqlSession.selectOne("boardMapper.selectPoll",map);
	}

	/**
	 * @param map
	 * @return
	 */
	public List<Option> selectOption(Map<String, Object> map) {
		return sqlSession.selectList("boardMapper.selectOption",map);
	}
	
	/** 투표 결과 삽입 
	 * @param option
	 * @return
	 */
	public int voteInsert(Map<String, Integer> paramMap) {
		return sqlSession.insert("boardMapper.voteInsert",paramMap);
	}

	/** 투표 중복 체크
	 * @param paramMap
	 * @return
	 */
	public int voteCheck(Map<String, Integer> paramMap) {
		return sqlSession.selectOne("boardMapper.voteCheck",paramMap);
	}

	/** 축제테이블 insert
	 * @param festival
	 * @return
	 */
	public int festivalInsert(Festival festival) {
		
		System.out.println(festival);
		return sqlSession.insert("boardMapper.festivalInsert",festival);
	}

	/** 축제테이블 업데이트
	 * @param festival
	 * @return
	 */
	public int festivalUpdate(Festival festival) {
		return sqlSession.update("boardMapper.festivalUpdate",festival);
	}
	
	
	
	/** 좋아요 추가
	 * @param paramMap
	 * @return result
	 */
	public int insertBoardLike(Map<String, Integer> paramMap) {
		return sqlSession.insert("boardMapper.insertBoardLike", paramMap);
	}

	/** 좋아요 삭제
	 * @param paramMap
	 * @return result
	 */
	public int deleteBoardLike(Map<String, Integer> paramMap) {
		return sqlSession.delete("boardMapper.deleteBoardLike", paramMap);
	}

	/** 좋아요 개수 조회
	 * @param boardNo
	 * @return count
	 */
	public int countBoardLike(Integer boardNo) {
		return sqlSession.selectOne("boardMapper.countBoardLike", boardNo);
	}

	
	
	/** 좋아요 여부 확인 
	 * @param map
	 * @return result
	 */
	public int boardLikeCheck(Map<String, Object> map) {
		return sqlSession.selectOne("boardMapper.boardLikeCheck", map);
	}


	
	
	
	/** 댓글수 조회
	 * @param 
	 * @return
	 */
	
	public int commentCount(int boardNo) {
		return sqlSession.selectOne("boardMapper.commentCount", boardNo);
	}
	public int commentCount(Map<String, Object> map) {
		return sqlSession.selectOne("boardMapper.commentCount", map);
	}


	public int optionCount(int optionNo) {
		return sqlSession.selectOne("boardMapper.optionCount", optionNo);
	}

	/** 서버에 존재하지만 DB에는 없는 게시글이미지를 지우기위해
	 * @return
	 */
	public List<String> selectBoardImageList() {
		return sqlSession.selectList("boardMapper.selectBoardImageList");
	}

	/** 통합검색
	 * @param query
	 * @return
	 */
	public List<Board> searchAllBoards(String query, Pagination pagination) {
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();

		// 2) RowBounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("boardMapper.searchAllBoards", query, rowBounds);
	}


	public int listCount(String query) {
		
		return sqlSession.selectOne("boardMapper.listCount", query);
	}


	


	
	
	
}
