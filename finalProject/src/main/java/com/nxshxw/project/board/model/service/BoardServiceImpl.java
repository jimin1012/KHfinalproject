package com.nxshxw.project.board.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nxshxw.project.board.model.dao.BoardDAO;
import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.board.model.dto.Festival;
import com.nxshxw.project.board.model.dto.Option;
import com.nxshxw.project.board.model.dto.Poll;
import com.nxshxw.project.common.utility.Pagination;
import com.nxshxw.project.common.utility.Util;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardDAO dao;

	/**
	 * 공지사항 게시판 작성 service
	 */
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int boardInsert(Board board) {
		board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
//		board.setBoardContent(Util.XSSHandling(board.getBoardContent()));

		int result = dao.boardInsert(board);

		return result;
	}


	// 게시판 목록 조회 (검색x)
	@Override
	public Map<String, Object> selectBoardList(int boardCode, int cp) {

		// 1. 특정 게시판의 삭제되지 않은 게시글 수 조회
		int listCount = dao.getListCount(boardCode);

		// 2. Pagination 객체 생성
		Pagination pagination = new Pagination(cp, listCount);

		if (boardCode == 2) { // 축제게시판 9개 게시글
			pagination.setLimit(9);
		}
		if (boardCode == 3) { // 투표게시판 10개 게시글
			pagination.setLimit(10);
		}

		// 3. 특정 게시판의 현재 페이지 목록 조회
		List<Board> boardList = dao.selectBoardList(pagination, boardCode);
		
		// 축제 게시판인 경우 썸네일 저장
		if(boardCode == 2) { 
			for(Board fBoard : boardList) {
				int index1 = fBoard.getBoardContent().indexOf("src=\"");
				int index2 = fBoard.getBoardContent().indexOf("jpg\"");
				int index3 = fBoard.getBoardContent().indexOf("png\"");
				
				// 이미지가 있는 경우에만
				if(index1 != -1 && index2 != -1) {
					fBoard.setFestivalThumbnail(fBoard.getBoardContent().substring(index1+5, index2+3));
				} else if(index1 != -1 && index3 != -1){
					fBoard.setFestivalThumbnail(fBoard.getBoardContent().substring(index1+5, index3+3));
				}
				
			}
		}


		// 4. 댓글 수 조회 
		for (Board board : boardList) {

			int commentCount = dao.commentCount(board.getBoardNo());

			if (commentCount > 0) {
				board.setCommentCount(commentCount);
			}
		}

		// 5. pagination, boardList를 map에 담아서 반환
		Map<String, Object> map = new HashMap<String, Object>();

		map.put("pagination", pagination);
		map.put("boardList", boardList);

		return map;
	}

	// 게시글 목록 조회 (검색 O)
	@Override
	public Map<String, Object> selectBoardList(Map<String, Object> paramMap, int cp) {

		// 1. 특정 게시판의 삭제되지 않은 게시글 수 조회
		int listCount = dao.getListCount(paramMap);

		// 2. Pagination 객체 생성
		Pagination pagination = new Pagination(cp, listCount);

		// 3. 특정 게시판의 현재 페이지 목록 조회
		List<Board> boardList = dao.selectBoardList(pagination, paramMap);
		
		// 4. pagination, boardList를 map에 담아서 반환
		Map<String, Object> map = new HashMap<String, Object>();

		map.put("pagination", pagination);
		map.put("boardList", boardList);

		return map;
	}

	// 공지사항 게시글 상세조회
	@Override
	public Board selectBoardDetail(Map<String, Object> map) {

		// 댓글 수 조회
			int commentCount = dao.commentCount(map);
			if (commentCount > 0) {
				map.put("commentCount", commentCount);

		}

		return dao.selectBoardDetail(map);
	}

	// 조회수 증가 서비스
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int updateReadCount(int boardNo) {
		return dao.updateReadCount(boardNo);
	}

	// 축제 게시판 시기별, 지역별 목록 조회
	@Override
	public Map<String, Object> searchFestivalBoardList(Map<String, Object> paramMap, int cp) {
		// 1. 특정 게시판의 삭제되지 않은 게시글 수 조회
		int listCount = dao.getFestivalListCountSearch(paramMap);

		// 2. Pagination 객체 생성
		Pagination pagination = new Pagination(cp, listCount);

		// 3. 특정 게시판의 현재 페이지 목록 조회
		pagination.setLimit(9);
		List<Board> boardList = dao.searchFestivalBoardList(pagination, paramMap);
		
		// 축제 게시판인 경우 썸네일 저장

		for(Board fBoard : boardList) {
			int index1 = fBoard.getBoardContent().indexOf("src=\"");
			int index2 = fBoard.getBoardContent().indexOf("jpg\"");
			int index3 = fBoard.getBoardContent().indexOf("png\"");
			int index4 = fBoard.getBoardContent().indexOf("jpeg\"");

			// 이미지가 있는 경우에만
			if(index1 != -1 && index2 != -1) {
				fBoard.setFestivalThumbnail(fBoard.getBoardContent().substring(index1+5, index2+3));
			} else if(index1 != -1 && index3 != -1){
				fBoard.setFestivalThumbnail(fBoard.getBoardContent().substring(index1+5, index3+3));
			} else if(index1 != -1 && index4 != -1) {
				fBoard.setFestivalThumbnail(fBoard.getBoardContent().substring(index1+5, index4+4));
			}

		}
		

		// 4. pagination, boardList를 map에 담아서 반환
		Map<String, Object> map = new HashMap<String, Object>();

		map.put("pagination", pagination);
		map.put("boardList", boardList);

		return map;
	}

	// 게시글 삭제(공용)
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int boardDelete(Map<String, Object> map) {

		return dao.boardDelete(map);
	}

	/**
	 * 공지사항 / 자유게시판 게시글 수정 서비스
	 */
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int boardUpdate(Board board) {
		board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
//		board.setBoardContent(Util.XSSHandling(board.getBoardContent()));

		return dao.boardUpdate(board);
	}

	/**
	 * 투표 게시판 작성
	 */

	@Override
	public int pollInsert(Board board) {
		board.setPollTitle(Util.XSSHandling(board.getPollTitle()));
		int boardNo = dao.pollInsert(board);
		if (boardNo > 0) {
			String[] option = board.getOption();
			for (int i = 0; i < option.length; i++) {
				board.setOptionContent(option[i]);
				board.setOptionContent(Util.XSSHandling(board.getOptionContent()));
				boardNo = dao.insertOption(board);
			}
		}
		return boardNo;
	}

	// 투표조회
	@Override
	public Poll selectPoll(Map<String, Object> map) {
		return dao.selectPoll(map);
	}

	// 선택지 조회
	@Override
	public List<Option> selectOption(Map<String, Object> map) {
		return dao.selectOption(map);
	}

	// 투표 결과 삽입
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int voteInsert(Map<String, Integer> paramMap) {
		int check = 0;
		check = dao.voteCheck(paramMap); // 중복 투표 검사

		int result = 0;

		if (check == 0) { // 중복 검사 통과
			result = dao.voteInsert(paramMap);
		}
		return result;
	}

	// 축제게시판 작성
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int festivalInsert(Board board) {
		board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
		Festival festival = board.getFestival();

		festival.setFestivalAddress(Util.XSSHandling(festival.getFestivalAddress()));
		festival.setFestivalHost(Util.XSSHandling(festival.getFestivalHost()));

		// 우선 일반적인 게시글 내용부터 올리고 그 다음에 잘 올라갔으면
		int result = dao.boardInsert(board);

		System.out.println("result : " + result);

		festival.setBoardNo(result); // 축제게시판테이블 업로드
		if (result > 0) {
			result = dao.festivalInsert(festival);
		}

		return result;
	}

	// 축제게시판 수정
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int festivalUpdate(Board board) {
		board.setBoardTitle(Util.XSSHandling(board.getBoardTitle()));
		Festival festival = board.getFestival();

		festival.setFestivalAddress(Util.XSSHandling(festival.getFestivalAddress()));
		festival.setFestivalHost(Util.XSSHandling(festival.getFestivalHost()));
		festival.setBoardNo(board.getBoardNo());

		int result = dao.boardUpdate(board);

		if (result > 0)
			result = dao.festivalUpdate(festival);

		return result;
	}

	// 좋아요 서비스
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int like(Map<String, Integer> paramMap) {
		int result = 0;

		// 좋아요 상태 X
		if (paramMap.get("check") == 0) {
			// BOARD_LIKE 테이블 INSERT
			result = dao.insertBoardLike(paramMap);
		} else { // 좋아요 상태 O
			// BOARD_LIKE 테이블 DELETE
			result = dao.deleteBoardLike(paramMap);
		}

		// SQL 수행 결과가 0 == DB 또는 파라미터에 문제가 있다.
		// 1) 에러를 나타내는 임의의 값을 반환(-1)
		if (result == 0)
			return -1;

		// 현재 게시글의 좋아요 개수 조회
		int count = dao.countBoardLike(paramMap.get("boardNo"));

		return count;
	}

	// 좋아요 여부 확인
	@Override
	public int boardLikeCheck(Map<String, Object> map) {
		return dao.boardLikeCheck(map);
	}

	// 투표 결과 조회
	@Override
	public List<Option> optionCount(List<Option> option) {
		for (Option option2 : option) {
			int count = dao.optionCount(option2.getOptionNo());
			option2.setOptionCount(count);
		}
		return option;
	}

	/**
	 * 서버에 존재하지 않는 이미지를 삭제하기위해 이미지 얻어옴
	 */
	@Override
	public List<String> selectBoardImageList() {
		
		
		List<String> list = dao.selectBoardImageList();
		List<String> imgName = new ArrayList<String>();
		
		String pattern = "<img\\s+src=\"/resources/images/board/(.*?)\"";
		
		
		for (String string : list) {
			Pattern imgPattern = Pattern.compile(pattern);
	        Matcher matcher = imgPattern.matcher(string);
			
	        // 매칭된 결과 출력
	        while (matcher.find()) {
	            String imgTag = matcher.group(1);
	            System.out.println("imgTag : "+imgTag);
	            imgName.add(imgTag);
	        }
			
		}
		return imgName;
	}


	@Override
	public Map<String, Object> searchAllBoards(String query, int cp) {
		
		// 게시글 수 조회
		int listCount = dao.listCount(query);
		
		Pagination pagination = new Pagination(cp, listCount);

		// 9개 게시글
		pagination.setLimit(9);
		
		// 게시글 리스트 조회
		List<Board> boardList = dao.searchAllBoards(query, pagination);
				
		// 5. pagination, boardList를 map에 담아서 반환
		Map<String, Object> map = new HashMap<String, Object>();

		map.put("pagination", pagination);
		map.put("boardList", boardList);

		return map;
	}

}
