package com.nxshxw.project.acc.model.service;

import java.util.List;
import java.util.Map;

import com.nxshxw.project.acc.model.dto.acc;
import com.nxshxw.project.acc.model.dto.accImage;
import com.nxshxw.project.acc.model.dto.accRate;
import com.nxshxw.project.acc.model.dto.accReview;
import com.nxshxw.project.acc.model.dto.inputAcc;


public interface accReviewService {

	// 리뷰 삽입
	int insertReview(accReview accReview, accRate accRate);

	// 리뷰 수정
	int updateReview(accReview accReview, accRate accRate);

	// 리뷰 삭제
	int deleteReview(accReview accReview);






}
