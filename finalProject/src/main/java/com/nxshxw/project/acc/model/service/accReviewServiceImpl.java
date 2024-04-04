package com.nxshxw.project.acc.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nxshxw.project.acc.model.dto.accRate;
import com.nxshxw.project.acc.model.dto.accReview;
import com.nxshxw.project.common.utility.Util;
import com.nxshxw.project.acc.model.dao.accReviewDao;


@Service
public class accReviewServiceImpl implements accReviewService {
	
	@Autowired
	private accReviewDao accReviewDao;

	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int insertReview(accReview accReview, accRate accRate) {
		
		accReview.setAccReviewContent(Util.XSSHandling(accReview.getAccReviewContent()));
		
		int accNo = accReviewDao.findNo(accReview.getReservationNo());
		 
		accReview.setAccNo(accNo);
		
		
		int result = accReviewDao.insertReview(accReview);
		
		
		 if(result > 0) {	
			 
			 int CurNo = accReviewDao.getCurrentAccReviewNo();
			 
		 
			 accRate.setAccReviewNo(CurNo);
			 	 
			 result = accReviewDao.insertRate(accRate); 
		 }
		 
		
		return result;
	}

	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int updateReview(accReview accReview, accRate accRate) {
		

		accReview.setAccReviewContent(Util.XSSHandling(accReview.getAccReviewContent()));
		
		int accNo = accReviewDao.findAccNo(accReview.getAccReviewNo());
		
		accReview.setAccNo(accNo);
		
		int result = accReviewDao.updateReview(accReview);
		
		if(result > 0) {	
		 
			accRate.setAccReviewNo(accReview.getAccReviewNo());
			 		 
			result = accReviewDao.updateRate(accRate); 
		}
		 
		
		return result;
	}

	@Transactional(rollbackFor = { Exception.class })
	@Override
	public int deleteReview(accReview accReview) {
		
		return accReviewDao.deleteReview(accReview);
		

	}






	

}
