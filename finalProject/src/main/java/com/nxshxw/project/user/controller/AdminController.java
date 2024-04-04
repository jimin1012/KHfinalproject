package com.nxshxw.project.user.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.board.model.dto.Comment;
import com.nxshxw.project.chat.model.dto.ChatRoom;
import com.nxshxw.project.chat.model.dto.Chatting;
import com.nxshxw.project.chat.model.service.ChatService;
import com.nxshxw.project.ownerPage.model.dto.Owner;
import com.nxshxw.project.report.model.service.ReportService;
import com.nxshxw.project.reservation.model.dto.Reservation;
import com.nxshxw.project.reservation.model.service.ReservationService;
import com.nxshxw.project.user.model.dto.User;
import com.nxshxw.project.user.model.service.AdminService;

@Controller
public class AdminController {

	@Autowired
	private AdminService service;
	
	@Autowired
	private ChatService chatService;
	
	@Autowired
	private ReportService reportService;
	
	@Autowired
	private ReservationService reservService;
	
	// 관리자 메인은 회원목록으로 할꺼임
	@GetMapping("/admin")
	public String admin(
			Model model
			,@RequestParam Map<String, Object> paramMap
			,@RequestParam(value="cp",required = false,defaultValue = "1") int cp
			) {

		System.out.println(paramMap.get("users"));
		System.out.println(paramMap);
		
		if(paramMap.get("users") == null) { // 검색어가 없을 때 (검색X)
			
			Map<String,Object> map = service.selectUserAllList(cp);
			model.addAttribute("map",map);
			
			System.out.println(map);
		}else {// 검색했을 때
			Map<String,Object> map = service.selectUserAllList(paramMap,cp);
			model.addAttribute("map",map);
		}
		
		
		return "admin/userList";
	}
	
	// 유저 상세
	@GetMapping("/admin/userDetail/{userNo}")
	public String userDetail(@PathVariable("userNo") int userNo
							,Model model
							,RedirectAttributes rs
					) {

		
		User user = service.selectUserDetail(userNo);
		
		System.out.println(user);
		model.addAttribute("user",user);
		
		
		return "admin/userDetail";
	}
	
	//회원통계
	@GetMapping("/admin/userStatistics")
	public String userStatistics(Model model) {
		List<Map<String, Object>> map = service.selectUserStatistics();
		
		model.addAttribute("chart", map);
		return "admin/userStatistics";
	}
	
	//사업장목록 
	@GetMapping("/admin/accList")
	public String accList(
						Model model
						,@RequestParam Map<String, Object> paramMap
						,@RequestParam(value="cp",required = false,defaultValue = "1") int cp
						) {

		System.out.println("paramMap : "+paramMap);
		System.out.println("paramMap : "+paramMap.get("accs"));
		
		if(paramMap.get("accs") == null) { // 검색어가 없을 때 (검색X)
			
			  Map<String,Object> map = service.selectAccAllList(cp);
			  model.addAttribute("map",map);
			  System.out.println(map);
		}else {// 검색했을 때
			
			Map<String,Object> map = service.selectAccAllList(paramMap,cp);
			model.addAttribute("map",map);
		}
		
		
		
		
		return "admin/accList";
	}
	
	
	// 사업장 승인 요청 목록 (지선)
	@GetMapping("/admin/accPermitList")
	public String accPermitList(Model model, @RequestParam Map<String, Object> paramMap) {
		
		if(paramMap.get("state") == null) {
			List<Owner> ownerList = service.selectAccPermitList();
			model.addAttribute("ownerList", ownerList);
		} else {
			String state = (String)paramMap.get("state");
			List<Owner> ownerList = service.selectStateAccPermitList(state);
			model.addAttribute("ownerList", ownerList);
		}
		
		
		return "admin/accPermitList";
	}
	
	
	// 사업장 승인 요청 -> 승인 (지선)
	@PutMapping("/admin/updateAccStateFl")
	@ResponseBody
	public int updateAccStateFl(@RequestBody Map<String, Object> paramMap) {

		return service.updateAccStateFl(paramMap);
	}
	

