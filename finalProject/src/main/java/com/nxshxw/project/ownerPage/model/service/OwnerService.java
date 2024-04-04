package com.nxshxw.project.ownerPage.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.nxshxw.project.ownerPage.model.dto.ACCImageOwner;
import com.nxshxw.project.ownerPage.model.dto.ACCOwnerStats;
import com.nxshxw.project.ownerPage.model.dto.ACCResnOwner;
import com.nxshxw.project.ownerPage.model.dto.ACCRoomsOwner;
import com.nxshxw.project.ownerPage.model.dto.Owner;

public interface OwnerService {

	Owner getOwner(int userNo);

	int updateAccount(Owner accountOwner);

	int infoUpdate(Owner updateOwner);

	int accProfile(MultipartFile accProfileImage, String webPath, String filePath, ACCImageOwner accImage)
			throws IllegalStateException, IOException;

	// 이미지 삭제
	int deleteAccImg(ACCImageOwner deleteImg);

	// 추가 숙소 이미지 기입
	int insertAccImg(MultipartFile accImg, String webPath, String filePath, ACCImageOwner accImage)throws IllegalStateException, IOException;

	Map<String, Object> getAccReservationList(int accNo, int cp);

	Map<String, Object> getTodayList(int accNo, int cp, Map<String, Object> paramMap);

	int updateRoom(ACCRoomsOwner aCCRoomsOwner);

	Map<String, Object> getRoomList(int accNo, int cp);

	int insertRooms(ACCRoomsOwner aCCRoomsOwner);

	int deleteRoom(int accCode);

	List<ACCOwnerStats> getStatsData(Owner accNo);




}
