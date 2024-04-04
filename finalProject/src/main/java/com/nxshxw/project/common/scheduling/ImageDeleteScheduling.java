package com.nxshxw.project.common.scheduling;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.nxshxw.project.board.model.service.BoardService;

@Component // @Controller, @Service, @Repository의 부모 어노테이션
// Bean 등록을 하겠다고 명시하는 어노테이션
public class ImageDeleteScheduling {

	@Autowired
	private ServletContext servletContext;
	
	@Autowired
	private BoardService service;
//	@Scheduled(fixedDelay = 10000) // ms 단위
	// 일(3초) -> 10초 대기 -> 일(3초) -> 10초 대기
//	@Scheduled(fixedRate = 10000)
	// 일(초)
	// 대기(10초)
//	cron="초 분 시 일 월 요일 [년도]"
	//@Scheduled(cron="0,30 * * * * *") // 매 분 0초, 30초 마다
	@Scheduled(cron= "0 0 * * * *")// 매 정시
	public void test() {
//		System.out.println("스케쥴러가 일정시간마다 자동으로 출력");
		
		System.out.println("-----------------------------게시판 DB, 서버 불일치 파일 제거----------------------");
		
		// 서버에 저장된 파일 목록을 조회해서
		// DB에 저장된 파일 목록과 비교하여
		// 매칭되지 않는 서버 파일 제거
		
		// 1) 서버에 저장된 파일 목록 조회
		// -> application 객체를 이용해서
		// /resources/images/board의 실제 서버 경로를 얻어옴
		String filePath = servletContext.getRealPath("/resources/images/board");
		System.out.println("filePath" + filePath);
		// 2) filePath에 저장된 모든 파일 목록 읽어오기
		File path = new File(filePath);
		File[] imageArr = path.listFiles();
		
		// 배열 -> List로 변환
		List<File> serverImageList = Arrays.asList(imageArr);
		
		// 3) DB 파일 목록 조회
		List<String> dbImageList = service.selectBoardImageList();
		
		System.out.println("serverImageList : "+serverImageList);
		System.out.println("dbimge : "+dbImageList);
		// 4) 서버에 파일 목록이 있을 경우에 비교 시작
		if(!serverImageList.isEmpty() ) {
			// 5) 서버 파일 목록을 순차접근
			for(File server : serverImageList) {
				
				// 6) 서버에 존재하는 파일이
				// DB(dbImageList)에 없다면 삭제
//				String [] temp = server.toString().split("\\\\");
//				String s = temp[temp.length-1];
//				System.out.println(server.getName());
				
				// List.indexOf(객체) = 객체가 List에 있으면 해당 인덱스 반환
				//					   없으면 -1 반환
				
				if(dbImageList.indexOf(server.getName()) == -1) {
					// db파일 목록       서버파일이름
					System.out.println(server.getName()+" 삭제");
					server.delete(); // File.delete() : 파일 삭제
				}
			}// for문 종료
			System.out.println("-----------이미지 파일 삭제 스케쥴러 종료--------------");
		}
		
	}
}
