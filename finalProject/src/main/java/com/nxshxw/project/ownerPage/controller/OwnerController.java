package com.nxshxw.project.ownerPage.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Insert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nxshxw.project.ownerPage.model.dto.ACCImageOwner;
import com.nxshxw.project.ownerPage.model.dto.ACCOwnerStats;
import com.nxshxw.project.ownerPage.model.dto.ACCResnOwner;
import com.nxshxw.project.ownerPage.model.dto.ACCRoomsOwner;
import com.nxshxw.project.ownerPage.model.dto.Owner;
import com.nxshxw.project.ownerPage.model.service.OwnerService;
import com.nxshxw.project.user.model.dto.User;

@SessionAttributes({ "owner", "accImage", "ownerResnList", "loginUser" })

@Controller
@RequestMapping("/ownerPage")
public class OwnerController {

	@Autowired
	private OwnerService service;

	@Autowired
	private ServletContext servletContext;

	// ---- 화면 -----

	/* 사업장 정보 */
	@GetMapping("/info")
	public String Info(Model model, @SessionAttribute("loginUser") User loginUser) {

		// 임시로 세션에 값 가져오기 위해서 첫번째 페이지에서 세션 불러오기
		int userNo = loginUser.getUserNo();

		Owner loginOwner = service.getOwner(userNo);
		model.addAttribute("owner", loginOwner);

		return "ownerPage/owner-info";

	}

	// 홍보 이미지
	@GetMapping("/photo")
	public String photo(Model model, @SessionAttribute("loginUser") User loginUser) {

		// 임시로 세션에 값 가져오기 위해서 첫번째 페이지에서 세션 불러오기
		int userNo = loginUser.getUserNo();
		Owner loginOwner = service.getOwner(userNo);
		model.addAttribute("owner", loginOwner);

		return "ownerPage/owner-photo";
	}

	// 예약 리스트
	@GetMapping("/reservation")
	public String reservation(Model model, @RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam Map<String, Object> paramMap // 파라미터 전부 다 담겨있음
			, @SessionAttribute("loginUser") User loginUser) {

		String key = (String) paramMap.get("key");

		// 임시로 세션에 값 가져오기 위해서 첫번째 페이지에서 세션 불러오기
		int userNo = loginUser.getUserNo();
		Owner loginOwner = service.getOwner(userNo);
		model.addAttribute("owner", loginOwner);

		// 예약리스트 조회
		int accNo = loginOwner.getAccNo();

		// 예약리스트 조회 조회 서비스 호출
		if (paramMap.get("key") == null) {

			Map<String, Object> map = service.getAccReservationList(accNo, cp);
			model.addAttribute("map", map);

		} else {

			paramMap.put("accNo", accNo);
			Map<String, Object> map = service.getTodayList(accNo, cp, paramMap);
			model.addAttribute("map", map);

		}

		return "ownerPage/owner-RESV-List";
	}

	// 객실 관리
	@GetMapping("/rooms")
	public String rooms(Model model, @RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam Map<String, Object> paramMap // 파라미터 전부 다 담겨있음
			, @SessionAttribute("loginUser") User loginUser) {

		// 임시로 세션에 값 가져오기 위해서 첫번째 페이지에서 세션 불러오기
		int userNo = loginUser.getUserNo();
		Owner loginOwner = service.getOwner(userNo);
		model.addAttribute("owner", loginOwner);

		int accNo = loginOwner.getAccNo();

		Map<String, Object> map = service.getRoomList(accNo, cp);
		model.addAttribute("map", map);

		return "ownerPage/owner-rooms";

	}

	// insertRooms
	@GetMapping("/insertRooms")
	public String inputRoomPage(Model model, @SessionAttribute("loginUser") User loginUser) {

		// 임시로 세션에 값 가져오기 위해서 첫번째 페이지에서 세션 불러오기
		int userNo = loginUser.getUserNo();
		Owner loginOwner = service.getOwner(userNo);
		model.addAttribute("owner", loginOwner);

		return "ownerPage/owner-rooms-insert";
	}

	// 차트
	@GetMapping("/stats")
	public String stats(Model model, @SessionAttribute("loginUser") User loginUser) {

		// 임시로 세션에 값 가져오기 위해서 첫번째 페이지에서 세션 불러오기
		int userNo = loginUser.getUserNo();
		Owner loginOwner = service.getOwner(userNo);
		model.addAttribute("owner", loginOwner);

		return "ownerPage/owner-stats";
	}

//	---------------------------------------------------- 

	// --계좌번호 변경(info)
	@PutMapping("/updateAccount")
	@ResponseBody
	public int update(@RequestBody Owner accountOwner, @SessionAttribute("owner") Owner owner, Model model //
	) {

		int userNo = owner.getUserNo();

		accountOwner.setUserNo(userNo);

		int result = service.updateAccount(accountOwner);

		if (result > 0) {
			Owner loginOwner = service.getOwner(userNo);
			model.addAttribute("owner", loginOwner);
		}

		return result;

	}

