package com.nxshxw.project.acc.model.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nxshxw.project.acc.model.dao.DAO;
import com.nxshxw.project.acc.model.dto.acc;
import com.nxshxw.project.acc.model.dto.accCode;
import com.nxshxw.project.acc.model.dto.accImage;
import com.nxshxw.project.acc.model.dto.accRate;
import com.nxshxw.project.acc.model.dto.accReview;

import java.util.Random;
import java.util.Set;

@Service
public class eServiceImpl implements eService {
	
	@Autowired
	private DAO dao;

    Random random = new Random();
	String[] accCategorys = {"모텔", "호텔", "펜션"};
	String accCategory;

	/** 
	 *	경기도 데이터 삽입
	 */
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int insertData(List<Map> list) {
	
		int result = 0;

		for(Map li : list) {
			
			accCategory = accCategorys[random.nextInt(accCategorys.length)];
			
			li.put("accCategory", accCategory);
			
			if(li.get("BSN_STATE_NM").equals("영업") || li.get("BSN_STATE_NM").equals("운영중")) {			
				li.put("BSN_STATE_NM", "Y");
			}else if(li.get("BSN_STATE_NM").equals("폐업") || li.get("BSN_STATE_NM").equals("폐업 등")) {			
				li.put("BSN_STATE_NM", "C");
			}else if(li.get("BSN_STATE_NM").equals("휴업")) {			
				li.put("BSN_STATE_NM", "N");
			}else {
				li.put("BSN_STATE_NM", "R");
			}
				
			if (li.get("REFINE_ROADNM_ADDR") != null && li.get("SITEWHLADDR") != ""){
				result = dao.insertData(li);				
			}
			
		}
		
		return result;

	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int insertCh(List<Map> list) {
		
		int result = 0;
				
		for(Map l : list) {
			
			accCategory = accCategorys[random.nextInt(accCategorys.length)];
			
			l.put("accCategory", accCategory);
			
			if(l.get("TRDSTATENM").equals("영업/정상")) {			
				l.put("TRDSTATENM", "Y");
			}else if(l.get("TRDSTATENM").equals("폐업")) {			
				l.put("TRDSTATENM", "C");
			}else if(l.get("TRDSTATENM").equals("휴업")) {			
				l.put("TRDSTATENM", "N");
			}else {
				l.put("TRDSTATENM", "R");
			}
			
			if(l.get("SITEWHLADDR") != null && l.get("SITEWHLADDR") != "" ) {
				result = dao.insertCh(l);	
			}
		}
		
		return result;

	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int insertSeoul(List<Map> list) {
		
		int result = 0;
		
		for(Map le : list) {
			
			accCategory = accCategorys[random.nextInt(accCategorys.length)];
			
			le.put("accCategory", accCategory);
			
			if(le.get("TRDSTATENM").equals("영업/정상")) {			
				le.put("TRDSTATENM", "Y");
			}else if(le.get("TRDSTATENM").equals("폐업")) {			
				le.put("TRDSTATENM", "C");
			}else if(le.get("TRDSTATENM").equals("휴업")) {			
				le.put("TRDSTATENM", "N");
			}else {
				le.put("TRDSTATENM", "R");
			}
			
			if(le.get("SITEWHLADDR") != null && le.get("SITEWHLADDR") != "") {
				result = dao.insertSeoul(le);	
			}
		}
		
		return result;
	}

	/**
	 * 자동 검색
	 */
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public List<acc> autoSearch(String str) {
	
		return dao.autoSearch(str);
	}

	/**
	 * 샘플 데이터 삽입
	 */
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int sampleData() {
		
		int result = 0;	
		int insertAll = 0;
		int codeNo = 1;
		
		String[] accTypes = {"일반", "디럭스", "스위트"};
		String accType;
		
		int randomPrice;
		int roomCapacity;
		Integer seqNo;
		
		insertAll = dao.selectData();
		
		for(int i = 1; i <= 80; i++) {
			
			accCode codeAcc = new accCode();
			
			seqNo = dao.selectAllData(i);
			codeAcc.setAccNo(seqNo);
				
			codeAcc.setUpdateNo(i);
			
			for(int x = 0; x < 3; x++) {
					
				codeAcc.setAccCode(codeNo);
				
				accType = accTypes[x];
				
				if(accType.equals("일반")) {
					roomCapacity = 2;
				}else if(accType.equals("디럭스")) {
					roomCapacity = 3;
				}else {
					roomCapacity = 4;
				}
				
				randomPrice = Math.round(random.nextInt(3001)+1500)*100;
				
				codeAcc.setAccType(accType);
				codeAcc.setRoomPrice(randomPrice);
				codeAcc.setRoomCapacity(roomCapacity);
				
				result = dao.sampleData(codeAcc);
				
				codeNo++;
				
			}	

		}
		
		return result;
	}

	/**
	 * 리뷰 데이터 삽입
	 */
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int reviewData() {
		
		int result = 0;
		int seqNo = 0;

		List<Integer> numbers = new ArrayList<>();
		for (int i = 1; i <= 3; i++) {
		    numbers.add(i);
		}
		
		String[] reviewContents = {"내용 확인용 1", "내용 확인용 2", "내용 확인용 3"};
		String reviewContent;
		
		int insertAll = dao.selectData();
		
			
		for(int i = 1; i <= 80; i++) {
			
			seqNo = dao.selectAllData(i);
						
			Collections.shuffle(numbers);
			accReview rev = new accReview();
			
			rev.setAccNo(seqNo);

			for(int x = 0; x < 3; x++) {
				
				int accImgLevel = numbers.get(x);
				
				reviewContent = reviewContents[random.nextInt(reviewContents.length)];

				rev.setUserNo(accImgLevel);
				rev.setAccReviewContent(reviewContent);

				result = dao.reviewData(rev);
			}
			
			
		}
		
		
		return result;
	}

	/**
	 * 이미지 데이터 삽입
	 */
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int imageData() {
		
		int result = 0;
		int seqNo = 0;
		
		String imagePath = "/resources/images/acc/";
		String[] imageRename = {"20240315103315_00001.jpg", "20240315163943_00002.jpg", "20240315163944_00003.jpg", "20240315163945_00004.jpg", "20240315163946_00005.jpg", "20240315163947_00006.jpg", "20240315163948_00007.jpg", "20240315163949_00008.jpg", "20240315163950_00009.jpg", "20240315163951_00010.jpg",};
		String[] imageOriginal = {"image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg", "image6.jpg", "image7.jpg", "image8.jpg", "image9.jpg", "image10.jpg"};

		List<Integer> numbers = new ArrayList<>();
		for (int i = 0; i < 10; i++) {
		    numbers.add(i);
		}
		
		int insertAll = dao.selectData();
		
		
		for(int i = 1; i <= 80; i++) {

			Collections.shuffle(numbers);
			
			seqNo = dao.selectAllData(i);
			
			accImage aImage = new accImage();
			
			aImage.setAccImgPath(imagePath);
			aImage.setAccNo(seqNo);
			
			for(int x = 0; x < imageRename.length; x++) {
				
			    int accImgLevel = numbers.get(x);
			    aImage.setAccImgLevel(accImgLevel);
				aImage.setAccImgRename(imageRename[x]);
				aImage.setAccImgOriginal(imageOriginal[x]);
				

				result = dao.imageData(aImage);
				
			}	

		}
		
		
		return result;
		
	}

	/**
	 * 평점 데이터 삽입
	 */
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int rateData() {
		
		int result = 0;
		
		int cleanRate;
		int kindRate;
		int facRate;
		int seqNo;
		
		int reviewSelectAll = dao.reviewSelectAll();
			
		for(int i = 1; i <= 240; i++) {
			
			accRate rate = new accRate();
			
			seqNo = dao.selectReviewData(i);

			rate.setAccReviewNo(seqNo);
			

			cleanRate = random.nextInt(11);
			kindRate = random.nextInt(11);
			facRate = random.nextInt(11);

			rate.setAccCleanRate(cleanRate);
			rate.setAccFacRate(facRate);
			rate.setAccKindRate(kindRate);

			result = dao.insertRateData(rate);
			
		}
		
		
		return result;
		
	}

}
