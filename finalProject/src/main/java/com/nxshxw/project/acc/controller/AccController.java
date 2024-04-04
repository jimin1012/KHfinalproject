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
import com.nxshxw.project.acc.model.dto.inputAcc;
import com.nxshxw.project.acc.model.service.accService;
import com.nxshxw.project.user.model.dto.User;



@Controller
@RequestMapping("/acc")
@SessionAttributes({"inputAcc", "reservationInfo", "loginUser"})
public class AccController {
	
	@Autowired
	private accService service;

  	@PostMapping("/inputSearch")
  	public String Search(inputAcc inputAcc, Model model) {
  		

  		String accDate = inputAcc.getDates();
  		
  		String[] dates = accDate.split(" ~ ");
        String startDate = dates[0];
        String endDate = dates[1];
        
        
        inputAcc.setStartDate(startDate);
        inputAcc.setEndDate(endDate);
        
        Map<String, Object> search = service.search(inputAcc);
                             
        model.addAttribute("search", search);
        
		return "acc/accList";
  	}

	@GetMapping("/map")
  	public String map(inputAcc inputAcc) {
  		
		return "acc/accMap";
  	}
  	
  	
  	@GetMapping("/lowPrice")
  	public String lowPrice(inputAcc inputAcc, Model model) {
  	    String accDate = inputAcc.getDates();
  	    

  	    
  	    String[] dates = accDate.split(" ~ ");
  	    String startDate = dates[0];
  	    String endDate = dates[1];
  	    
 
  	    inputAcc.setStartDate(startDate);
  	    inputAcc.setEndDate(endDate);
  	    
  	    Map<String, Object> search = service.search(inputAcc);
  	            
  	    model.addAttribute("search", search);
  	    
  	    return "acc/accList";
  	}
  	
  	@GetMapping("/highPrice")
  	public String highPrice(inputAcc inputAcc, Model model) {
  		
  		String accDate = inputAcc.getDates();
  		
  		String[] dates = accDate.split(" ~ ");
        String startDate = dates[0];
        String endDate = dates[1];
        
        inputAcc.setStartDate(startDate);
        inputAcc.setEndDate(endDate);
        
        Map<String, Object> search = service.highPrice(inputAcc);
                
        model.asMap().remove("search");
        
        model.addAttribute("search", search);

		return "acc/accList";
  	}
  	
  	
  	@GetMapping("/highGrade")
  	public String highGrade(inputAcc inputAcc, Model model) {
  		
  		String accDate = inputAcc.getDates();
  		
  		String[] dates = accDate.split(" ~ ");
        String startDate = dates[0];
        String endDate = dates[1];
        
        inputAcc.setStartDate(startDate);
        inputAcc.setEndDate(endDate);
        
        Map<String, Object> search = service.highRate(inputAcc);
                
        model.asMap().remove("search");
        
        model.addAttribute("search", search);

		return "acc/accList";
  	}
  	
  	
  	@GetMapping("/lowGrade")
  	public String lowGrade(inputAcc inputAcc, Model model) {
  		
  		String accDate = inputAcc.getDates();
  		
  		String[] dates = accDate.split(" ~ ");
        String startDate = dates[0];
        String endDate = dates[1];
        
        inputAcc.setStartDate(startDate);
        inputAcc.setEndDate(endDate);
        
        Map<String, Object> search = service.lowRate(inputAcc);
                
        model.asMap().remove("search");
        
        model.addAttribute("search", search);

		return "acc/accList";
  	}
  	
  	
  	@PostMapping("/reservation")
  	public String reserve(acc inputAcc, Model model, @ModelAttribute("inputAcc") inputAcc input) {
  		
        Map<String, Object> detail = service.detailData(inputAcc, input);
        
        List<accImage> jsonImage = service.jsonImage(inputAcc);
        

        model.asMap().remove("detail");
        model.asMap().remove("selectAcc");
        
        model.addAttribute("detail", detail);
        model.addAttribute("selectAcc", inputAcc);
        model.addAttribute("jsonImage", jsonImage);
        



  	    
  	    return "acc/accDetail";
  	}
  	
  	
    @GetMapping("/loadMore")
    @ResponseBody
    public Map<String, Object> loadMore(@RequestParam int start, @RequestParam String filter, @RequestParam String inputName, Model model,
    		@RequestParam int inputAdultNum, @RequestParam int inputChildNum, @RequestParam int inputGrNum, @RequestParam int userNo, @RequestParam String startDate,  @RequestParam String endDate) {
    	
        Map<String, Object> moreData = service.moreData(start, filter, inputName, inputGrNum, inputChildNum, inputAdultNum, userNo, startDate, endDate);
        
        return moreData;
    }
    
    
    
