package com.nxshxw.project.board.controller;

import java.io.IOException;
import java.lang.reflect.Array;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.board.model.dto.Option;
import com.nxshxw.project.board.model.dto.Poll;
import com.nxshxw.project.board.model.service.BoardService;
import com.nxshxw.project.user.model.dto.User;

@Controller
@RequestMapping("/board")
public class BoardController {

	@Autowired
	private BoardService service;

	// 지선 : 아직 검색기능 x, 목록 조회 x
	@GetMapping("/{boardCode:[1-4]}")
	public String selectBoardList(@PathVariable("boardCode") int boardCode,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp, Model model,
			@RequestParam Map<String, Object> paramMap) {

		String result = null;

		switch (boardCode) {
		case 1:
			result = "board/boardNoticeList";// 공지사항

			// 이제 여기에 수행코드 작성 3/15 지선
			if (paramMap.get("key") == null) { // 검색 X
				Map<String, Object> map = service.selectBoardList(boardCode, cp);
				model.addAttribute("map", map);
			} else { // 검색 O
				paramMap.put("boardCode", boardCode);
				Map<String, Object> map = service.selectBoardList(paramMap, cp);
				model.addAttribute("map", map);

			}
			break;
		case 2:
			result = "board/boardFestivalList";// 축제게시판

			// 여기에 수행코드 작성 3/15 지선
			if (paramMap.get("selectDate") == null) { // 검색 X
				Map<String, Object> map = service.selectBoardList(boardCode, cp);
				model.addAttribute("map", map);
			} else { // 검색 O
				paramMap.put("boardCode", boardCode);
				Map<String, Object> map = service.searchFestivalBoardList(paramMap, cp);
				model.addAttribute("map", map);
			}

			break;
		case 3:

			result = "board/boardPollList";// 투표게시판
			if (paramMap.get("key") == null) {
				Map<String, Object> map = service.selectBoardList(boardCode, cp);
				model.addAttribute("map", map);
			}else { // 검색 O
				paramMap.put("boardCode", boardCode);
				Map<String, Object> map = service.selectBoardList(paramMap, cp);
				model.addAttribute("map", map);
			}

			break;
		case 4:

			result = "board/boardFreeList";// 자유게시판

			if (paramMap.get("key") == null) { // 검색 X
				Map<String, Object> map = service.selectBoardList(boardCode, cp);
				model.addAttribute("map", map);
			} else { // 검색 O
				paramMap.put("boardCode", boardCode);
				Map<String, Object> map = service.selectBoardList(paramMap, cp);
				model.addAttribute("map", map);
			}
			break;
		}

		return result;
	}

	// 게시판 작성으로 화면전환
	@GetMapping("/{boardCode:[0-9]+}/insert")
	public String boardInsert(@PathVariable("boardCode") int boardCode
	// ,Model model
	) {

		String path = "board/";

		switch (boardCode) {
		case 1:
			path += "boardNoticeWrite";
			break; // 공지사항
		case 2:
			path += "boardFestivalWrite";
			break; // 축제게시판
		case 3:
			path += "boardPollWrite";
			break; // 투표게시판
		case 4:
			path += "boardFreeWrite";
			break; // 자유게시판
		}

		// model.addAttribute("boardCode", boardCode);
		return path;
	}

