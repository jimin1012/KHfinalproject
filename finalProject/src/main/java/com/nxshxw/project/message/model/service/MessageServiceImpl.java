package com.nxshxw.project.message.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nxshxw.project.common.utility.Util;
import com.nxshxw.project.message.model.dao.MessageDAO;
import com.nxshxw.project.message.model.dto.Message;

@Service
public class MessageServiceImpl implements MessageService{

	@Autowired
	private MessageDAO dao;

	// 쪽지 전송
	@Override
	public int sendMessage(Message message) {
		
		message.setMessageContent(Util.XSSHandling(message.getMessageContent()));
		message.setMessageContent(Util.newLineHandling(message.getMessageContent()));
		return dao.sendMessage(message);
	}

	// 쪽지 삭제
	@Override
	public int deleteMessage(int[] deleteArr) {
		return dao.deleteMessage(deleteArr);
	}
	
	
	
	
}
