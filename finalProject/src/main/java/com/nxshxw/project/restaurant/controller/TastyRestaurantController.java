package com.nxshxw.project.restaurant.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nxshxw.project.restaurant.model.dto.TastyRest;
import com.nxshxw.project.restaurant.model.service.TastyRestService;
import com.nxshxw.project.user.model.dto.User;

@SessionAttributes({ "owner", "accImage", "ownerResnList", "restList" })

@Controller
@RequestMapping("/tastyRest")
public class TastyRestaurantController {

	@Autowired
	private TastyRestService service;

	@GetMapping("/map")
	public String tastyRest(Model model) throws IOException {

		return "tastyRest/tastyRest-map";
	}

	@GetMapping("/insert-RestReview")
	public String insertRestReview() {

		return "tastyRest/tastyRest-write";

	}

	// 리뷰 조회
	@GetMapping("/detail")
	public String getReviewDetail(@RequestParam("reviewNo") int reviewNo, Model model ,
			Model login,
			@SessionAttribute("loginUser") User loginUser) {

		TastyRest review = service.getReviewDetail(reviewNo);
		model.addAttribute("review", review);
		login.addAttribute("loginUser",loginUser);

		return "tastyRest/tastyRest-detail";
	}
	// 리뷰 삭제
	@GetMapping("/deleteReview")
	public String deleteReview(@RequestParam("reviewNo") int reviewNo, Model model ,
			Model login,
			@SessionAttribute("loginUser") User loginUser) {

		System.out.println("reviewNo"+reviewNo);
		int result = service.deleteReview(reviewNo);

		return "tastyRest/tastyRest-map";
	}

	// -------- 리뷰등록

	@PostMapping("/insert-RestReview")
	public String insertReview(TastyRest rest //
			, @RequestParam(value = "images", required = false) MultipartFile images //
			, RedirectAttributes ra //
			, HttpSession session //
			, @SessionAttribute("loginUser") User loginUser
	) throws IllegalStateException, IOException {

		// 웹 접근 경로
		String webPath = "/resources/images/rest/";
		String filePath = session.getServletContext().getRealPath(webPath);

		int userNo = loginUser.getUserNo();

		rest.setUserNo(userNo);

		int result = service.insertReview(images, webPath, filePath, rest);

//		System.out.println(result+" : result");
		ra.addFlashAttribute("message", "게시글이 등록되었습니다.");

		return "tastyRest/tastyRest-map";

	}

	// 지도에서 리뷰목록 불러오기
	@PostMapping("/getRestReviewList")
	@ResponseBody
	public List<TastyRest> getReviewList(@RequestBody TastyRest data, Model model) {

		List<TastyRest> reviewList = service.getReviewList(data);

		return reviewList;
	}

}
