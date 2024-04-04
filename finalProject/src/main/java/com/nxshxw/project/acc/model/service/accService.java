package com.nxshxw.project.acc.model.service;

import java.util.List;
import java.util.Map;

import com.nxshxw.project.acc.model.dto.acc;
import com.nxshxw.project.acc.model.dto.accImage;
import com.nxshxw.project.acc.model.dto.inputAcc;


public interface accService {

	// 숙소 검색
	Map<String, Object> search(inputAcc inputAcc);

	// 높은 가격 정렬
	Map<String, Object> highPrice(inputAcc inputAcc);

	// 높은 등급
	Map<String, Object> highRate(inputAcc inputAcc);

	// 낮은 등급
	Map<String, Object> lowRate(inputAcc inputAcc);

	// 상세 정보
	Map<String, Object> detailData(acc inputAcc, inputAcc input);

	// 추가 데이터 로딩
	Map<String, Object> moreData(int start, String filter, String inputName, int inputGrNum, int inputChildNum, int inputAdultNum, int userNo, String startDate, String endDate);

	// JSON으로 이미지 변환할 파일들
	List<accImage> jsonImage(acc inputAcc);

	// 위시리스트
	int wishList(Map<String, Integer> paramMap);

	// 위시리스트 이미지
	List<acc> wishListImage(int userNo);

	// 위시리스트 상세정보
	Map<String, Object> wishListDetail(acc accInput);

	// 숙소 번호 가져오기
	int getAccNo(String accName);

	// 위시리스트 삭제
	int deleteWish(acc wish);




}
