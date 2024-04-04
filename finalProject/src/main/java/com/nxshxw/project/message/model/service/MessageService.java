package com.nxshxw.project.message.model.service;

import java.util.List;
import java.util.Map;

import com.nxshxw.project.message.model.dto.Message;

public interface MessageService {

	/** 쪽지 전송
	 * @param message
	 * @return result
	 */
	int sendMessage(Message message);

	/** 쪽지 삭제
	 * @param paramMap
	 * @return result
	 */
	int deleteMessage( int[] deleteArr);

}
