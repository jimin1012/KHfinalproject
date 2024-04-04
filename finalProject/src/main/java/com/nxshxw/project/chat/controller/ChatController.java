package com.nxshxw.project.chat.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.nxshxw.project.chat.model.dto.ChatRoom;
import com.nxshxw.project.chat.model.dto.Chatting;
import com.nxshxw.project.chat.model.service.ChatService;
import com.nxshxw.project.user.model.dto.User;


@Controller
@RequestMapping("/chat")
public class ChatController {
	
	@Autowired
	private ChatService service;
	

	// 채팅방 입장 (회원)
	@GetMapping("/user") // 이따 userChatEnter로 주소 변경하기
	public String userChatEnter(@SessionAttribute("loginUser") User loginUser,
								Model model, RedirectAttributes rs) {
		
		String path = "";
		// 관리자는 이용 못함
		if(loginUser.getAuthority() == 3) {
			
			path = "redirect:/";
			rs.addFlashAttribute("message", "관리자는 해당 채팅을 이용할 수 없습니다. 관리자 페이지에서 이용해주세요.");
			
		} else {

			// 채팅 상대방(관리자)조회
			int targetNo = service.selectManagerNo(); 

			// 채팅방 조회
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("userNo", loginUser.getUserNo());
			map.put("targetNo", targetNo);

			int chatRoomNo = service.selectChatRoom(map);
			
			// 채팅방이 없으면 새로 생성
			if(chatRoomNo == 0) {
				chatRoomNo = service.createChatRoom(map);
			}
			
			// 채팅방 상태 조회
			String chatRoomStateFL = service.selectChatRoomStateFl(chatRoomNo);
			
			map.put("chatRoomNo", chatRoomNo);
			map.put("chatRoomStateFL", chatRoomStateFL);

			model.addAttribute("map", map);

			path = "chat-message/userChatRoom";
		}

		return path;
	}

	
	// 채팅 내역 조회
	@GetMapping(value = "/selectChat", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public List<Chatting> selectChatList(@RequestParam Map<String, Object> paramMap){
		return service.selectChatList(paramMap);
	}
	
	
	// 채팅방 입장시 보내는 웰컴 채팅
	@PostMapping("/sendWelcomeChat")
	@ResponseBody
	public int sendWelcomeChat(@RequestBody Chatting chat) {
		return service.insertChat(chat);
	}
	


	


	
	
	
}
