package com.nxshxw.project.reservation.model.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.ProtocolException;

public interface PaymentService {

	String getToken(String apiKey, String secretKey) throws IOException;

	void reservationCancle(String apikey, String secretkey, String token, String reservUID) throws IOException;

	
}
