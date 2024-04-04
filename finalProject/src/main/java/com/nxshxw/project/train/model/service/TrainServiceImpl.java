package com.nxshxw.project.train.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nxshxw.project.train.model.dao.TrainDAO;

@Service
public class TrainServiceImpl implements TrainService{

	@Autowired
	TrainDAO dao;
	
	
	
	@Override
	public List<String> selectSeats(Map<String, String> paramMap) {
		return dao.selectSeats(paramMap);
		
	}
	
}
