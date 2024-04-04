package com.nxshxw.project.restaurant.model.service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nxshxw.project.common.utility.Util;
import com.nxshxw.project.restaurant.model.dao.TastyRestDAO;
import com.nxshxw.project.restaurant.model.dto.TastyRest;

@Service
public class TastyRestServiceImpl implements TastyRestService {

	@Autowired
	private TastyRestDAO dao;

	// 파일명 변경 메소드
	public static String fileRename(String originFileName) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String date = sdf.format(new java.util.Date(System.currentTimeMillis()));

		int ranNum = (int) (Math.random() * 100000); // 5자리 랜덤 숫자 생성

		String rest = "rest";

		String str = "_" + String.format("%05d", ranNum);

		String ext = originFileName.substring(originFileName.lastIndexOf("."));

		return rest + date + str + ext;
	}

	// 리뷰 삽입
	@Override
	public int insertReview(MultipartFile image, String webPath, String filePath, TastyRest rest)
			throws IllegalStateException, IOException {
		
		// 제목 , 게시글 XSS 처리 
		rest.setTitle(Util.XSSHandling(rest.getTitle()));
		rest.setBoardContent(Util.XSSHandling(rest.getBoardContent()));

		String rename = null; // 변경 이름 저장 변수

		if (image.getSize() > 0) { // 업로드된 이미지가 있을 경우

			// 1) 파일 이름 변경
			rename = fileRename(image.getOriginalFilename());

			// 2) 바뀐 이름 accImage에 세팅
			rest.setThumbnail(webPath + rename);

		} else { // 없는 경우 (x버튼)

			rest.setThumbnail(null);
			// 세션 이미지를 null로 변경해서 삭제

		}

		int result = dao.insertReview(rest);

		if (result > 0) { // 성공
			// 새 이미지가 업로드 된 경우
			if (rename != null) {

				image.transferTo(new File(filePath + rename));
			}

		}

		return result;
	}

	@Override
	public List<TastyRest> getReviewList(TastyRest data) {

		return dao.getReviewList(data);
	}

	// 게시글 상세 조회
	@Override
	public TastyRest getReviewDetail(int reviewNo) {
		return dao.getReviewDetail(reviewNo);
	}

	// 리뷰삭제
	@Override
	public int deleteReview(int reviewNo) {
		return dao.deleteReview(reviewNo);
	}

}
