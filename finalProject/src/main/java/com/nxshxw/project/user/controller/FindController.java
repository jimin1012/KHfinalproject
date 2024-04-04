package com.nxshxw.project.user.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nxshxw.project.user.model.service.FindService;




@Controller
public class FindController {
   
   
   @Autowired
   FindService service;
   

   @RequestMapping("/findId")
   public String findId() {
      return "user/findId";
   }
   
   @RequestMapping("/findPw")
   public String findPw() {
      return "user/findPw";
   }

   @PostMapping("/findId")
   public String findId(String phoneNum,
                   Model model,
                   RedirectAttributes ra) {
      // System.out.println(phoneNum);
      
      
      int memberNo =service.selectPhoneNum(phoneNum);
      
      String path = "";
      if(memberNo > 0) {
         
         String randomNum = createAuthKey();
         
         
         // 휴대폰인증 서비스    
         service.sendMessage(randomNum, phoneNum);
         
         // 내 휴대폰으로 test하고 싶을 때
         //service.sendMessage(randomNum, "내 휴대폰 번호");
          
          
         Map<String, Object> map = new HashMap<String, Object>();
         
         map.put("randomNum", randomNum);
         map.put("memberNo", memberNo);
         map.put("check", "id");
         
         model.addAttribute("map", map);
         
         path = "user/certi";
         
         
      }else {
         path = "redirect:/findId";
         String message = "일치하는 번호가 없습니다.";
         
         ra.addFlashAttribute("message", message);
      }
      
      return path;
   }
   

	// 이메일로 pw 찾기
	@PostMapping("/findPw")
	public String mail(String emailInput,
						RedirectAttributes ra,
						Model model) {
		
		// 1. 일치하는 email있는지 확인
		int memberNo = service.selectEmail(emailInput);
		String path = "";
		if(memberNo>0) { // 일ㅊㅣ하는 email 있을 때
			
			String authCode = createAuthKey();
			// 이메일 보내는 service 호출
			
			service.sendEmail(emailInput, authCode);
			Map<String, Object> map = new HashMap<String, Object>();
			
			map.put("randomNum", authCode);
			map.put("memberNo", memberNo);
			map.put("check", "pw");
			
			model.addAttribute("map", map);
			
			path = "user/certi";

			
		}else { // 일치하는 이메일 없을 떄
			path = "redirect:/findPw";
			String message = "일치하는 이메일이 없습니다.";
			
			ra.addFlashAttribute("message", message);
		}
		

		return path;
	}
	
	
	// 인증번호 확인하는 페이지
	@PostMapping("/check")
	public String check(String checkFrm,
						int memberNo,
						Model model) {
		
		String path = "";
		
		//System.out.println(checkFrm);
		//System.out.println(memberNo);
		
		
		// id찾기 form일때
		if(checkFrm.equals("id")) {
			
			String memberId = service.selectId(memberNo);
			
			model.addAttribute("memberId", memberId);
			
			path = "user/resultId";
			
		}
		
		// pw찾기 form일떄 pw변경 frm으로 이동
		if(checkFrm.equals("pw")) {
			
			model.addAttribute("memberNo", memberNo);
			path="user/changePw";
			
			
		}
		
		
		
		return path;
	}
   
   
   

	// 비밀번호 변경
	@PostMapping("/newPwC")
	public String changePw(@RequestParam Map<String, Object> paramMap,
							RedirectAttributes ra){
		
		int result = service.changePw(paramMap);
		
		String path ="redirect:";
		String message = null;
		
		if(result > 0) { // 성공
			message ="비밀번호가 변경 되었습니다. 메인페이지로 이동합니다.";
			path += "/";
			
		}else { // 실패
			message ="비밀번호 변경 실패. 인증페이지로 이동합니다.";
			path += "/findPw";
			
		}
		ra.addFlashAttribute("message",message);
		return path;
	}
	
   
   
   
   
   
    
    public String createAuthKey() {
        String key = "";
        
        for(int i=0 ; i< 6 ; i++) {
            
            int sel1 = (int)(Math.random() * 3); // 0:숫자 / 1,2:영어
            
            if(sel1 == 0) {
                
                int num = (int)(Math.random() * 10); // 0~9
                key += num;
                
            }else {
                
                char ch = (char)(Math.random() * 26 + 65); // A~Z
                
                int sel2 = (int)(Math.random() * 2); // 0:소문자 / 1:대문자
                
                if(sel2 == 0) {
                    ch = (char)(ch + ('a' - 'A')); // 소문자로 변경
                }
                
                key += ch;
            }
            
        }
        return key;
    }
}