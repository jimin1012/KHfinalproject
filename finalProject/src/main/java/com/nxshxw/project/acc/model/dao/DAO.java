package com.nxshxw.project.acc.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nxshxw.project.acc.model.dto.acc;
import com.nxshxw.project.acc.model.dto.accCode;
import com.nxshxw.project.acc.model.dto.accImage;
import com.nxshxw.project.acc.model.dto.accRate;
import com.nxshxw.project.acc.model.dto.accReview;



@Repository
public class DAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public int insertData(Map li) {
		return sqlSession.insert("dataMapper.insertData", li);
	}

	public int selectData() {
		return sqlSession.selectOne("dataMapper.selectData");
	}

	public int insertCh(Map l) {
		return sqlSession.insert("dataMapper.insertCh", l);
	}

	public int insertSeoul(Map le) {
		return sqlSession.insert("dataMapper.insertSeoul", le);
	}

	public List<acc> autoSearch(String str) {
		RowBounds rowBounds = new RowBounds(0, 5);
		return sqlSession.selectList("dataMapper.autoSearch", str, rowBounds);
	}

	public int sampleData(accCode codeAcc) {
		return sqlSession.insert("dataMapper.sampleData", codeAcc);
	}

	public int selectAllData(int i) {
		return sqlSession.selectOne("dataMapper.selectAllData", i);
	}
	
	public Integer selectCodeAcc(int i) {
		return sqlSession.selectOne("dataMapper.selectCodeAcc", i);
	}
	
	public Integer selectAllCode(int i) {
		return sqlSession.selectOne("dataMapper.selectAllCode", i);
	}

	public int reviewData(accReview rev) {
		return sqlSession.insert("dataMapper.reviewData", rev);
	}

	public int imageData(accImage aImage) {
		return sqlSession.insert("dataMapper.imageData", aImage);
	}

	public int reviewSelectAll() {
		return sqlSession.selectOne("dataMapper.reviewSelectAll");
	}

	public int reviewSelect(int i) {
		return sqlSession.selectOne("dataMapper.reviewSelect", i);
	}

	public int insertRateData(accRate rate) {
		return sqlSession.insert("dataMapper.insertRateData", rate);
	}

	public int selectReviewData() {
		return sqlSession.selectOne("dataMapper.selectReviewData");
	}

	public int selectReviewData(int i) {
		return sqlSession.selectOne("dataMapper.selectReviewData", i);
	}

	public int checkCode() {
		return sqlSession.selectOne("dataMapper.checkCode");
	}



}
