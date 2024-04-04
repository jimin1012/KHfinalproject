package com.nxshxw.project.reservation.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nxshxw.project.reservation.model.dao.ReservationDAO;
import com.nxshxw.project.reservation.model.dto.Reservation;

@Service
public class ReservationServiceImpl implements ReservationService{

	@Autowired
	private ReservationDAO dao;
	/**
	 * 교통 예약서비스
	 */
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int trainReservation(Reservation reservation) {
		
		// 예약테이블에 값이 제대로 담기면 실행
		// 예약 번호반환
		int reservationNo = dao.reservation(reservation);
		
		System.out.println("reservationNo : "+reservationNo);
		
		// 교통예약 테이블에 값 삽입
		if(reservationNo>0) {
			int result = dao.transportaion(reservation);
			if(!(result>0)) {// 정상적으로 실행안되면
				reservationNo = 0;
			}
		}
	
		return reservationNo;
	}
	
	
	/**
	 * 영수증 서비스
	 */
	@Override
	public Reservation selectReservationDetail(Map<String, Object> map) {
		return dao.selectReservationDetail(map);
	}


	// 관리자 - 예약 목록 조회
	@Override
	public List<Reservation> selectReservationList() {
		return dao.selectReservationList();
	}

	
	// 관리자 - 예약 목록 검색
	@Override
	public List<Reservation> searchReservationList(Map<String, Object> map) {
		return dao.searchReservationList(map);
	}

	// 관리자 - 예약 상태별 조회
	@Override
	public List<Reservation> searchFlagReservationList(Map<String, Object> map) {
		return dao.searchFlagReservationList(map);
	}

	
	
	


	// 결제 취소 했으니 예약상태도 Y로 바꿈
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int reservationCancle(int reservationNo) {
		return dao.reservationCancle(reservationNo);
	}


	// 숙소 예약 서비스
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int accReservation(Reservation reservation) {
		int reservationNo = dao.reservation(reservation);
		
		System.out.println("reservationNo : "+reservationNo);
		
		// 숙소예약 테이블에 값 삽입
		if(reservationNo>0) {
			int result = dao.accomodation(reservation);
			if(!(result>0)) {// 정상적으로 실행안되면
				reservationNo = 0;
			}
		}
	
		return reservationNo;
	}
}
