package com.nxshxw.project.acc.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nxshxw.project.acc.model.dto.acc;
import com.nxshxw.project.acc.model.service.eService;



@RequestMapping("/search")
@RestController
public class SearchRestController {

	@Autowired
	private eService service;
	
	@PostMapping(value="/autoSearch", produces="application/json; charset=UTF-8")
	public  List<acc> autoSearch(@RequestBody Map<String, Object> input) {
	    
	      String str = (String) input.get("input");

  	      return service.autoSearch(str);
	   }
	
}