	   @PostMapping("/wishList")
	   @ResponseBody 
	   public int wishList(@RequestBody Map<String, Integer> paramMap, Model model, RedirectAttributes rs) {
		    
		   int result = service.wishList(paramMap);
		   
		   if(result == -1 || result == 0) {
				return -1;
		   }
		   
		   
		   
		   return result;
				   
		   
	   }
	   
	   

		@GetMapping("/wishListPage")
	  	public String wishListPage(Model model, @RequestParam("userNo") int userNo) {
	  		
			List<acc> wishList = service.wishListImage(userNo);
						
	        model.addAttribute("wishList", wishList);
	        
			return "myPage/myPage-wishList";

	  	}
		
		
		
		@PostMapping("/wishListDetail")
	  	public String wishListDetail(Model model, acc accInput) {
	  		
			inputAcc inputAcc = new inputAcc();
			LocalDate today = LocalDate.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

			String todayString = today.format(formatter);
			
			Map<String, Object> wishListDetail = service.wishListDetail(accInput);
			
	        model.asMap().remove("detail");
	        model.asMap().remove("selectAcc");
	        
	        inputAcc.setStartDate(todayString);
	        inputAcc.setEndDate(todayString);
	        inputAcc.setAdultNum(1);
	        inputAcc.setChildNum(1);
	        inputAcc.setGrNum(1);

	        accInput.setRate((Double) wishListDetail.get("avgRate"));
	        
	        model.addAttribute("detail", wishListDetail);
	        model.addAttribute("selectAcc", accInput);
	        model.addAttribute("inputAcc", inputAcc);
	        
	        
			return "acc/accDetail";
	  	}
		
		
		@GetMapping("/reservation")
	  	public String reserve(@RequestParam("accName") String accName, Model model) {
	
			inputAcc input = new inputAcc();
			acc inputAcc = new acc();

			
			int inputdata = service.getAccNo(accName);
			inputAcc.setAccNo(inputdata);
			

			LocalDate today = LocalDate.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			
			String todayString = today.format(formatter);

			input.setStartDate(todayString);
			input.setEndDate(todayString);
			input.setAdultNum(1);
			input.setChildNum(1);
			input.setGrNum(1);

			
	        Map<String, Object> detail = service.detailData(inputAcc, input);
	        
	        List<accImage> jsonImage = service.jsonImage(inputAcc);
	        

	        model.asMap().remove("detail");
	        model.asMap().remove("selectAcc");
	        
	        model.addAttribute("detail", detail);
	        model.addAttribute("selectAcc", inputAcc);
	        model.addAttribute("jsonImage", jsonImage);
	        
	        
	  	    return "acc/accDetail";
	  	}
		
		@GetMapping("/deleteWish")
	  	public String deleteWish(Model model, @RequestParam("accNo") int accNo, @SessionAttribute("loginUser") User loginUser) {
	  		
			acc wish = new acc(); 
			
			wish.setUserNo(loginUser.getUserNo());
			wish.setAccNo(accNo);
			
			int result = service.deleteWish(wish);
			
			List<acc> wishList = service.wishListImage(loginUser.getUserNo());
			
	        model.addAttribute("wishList", wishList);
						
			return "myPage/myPage-wishList";

	  	}
		
		
		@GetMapping("/changeList")
	  	public String changeList(Model model) {
	  		
	  		inputAcc inputAcc = new inputAcc();
	  		
			LocalDate today = LocalDate.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			
			String todayString = today.format(formatter);

			inputAcc.setStartDate(todayString);
			inputAcc.setEndDate(todayString);
			inputAcc.setAdultNum(1);
			inputAcc.setChildNum(1);
			inputAcc.setGrNum(1);
			
			model.addAttribute("inputAcc", inputAcc);
	        
			return "acc/accList";

	  	}
  	
  	
}