	// 사업장 승인 요청 -> 거절 (지선)
	@DeleteMapping("/admin/deleteAccStateFl")
	@ResponseBody
	public int deleteAccStateFl(@RequestBody Map<String, Object> paramMap) {
		return service.deleteAccStateFl(paramMap);
	}

	
	// 예약관리 목록
	@GetMapping("/admin/reservationList")
	public String reservationList(Model model, @RequestParam Map<String, Object> map) {
	
		
		if(map.get("key") == null && map.get("delFlag") == null ) { // 검색 X + 전체
			List<Reservation> reservationList = reservService.selectReservationList();
			model.addAttribute("reservationList", reservationList);
			
		} else if(map.get("delFlag") == null){ // 검색 O + 전체
			List<Reservation> reservationList = reservService.searchReservationList(map);
			model.addAttribute("reservationList", reservationList);
			
		}else if(map.get("delFlag") != null){ // 예약상태별
			List<Reservation> reservationList = reservService.searchFlagReservationList(map);
			model.addAttribute("reservationList", reservationList);
		}
			
		return "admin/reservationList";
	}
	
	
	
	
	
		
	// 게시판 신고 목록 조회
	@GetMapping("/admin/boardReportList")
	public String boardReportList(Model model, @RequestParam Map<String, Object> paramMap) {
		
		if(paramMap.get("state") == null) {
			List<Board> reportBoardList = reportService.selectBoardReportList();
			model.addAttribute("reportBoardList", reportBoardList);
		} else {
			List<Board> reportBoardList = reportService.selectBoardReportList(paramMap);
			model.addAttribute("reportBoardList", reportBoardList);
		}

		
		return "admin/boardReportList";
	}
		
	// 댓글 신고 목록
	@GetMapping("/admin/commentReportList")
	public String commentReportList(Model model, @RequestParam Map<String, Object> paramMap) {
		
		if(paramMap.get("state") == null) {
			List<Comment> reportCommentList = reportService.selectCommentReportList();
			model.addAttribute("reportCommentList", reportCommentList);
		} else {
			List<Comment> reportCommentList = reportService.selectCommentReportList(paramMap);
			model.addAttribute("reportCommentList", reportCommentList);
		}
		
			
		return "admin/commentReportList";
	}
	
	

	// 게시글 신고 처리
	@PutMapping("/admin/updateBoardReportSt")
	@ResponseBody
	public int updateBoardReportSt(@RequestBody Map<String, Object> paramMap) {
		return reportService.updateBoardReportSt(paramMap);
	}

	// 댓글 신고 처리
	@PutMapping("/admin/updateCommentReportSt")
	@ResponseBody
	public int updateCommentReportSt(@RequestBody Map<String, Object> paramMap) {
		return reportService.updateCommentReportSt(paramMap);
	}
	
	
	
	// 회원탈퇴
	@GetMapping("/deleteUser/{userNo}")
	@ResponseBody
	public int deleteUser(@PathVariable("userNo") int userNo) {
		
		System.out.println("userNo : "+userNo);
		int result = service.deleteUser(userNo);
		
		return result;
	}
	
	// 사업장 상세
	@GetMapping("/admin/accDetail/{accNo}")
	public String accDetail(@PathVariable("accNo") int accNo
							,Model model
							,RedirectAttributes rs
					) {


		Owner owner = service.selectAccDetail(accNo);
		
		model.addAttribute("owner",owner);
		
		
		
		return "admin/accDetail";
	}
	
	
	
