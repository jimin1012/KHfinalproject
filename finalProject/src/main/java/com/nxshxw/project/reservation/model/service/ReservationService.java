package com.nxshxw.project.reservation.model.service;

import java.util.List;
import java.util.Map;

import com.nxshxw.project.reservation.model.dto.Reservation;

public interface ReservationService {

	/** 기차 예약 서비스
	 * @param reservation
	 * @return
	 */
	int trainReservation(Reservation reservation);

	/** 영수증 서비스
	 * @param map
	 * @return
	 */
	Reservation selectReservationDetail(Map<String, Object> map);

	/** 예약상태 Y로
	 * @param reservationNo
	 * @return
	 */
	int reservationCancle(int reservationNo);

	/** 관리자 - 예약 목록 조회
	 * @return reservationList
	 */
	List<Reservation> selectReservationList();

	/** 관리자 - 예약 목록 검색
	 * @param map
	 * @return reservationList
	 */
	List<Reservation> searchReservationList(Map<String, Object> map);

	/** 관리자 - 예약 상태별 목록 조회
	 * @param map
	 * @return reservationList
	 */
	List<Reservation> searchFlagReservationList(Map<String, Object> map);

	
	/** 숙소 예약 서비스
	 * @param reservation
	 * @return
	 */
	int accReservation(Reservation reservation);


}
