package com.nxshxw.project.board.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Option {
	private int OptionNo;
	private String OptionContent;
	private int BoardNo;
	private int MemberNo;
	private int OptionCount;
}