	// 1:1 채팅 목록 (전체)
	@GetMapping("/admin/adminChatList")
	public String adminChatList( @RequestParam(value="cp", required = false, defaultValue = "1") int cp
							, @RequestParam Map<String, Object> paramMap
							,Model model) {
		// 채팅 상대방(관리자)조회
		int managerNo = chatService.selectManagerNo(); 
		
		// 검색 결과 X ( 중요 : stateFl=vip, 차단 : stateFl=block )
		if(paramMap.get("stateFl") == null && paramMap.get("authority") == null) {
			Map<String, Object> map = chatService.selectChatRoomList(cp);
			model.addAttribute("map", map);
		} else { // 중요 목록 조회 + 검색(전체,중요)
			Map<String, Object> map = chatService.selectChatRoomList(cp, paramMap);
			model.addAttribute("map", map);
		}
		return "admin/adminChatList";
	}
	
	
	
	
	// 관리자 채팅방 중요 표시 변경
	@PutMapping(value = "/admin/starCheck", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public int updateStarCheck(@RequestBody Map<String, Object> paramMap) {
		return chatService.updateStarCheck(paramMap);
	}

	
	// 관리자 채팅방 차단하기
	@PutMapping("/admin/chatBlock")
	@ResponseBody
	public int updatechatBlock(@RequestBody Map<String, Object> paramMap) {
		return chatService.updatechatBlock(paramMap);
	}

	
	// 관리자 채팅방 차단해제
	@PutMapping("/admin/chatCancelBlock")
	@ResponseBody
	public int updatechatCancelBlock(@RequestBody Map<String, Object> paramMap) {
		return chatService.updatechatCancelBlock(paramMap);
	}


	// 관리자 채팅방 삭제
	@DeleteMapping("/admin/chatDeleteBlock")
	@ResponseBody
	public int updatechatDeleteBlock(@RequestBody Map<String, Object> paramMap) {
		return chatService.updatechatDeleteBlock(paramMap);
	}
	
	
	
	// 관리자 - 채팅방 정보 조회
	@GetMapping("/admin/chatDetail")
	public String selectAdminchatDetail(ChatRoom chatRoom, Model model) {
		
		// 채팅 (관리자)조회
		int managerNo = chatService.selectManagerNo(); 
		
		// 채팅 상대방 (일반/사업자) 정보 조회
		int userNo = chatService.selectUserNo(chatRoom); 
		
		// 채팅 상대방 (일반/사업자) 정보 조회
		ChatRoom chatRoomInfo = chatService.selectChatRoomInfo(chatRoom); 
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("managerNo", managerNo);
		map.put("userNo", userNo);
		map.put("chatRoomInfo", chatRoomInfo);
		
		model.addAttribute("map", map);
		
		return "admin/adminChatDetail";
	}
	
	
	// 관리자 - 채팅 상세 내역 조회
	@GetMapping(value = "/admin/selectChat", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Chatting> selectChatList(@RequestParam Map<String, Object> paramMap){
		return chatService.selectChatList(paramMap);
	}
	
	
	// 관리자 - 사업/예약 통계
	@GetMapping("/admin/totalStatistics")
	public String totalStatistics(Model model) {
		
		// 현재 날짜 구하기
		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR); // 올해
		int month = cal.get(Calendar.MONTH)+1; // 당월
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("year", year);
		map.put("month", month);
		
		
		// 구매 연도+월 구하기
		List<Map<String, Object>> payTimeList = service.selectPayTime();
		model.addAttribute("payTimeList", payTimeList);
		
		
		// 당월 성별 통계
		List<Map<String, Object>> chart1 = service.selectTotalStatisticsGender(map);
		model.addAttribute("chart1", chart1);
		
		// 당월 전체 통계
		List<Map<String, Object>> table1 = service.selectTotalStatisticsTable(map);
		model.addAttribute("table1", table1);
		
		return "admin/totalStatistics";
	}
	
	
	// 관리자 - 사업/예약 통계 (날짜 조회)
	@GetMapping("/admin/selectYearMonthChart1")
	public String selectYearMonthChart1(@RequestParam Map<String, Object> paramMap, Model model) {
		
		// 구매 연도+월 구하기
		List<Map<String, Object>> payTimeList = service.selectPayTime();
		model.addAttribute("payTimeList", payTimeList);
		
		// 조회된 연도+월 성별 통계
		List<Map<String, Object>> chart1 = service.selectTotalStatisticsGender(paramMap);
		model.addAttribute("chart1", chart1);
		
		// 조회된 연도+월 전체 통계
		List<Map<String, Object>> table1 = service.selectTotalStatisticsTable(paramMap);
		model.addAttribute("table1", table1);
		
		return "admin/totalStatistics";
	}
	

	// 관리자 - 사업/예약 통계 (나이대별 조회)
	@GetMapping("/admin/selectAgeChart1")
	public String selectAgeChart1(@RequestParam Map<String, Object> paramMap, Model model) {

		// 구매 연도+월 구하기
		List<Map<String, Object>> payTimeList = service.selectPayTime();
		model.addAttribute("payTimeList", payTimeList);

		if(paramMap.get("year") == null ) {
			// 현재 날짜 구하기
			Calendar cal = Calendar.getInstance();
			int year = cal.get(Calendar.YEAR); // 올해
			int month = cal.get(Calendar.MONTH)+1; // 당월
			paramMap.put("year", year);
			paramMap.put("month", month);
			
			// 조회된 연도+월 성별 통계 (날짜조회X)
			List<Map<String, Object>> chart1 = service.selectTotalStatisticsAge(paramMap);
			model.addAttribute("chart1", chart1);
		} else {
			// 조회된 연도+월 성별 통계 (날짜조회O)
			List<Map<String, Object>> chart1 = service.selectTotalStatisticsAge(paramMap);
			model.addAttribute("chart1", chart1);
		}
		
		// 조회된 연도+월 전체 통계
		List<Map<String, Object>> table1 = service.selectTotalStatisticsTable(paramMap);
		model.addAttribute("table1", table1);
		
		return "admin/totalStatistics";
	}
	
	
	

	// 관리자 - 숙소별 통계
	@GetMapping("/admin/totalStatistics2")
	public String totalStatistics2(Model model) {

		// 현재 날짜 구하기
		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR); // 올해
		int month = cal.get(Calendar.MONTH)+1; // 당월
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("year", year);
		map.put("month", month);


		// 구매 연도+월 구하기
		List<Map<String, Object>> payTimeList = service.selectPayTime();
		model.addAttribute("payTimeList", payTimeList);

		// 당월 성별 통계
		List<Map<String, Object>> chart2 = service.selectTotalStatisticsAcc(map);
		model.addAttribute("chart2", chart2);

		// 당월 전체 통계
		List<Map<String, Object>> table2 = service.selectTotalStatisticsAccTable(map);
		model.addAttribute("table2", table2);

		
		return "admin/totalStatistics2";
	}

	
	// 관리자 - 사업/예약 통계 (날짜 조회)
	@GetMapping("/admin/selectYearMonthChart2")
	public String selectYearMonthChart2(@RequestParam Map<String, Object> paramMap, Model model) {

		// 구매 연도+월 구하기
		List<Map<String, Object>> payTimeList = service.selectPayTime();
		model.addAttribute("payTimeList", payTimeList);

		// 조회된 연도+월 성별 통계
		List<Map<String, Object>> chart2 = service.selectTotalStatisticsAcc(paramMap);
		model.addAttribute("chart2", chart2);

		// 조회된 연도+월 전체 통계
		List<Map<String, Object>> table2 = service.selectTotalStatisticsAccTable(paramMap);
		model.addAttribute("table2", table2);

		return "admin/totalStatistics2";
	}
	
