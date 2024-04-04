package com.nxshxw.project.ownerPage.model.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.common.utility.Pagination;
import com.nxshxw.project.ownerPage.model.dto.ACCGradeOwner;
import com.nxshxw.project.ownerPage.model.dto.ACCImageOwner;
import com.nxshxw.project.ownerPage.model.dto.ACCOwnerStats;
import com.nxshxw.project.ownerPage.model.dto.ACCResnOwner;
import com.nxshxw.project.ownerPage.model.dto.ACCRoomsOwner;
import com.nxshxw.project.ownerPage.model.dto.Owner;

@Repository
public class OwnerDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	public Owner getOwnerInfo(int userNo) {
		return sqlSession.selectOne("ownerPageMapper.getOwnerInfo", userNo);
	}

	// 오너 방 리스트
	public List<ACCGradeOwner> getRooms(int accNo) {
		return sqlSession.selectList("ownerPageMapper.getRooms", accNo);
	}

	// 오너 이미지 리스트
	public List<ACCImageOwner> getImgs(int accNo) {
		return sqlSession.selectList("ownerPageMapper.getImgs", accNo);
	}

	public int updateAccount(Owner accountOwner) {

		return sqlSession.update("ownerPageMapper.updateAccount", accountOwner);
	}

	public int infoUpdate(Owner updateOwner) {
		return sqlSession.update("ownerPageMapper.infoUpdate", updateOwner);
	}

	/// 이미지가 있는지 없는지
	public int checkNotNull(ACCImageOwner accImage) {
		return sqlSession.selectOne("ownerPageMapper.checkImg", accImage);
	}

	// 이미지가 있으면 업데이트
	public int updateProfile(ACCImageOwner accImage) {
		return sqlSession.update("ownerPageMapper.mainImageUpdate", accImage);
	}

	// 이미지가 없으면 인서트
	public int insertProfile(ACCImageOwner accImage) {
		return sqlSession.insert("ownerPageMapper.mainImageInsert", accImage);
	}

	// 이미지 삭제
	public int deleteAccImg(ACCImageOwner deleteImg) {
		return sqlSession.delete("ownerPageMapper.deleteAccImg",deleteImg);
	}

	// 이미지 추가 저장
	public int insertAccImg(ACCImageOwner accImage) {
		return sqlSession.insert("ownerPageMapper.insertAccImg", accImage);
	}



	// listCount
	public int getListCount(int accNo) {
		return sqlSession.selectOne("ownerPageMapper.getResnListCount", accNo);
	}

	// resnList selecter
	public List<ACCResnOwner> selectReservationList(Pagination pagination, int accNo) {
		
		// Rowbounds 객체
		// - 마이바티스에서 페이징 처리를 위해 제동하는 객체
		// - offset만큼 건너 뛰고
		// 그 다음 지정된 행 개수(limit)만큼 조회

		// 1) offset 계산
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();

		// 2) RowBounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		
		return sqlSession.selectList("ownerPageMapper.selectReservationList", accNo , rowBounds );
	}

	
	// 오늘 예약 목록 조회
	public int getTodayListCount(Map<String, Object> paramMap) {
		return sqlSession.selectOne("ownerPageMapper.getTodayListCount", paramMap);
	}

	public List<ACCResnOwner> getTodayList(Pagination pagination, Map<String, Object> paramMap) {
		// Rowbounds 객체
		// - 마이바티스에서 페이징 처리를 위해 제동하는 객체
		// - offset만큼 건너 뛰고
		// 그 다음 지정된 행 개수(limit)만큼 조회
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("ownerPageMapper.getTodayList", paramMap , rowBounds );
	}

	// 방 정보수정
	public int updateRoom(ACCRoomsOwner aCCRoomsOwner) {
		return  sqlSession.update("ownerPageMapper.updateRoom",aCCRoomsOwner);
	}

	// 방 목록조회
	public List<ACCRoomsOwner> getRoomList(Pagination pagination, int accNo) {
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());
		return sqlSession.selectList("ownerPageMapper.getRoomList", accNo , rowBounds );
	}

	// 방 목록 수 조회
	public int getRoomCount(int accNo) {
		return sqlSession.selectOne("ownerPageMapper.getRoomCount", accNo);
	}

	public int insertRooms(ACCRoomsOwner aCCRoomsOwner) {
		return sqlSession.insert("ownerPageMapper.insertRooms", aCCRoomsOwner);
	}

	public int deleteRoom(int accCode) {
		return sqlSession.delete("ownerPageMapper.deleteRoom", accCode);
	}

	// 객실 삭제전 예약 목록이 있는지 확인
	public int checkRESN(int accCode) {
		return sqlSession.selectOne("ownerPageMapper.checkRESN", accCode);
	}

	
	public List<ACCOwnerStats> getStatsData(Owner accNo) {
		
		return sqlSession.selectList("ownerPageMapper.getStatsData", accNo);
	}

}
