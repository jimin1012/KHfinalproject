package com.nxshxw.project.reservation.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.reservation.model.dto.Reservation;

@Repository
public class ReservationDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	/** 예약 DAO
	 * @param reservation
	 * @return
	 */
	public int reservation(Reservation reservation) {
		
		System.out.println("dao : "+reservation);
		int result = sqlSession.insert("reservationMapper.reservation",reservation);
		
		System.out.println("dao : "+result);
		// 삽입 성공시
		if(result>0) result = reservation.getReservationNo();
	
		return result;
	}
	
	

	/** 교통테이블 값 삽입 DAO
	 * @param reservation
	 * @return
	 */
	public int transportaion(Reservation reservation) {
		return sqlSession.insert("reservationMapper.transportaion",reservation);
	}


	/** 영수증 DAO
	 * @param map
	 * @return
	 */
	public Reservation selectReservationDetail(Map<String, Object> map) {
		return sqlSession.selectOne("reservationMapper.selectReservationDetail",map);
	}




	/** 관리자 - 예약 목록 조회
	 * @return reservationList
	 */
	public List<Reservation> selectReservationList() {
		return sqlSession.selectList("reservationMapper.selectReservationList");
	}



	/** 관리자 - 예약 목록 검색
	 * @param map
	 * @return reservationList
	 */
	public List<Reservation> searchReservationList(Map<String, Object> map) {
		return sqlSession.selectList("reservationMapper.searchReservationList", map);
	}



	/** 관리자 - 예약 상태별 목록 조회
	 * @param map
	 * @return reservationList
	 */
	public List<Reservation> searchFlagReservationList(Map<String, Object> map) {
		return sqlSession.selectList("reservationMapper.searchFlagReservationList", map);
	}

	/** 결제취소 했으니 예약상태도 Y로
	 * @param reservationNo
	 * @return
	 */
	public int reservationCancle(int reservationNo) {
		return sqlSession.update("reservationMapper.reservationCancle",reservationNo);

	}



	/** 숙소예약테이블에 값 삽입 DAO
	 * @param reservation
	 * @return
	 */
	public int accomodation(Reservation reservation) {
		return sqlSession.insert("reservationMapper.accomodation",reservation);
	}


}
