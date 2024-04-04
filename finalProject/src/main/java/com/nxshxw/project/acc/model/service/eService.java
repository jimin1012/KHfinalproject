package com.nxshxw.project.acc.model.service;

import java.util.List;
import java.util.Map;

import com.nxshxw.project.acc.model.dto.acc;



public interface eService {

	// 경기 데이터 삽입
	int insertData(List<Map> list);

	// 충남 데이터 삽입
	int insertCh(List<Map> list);

	// 서울 데이터 삽입
	int insertSeoul(List<Map> list);

	// 자동검색
	List<acc> autoSearch(String str);

	// 샘플 데이터 삽입
	int sampleData();

	// 리뷰 데이터 삽입
	int reviewData();

	// 이미지 데이터 삽입
	int imageData();

	// 평점 데이터 삽입
	int rateData();

}
