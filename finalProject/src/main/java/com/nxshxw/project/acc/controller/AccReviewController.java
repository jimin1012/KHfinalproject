package com.nxshxw.project.acc.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nxshxw.project.acc.model.dto.acc;
import com.nxshxw.project.acc.model.dto.accImage;
import com.nxshxw.project.acc.model.dto.accRate;
import com.nxshxw.project.acc.model.dto.accReview;
import com.nxshxw.project.acc.model.dto.inputAcc;
import com.nxshxw.project.acc.model.service.accReviewService;
import com.nxshxw.project.acc.model.service.accService;
import com.nxshxw.project.user.model.dto.User;

import aj.org.objectweb.asm.Attribute;



@Controller
@RequestMapping("/review")
@SessionAttributes({"inputAcc", "loginUser"})
public class AccReviewController {
	
	@Autowired
	private accReviewService service;

  	@PostMapping("/insert")
  	public String reviewInsert(accReview accReview, Model model, @SessionAttribute("loginUser") User loginUser, accRate accRate, RedirectAttributes ra) {
  		
  		accReview.setUserNo(loginUser.getUserNo());
  		
  		int result = service.insertReview(accReview, accRate);
  		
		String message = null;
		if (result > 0)
			message = "리뷰가 등록 됐습니다.";
		else
			message = "리뷰 등록 실패";

		ra.addFlashAttribute("message", message);
  				
		return "redirect:/";
  		
  	}

  	
  	@PostMapping("/accUpdate")
  	public String reviewUpdate(accReview accReview, @SessionAttribute("loginUser") User loginUser, accRate accRate, RedirectAttributes ra) {
  	  
  	  
  		accReview.setUserNo(loginUser.getUserNo());
  		
  		int result = service.updateReview(accReview, accRate);
  		
		String message = null;
		if (result > 0)
			message = "리뷰를 수정 했습니다.";
		else
			message = "리뷰 수정 실패";

		ra.addFlashAttribute("message", message);


		return "redirect:/";
		
  	}
  	
  	
  	@GetMapping("/delete")
  	public String reviewDelete(RedirectAttributes ra, @SessionAttribute("loginUser") User loginUser, @RequestParam("accReviewNo") int accReviewNo) {
  	  
  		accReview accReview = new accReview();
  		
  		accReview.setUserNo(loginUser.getUserNo());
  		accReview.setAccReviewNo(accReviewNo);
  		
  		int result = service.deleteReview(accReview);
  		
		String message = null;
		if (result > 0)
			message = "리뷰 삭제 성공";
		else
			message = "리뷰 삭제 실패";

		ra.addFlashAttribute("message", message);


		return "redirect:/";
		
  	}
		
	   
  	
  	
}
