package com.nxshxw.project.user.model.service;

import java.util.List;
import java.util.Map;

import com.nxshxw.project.ownerPage.model.dto.Owner;
import com.nxshxw.project.user.model.dto.User;

public interface AdminService {

	/** 관리자페이지의 회원전체목록 (탈퇴회원빼고)
	 * @param cp 
	 * @return
	 */
	Map<String, Object> selectUserAllList(int cp);

	/** 관리자 페이지의 회원목록 (검색)
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectUserAllList(Map<String, Object> paramMap, int cp);

	/** 관리자 페이지의 사업자 승인 요청 목록 조회
	 * @return ownerList
	 */
	List<Owner> selectAccPermitList();


	/** 관리자 사업장 승인 요청 상태별 목록 조회
	 * @param paramMap
	 * @return ownerList
	 */
	List<Owner> selectStateAccPermitList(String state);

	/** 사업장 승인 요청 -> 승인 (지선)
	 * @param paramMap
	 * @return result
	 */
	int updateAccStateFl(Map<String, Object> paramMap);

	/** 유저 상세정보 서비스
	 * @param userNo
	 * @return
	 */
	User selectUserDetail(int userNo);

	/** 사업장 승인 요청 -> 거절 (지선)
	 * @param paramMap
	 * @return result
	 */
	int deleteAccStateFl(Map<String, Object> paramMap);

	/** 회원상세에서 회원탈퇴시키기
	 * @param userNo
	 * @return
	 */
	int deleteUser(int userNo);

	/** 사업장 목록 서비스
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectAccAllList(int cp);

	/** 사업장 목록 (검색했을 때)
	 * @param paramMap
	 * @param cp
	 * @return
	 */
	Map<String, Object> selectAccAllList(Map<String, Object> paramMap, int cp);

	/** 사업장 목록에서 숙소상세보기 페이지
	 * @param accNo
	 * @return
	 */
	Owner selectAccDetail(int accNo);

	// 회원 나이, 성별
	List<Map<String, Object>> selectUserStatistics();

	/** 전체 예약/구매 건수 (성별)
	 * @param map 
	 * @return chart1
	 */
	List<Map<String, Object>> selectTotalStatisticsGender(Map<String, Object> map);

	/** 전체 예약/구매 건수 테이블
	 * @param map
	 * @return table1
	 */
	List<Map<String, Object>> selectTotalStatisticsTable(Map<String, Object> map);

	/** 구매 연도+월 구하기
	 * @return payTimeList
	 */
	List<Map<String, Object>> selectPayTime();

	/** 전체 예약/구매 건수 (나이대별)
	 * @param paramMap
	 * @return chart1
	 */
	List<Map<String, Object>> selectTotalStatisticsAge(Map<String, Object> paramMap);

	/** 숙소별 통계 (5순위)
	 * @param map
	 * @return chart2
	 */
	List<Map<String, Object>> selectTotalStatisticsAcc(Map<String, Object> map);

	/** 숙소별 통계 (전체순위)
	 * @param map
	 * @return table2
	 */
	List<Map<String, Object>> selectTotalStatisticsAccTable(Map<String, Object> map);

	/** 연도 구하기
	 * @return payYearList
	 */
	List<Map<String, Object>> selectPayYear();

	/** 숙소별 통계 (5순위) 연도
	 * @param paramMap
	 * @return chart2
	 */
	List<Map<String, Object>> selectTotalStatisticsAccYear(Map<String, Object> paramMap);

	/** 숙소별 통계 (전체순위) year
	 * @param paramMap
	 * @return table2
	 */
	List<Map<String, Object>> selectTotalStatisticsAccTableYear(Map<String, Object> paramMap);

	/** 숙소별 성별 이용 비율 (월별)
	 * @param paramMap
	 * @return chart3
	 */
	List<Map<String, Object>> selectAccGenderChart3(Map<String, Integer> paramMap);

	/** 숙소별 성별 이용 비율 (연도별)
	 * @param paramMap
	 * @return chart3
	 */
	List<Map<String, Object>> selectAccGenderChart3Year(Map<String, Integer> paramMap);

	

}