	// 관리자 - 사업/예약 통계 (날짜 조회)
	@GetMapping("/admin/selectYearChart2")
	public String selectYearChart2(@RequestParam Map<String, Object> paramMap, Model model) {

		// 구매 연도+월 구하기
		List<Map<String, Object>> payTimeYear = service.selectPayYear();
		model.addAttribute("payTimeYear", payTimeYear);

		
		if(paramMap.get("year") == null ) {
			// 현재 날짜 구하기
			Calendar cal = Calendar.getInstance();
			int year = cal.get(Calendar.YEAR); // 올해
			int month = cal.get(Calendar.MONTH)+1; // 당월
			paramMap.put("year", year);
			paramMap.put("month", month);
			
			// 조회된 연도 5순위 통계 (날짜조회X)
			List<Map<String, Object>> chart2 = service.selectTotalStatisticsAccYear(paramMap);
			model.addAttribute("chart2", chart2);
		} else {
			// 조회된 연도 5순위 통계 (날짜조회O)
			List<Map<String, Object>> chart2 = service.selectTotalStatisticsAccYear(paramMap);
			model.addAttribute("chart2", chart2);
		}

		// 조회된 연도 전체 통계
		List<Map<String, Object>> table2 = service.selectTotalStatisticsAccTableYear(paramMap);
		model.addAttribute("table2", table2);

		return "admin/totalStatistics2";
	}

	
	// 숙소별 성별 이용 비율
	@GetMapping(value = "/admin/selectAccGenderChart3", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Map<String, Object>> selectAccGenderChart3(@RequestParam Map<String, Integer> paramMap){
		
		return service.selectAccGenderChart3(paramMap);
	}
	

	// 숙소별 성별 이용 비율
	@GetMapping(value = "/admin/selectAccGenderChart3Year", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Map<String, Object>> selectAccGenderChart3Year(@RequestParam Map<String, Integer> paramMap){

		return service.selectAccGenderChart3Year(paramMap);
	}
	
	
	
}
