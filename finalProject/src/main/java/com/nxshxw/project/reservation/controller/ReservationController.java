package com.nxshxw.project.reservation.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.nxshxw.project.board.model.dto.Board;
import com.nxshxw.project.ownerPage.model.dto.Owner;
import com.nxshxw.project.reservation.model.dto.Reservation;
import com.nxshxw.project.reservation.model.service.ReservationService;
import com.nxshxw.project.user.model.dto.User;

import retrofit2.http.GET;

@Controller
@RequestMapping("/resvation")
public class ReservationController {

	@Autowired
	private ReservationService service;
	
	// 교통수단 예약 컨트롤러
	@PostMapping("/traffic")
	@ResponseBody
	public int trainReservation(@RequestBody Reservation reservation
					,@SessionAttribute("loginUser") User loginUser) {
		
		
		
		reservation.setUserNo(loginUser.getUserNo());

		System.out.println(reservation);
		
		int reservationNo = service.trainReservation(reservation);
		
		System.out.println("reservationNo : "+reservationNo);
		
		return reservationNo;
	}
	
	
	//숙소
	@PostMapping("/acc")
	@ResponseBody
	public int accReservation(@RequestBody Reservation reservation,@SessionAttribute("loginUser") User loginUser) {
		
		System.out.println("숙소 예약 컨트롤러");
		
		reservation.setUserNo(loginUser.getUserNo());
		int reservationNo = service.accReservation(reservation);
		
		System.out.println("reservationNo : "+reservationNo);
		return reservationNo;
	}
	
	
	
	// 영수증 (예약 상세) 예약하고 바로 뜨는 창
	@GetMapping("/receipt")
	public String receipt(int reservationNo,
						 int userNo,
						 Model model
						) {
		
		
		System.out.println("ccscs : "+reservationNo);
		System.out.println("userNo : "+userNo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("reservationNo", reservationNo);
		map.put("userNo", userNo);
		
		Reservation reservation = service.selectReservationDetail(map);
		
		model.addAttribute("reservation",reservation);
		
		return "user/receipt";
	}
}
