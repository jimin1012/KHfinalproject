package com.nxshxw.project.ownerPage.model.dto;

import java.sql.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Owner {
	
	// ACCGradeOwner 인스턴스  담을 리스트
    private List<ACCGradeOwner> accGradeOwners; 
    
	// 숙소 이미지 주소 list
    private List<ACCImageOwner> ACCImageOwners;
    
    
    // 숙소
    private int accNo;
	private String accName;
	private String accTel;
	private String accAddr;
	private char accStFl;
	private String accCategory;
	private Date openDate;
	
	private int totalRoomCount; // 총 객실 수
	// 객실 수
	private int standardRoom;
	private int deluxeRoom;
	private int sweetRoom;
	
    
	// 회원 
	private int userNo;
	private String userName;
	private String userBirthDate;
	private char userGender;
	private String userAddress;
	private String userId;
	
	private String userNickname;
	private String userTel;
	private String userEmail;
	private String enrollDate;
	private String profileImage;
	private String userDeleteFlag;
	private int authority;
	
	// 사업자
	private long bossNo;
	private String bossAccount;
	
	
    
    

}
