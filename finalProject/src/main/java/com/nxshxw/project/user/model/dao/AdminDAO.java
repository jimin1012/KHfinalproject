package com.nxshxw.project.user.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.common.utility.Pagination;
import com.nxshxw.project.ownerPage.model.dto.Owner;
import com.nxshxw.project.user.model.dto.User;

@Repository
public class AdminDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	/** 탈퇴하지않은 회원 수 조회
	 * @return
	 */
	public int getUserListCount() {
		return sqlSession.selectOne("adminMapper.selectUserListCount");
	}

	/** 탈퇴하지않은 전체 회원 조회(일반,사업자,관리자)
	 * @param pagination
	 * @return
	 */
	public List<User> selectUserAllList(Pagination pagination) {
		
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();

		// 2) RowBounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		String state = "N";
		return sqlSession.selectList("adminMapper.selectUserAllList",state,rowBounds);
	}
 
	/** 회원 수 조회(검색)
	 * @param paramMap
	 * @return
	 */
	public int getUserListCount(Map<String, Object> paramMap) {
		return sqlSession.selectOne("adminMapper.selectUserListCountSearch",paramMap);
	}

	/** 회원목록 조회 (검색)
	 * @param pagination
	 * @param paramMap
	 * @return
	 */
	public List<User> selectUserAllList(Pagination pagination, Map<String, Object> paramMap) {
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("adminMapper.selectUserAllListSearch",paramMap,rowBounds);
	}

	/** 관리자 사업자 승인 요청 목록 조회 
	 * @return ownerList
	 */
	public List<Owner> selectAccPermitList() {
		return sqlSession.selectList("adminMapper.selectAccPermitList");
	}

	/** 관리자 사업장 승인 요청 상태별 목록 조회
	 * @param state
	 * @return ownerList
	 */
	public List<Owner> selectStateAccPermitList(String state) {
		return sqlSession.selectList("adminMapper.selectStateAccPermitList", state);
	}

	/** 사업장 승인 요청 -> 승인 (지선)
	 * @param paramMap
	 * @return result
	 */
	public int updateAccStateFl(Map<String, Object> paramMap) {
		return sqlSession.update("adminMapper.updateAccStateFl", paramMap);
	}

	
	/** 회원 상세페이지
	 * @param userNo
	 * @return
	 */
	public User selectUserDetail(int userNo) {
		return sqlSession.selectOne("adminMapper.selectuserDetail",userNo);
	}

	/** 사업장 승인 요청 -> 거절 (지선)
	 * @param paramMap
	 * @return result
	 */
	public int deleteAccStateFl(Map<String, Object> paramMap) {
		
		int result = sqlSession.delete("adminMapper.deleteAccStateFl", paramMap);
		
		if(result > 0)  result = sqlSession.update("adminMapper.updateUserState", paramMap);
		
		return result;
	}

	
	/** 회원상세에서 회원탈퇴시키기 DAO
	 * @param userNo
	 * @return
	 */
	public int deleteUser(int userNo) {
		return sqlSession.update("adminMapper.deleteUser",userNo);
	}

	/** 요청대기상태가 아닌 사업장 목록 수 (영업중, 휴업, 폐업)
	 * @return
	 */
	public int getAccListCount() {
		return sqlSession.selectOne("adminMapper.selectAccListCount");
	}

	/** 요청대기 상태 아닌 사업장 전체목록 (영업중, 휴업, 폐업)
	 * @param pagination
	 * @return
	 */
	public List<Owner> selectAccAllList(Pagination pagination) {
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		String state = "R";
		return sqlSession.selectList("adminMapper.selectAccAllList",state,rowBounds);
	}

	/** 사업장 수 조회(검색)
	 * @param paramMap
	 * @return
	 */
	public int getAccListCount(Map<String, Object> paramMap) {
		return sqlSession.selectOne("adminMapper.selectAccListCountSearch",paramMap);
	}

	/** 검색한 사업장 목록
	 * @param pagination
	 * @param paramMap
	 * @return
	 */
	public List<Owner> selectAccAllList(Pagination pagination, Map<String, Object> paramMap) {
		int offset = (pagination.getCurrentPage()-1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("adminMapper.selectAccAllListSearch",paramMap,rowBounds);
	}

	/** 사업장 목록에서 숙소 상세페이지
	 * @param accNo
	 * @return
	 */
	public Owner selectAccDetail(int accNo) {
		return sqlSession.selectOne("adminMapper.selectAccDetail",accNo);
	}
 
	/** 특정 숙소의 전체 방 개수
	 * @param accNo
	 * @return
	 */
	public int selectTotalAccRoom(int accNo) {
		return sqlSession.selectOne("adminMapper.selectTotalAccRoom",accNo);
	}

	public List<Map<String, Object>> selectUserStatistics() {
		return sqlSession.selectList("adminMapper.selectUserStatistics");
	}


	/** 전체 예약/구매 건수 (성별)
	 * @param map
	 * @return chart1
	 */
	public List<Map<String, Object>> selectTotalStatisticsGender(Map<String, Object> map) {
		return sqlSession.selectList("adminMapper.selectTotalStatisticsGender", map);
	}

	/** 당월 전체 통계 테이블1
	 * @param map
	 * @return table1
	 */
	public List<Map<String, Object>> selectTotalStatisticsTable(Map<String, Object> map) {
		return sqlSession.selectList("adminMapper.selectTotalStatisticsTable", map);
	}

	/** 구매 연도+월 구하기
	 * @return payTimeList
	 */
	public List<Map<String, Object>> selectPayTime() {
		return sqlSession.selectList("adminMapper.selectPayTime");
	}

	/** 전체 예약/구매 건수 (나이대별)
	 * @param paramMap
	 * @return chart1
	 */
	public List<Map<String, Object>> selectTotalStatisticsAge(Map<String, Object> paramMap) {
		return sqlSession.selectList("adminMapper.selectTotalStatisticsAge", paramMap);
	}

	/** 숙소별 통계 5순위
	 * @param map
	 * @return chart2
	 */
	public List<Map<String, Object>> selectTotalStatisticsAcc(Map<String, Object> map) {
		
		return sqlSession.selectList("adminMapper.selectTotalStatisticsAcc", map, new RowBounds(0, 5));
	}

	/** 숙소별 통계 전체순위
	 * @param map
	 * @return table2
	 */
	public List<Map<String, Object>> selectTotalStatisticsAccTable(Map<String, Object> map) {
		return sqlSession.selectList("adminMapper.selectTotalStatisticsAcc", map);
	}

	/** 연도 구하기
	 * @return payYearList
	 */
	public List<Map<String, Object>> selectPayYear() {
		return sqlSession.selectList("adminMapper.selectPayYear");
	}

	/** 숙소별 통계 5순위
	 * @param paramMap
	 * @return chart2
	 */
	public List<Map<String, Object>> selectTotalStatisticsAccYear(Map<String, Object> paramMap) {
		return sqlSession.selectList("adminMapper.selectTotalStatisticsAccYear", paramMap, new RowBounds(0, 5));
	}

	/** 숙소별 통계 전체순위 year
	 * @param paramMap
	 * @return table2
	 */
	public List<Map<String, Object>> selectTotalStatisticsAccTableYear(Map<String, Object> paramMap) {
		return sqlSession.selectList("adminMapper.selectTotalStatisticsAccYear", paramMap);
	}

	/** 숙소별 성별 이용 비율 (월별)
	 * @param paramMap
	 * @return chart3
	 */
	public List<Map<String, Object>> selectAccGenderChart3(Map<String, Integer> paramMap) {
		return sqlSession.selectList("adminMapper.selectAccGenderChart3", paramMap);
	}

	/** 숙소별 성별 이용 비율 (월별)
	 * @param paramMap
	 * @return chart3
	 */
	public List<Map<String, Object>> selectAccGenderChart3Year(Map<String, Integer> paramMap) {
		return sqlSession.selectList("adminMapper.selectAccGenderChart3Year", paramMap);
	}

	/** 전화번호 얻기
	 * @param object
	 * @return userTel
	 */
	public String selectUserTel(Map<String, Object> paramMap) {
		return sqlSession.selectOne("adminMapper.selectUserTel", paramMap);
	}

	

}
