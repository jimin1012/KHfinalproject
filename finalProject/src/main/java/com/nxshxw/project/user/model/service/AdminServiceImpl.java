package com.nxshxw.project.user.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nxshxw.project.common.utility.Pagination;
import com.nxshxw.project.ownerPage.model.dto.Owner;
import com.nxshxw.project.user.model.dao.AdminDAO;
import com.nxshxw.project.user.model.dto.User;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;


/**
 * @author user1
 *
 */
@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	private AdminDAO dao;
	
	final DefaultMessageService messageService;
	
	 public AdminServiceImpl() {
	        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
	    	this.messageService = NurigoApp.INSTANCE.initialize("NCSGNNU1KNFWBJN5", "UPTU5IITQJTCD6JGRVOYURZ0IADQPUCP", "https://api.coolsms.co.kr");
	    }
	
	
	
	// 관리자페이지의 전체 회원목록
	@Override
	public Map<String, Object> selectUserAllList(int cp) {
		
		// 1. 탈퇴하지 않은 회원 리스트 조회
		int listCount = dao.getUserListCount();
		
		// 2. 회원 리스트 + cp로 pagination 객체 생성
		Pagination pagination = new Pagination(cp, listCount);
		
		List<User> userList = dao.selectUserAllList(pagination);
		Map<String,Object> map = new HashMap<String, Object>();
		
		
		map.put("pagination", pagination);
		map.put("userList", userList);
		return map;
	}
	
	// 관리자 페이지의 회원목록 검색
	@Override
	public Map<String, Object> selectUserAllList(Map<String, Object> paramMap, int cp) {

		// 1. 삭제되지 않고 검색 조건이 일치하는 회원목록 조회
		int listCount = dao.getUserListCount(paramMap);
		// 2. 리스트 + cp로 pagination 생성
		Pagination pagination = new Pagination(cp, listCount);
		
		// 검색 조건에 부합하는 회원목록
		List<User> userList = dao.selectUserAllList(pagination,paramMap);
		
		
		Map<String,Object> map = new HashMap<String, Object>();
		
		
		map.put("pagination", pagination);
		map.put("userList", userList);
		return map;
	}

	
	// 관리자 페이지의 사업자 승인 요청 목록 조회
	@Override
	public List<Owner> selectAccPermitList() {
		
		List<Owner> ownerList = dao.selectAccPermitList();
		
		return ownerList;
	}

	// 관리자 사업장 승인 요청 상태별 목록 조회
	@Override
	public List<Owner> selectStateAccPermitList(String state) {
		return dao.selectStateAccPermitList(state);
	}

	// 사업장 승인 요청 -> 승인 (지선)
	@Override
	public int updateAccStateFl(Map<String, Object> paramMap) {
		return dao.updateAccStateFl(paramMap);
	}

	/**
	 * 유저 디테일 서비스
	 */
	@Override
	public User selectUserDetail(int userNo) {
		return dao.selectUserDetail(userNo);
	}

	
	// 사업장 승인 요청 -> 거절 (지선)
	@Override
	public int deleteAccStateFl(Map<String, Object> paramMap) {
		
		int result = dao.deleteAccStateFl(paramMap);
		
		// 승인 거절에 성공했을 경우 알림 전송
		if(result > 0) {
			String userTel = dao.selectUserTel(paramMap);
			
			Message message = new Message();
			
			message.setFrom("01065003716");
			message.setTo(userTel);
			message.setText("[NXSHXW] 사업자 회원 변경 요청이 거절되었습니다. 다시 시도해주세요.\n");
			
			SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
		}
		
		return result;
	}

	/**
	 * 회원상세에서 회원탈퇴시키기 서비스
	 */
	@Transactional(rollbackFor = {Exception.class})
	@Override
	public int deleteUser(int userNo) {
		return dao.deleteUser(userNo);
	}

	/**
	 * 사업장 전체 목록 서비스
	 */
	@Override
	public Map<String, Object> selectAccAllList(int cp) {
		// 1. 승인대기 상태가 아닌  사업장 리스트 조회
		int listCount = dao.getAccListCount();

		// 2. 사업장 리스트 + cp로 pagination 객체 생성
		Pagination pagination = new Pagination(cp, listCount);

	
		List<Owner> accList = dao.selectAccAllList(pagination); 

		Map<String,Object> map = new HashMap<String, Object>();


		map.put("pagination", pagination); 
		map.put("accList", accList);
		
		return map;
	}

	/**
	 * 사업장 목록 검색했을 때
	 */ 
	@Override
	public Map<String, Object> selectAccAllList(Map<String, Object> paramMap, int cp) {
		
		
		// 1. 승인대기 상태가 아니고 검색 조건이 일치하는 사업장목록 조회
		int listCount = dao.getAccListCount(paramMap);
		
		// 2. 사업장리스트 + cp로 pagination 생성
		Pagination pagination = new Pagination(cp, listCount);

		// 검색 조건에 부합하는 회원목록
		List<Owner> accList = dao.selectAccAllList(pagination,paramMap);


		Map<String,Object> map = new HashMap<String, Object>();


		map.put("pagination", pagination);
		map.put("accList", accList);
		return map;
	}

	/**
	 * 사업장 목록에서 숙소 상세보기 페이지
	 */
	@Override
	public Owner selectAccDetail(int accNo) {
		
		Owner owner = dao.selectAccDetail(accNo);
		if(owner!=null) {
			int count = dao.selectTotalAccRoom(accNo);
			owner.setTotalRoomCount(count);
		}
		return owner;
	}

	// 회원 나이 성별
	@Override
	public List<Map<String, Object>> selectUserStatistics() {
		return dao.selectUserStatistics();
	}

	// 전체 예약/구매 건수 (성별)
	@Override
	public List<Map<String, Object>> selectTotalStatisticsGender(Map<String, Object> map) {
		return dao.selectTotalStatisticsGender(map);
	}

	// 당월 전체 통계 테이블1
	@Override
	public List<Map<String, Object>> selectTotalStatisticsTable(Map<String, Object> map) {
		return dao.selectTotalStatisticsTable(map);
	}

	//  구매 연도+월 구하기
	@Override
	public List<Map<String, Object>> selectPayTime() {
		return dao.selectPayTime();
	}

	// 전체 예약/구매 건수 (나이대별)
	@Override
	public List<Map<String, Object>> selectTotalStatisticsAge(Map<String, Object> paramMap) {
		return dao.selectTotalStatisticsAge(paramMap);
	}

	// 숙소별 5순위 통계
	@Override
	public List<Map<String, Object>> selectTotalStatisticsAcc(Map<String, Object> map) {
		return dao.selectTotalStatisticsAcc(map);
	}

	// 숙소별 전체 통계
	@Override
	public List<Map<String, Object>> selectTotalStatisticsAccTable(Map<String, Object> map) {
		return dao.selectTotalStatisticsAccTable(map);
	}

	// 연도 구하기
	@Override
	public List<Map<String, Object>> selectPayYear() {
		return dao.selectPayYear();
	}

	
	// 숙소별 5순위 통계 year
	@Override
	public List<Map<String, Object>> selectTotalStatisticsAccYear(Map<String, Object> paramMap) {
		return dao.selectTotalStatisticsAccYear(paramMap);
	}

	@Override
	public List<Map<String, Object>> selectTotalStatisticsAccTableYear(Map<String, Object> paramMap) {
		return dao.selectTotalStatisticsAccTableYear(paramMap);
	}

	// 숙소별 성별 이용 비율 (월별)
	@Override
	public List<Map<String, Object>> selectAccGenderChart3(Map<String, Integer> paramMap) {
		return dao.selectAccGenderChart3(paramMap);
	}

	// 숙소별 성별 이용 비율 (월별)
	@Override
	public List<Map<String, Object>> selectAccGenderChart3Year(Map<String, Integer> paramMap) {
		return dao.selectAccGenderChart3Year(paramMap);
	}
	
	
	
	
	
	
	
	
	
	

}
