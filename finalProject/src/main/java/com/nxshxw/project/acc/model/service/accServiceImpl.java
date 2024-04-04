package com.nxshxw.project.acc.model.service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.nxshxw.project.acc.model.dto.Pagination;
import com.nxshxw.project.acc.model.dto.acc;
import com.nxshxw.project.acc.model.dto.accCode;
import com.nxshxw.project.acc.model.dto.accImage;
import com.nxshxw.project.acc.model.dto.accRate;
import com.nxshxw.project.acc.model.dto.accReserve;
import com.nxshxw.project.acc.model.dto.accReview;
import com.nxshxw.project.acc.model.dto.inputAcc;
import com.nxshxw.project.user.model.dto.User;
import com.nxshxw.project.acc.model.dao.accDao;


@Service
public class accServiceImpl implements accService {
	
	@Autowired
	private accDao accDao;


	@Transactional(rollbackFor = { Exception.class })
	@Override
	public Map<String, Object> search(inputAcc inputAcc) {
			
		Map<String, Object> data = new HashMap<String, Object>();
		
		String[] whereParts = inputAcc.getWhere().split(" ");
		
		String whereGo = whereParts[0];
		
		if (whereParts.length >= 2 && !whereParts[1].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1];
		}
		if (whereParts.length >= 3 && !whereParts[2].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1] + " " + whereParts[2];
		}
		if (whereParts.length >= 4 && !whereParts[3].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1] + " " + whereParts[2] + " " + whereParts[3];
		}
		
	    int listCount = accDao.getListCount(whereGo);
	    
	    Pagination pagination = new Pagination(1, listCount);
	    
	    List<acc> searchList = accDao.searchList(pagination, whereGo);
	    
	    for(int i = 0; i < searchList.size(); i++) {
	        acc accObject = accDao.searchRate(searchList.get(i).getAccNo());
	        
	        if (accObject != null) {
	            double avgRate = accObject.getRate();
	            searchList.get(i).setRate(avgRate);
	        }
	        
	        data.put("userNo", inputAcc.getUserNo());
	        data.put("accNo", searchList.get(i).getAccNo());

	        int wishResult = accDao.wishListCheck(data);
	        
		    int reviewCount = accDao.reviewCount(searchList.get(i).getAccNo());
		    
		    searchList.get(i).setReviewCount(reviewCount);
		    
	        if (wishResult >= 1) {
	            searchList.get(i).setWishCheck("on");
	        }
	    }

	    
	    int totalPerson = inputAcc.getAdultNum() + inputAcc.getChildNum();
	    int grNum = inputAcc.getGrNum();
	    
	    List<accCode> accGrade = new ArrayList<accCode>();

	    for(int i = 0; i < searchList.size(); i++) {
	    	 	
	    	accCode grade = new accCode();
	    	
	    	grade.setTotalPerson(totalPerson);
	    	grade.setGrNum(grNum);
	    	grade.setAccNo(searchList.get(i).getAccNo());
	    	grade.setStartDate(inputAcc.getStartDate());
	    	grade.setEndDate(inputAcc.getEndDate());

		    accCode resultGrade = accDao.testGrade(grade);
		    
			accGrade.add(resultGrade);
			
		}	    	
	    
	    int selectListCount = accDao.selectListCount(whereGo);

	    List<accReserve> reserve = accDao.reserveAllData(inputAcc);
	    
	    Map<String, Object> map = new HashMap<>();
	    map.put("pagination", pagination);
	    map.put("searchList", searchList);
	    map.put("accGrade", accGrade);
	    map.put("selectListCount", selectListCount);

	    return map;
	}


	@Transactional(rollbackFor = { Exception.class })
	@Override
	public Map<String, Object> highPrice(inputAcc inputAcc) {
		
		Map<String, Object> data = new HashMap<String, Object>();
		
		String[] whereParts = inputAcc.getWhere().split(" ");
		
		String whereGo = whereParts[0];
		
		if (whereParts.length >= 2 && !whereParts[1].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1];
		}
		if (whereParts.length >= 3 && !whereParts[2].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1] + " " + whereParts[2];
		}
		if (whereParts.length >= 4 && !whereParts[3].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1] + " " + whereParts[2] + " " + whereParts[3];
		}
		
	    int listCount = accDao.getListCount(whereGo);
	    
	    Pagination pagination = new Pagination(1, listCount);
	    
	    List<acc> searchList = accDao.highPrice(pagination, whereGo);

	    for(int i = 0; i < searchList.size(); i++) {
	        acc accObject = accDao.searchRate(searchList.get(i).getAccNo());
	        
	        if (accObject != null) {
	            double avgRate = accObject.getRate();
	            searchList.get(i).setRate(avgRate);
	        }
	        
	        data.put("userNo", inputAcc.getUserNo());
	        data.put("accNo", searchList.get(i).getAccNo());

	        int wishResult = accDao.wishListCheck(data);
	        
	        if (wishResult >= 1) {
	            searchList.get(i).setWishCheck("on");
	        }
	    }

	    
	    int totalPerson = inputAcc.getAdultNum() + inputAcc.getChildNum();
	    int grNum = inputAcc.getGrNum();
	    
	    List<accCode> accGrade = new ArrayList<accCode>();

	    for(int i = 0; i < searchList.size(); i++) {
	    	 	
	    	accCode grade = new accCode();
	    	
	    	grade.setTotalPerson(totalPerson);
	    	grade.setGrNum(grNum);
	    	grade.setAccNo(searchList.get(i).getAccNo());
	    	grade.setStartDate(inputAcc.getStartDate());
	    	grade.setEndDate(inputAcc.getEndDate());
	    	
		    accCode resultGrade = accDao.searchGradeP2(grade);
		    
			accGrade.add(resultGrade);

	    }
	    int selectListCount = accDao.selectListCount(whereGo);
	    
	    Map<String, Object> map = new HashMap<>();
	    map.put("pagination", pagination);
	    map.put("searchList", searchList);
	    map.put("accGrade", accGrade);
	    map.put("selectListCount", selectListCount);

	    return map;
	    
	}
	
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public Map<String, Object> highRate(inputAcc inputAcc) {
		
		Map<String, Object> data = new HashMap<String, Object>();
		
		String[] whereParts = inputAcc.getWhere().split(" ");
		
		String whereGo = whereParts[0];
		
		if (whereParts.length >= 2 && !whereParts[1].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1];
		}
		if (whereParts.length >= 3 && !whereParts[2].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1] + " " + whereParts[2];
		}
		if (whereParts.length >= 4 && !whereParts[3].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1] + " " + whereParts[2] + " " + whereParts[3];
		}
			
	    int listCount = accDao.getListCount(whereGo);
	    
	    Pagination pagination = new Pagination(1, listCount);
	    
	    List<acc> searchList = accDao.highRate(pagination, whereGo);

	    for(int i = 0; i < searchList.size(); i++) {
	        acc accObject = accDao.searchRate(searchList.get(i).getAccNo());
	        
	        if (accObject != null) {
	            double avgRate = accObject.getRate();
	            searchList.get(i).setRate(avgRate);
	        }
	        
	        data.put("userNo", inputAcc.getUserNo());
	        data.put("accNo", searchList.get(i).getAccNo());

	        int wishResult = accDao.wishListCheck(data);
	        
	        if (wishResult >= 1) {
	            searchList.get(i).setWishCheck("on");
	        }
	    }

	    
	    int totalPerson = inputAcc.getAdultNum() + inputAcc.getChildNum();
	    int grNum = inputAcc.getGrNum();
	    
	    List<accCode> accGrade = new ArrayList<accCode>();

	    for(int i = 0; i < searchList.size(); i++) {
	    	 	
	    	accCode grade = new accCode();
	    	
	    	grade.setTotalPerson(totalPerson);
	    	grade.setGrNum(grNum);
	    	grade.setAccNo(searchList.get(i).getAccNo());
	    	grade.setStartDate(inputAcc.getStartDate());
	    	grade.setEndDate(inputAcc.getEndDate());
	    	
		    accCode resultGrade = accDao.searchGradeP2(grade);
		    
			accGrade.add(resultGrade);
	    }
	    
	    int selectRateCount = accDao.selectRateCount(whereGo);
	    
	    Map<String, Object> map = new HashMap<>();
	    map.put("pagination", pagination);
	    map.put("searchList", searchList);
	    map.put("accGrade", accGrade);
	    map.put("selectListCount", selectRateCount);

	    return map;
	    
	}
	
	@Transactional(rollbackFor = { Exception.class })
	@Override
	public Map<String, Object> lowRate(inputAcc inputAcc) {
		
		Map<String, Object> data = new HashMap<String, Object>();
		
		String[] whereParts = inputAcc.getWhere().split(" ");
		
		String whereGo = whereParts[0];
		
		if (whereParts.length >= 2 && !whereParts[1].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1];
		}
		if (whereParts.length >= 3 && !whereParts[2].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1] + " " + whereParts[2];
		}
		if (whereParts.length >= 4 && !whereParts[3].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1] + " " + whereParts[2] + " " + whereParts[3];
		}
		
	    int listCount = accDao.getListCount(whereGo);
	    
	    Pagination pagination = new Pagination(1, listCount);
	    
	    List<acc> searchList = accDao.lowRate(pagination, whereGo);

	    for(int i = 0; i < searchList.size(); i++) {
	        acc accObject = accDao.searchRate(searchList.get(i).getAccNo());
	        
	        if (accObject != null) {
	            double avgRate = accObject.getRate();
	            searchList.get(i).setRate(avgRate);
	        }
	        
	        data.put("userNo", inputAcc.getUserNo());
	        data.put("accNo", searchList.get(i).getAccNo());

	        int wishResult = accDao.wishListCheck(data);
	        
	        if (wishResult >= 1) {
	            searchList.get(i).setWishCheck("on");
	        }
	    }

	    
	    int totalPerson = inputAcc.getAdultNum() + inputAcc.getChildNum();
	    int grNum = inputAcc.getGrNum();
	    
	    List<accCode> accGrade = new ArrayList<accCode>();

	    for(int i = 0; i < searchList.size(); i++) {
	    	 	
	    	accCode grade = new accCode();
	    	
	    	grade.setTotalPerson(totalPerson);
	    	grade.setGrNum(grNum);
	    	grade.setAccNo(searchList.get(i).getAccNo());
	    	grade.setStartDate(inputAcc.getStartDate());
	    	grade.setEndDate(inputAcc.getEndDate());
	    	
		    accCode resultGrade = accDao.testGrade(grade);
		    
			accGrade.add(resultGrade);
	    	

	    }
	    
	    int selectRateCount = accDao.selectRateCount(whereGo);
	    
	    Map<String, Object> map = new HashMap<>();
	    map.put("pagination", pagination);
	    map.put("searchList", searchList);
	    map.put("accGrade", accGrade);
	    map.put("selectListCount", selectRateCount);

	    return map;
	    
	}

	@Transactional(rollbackFor = { Exception.class })
	@Override
	public Map<String, Object> detailData(acc inputAcc, inputAcc input) {
		
		
	    int listCount = accDao.detailCount(inputAcc.getAccNo());
	    
	    input.setAccNo(inputAcc.getAccNo());
	    input.setTotalPerson(input.getAdultNum()+input.getChildNum());
	    
	    Pagination pagination = new Pagination(1, listCount);
	
		List<accImage> detailImage = accDao.detailImage(inputAcc.getAccNo());
		List<accCode> detailCode = accDao.detailCode(input);
		List<accReview> detailReivew = accDao.detailReivew(inputAcc.getAccNo());
		List<accRate> detailRate = accDao.detailRate(inputAcc.getAccNo());
		List<accRate> selectAllRate = accDao.selectAllRate(inputAcc.getAccNo());
		
		for (accReview review : detailReivew) {
		    int userNo = review.getUserNo();
		    
		    String userNickName = accDao.userNickName(userNo);

		    review.setUserNickName(userNickName);
		}
		
		for (accCode code : detailCode) {
			int accCode = code.getAccCode();
			
			int room = accDao.roomCapacity(accCode);
			
			code.setRoomCapacity(room);	
		}

	    Map<String, Object> map = new HashMap<>();
	    map.put("detailCode", detailCode);
	    map.put("detailImage", detailImage);
	    map.put("detailReivew", detailReivew);
	    map.put("detailRate", detailRate);
	    map.put("selectAllRate", selectAllRate);
	    


	    return map;
		
		
	}

	@Transactional(rollbackFor = { Exception.class })
	@Override
	public Map<String, Object> moreData(int start, String filter, String inputName, int inputGrNum, int inputChildNum,
			int inputAdultNum, int userNo, String startDate, String endDate) {
		
	    Map<String, Object> map = new HashMap<>();
	    Map<String, Object> data = new HashMap<>();
	    
		String[] whereParts = inputName.split(" ");
		
		String whereGo = whereParts[0];
		
		if (whereParts.length >= 2 && !whereParts[1].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1];
		}
		if (whereParts.length >= 3 && !whereParts[2].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1] + " " + whereParts[2];
		}
		if (whereParts.length >= 4 && !whereParts[3].equals(" ")) {
			whereGo = whereParts[0] + " " + whereParts[1] + " " + whereParts[2] + " " + whereParts[3];
		}
		
	    
		if(filter.equals("inputSearch") || filter.equals("lowPrice")){
			List<acc> moreData = accDao.baseSearch(start, whereGo);
			
			
		    for(int i = 0; i < moreData.size(); i++) {
		        acc accObject = accDao.searchRate(moreData.get(i).getAccNo());
		        
		        if (accObject != null) {
		            double avgRate = accObject.getRate();
		            moreData.get(i).setRate(avgRate);
		        }  
		        
		        data.put("userNo", userNo);
		        data.put("accNo", moreData.get(i).getAccNo());

		        int wishResult = accDao.wishListCheck(data);
		        
		        if (wishResult >= 1) {
		        	moreData.get(i).setWishCheck("on");
		        }
		    }
		    
		    int totalPerson = inputAdultNum + inputChildNum;
		    int grNum = inputGrNum;
		    
		    for (int i = 0; i < moreData.size(); i++) {
		        accCode grade = new accCode();

		        grade.setTotalPerson(totalPerson);
		        grade.setGrNum(grNum);
		        grade.setAccNo(moreData.get(i).getAccNo());
		        grade.setStartDate(startDate);
		        grade.setEndDate(endDate);

		        accCode resultGrade = accDao.testGrade(grade);

		        if (resultGrade == null) {
		            moreData.get(i).setPrice(0);
		        } else {
		            moreData.get(i).setPrice(resultGrade.getRoomPrice()); 
		        }
		    }

		    
			map.put("detailMore", moreData);
			
		}else if(filter.equals("highPrice")) {
			List<acc> moreData = accDao.moreHighPrice(start, whereGo);
			
		    for(int i = 0; i < moreData.size(); i++) {
		        acc accObject = accDao.searchRate(moreData.get(i).getAccNo());
		        
		        if (accObject != null) {
		            double avgRate = accObject.getRate();
		            moreData.get(i).setRate(avgRate);
		        }  
		        
		        data.put("userNo", userNo);
		        data.put("accNo", moreData.get(i).getAccNo());

		        int wishResult = accDao.wishListCheck(data);
		        
		        if (wishResult >= 1) {
		        	moreData.get(i).setWishCheck("on");
		        }
		    }
		    
		    int totalPerson = inputAdultNum + inputChildNum;
		    int grNum = inputGrNum;
		    
		    for (int i = 0; i < moreData.size(); i++) {
		        accCode grade = new accCode();

		        grade.setTotalPerson(totalPerson);
		        grade.setGrNum(grNum);
		        grade.setAccNo(moreData.get(i).getAccNo());
		        grade.setStartDate(startDate);
		        grade.setEndDate(endDate);

		        accCode resultGrade = accDao.searchGradeP2(grade);

		        if (resultGrade == null) {
		            moreData.get(i).setPrice(0);
		        } else {
		            moreData.get(i).setPrice(resultGrade.getRoomPrice()); 
		        }
		    }
		    
			map.put("detailMore", moreData);
			
		}else if(filter.equals("highGrade")) {
			List<acc> moreData = accDao.moreHighRate(start, whereGo);
			
		    for(int i = 0; i < moreData.size(); i++) {
		        acc accObject = accDao.searchRate(moreData.get(i).getAccNo());
		        
		        if (accObject != null) {
		            double avgRate = accObject.getRate();
		            moreData.get(i).setRate(avgRate);
		        }  
		        
		        data.put("userNo", userNo);
		        data.put("accNo", moreData.get(i).getAccNo());

		        int wishResult = accDao.wishListCheck(data);
		        
		        if (wishResult >= 1) {
		        	moreData.get(i).setWishCheck("on");
		        }
		    }
		    
		    int totalPerson = inputAdultNum + inputChildNum;
		    int grNum = inputGrNum;
		    
		    for (int i = 0; i < moreData.size(); i++) {
		        accCode grade = new accCode();

		        grade.setTotalPerson(totalPerson);
		        grade.setGrNum(grNum);
		        grade.setAccNo(moreData.get(i).getAccNo());
		        grade.setStartDate(startDate);
		        grade.setEndDate(endDate);

		        accCode resultGrade = accDao.searchGradeP2(grade);

		        if (resultGrade == null) {
		            moreData.get(i).setPrice(0);
		        } else {
		            moreData.get(i).setPrice(resultGrade.getRoomPrice()); 
		        }
		    }
		    
			map.put("detailMore", moreData);
			
		}else if(filter.equals("lowGrade")) {
			List<acc> moreData = accDao.moreLowRate(start, whereGo);
			
		    for(int i = 0; i < moreData.size(); i++) {
		    	
		        acc accObject = accDao.searchRate(moreData.get(i).getAccNo());
		        
		        if (accObject != null) {
		            double avgRate = accObject.getRate();
		            moreData.get(i).setRate(avgRate);
		            
			        data.put("userNo", userNo);
			        data.put("accNo", moreData.get(i).getAccNo());

			        int wishResult = accDao.wishListCheck(data);
			        
			        if (wishResult >= 1) {
			        	moreData.get(i).setWishCheck("on");
			        }
		        }  
		    }
		    
		    int totalPerson = inputAdultNum + inputChildNum;
		    int grNum = inputGrNum;    
		    
		    for (int i = 0; i < moreData.size(); i++) {
		        accCode grade = new accCode();

		        grade.setTotalPerson(totalPerson);
		        grade.setGrNum(grNum);
		        grade.setAccNo(moreData.get(i).getAccNo());
		        grade.setStartDate(startDate);
		        grade.setEndDate(endDate);

		        accCode resultGrade = accDao.testGrade(grade);

		        if (resultGrade == null) {
		            moreData.get(i).setPrice(0);
		        } else {
		            moreData.get(i).setPrice(resultGrade.getRoomPrice()); 
		        }
		    }
			map.put("detailMore", moreData);
		}
	    
	    return map;
	}

	@Transactional(rollbackFor = { Exception.class })
	@Override
	public List<accImage> jsonImage(acc inputAcc) {
		List<accImage> jsonImage = accDao.jsonImage(inputAcc.getAccNo());
		return jsonImage;

	}

	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int wishList(Map<String, Integer> paramMap) {
		int result = 0;
		
		if(paramMap.get("userNo") == null || paramMap.get("userNo") == 0) {
			return -1;
		}
		
		if(paramMap.get("check") == 0) { 
			result = accDao.insertWishList(paramMap);
		} else{ 
			result = accDao.deleteWishList(paramMap);
		}
		

		if(result == 0) return -1;
			
		return result;
	}

	@Transactional(rollbackFor = { Exception.class })
	@Override
	public List<acc> wishListImage(int userNo) {
		
		
		
		List<Object> wishListAccNo = accDao.wishListAccNo(userNo);
		
		
		List<acc> wishListImageData = new ArrayList<acc>();
		
		
	    for(int i = 0; i < wishListAccNo.size(); i++) { 
	    	
	    	acc wishAcc = accDao.wishListAccData((int) wishListAccNo.get(i));
	    	acc wishImage = accDao.wishListImageData((int) wishListAccNo.get(i));
	    	acc wishGrade = accDao.wishListGrade((int) wishListAccNo.get(i));
	    	acc wishRate = accDao.wishListRate((int) wishListAccNo.get(i));
	    	
	    	
	    	wishAcc.setThumbnail(wishImage.getThumbnail());
	    	wishAcc.setPrice(wishGrade.getPrice());
	    	
	    	
	    	
	    	if(wishRate != null) {
	    		wishAcc.setRate(wishRate.getRate());
	    		wishAcc.setReviewCount(wishRate.getReviewCount());
	    	}else {
	    		wishAcc.setRate(0);
	    		wishAcc.setReviewCount(0);
	    	}
	    	
	    	wishListImageData.add(wishAcc);
	    }
		

	    
	    return wishListImageData;
	}

	@Transactional(rollbackFor = { Exception.class })
	@Override
	public Map<String, Object> wishListDetail(acc accInput) {
		
	    int listCount = accDao.detailCount(accInput.getAccNo());
	     
	    Pagination pagination = new Pagination(1, listCount);
	
		List<accImage> detailImage = accDao.detailImage(accInput.getAccNo());
		List<accCode> detailCode = accDao.detailCode(accInput.getAccNo());
		List<accReview> detailReivew = accDao.detailReivew(accInput.getAccNo());
		List<accRate> detailRate = accDao.detailRate(accInput.getAccNo());
		List<accRate> selectAllRate = accDao.selectAllRate(accInput.getAccNo());
		
		double avgCleanRate = detailRate.get(0).getAvgCleanRate();
		double avgFacRate = detailRate.get(0).getAvgFacRate();
		double avgKindRate = detailRate.get(0).getAvgKindRate();

		double rate = (avgCleanRate + avgFacRate + avgKindRate) / 3;

		DecimalFormat df = new DecimalFormat("#.#");
		
		double avgRate = Double.parseDouble(df.format(rate));
		
	    Map<String, Object> map = new HashMap<>();
	    map.put("detailCode", detailCode);
	    map.put("detailImage", detailImage);
	    map.put("detailReivew", detailReivew);
	    map.put("detailRate", detailRate);
	    map.put("selectAllRate", selectAllRate);
	    map.put("avgRate", avgRate);

	    return map;
	    
	}

	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int getAccNo(String accName) {
		
		int getAccNo = accDao.getAccNo(accName);
		
		return getAccNo;
		
	}

	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int deleteWish(acc wish) {
		
		return accDao.deleteWish(wish);
		
	}




	

}
