package com.nxshxw.project.train.model.service;

import java.util.List;
import java.util.Map;

public interface TrainService {

	List<String> selectSeats(Map<String, String> paramMap);

}
