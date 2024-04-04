package com.nxshxw.project.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.nxshxw.project.user.model.service.UserService;

@RestController
public class AjaxController {
	
	@Autowired // DI
	private UserService service;
	
	@PostMapping(value="/ManagerCode", produces="application/json; charset=UTF-8")
	public Map<String, Object> validateManagerCode(@RequestBody String managerCode) {		
		Map<String, Object> resultMap = new HashMap<>();
		boolean isValid = service.validateManagerCode(managerCode);
		
		System.out.println(isValid);
		
		resultMap.put("valid", isValid);
		return resultMap;
	}

}
