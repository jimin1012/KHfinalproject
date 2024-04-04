package com.nxshxw.project.acc.model.dao;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.acc.model.dto.Pagination;
import com.nxshxw.project.acc.model.dto.acc;
import com.nxshxw.project.acc.model.dto.accCode;
import com.nxshxw.project.acc.model.dto.accImage;
import com.nxshxw.project.acc.model.dto.accRate;
import com.nxshxw.project.acc.model.dto.accReserve;
import com.nxshxw.project.acc.model.dto.accReview;
import com.nxshxw.project.acc.model.dto.inputAcc;



@Repository
public class accDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;


	public int getListCount(String where) {
		return sqlSession.selectOne("accMapper.getListCount", where);
	}	


	public List<acc> searchList(Pagination pagination, String where) {
		
		// 1) offset 계산
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();

		// 2) RowBounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());

		// 3) search	
		return sqlSession.selectList("accMapper.searchList", where, rowBounds);
	}


	public acc searchRate(int accNo) {
	    acc accObject = sqlSession.selectOne("accMapper.searchRate", accNo);
	    return accObject;
	}


	public List<accCode> searchGrade(accCode grade) {
		return sqlSession.selectList("accMapper.searchGrade", grade);
	}
	
	public accCode testGrade(accCode grade) {
		return sqlSession.selectOne("accMapper.searchGrade", grade);
	}



	public List<acc> highPrice(Pagination pagination, String where) {
		// 1) offset 계산
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();

		// 2) RowBounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());

		// 3) search	
		return sqlSession.selectList("accMapper.highPrice", where, rowBounds);
	}


	public List<accCode> searchGradeP(accCode grade) {
		return sqlSession.selectList("accMapper.searchGradeP", grade);
	}
	
	public accCode searchGradeP2(accCode grade) {
		return sqlSession.selectOne("accMapper.searchGradeP", grade);
	}


	public List<acc> highRate(Pagination pagination, String where) {
		// 1) offset 계산
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();

		// 2) RowBounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());

		// 3) search	
		return sqlSession.selectList("accMapper.highRate", where, rowBounds);
	}


	public List<acc> lowRate(Pagination pagination, String where) {
		// 1) offset 계산
		int offset = (pagination.getCurrentPage() - 1) * pagination.getLimit();

		// 2) RowBounds 객체 생성
		RowBounds rowBounds = new RowBounds(offset, pagination.getLimit());

		// 3) search	
		return sqlSession.selectList("accMapper.lowRate", where, rowBounds);
	}


	public List<accCode> detailCode(inputAcc input) {
		return sqlSession.selectList("accMapper.reserveDetail", input);
	}


	public List<accImage> detailImage(int accNo) {
		return sqlSession.selectList("accMapper.detailImage", accNo);
	}


	public List<accReview> detailReivew(int accNo) {		
		return sqlSession.selectList("accMapper.detailReivew", accNo);
	}


	public List<accRate> detailRate(int accNo) {
		return sqlSession.selectList("accMapper.detailRate", accNo);
	}
	
	public List<accRate> selectAllRate(int accNo) {
		return sqlSession.selectList("accMapper.selectAllRate", accNo);
	}

	public int detailCount(int accNo) {
		return sqlSession.selectOne("accMapper.detailCount", accNo);
	}


	public List<acc> baseSearch(int start, String where) {
		
	    Map<String, Object> params = new HashMap<>();
	    params.put("start", start);
	    params.put("where", where);
	    
		return sqlSession.selectList("accMapper.baseSearch", params);
	}
	
	public List<acc> moreHighPrice(int start, String where) {
		
	    Map<String, Object> params = new HashMap<>();
	    params.put("start", start);
	    params.put("where", where);
	    
		return sqlSession.selectList("accMapper.moreHighPrice", params);
	}
	
	public List<acc> moreHighRate(int start, String where) {
		
	    Map<String, Object> params = new HashMap<>();
	    params.put("start", start);
	    params.put("where", where);
	    
		return sqlSession.selectList("accMapper.moreHighRate", params);
	}
	
	public List<acc> moreLowRate(int start, String where) {
		
	    Map<String, Object> params = new HashMap<>();
	    params.put("start", start);
	    params.put("where", where);
	    
		return sqlSession.selectList("accMapper.moreLowRate", params);
	}
	
	public int selectListCount(String where) {
		return sqlSession.selectOne("accMapper.selectListCount", where);
	}
	
	public int selectRateCount(String where) {
		return sqlSession.selectOne("accMapper.selectRateCount", where);
	}


	public List<accImage> jsonImage(int accNo) {
		return sqlSession.selectList("accMapper.detailImage", accNo);
	}


	public int insertWishList(Map<String, Integer> paramMap) {
		return sqlSession.insert("accMapper.insertWishList", paramMap);
	}


	public int deleteWishList(Map<String, Integer> paramMap) {
		return sqlSession.delete("accMapper.deleteWishList", paramMap);
	}


	public int wishListCheck(Map<String, Object> map) {
		return sqlSession.selectOne("accMapper.wishListCheck", map);
	}


	public List<Object> wishListAccNo(int userNo) {
		return sqlSession.selectList("accMapper.wishListAccNo", userNo);
	}


	public acc wishListImageData(int accNo) {
		return sqlSession.selectOne("accMapper.wishListImageData", accNo);
	}


	public acc wishListAccData(int accNo) {
		return sqlSession.selectOne("accMapper.wishListAccData", accNo);
	}


	public acc wishListGrade(int accNo) {
		return sqlSession.selectOne("accMapper.wishListGrade", accNo);
	}


	public acc wishListRate(int accNo) {
		return sqlSession.selectOne("accMapper.wishListRate", accNo);
	}


	public int reviewCount(int accNo) {
		return sqlSession.selectOne("accMapper.reviewCount", accNo);
	}



	public int getAccNo(String accName) {
		return sqlSession.selectOne("accMapper.getAccNo", accName);
	}
	
	public List<accReserve> reserveAllData(inputAcc inputAcc) {
		return sqlSession.selectList("accMapper.reserveAllData", inputAcc);
	}


	public List<accCode> detailCode(int accNo) {
		return sqlSession.selectList("accMapper.detailCode", accNo);

	}


	public String userNickName(int userNo) {
		return sqlSession.selectOne("accMapper.userNickName", userNo);
	}


	public int deleteWish(acc wish) {
		return sqlSession.delete("accMapper.deleteWish", wish);
	}


	public int roomCapacity(int accCode) {
		return sqlSession.selectOne("accMapper.roomCapacity", accCode);
	}




	

}