	// 게시판 write (게시글 작성)
	@PostMapping(value = "/{boardCode:[1-4]}/insert", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public int boardInsert(@PathVariable("boardCode") int boardCode, @RequestBody Board board,
			@SessionAttribute("loginUser") User loginUser) {
		System.out.println(board);

		// 1. 로그인한 회원 번호를 얻어와 board에 세팅
		board.setUserNo(loginUser.getUserNo());

		// 2. boardCode도 board에 세팅
		board.setBoardCode(boardCode);

		int result = 0;

		// 뭐냐 게시글 작성 코드가 왜케 짧냐 생각이 드실 수 있지만 이게 맞습니다 ㅋㅋ 다 따로 빼서 했어요
		if (boardCode == 1 || boardCode == 4) { // 공지사항 / 자유게시판
			result = service.boardInsert(board);
		}

		if (boardCode == 2) {// 축제게시판
			result = service.festivalInsert(board);
		}
		if (boardCode == 3) { // 투표게시판
			System.out.println("board" + board);
			result = service.pollInsert(board);
		}

		return result;
	}

	// 게시글 상세조회
	@GetMapping("/{boardCode}/{boardNo}")
	public String boardDetail(@PathVariable("boardCode") int boardCode, @PathVariable("boardNo") int boardNo,
			Model model // 데이터 전달용객체
			, RedirectAttributes rs, @SessionAttribute(value = "loginUser", required = false) User loginUser
			// 세션에서 loginMember를 얻어오는데 없으면 null, 있으면 회원정보 저장
			// 쿠키를 이용한 조회 수 증가에서 사용
			, HttpServletRequest req, HttpServletResponse resp

	) throws ParseException {

		// 공용
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("boardCode", boardCode);
		map.put("boardNo", boardNo);
		String path = "";

		Board board = service.selectBoardDetail(map);
		
		
		
		// 댓글 수 세팅 (댓글이 있다면)
		if(map.get("commentCount")!=null) {
			board.setCommentCount((int) map.get("commentCount"));
		}
		
		if (board != null) {

			// 로그인 상태일 경우에만
			if (loginUser != null) {
				map.put("userNo", loginUser.getUserNo());

				// 좋아요 여부 확인 서비스 호출
				int result = service.boardLikeCheck(map);
				System.out.println("result : " + result);
				// 누른 적이 있을 경우
				if (result > 0) {
					model.addAttribute("likeCheck", "on");
				}
			}
			
			
			

			// ----------------------------------------------------------------
			// 쿠키를 이용한 조회 수 증가 처리

			// 1) 비회원 또는 로그인한 회원의 글이 아닌경우
			if (loginUser == null || loginUser.getUserNo() != board.getUserNo()) {

				// 2) 쿠키 얻어오기

				Cookie c = null;

				// 요청에 담겨 있는 모든 쿠키 얻어오기
				Cookie[] cookies = req.getCookies();
				
				if (cookies != null) { // 쿠키가 존재할 경우
					// 쿠키 중 "readBoardNo"라는 쿠키를 찾아서 c에 대입
					for (Cookie cookie : cookies) {
						if (cookie.getName().equals("readBoardNo")) {
							c = cookie;
							break;
						} // if문 종료
					} // for문 종료
				}

				// 3) 기존 쿠키가 없거나 (c==null)
				// 존재는 하나 현재 게시글 번호가
				// 쿠키에 저장되지 않은 경우(오늘 해당 게시글 본적 없음)
				int result = 0;
				if (c == null) {
					// 쿠키가 존재 X -> 하나 새로 생성
					c = new Cookie("readBoardNo", "|" + boardNo + "|");

					// 조회 수 증가 서비스 호출
					result = service.updateReadCount(boardNo);
				} else {
					// 현재 게시글 번호가 쿠키에 있는지 확인
					// Cookie.getValue() : 쿠키에 저장된 모든 값을 읽어옴
					// -> String으로 반환

					// String.indexOf("문자열")
					// : 찾는 문자열이 String 몇번 인덱스에 존재하는지 반환
					// 단, 없으면 -1 반환
					if (c.getValue().indexOf("|" + boardNo + "|") == -1) {
						// 쿠키에 현재 게시글 번호가 없다면

						// 기존 값에 게시글 번호 추가해서 다시 세팅
						c.setValue(c.getValue() + "|" + boardNo + "|");

						// 조회수 증가 서비스 호출
						result = service.updateReadCount(boardNo);
					}
				} // 종료

				// 4) 조회수 증가 성공 시
				// 쿠키가 적용되는 경로, 수명 (당일 23시 59분 59초) 지정

				if (result > 0) {
					// 조회된 board 조회 수와 DB 조회 수 동기화
					board.setReadCount(board.getReadCount() + 1);

					// 적용 경로
					c.setPath("/"); // "/"이하 경로 요청시 쿠키 서버로 전달

					// 쿠키 수명
					Calendar cal = Calendar.getInstance(); // 싱글톤 패턴
					cal.add(cal.DATE, 1);

					// 날짜 표기법 변경 객체 (DB의 TO_CHAR()와 비슷)
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

					// java.util.Date
					Date a = new Date();// 현재시간

					Date temp = new Date(cal.getTimeInMillis()); // 내일 (24시간 후)
					// 2024-02-23 12:11:45

					Date b = sdf.parse(sdf.format(temp));

					System.out.println("b : " + b.getTime());
					System.out.println("a : " + a.getTime());
					System.out.println("뺌 : " + (b.getTime() - a.getTime()));
					System.out.println("diff : " + (b.getTime() - a.getTime()) / 1000);

					// 내일 0시 0분 0초 - 현재시간
					long diff = (b.getTime() - a.getTime()) / 1000;
					// -> 내일 0시 0분 0초까지 남은 시간을 초단위로 반환

					c.setMaxAge((int) diff); // 수명 설정

					resp.addCookie(c);
				}

			} // 로그인한 회원 체크 if 끝
				// -------------------------------------------------------------------------
				// 공지사항
			if (boardCode == 1) {
				path = "board/boardNoticeDetail";
				model.addAttribute("board", board);
			}

			// 자유게시판
			if (boardCode == 4) {
				path = "board/boardFreeDetail";
				model.addAttribute("board", board);
			}
			if (boardCode == 3) { // 투표 게시판
				Poll poll = service.selectPoll(map);
				Date currentDate = new Date();

		        // pollEndDate가 현재 날짜를 지났는지 확인
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date pollEndDate = sdf.parse(poll.getPollEndDate());
		        if (pollEndDate.before(currentDate)) {
		        	poll.setPollSt(2);
		        }
				model.addAttribute("poll", poll);

				List<Option> option = service.selectOption(map);
				
				option = service.optionCount(option);
				
				
				model.addAttribute("option", option);

				path = "board/boardPollDetail";
				model.addAttribute("board", board);
			}

			if (boardCode == 2) {// 축제게시판
				path = "board/boardFestivalDetail";
				model.addAttribute("board", board);
			}

			// board null 아닐 때 if 끝
		} else {
			// board 못불러왔을 때
			path = "redirect:/board/" + boardCode;
			rs.addFlashAttribute("message", "해당 게시글이 존재하지 않습니다.");
		}

		return path;
	}

	// 게시글 수정으로 화면 전환
	@GetMapping("/{boardCode}/{boardNo}/update")
	public String boardUpdate(@PathVariable("boardCode") int boardCode, @PathVariable("boardNo") int boardNo,
			Model model) {

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("boardCode", boardCode);
		map.put("boardNo", boardNo);

		String path = "board/";

		if (boardCode == 1) { // 공시사항!
			Board board = service.selectBoardDetail(map);

			if (board != null) {
				model.addAttribute("board", board);
				path += "boardNoticeUpdate";
			}

		}

		if (boardCode == 2) { // 축제!
			Board board = service.selectBoardDetail(map);

			if (board != null) {
				model.addAttribute("board", board);
				path += "boardFestivalUpdate";
			}
		}

		if(boardCode == 3) {
			Board board = service.selectBoardDetail(map);
			if(board != null) {
				model.addAttribute("board", board);
				path += "boardPollUpdate";
			}
		}
		
		if (boardCode == 4) { // 자유
			Board board = service.selectBoardDetail(map);

			if (board != null) {
				model.addAttribute("board", board);
				path += "boardFreeUpdate";

			}

		}

		return path;
	}

	// 게시글 삭제!!!!
	@GetMapping("/{boardCode}/{boardNo}/delete")
	public String boardDelete(@PathVariable("boardCode") int boardCode, @PathVariable("boardNo") int boardNo,
			RedirectAttributes ra) {

		Map<String, Object> map = new HashMap<String, Object>();

		map.put("boardCode", boardCode);
		map.put("boardNo", boardNo);

		System.out.println("게시글 삭제!");

		String message = "";
		String path = "redirect:";

		int result = service.boardDelete(map);

		if (result > 0) {
			message = boardNo + "번 게시글이 삭제되었습니다.";
			path += "/board/" + boardCode;
		} else {
			message = boardNo + " 게시글 삭제 실패 ㅠㅠ";
			path += "/board/" + boardCode + "/" + boardNo;
		}

		ra.addFlashAttribute("message", message);
		return path;
	}

	// 게시글 수정!!
	@PostMapping("/{boardCode}/{boardNo}/update")
	@ResponseBody
	public int boardUpdate(@RequestBody Board board // 커맨드객체(name == 필드경우 필드에 파라미터 세팅)
			, @RequestParam(value = "cp", required = false, defaultValue = "1") int cp // 쿼리스트링 유지
			, @RequestParam(value = "deleteList", required = false) String deleteList // 삭제할 이미지 순서
			, @RequestParam(value = "images", required = false) List<MultipartFile> images // 업로드된 파일 리스트
			, @PathVariable("boardCode") int boardCode, @PathVariable("boardNo") int boardNo, HttpSession session // 서버
																													// 파일
																													// 저장
																													// 경로
																													// 얻어올
																													// 용도
			, RedirectAttributes ra // 리다이렉트시 값 전달용
	) throws IllegalStateException, IOException {

		board.setBoardCode(boardCode);
		board.setBoardNo(boardNo);

		String message = null;
		String path = "redirect:";

		int result = 0;
		if (boardCode == 1 || boardCode == 3 ||boardCode == 4 ) { // 공지사항 자유게시판
			result = service.boardUpdate(board);
		}

		if (boardCode == 2) {// 축제
			result = service.festivalUpdate(board);
		}

		ra.addFlashAttribute("message", message);
		return result;
	}

	// 투표 결과 insert
	@PostMapping("/insertVote")
	@ResponseBody
	public int voteInsert(@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@SessionAttribute(value = "loginUser", required = false) User loginUser, RedirectAttributes ra,
			@RequestBody Map<String, Integer> paramMap) {
		System.out.println(paramMap);
		return service.voteInsert(paramMap);
	}

	// 좋아요 처리
	@PostMapping("/like")
	@ResponseBody // 반환되는 값이 요청한 곳으로 돌아가게 함
	public int like(@RequestBody Map<String, Integer> paramMap) {
//		 System.out.println(paramMap);

		return service.like(paramMap);
	}
	
	@GetMapping("/boardTotalList")
	public String totalBoardList(@RequestParam(value = "query", required = false) String query
								, @RequestParam(value = "key", required = false) String key
								, @RequestParam(value = "cp", required = false, defaultValue = "1") int cp
								, Model model) {

		if (query != null && !query.isEmpty()) {
			 if ("t".equals(key)) {
				 // 검색어를 이용하여 모든 게시판에서 검색을 수행
				 Map<String, Object> searchResult = service.searchAllBoards(query, cp);
				 model.addAttribute("searchResult", searchResult);
				 
				 System.out.println(query);
			 }
	        return "board/boardTotalList"; // 검색 결과가 표시될 뷰 페이지로 이동
		} else {

			Map<String, Object> searchResult = service.searchAllBoards(query, cp);
			model.addAttribute("searchResult", searchResult);


			return "board/boardTotalList"; // 게시판 목록이 표시될 뷰 페이지
		}
	}
	
}
