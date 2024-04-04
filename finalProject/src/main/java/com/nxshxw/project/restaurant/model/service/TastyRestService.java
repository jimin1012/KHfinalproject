package com.nxshxw.project.restaurant.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.nxshxw.project.restaurant.model.dto.TastyRest;

public interface TastyRestService {

	int insertReview(MultipartFile image, String webPath, String filePath, TastyRest rest)
			throws IllegalStateException, IOException;

	List<TastyRest> getReviewList(TastyRest data);

	TastyRest getReviewDetail(int reviewNo);

	int deleteReview(int reviewNo);

}
