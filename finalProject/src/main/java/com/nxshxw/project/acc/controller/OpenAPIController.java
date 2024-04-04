package com.nxshxw.project.acc.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.nxshxw.project.acc.model.service.eService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class OpenAPIController {
   
   // 발급받은 인증키 변수 처리
   public String SERVICEKEY = "0cdd05b8eb264a58be5491b3fb167d3d";
   
	@Autowired
	private eService service;
   
      @ResponseBody
      @RequestMapping(value="seoul", produces = "application/json; charset=UTF-8")
      public String shelterList() throws IOException {
         
          String url = "http://openapi.seoul.go.kr:8088";
         
         url += "/53677565696d696e3237515246714a";
         url += "/json";
         url += "/LOCALDATA_031103";
         url += "/1";
         url += "/30";
         
         URL requestUrl = new URL(url);
         
         HttpURLConnection urlConn = (HttpURLConnection)requestUrl.openConnection();
         
         urlConn.setRequestMethod("GET");
         
         BufferedReader br = new BufferedReader(new InputStreamReader(urlConn.getInputStream()));
         
         String responseText = "";
         String line;
         
         while((line=br.readLine()) != null) {
            responseText += line;
         }
         
 
    	 Map map = new HashMap();
    	 
    	 map = new ObjectMapper().readValue(responseText, HashMap.class);     
    	 
    	 List<Map> list = new ArrayList();
    	 
    	 map = (Map) map.get("LOCALDATA_031103");
 	 
    	 list = (List<Map>) map.get("row");
  
    	 int result = service.insertSeoul(list);
    	 
         br.close();
         urlConn.disconnect();
         
         return responseText;
      }
      
      
	@ResponseBody
      @RequestMapping(value="kyung", produces = "application/json; charset=UTF-8")
      public String shelterList2() throws IOException {
         
         String url2 = "https://openapi.gg.go.kr/Staying";
         
         url2 += "?KEY=0cdd05b8eb264a58be5491b3fb167d3d";
         url2 += "&pIndex=1";
         url2 += "&pSize=30";
         url2 += "&Type=json";
         
         URL requestUrl = new URL(url2);
         
         HttpURLConnection urlConn = (HttpURLConnection)requestUrl.openConnection();
         
         urlConn.setRequestMethod("GET");
         
         BufferedReader br = new BufferedReader(new InputStreamReader(urlConn.getInputStream()));
          
         String responseText = "";
         String line;
         
         while((line=br.readLine()) != null) {
            responseText += line;
         }
         
        	 Map map = new HashMap();
        	 
        	 map = new ObjectMapper().readValue(responseText, HashMap.class);     
        	 
        	 List<Map> list = new ArrayList();       	 
        	 
        	 list = (List<Map>) map.get("Staying");
        	 
        	 list = (List<Map>) (list.get(1).get("row"));
        	 
        	 int result = service.insertData(list);
  
        	 
         br.close();
         urlConn.disconnect();
         

         return responseText;
         
      }
      
      
      @ResponseBody
      @RequestMapping(value="dataCh", produces = "application/json; charset=UTF-8")
      public String shelterList3() throws IOException {
         
         String url3 = "https://alldam.chungnam.go.kr/api/getLocalLodgement03/locallist.do";
         
         url3 += "?serviceKey=4a962c704f0557dd02ed29bd72852ac11574f476207d51c820a92545935ef2d7b393fcdf49796f4e4e797ca464a5e764";
         url3 += "&pageNo=1";
         url3 += "&numOfRows=30";
         url3 += "&resultType=json";
         
         URL requestUrl = new URL(url3);
         
         HttpURLConnection urlConn = (HttpURLConnection)requestUrl.openConnection();
         
         urlConn.setRequestMethod("GET");
         
         BufferedReader br = new BufferedReader(new InputStreamReader(urlConn.getInputStream()));
         
         String responseText = "";
         String line;
         
         while((line=br.readLine()) != null) {
            responseText += line;
         }
         
         
    	 Map map = new HashMap();
    	 
    	 map = new ObjectMapper().readValue(responseText, HashMap.class);     
    	 
    	 List<Map> list = new ArrayList();
    	 
    	 
    	 map = (Map) map.get("response");
    	 map = (Map) map.get("body");
    	 map = (Map) map.get("items");
    	 
    	 list = (List<Map>) map.get("item");
    	 
    	 int result = service.insertCh(list);
    	 	 
         br.close();
         urlConn.disconnect();
              
         return responseText;
         
      }
      
      
      @ResponseBody
      @GetMapping("/sampleData")
      public int sampleData() throws IOException {
         
    	 int result = service.sampleData();
    	 	 
         return result;
         
      }
      
      
      @ResponseBody
      @GetMapping("/reviewData")
      public int reviewData() throws IOException {
         
    	 int result = service.reviewData();
    	 	 
         return result;
         
      }
      
      @ResponseBody
      @GetMapping("/imageData")
      public int imageData() throws IOException {
         
    	 int result = service.imageData();
    	 	 
         return result;
         
      }
      
      @ResponseBody
      @GetMapping("/rateData")
      public int rateData() throws IOException {
         
    	 int result = service.rateData();
    	 	 
         return result;
         
      }
      

      
      


}