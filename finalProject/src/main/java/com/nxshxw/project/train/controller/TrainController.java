package com.nxshxw.project.train.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nxshxw.project.train.model.dto.Train;
import com.nxshxw.project.train.model.service.TrainService;

@Controller
public class TrainController {
	
	@Autowired
	TrainService service;
	
	@GetMapping("/train")
	public String trainPage() {
		return "train/trainMain";
	}
	

	@GetMapping("/train/trainBooking")
	public String busTicketing(Train train,
								Model model) {
		
//		System.out.println(train);
		model.addAttribute(train);
		
		return "train/trainBooking";
	}
	
	@PostMapping("/train/seat")
	@ResponseBody
	public List<String> seat (@RequestBody Map<String, String> paramMap){
		//System.out.println(paramMap);
		
		List<String> seats = service.selectSeats(paramMap);
		
		//System.out.println(seats);
		
		return seats;
	}
	
	

}