	// 회원 정보 수정
	@PostMapping("/info")
	public String infoUpdate(String[] Address, Owner updateOwner, @SessionAttribute("owner") Owner loginOwner,
			RedirectAttributes ra) {

		String addr = String.join("^^^", Address);
		updateOwner.setAccAddr(addr);

		int result = service.infoUpdate(updateOwner);

		String message = null;

		if (result > 0) { // 성공
			message = "회원 정보가 수정되었습니다.";

			loginOwner.setAccAddr(addr);
			loginOwner.setAccTel(updateOwner.getAccTel());
			loginOwner.setAccStFl(updateOwner.getAccStFl());

		} else { // 실패
			message = "회원 정보 수정 실패.";
		}

		ra.addFlashAttribute("message", message);

		return "redirect:info";

	}

	// 프로필 이미지 수정
	@PostMapping("/accProfile")
	@ResponseBody
	public int updateProfile(@RequestParam("AccProfileImage") MultipartFile accProfileImage // 업로드 파일
			, @SessionAttribute("owner") Owner owner, RedirectAttributes ra // 리다이렉트 시 메세지 전달
			, HttpSession session // 세션 객체
			, ACCImageOwner accImage, Model model) throws IllegalStateException, IOException {

		// 웹 접근 경로
		String webPath = "/resources/images/acc/";

		String filePath = session.getServletContext().getRealPath(webPath);

		int accNo = owner.getAccNo();

		accImage.setAccNo(accNo);

		// 프로필 이미지 수정 서비스 호출
		int result = service.accProfile(accProfileImage, webPath, filePath, accImage);

		String message = null;
		if (result > 0) {
			message = "대표 이미지가 변경되었습니다.";

		} else {
			message = "대표 이미지 변경 실패";
		}

		ra.addFlashAttribute("message", message);

		int userNo = owner.getUserNo();
		Owner loginOwner = service.getOwner(userNo);
		model.addAttribute("owner", loginOwner);

		return result;

	}

	// accImg 삭제
	@ResponseBody
	@DeleteMapping("/deleteAccImg")
	public int deleteAccImg(@RequestBody String accImgNo, @SessionAttribute("owner") Owner owner, Model model,
			RedirectAttributes ra) {
		// 문자열을 int로 변환
		int imgNoFromAcc = Integer.parseInt(accImgNo);
		int accNo = owner.getAccNo();
		ACCImageOwner deleteImg = new ACCImageOwner();

		deleteImg.setAccNo(accNo);
		deleteImg.setAccImgNo(imgNoFromAcc);

		int result = service.deleteAccImg(deleteImg);

		String message = null;
		if (result > 0) {

			int userNo = owner.getUserNo();
			Owner loginOwner = service.getOwner(userNo);
			model.addAttribute("owner", loginOwner);

			message = "이미지가 삭제되었습니다.";
		} else {
			message = "이미지 삭제 실패하였습니다.";
		}

		ra.addFlashAttribute("message", message);

		return result;
	}

	// acc이미지 추가
	@PostMapping("/insertAccImg")
	@ResponseBody
	public int insertAccImg(@RequestParam("accImg") MultipartFile accImg // 업로드 파일
			, @SessionAttribute("owner") Owner owner, RedirectAttributes ra // 리다이렉트 시 메세지 전달
			, HttpSession session // 세션 객체
			, ACCImageOwner accImage, Model model) throws IllegalStateException, IOException {

		// 웹 접근 경로
		String webPath = "/resources/images/acc/";

		String filePath = session.getServletContext().getRealPath(webPath);

		int accNo = owner.getAccNo();

		accImage.setAccNo(accNo);

		// 프로필 이미지 수정 서비스 호출
		int result = service.insertAccImg(accImg, webPath, filePath, accImage);

		String message = null;
		if (result > 0) {
			message = "대표 이미지가 변경되었습니다.";

		} else {
			message = "대표 이미지 변경 실패";
		}

		ra.addFlashAttribute("message", message);

		int userNo = owner.getUserNo();
		Owner loginOwner = service.getOwner(userNo);
		model.addAttribute("owner", loginOwner);

		return result;
	}

	// 객실 관리
	@PutMapping("/updateRoom")
	@ResponseBody
	public int updateRoom(@RequestBody ACCRoomsOwner ACCRoomsOwner) {

		return service.updateRoom(ACCRoomsOwner);
	}

	@PostMapping("/insertRooms")
	@ResponseBody
	public int insertRooms(@RequestBody ACCRoomsOwner aCCRoomsOwner, @SessionAttribute("owner") Owner owner) {

		aCCRoomsOwner.setAccNo(owner.getAccNo());

		return service.insertRooms(aCCRoomsOwner);
	}

	// 객실 코드
	@DeleteMapping("/deleteRoom")
	@ResponseBody
	public int deleteRoom(@RequestBody int accCode) {

		return service.deleteRoom(accCode);
	}
	
	
	// 차트 데이터 가져오기
	@PostMapping("/getStatsData")
	@ResponseBody
	public List<ACCOwnerStats> getStatsData(Owner accNo) {
		
		List<ACCOwnerStats> statsList = service.getStatsData(accNo);
//		System.out.println(statsList);
		
		return statsList;
	}

}
