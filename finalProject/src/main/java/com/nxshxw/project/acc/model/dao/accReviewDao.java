package com.nxshxw.project.acc.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.acc.model.dto.accRate;
import com.nxshxw.project.acc.model.dto.accReview;



@Repository
public class accReviewDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;


	public int findNo(int reservationNo) {
		return sqlSession.selectOne("reviewMapper.findNo", reservationNo);
	}


	public int insertReview(accReview accReview) {
		return sqlSession.insert("reviewMapper.insertAccReview", accReview);
	}

	
	public int insertRate(accRate accRate) { 
		 return sqlSession.insert("reviewMapper.insertRate", accRate); 
	}

	
	public int findAccNo(int accReviewNo) {
		return sqlSession.selectOne("reviewMapper.findAccNo", accReviewNo);
	}

	
	public int updateReview(accReview accReview) {
		return sqlSession.update("reviewMapper.updateReview", accReview);
	}


	public int updateRate(accRate accRate) {
		 return sqlSession.update("reviewMapper.updateRate", accRate); 
	}


	public int deleteReview(accReview accReview) {
		return sqlSession.update("reviewMapper.deleteReview", accReview); 
	}

	public int getCurrentAccReviewNo() {
		return sqlSession.selectOne("reviewMapper.getCurrentAccReviewNo"); 
	}

	

	


	

}
