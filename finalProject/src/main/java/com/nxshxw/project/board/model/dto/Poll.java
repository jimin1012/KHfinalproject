package com.nxshxw.project.board.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Poll {
	private int boardNo;
	private String pollTitle;
	private String pollEndDate;
	private int pollSt;
}
