package com.nxshxw.project.board.model.service;

import java.util.List;
import java.util.Map;

import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.board.model.dto.Option;
import com.nxshxw.project.board.model.dto.Poll;


public interface BoardService {

	/** 공지사항 게시판작성 서비스
	 * @param board
	 * @return result
	 */
	int boardInsert(Board board);

	
	

	/** 게시판 목록 조회 서비스 (검색 X)
	 * @param boardCode
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectBoardList(int boardCode, int cp);

	/** 게시판 목록 조회 서비스 (검색 O)
	 * @param paramMap
	 * @param cp
	 * @return map
	 */
	Map<String, Object> selectBoardList(Map<String, Object> paramMap, int cp);

	/** 게시판 상세조회
	 * @param map
	 * @return
	 */
	Board selectBoardDetail(Map<String, Object> map);

	/** 게시글 조회 수 처리 서비스
	 * @param boardNo
	 * @return
	 */
	int updateReadCount(int boardNo);

	/** 축제 게시판 시기별, 지역별 목록 조회
	 * @param boardCode
	 * @param cp
	 * @return map
	 */
	Map<String, Object> searchFestivalBoardList(Map<String, Object> paramMap, int cp);

	/**  게시글 삭제 서비스
	 * @param map
	 * @return result
	 */
	int boardDelete(Map<String, Object> map);

	/** 공지사항 / 자유 게시글 수정 서비스
	 * @param board
	 * @return result
	 */
	int boardUpdate(Board board);

	
	/** 투표게시판 작성
	 * @param board,option
	 * @return result 
	 */
	int pollInsert(Board board);
	
	/** 투표 상세 조회
	 * @param map
	 * @return map
	 */
	Poll selectPoll(Map<String, Object> map);

	/** 선택지 조회
	 * @param map
	 * @return map
	 */
	List<Option> selectOption(Map<String, Object> map);
	
	/** 투표 삽입
	 * @param option
	 * @return result
	 */
	int voteInsert(Map<String, Integer> paramMap);



	/** 축제게시판 작성
	 * @param board
	 * @return
	 */
	int festivalInsert(Board board);



	/** 축제게시판 수정
	 * @param board
	 * @return
	 */
	int festivalUpdate(Board board);


	/** 좋아요 여부
	 * @param map
	 * @return
	 */
	int boardLikeCheck(Map<String, Object> map);
	
	/** 좋아요 처리
	 * @param paramMap
	 * @return paramMap
	 */
	int like(Map<String, Integer> paramMap);



	/** 투표결과 조회
	 * @param paramMap
	 * @return
	 */
	
	List<Option> optionCount(List<Option> option);




	/** 서버에 존재하지만 DB에는 없는 이미지들을 지우기 위해
	 * @return
	 */
	List<String> selectBoardImageList();

	/** 통합검색
	 * @param query
	 * @return
	 */
	Map<String, Object> searchAllBoards(String query, int cp);




	














}
