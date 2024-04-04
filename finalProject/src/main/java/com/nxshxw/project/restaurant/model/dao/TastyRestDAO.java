package com.nxshxw.project.restaurant.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.restaurant.model.dto.TastyRest;


@Repository
public class TastyRestDAO {
	
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	// 레스토랑 리뷰 등록
	public int insertReview(TastyRest rest) {
		return sqlSession.insert("tastyMapper.insertReview", rest);
	}

	// 리뷰리스트 가져오기
	public List<TastyRest> getReviewList(TastyRest data) {
		return sqlSession.selectList("tastyMapper.getReviewList", data);
	}

	// 리뷰내역 가져오기
	public TastyRest getReviewDetail(int reviewNo) {
		return sqlSession.selectOne("tastyMapper.getReviewDetail", reviewNo);
	}

	// 삭제
	public int deleteReview(int reviewNo) {
		return sqlSession.delete("tastyMapper.deleteReview", reviewNo);
	}

}
