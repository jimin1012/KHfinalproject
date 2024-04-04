package com.nxshxw.project.reservation.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nxshxw.project.reservation.model.dto.Reservation;
import com.nxshxw.project.reservation.model.service.PaymentService;
import com.nxshxw.project.reservation.model.service.ReservationService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

@Controller
public class PaymentController {
	private  IamportClient iamportClient;
	@Autowired
	private PaymentService service;
	
	@Autowired 
	private ReservationService resService;
	
	private static final String apiKey = "0354354837234433";
	private static final String secretKey = "eH8FgCoYpG65OMYGmUXGskfrHxpEY8lLID9UaquWXsIuocy86LPAzrvHxRvF2puAXjp6c053pnDjdpLT";
	public PaymentController() {
		this.iamportClient = new IamportClient(apiKey,
				secretKey);
	}

	// 결제 검증 컨트롤러
	
	@PostMapping("/verifyIamport")
	@ResponseBody
	public IamportResponse<Payment> paymentByImpUid(@RequestBody Map<String, Object> map)
			throws IamportResponseException, IOException {
		
		System.out.println("paymentByImpUid");
		System.out.println("imp_uid : "+map.get("imp_uid"));
		String imp_uid = (String) map.get("imp_uid");
		return iamportClient.paymentByImpUid(imp_uid);
	}
	
	// 결제취소 컨트롤러
	@ResponseBody
	@PostMapping("/orderCancle")
	public int reservationCancle(@RequestBody Reservation reservation) throws IOException {
		
		System.out.println("취소옴"+reservation.getReservUID());
		
		String token = service.getToken(apiKey, secretKey);
		
		service.reservationCancle(apiKey,secretKey,token,reservation.getReservUID());
		
		
		// 결제취소 했으니 예약도 취소상태로 바꿔줌
		
		System.out.println("zzz :"+reservation);
		System.out.println("res "+reservation.getReservUID());
		int result =0;
		if(reservation.getReservationNo() != 0) {
			result = resService.reservationCancle(reservation.getReservationNo());
		}
		
		
		System.out.println("result + "+result);
		return result;
	}

	
	
	
	
}
