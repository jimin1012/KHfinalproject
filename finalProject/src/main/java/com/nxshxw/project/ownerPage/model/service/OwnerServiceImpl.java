package com.nxshxw.project.ownerPage.model.service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.nxshxw.project.common.utility.Pagination;
import com.nxshxw.project.ownerPage.model.dao.OwnerDAO;
import com.nxshxw.project.ownerPage.model.dto.ACCGradeOwner;
import com.nxshxw.project.ownerPage.model.dto.ACCImageOwner;
import com.nxshxw.project.ownerPage.model.dto.ACCOwnerStats;
import com.nxshxw.project.ownerPage.model.dto.ACCResnOwner;
import com.nxshxw.project.ownerPage.model.dto.ACCRoomsOwner;
import com.nxshxw.project.ownerPage.model.dto.Owner;

@Service
public class OwnerServiceImpl implements OwnerService {

	@Autowired
	private OwnerDAO dao;

	// loginOwner 정보 가져오기
	@Override
	public Owner getOwner(int userNo) {

		// 1. 유저 테이블 조회해서 값 필요한 값 가져오기
		// 2. 사업자 테이블 조회해서 필요한 값 가져오기
		// 3. 숙소 테이블 조회 숙소 번호 가져오기
		Owner owner = dao.getOwnerInfo(userNo);

		// 4. 숙소 grade 테이블 조회
		List<ACCGradeOwner> rooms = dao.getRooms(owner.getAccNo());

		// 리스트의 accType 값을 조건에 따라 업데이트
		for (ACCGradeOwner item : rooms) {
			switch (item.getAccType()) {
			case "일반":
				item.setAccType("normal");
				break;
			case "스위트":
				item.setAccType("sweet");
				break;
			case "디럭스":
				item.setAccType("deluxe");
				break;
			}
		}

		owner.setAccGradeOwners(rooms);

		// 숙소 이미지 리스트 테이블조회
		List<ACCImageOwner> imgs = dao.getImgs(owner.getAccNo());

		owner.setACCImageOwners(imgs);

		return owner;

	}

	// 계좌 변경
	@Transactional
	@Override
	public int updateAccount(Owner accountOwner) {
		return dao.updateAccount(accountOwner);
	}

	// 정보 변경
	@Transactional
	@Override
	public int infoUpdate(Owner updateOwner) {
		return dao.infoUpdate(updateOwner);
	}

	// 파일명 변경 메소드
	public static String fileRename(String originFileName) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		String date = sdf.format(new java.util.Date(System.currentTimeMillis()));

		int ranNum = (int) (Math.random() * 100000); // 5자리 랜덤 숫자 생성

		String ownerPage = "ownerPage";

		String str = "_" + String.format("%05d", ranNum);

		String ext = originFileName.substring(originFileName.lastIndexOf("."));

