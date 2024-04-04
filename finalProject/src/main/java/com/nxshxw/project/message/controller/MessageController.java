package com.nxshxw.project.message.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nxshxw.project.message.model.dto.Message;
import com.nxshxw.project.message.model.service.MessageService;

@Controller
public class MessageController {

	@Autowired
	private MessageService service;
	
	// 쪽지 전송
	@PostMapping(value = "/message/sendMessage", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public int sendMessage(@RequestBody Message message) {
		return service.sendMessage(message);
	}
	
	// 쪽지 삭제
	@PutMapping(value = "/message/deleteMessage", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public int deleteMessage(@RequestBody int[] deleteArr) {
		return service.deleteMessage(deleteArr);
	}
}
