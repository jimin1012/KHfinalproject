package com.nxshxw.project.bus.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class busController {
	public static final String SERVICEKEY = "%2F%2BvsKUuxUmd3RRwV75KRm9NLPQj3t4HfuWgEzeB8wG3nD1atqnaCeY%2FVlKXQIj5SqxzejwgPYJr7F8n9Nxkl2A%3D%3D";
	@GetMapping("/bus")
	public String busPage() {
		return "bus/busMain";
	}
	
	@GetMapping("/bus/selectBus")
	public String busSelect() {
		return "bus/busSelect";
	}
	
	
	@GetMapping("/bus/busTicketing")
	public String busTicketing() {
		return "bus/busTicketing";
	}
	
}
	
	