		return ownerPage + date + str + ext;
	}

	// 프로필 이미지 acc
	@Transactional
	@Override
	public int accProfile(MultipartFile accProfileImage, String webPath, String filePath, ACCImageOwner accImage)
			throws IllegalStateException, IOException {

		// 0. 프로필 이미지가 있는지 없는지 .
		int checkNotNull = dao.checkNotNull(accImage);

		// 프로필 이미지 변경 실패 대비
		String temp = accImage.getAccImgPath(); // 이전 이미지 저장

		String rename = null; // 변경 이름 저장 변수

		if (accProfileImage.getSize() > 0) { // 업로드된 이미지가 있을 경우

			// 1) 파일 이름 변경
			rename = fileRename(accProfileImage.getOriginalFilename());

			// 2) 바뀐 이름 accImage에 세팅
			accImage.setAccImgPath(webPath);
			accImage.setAccImgRename(rename);
			accImage.setAccImgOriginal(accProfileImage.getOriginalFilename());

		} else { // 없는 경우 (x버튼)

			accImage.setAccImgPath(null);
			// 세션 이미지를 null로 변경해서 삭제

		}

		int result = 0;

		if (checkNotNull > 0) {

			// 프로필 이미지 수정 DAO 메소드 호출
			result = dao.updateProfile(accImage);
		} else {
			result = dao.insertProfile(accImage);
		}

		if (result > 0) { // 성공
			// 새 이미지가 업로드 된 경우
			if (rename != null) {

				accProfileImage.transferTo(new File(filePath + rename));
			}

		} else { // 실패

			// 이전 이미지로 프로필 다시 세팅
			accImage.setAccImgPath(temp);

		}

		return result;
	}

	// acc이미지 삭제
	@Transactional
	@Override
	public int deleteAccImg(ACCImageOwner deleteImg) {
		return dao.deleteAccImg(deleteImg);
	}

	// 숙소acc 이미지 추가
	@Transactional
	@Override
	public int insertAccImg(MultipartFile accInsertImg, String webPath, String filePath, ACCImageOwner accImage)
			throws IllegalStateException, IOException {

		String rename = null; // 변경 이름 저장 변수

		accInsertImg.getOriginalFilename();

		if (accInsertImg.getSize() > 0) { // 업로드된 이미지가 있을 경우

			// 1) 파일 이름 변경
			rename = fileRename(accInsertImg.getOriginalFilename());

			// 2) 바뀐 이름 accImage에 세팅
			accImage.setAccImgPath(webPath);
			accImage.setAccImgRename(rename);
			accImage.setAccImgOriginal(accInsertImg.getOriginalFilename());

		} else { // 없는 경우 (x버튼)

			accImage.setAccImgPath(null);
			// 세션 이미지를 null로 변경해서 삭제

		}

		int result = dao.insertAccImg(accImage);

		if (result > 0) { // 성공

			// 새 이미지가 업로드 된 경우
			if (rename != null) {

				// 이미지 서버에 저장
				accInsertImg.transferTo(new File(filePath + rename));
			}

		}

		return result;
	}

	// 숙소 예약 리스트
	@Override
	public Map<String, Object> getAccReservationList(int accNo, int cp) {

		Map<String, Object> paramMap = new HashMap<String, Object>();
		String today = "today";
		paramMap.put("key", today);
		paramMap.put("accNo", accNo);
		int todayListCount = dao.getTodayListCount(paramMap);

		int listCount = dao.getListCount(accNo);

		Pagination pagination = new Pagination(cp, listCount);

		List<ACCResnOwner> ReservationList = dao.selectReservationList(pagination, accNo);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("ReservationList", ReservationList);
		map.put("todayListCount", todayListCount);

		return map;
	}

	@Override
	public Map<String, Object> getTodayList(int accNo, int cp, Map<String, Object> paramMap) {
		Map<String, Object> map = new HashMap<String, Object>();

		int listCount = dao.getTodayListCount(paramMap);
		map.put("todayListCount", listCount);

		Pagination pagination = new Pagination(cp, listCount);

		List<ACCResnOwner> todayList = dao.getTodayList(pagination, paramMap);
		map.put("pagination", pagination);
		map.put("ReservationList", todayList);

		return map;
	}

	// 객실 수정
	@Override
	public int updateRoom(ACCRoomsOwner aCCRoomsOwner) {
		return dao.updateRoom(aCCRoomsOwner);
	}

	// 방 목록 조회
	@Override
	public Map<String, Object> getRoomList(int accNo, int cp) {

		int listCount = dao.getRoomCount(accNo);

		Pagination pagination = new Pagination(cp, listCount);

		List<ACCRoomsOwner> roomList = dao.getRoomList(pagination, accNo);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pagination", pagination);
		map.put("roomList", roomList);

		return map;

	}

	@Override
	public int insertRooms(ACCRoomsOwner aCCRoomsOwner) {
		int result = 0;

		int count = Integer.parseInt(aCCRoomsOwner.getRoomCount());
		
		for(int i=0; i<count; i++) {
			
			result += dao.insertRooms(aCCRoomsOwner);
			
		}


		return result;

	}

	@Override
	public int deleteRoom(int accCode) {
		
		int result = 0;
		
		int count = dao.checkRESN(accCode);
		
		if(count>0) {
			result = 999;
		}else {
			result =  dao.deleteRoom(accCode);
		}
		
		return result;
	}

	// 차트 리스트
	@Override
	public List<ACCOwnerStats> getStatsData(Owner accNo) {
		
		
		return dao.getStatsData(accNo);
	}

}
