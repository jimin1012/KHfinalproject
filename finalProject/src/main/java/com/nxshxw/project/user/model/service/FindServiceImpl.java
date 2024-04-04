package com.nxshxw.project.user.model.service;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Map;
import java.util.Properties;

import javax.activation.CommandMap;
import javax.activation.MailcapCommandMap;
import javax.mail.Authenticator;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeMessage.RecipientType;





import com.nxshxw.project.user.model.dao.FindDAO;

@Service
public class FindServiceImpl implements FindService{
	
	@Autowired 
	private FindDAO dao;
	

	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	
	
	final DefaultMessageService messageService;
	
	
    public FindServiceImpl() {
        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
    	this.messageService = NurigoApp.INSTANCE.initialize("NCSGNNU1KNFWBJN5", "UPTU5IITQJTCD6JGRVOYURZ0IADQPUCP", "https://api.coolsms.co.kr");
    	
    }
	
	   // 휴대폰 인증 (일치 휴대폰 번호 조회
		@Override
		public int selectPhoneNum(String phoneNum) {
			
			// 1. phoneNum으로 가입한 회원 있는지 확인
			int result = dao.selectPhoneNum(phoneNum);
			
			// 2. 가입한 회원 있다면 해당 회원 userNo 조회
			if(result > 0) {
				result = dao.selectUserNo(phoneNum);
			}
			
			return result;
		}


		@Override
		public void sendMessage(String randomNum, String phoneNum) {
			Message message = new Message();
			
			 message.setFrom("01065003716");
		     message.setTo(phoneNum);
		     message.setText("[NXSHXW] 인증 번호 : " + randomNum);
			
		     SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
		     System.out.println(response);
		}

	@Override
	public String selectId(int memberNo) {
		return dao.selectId(memberNo);
	}  

	
	// 이메일

	@Override
	public int selectEmail(String emailInput) {
		// 1. phoneNum으로 가입한 회원 있는지 확인
		int result =  dao.selectEmail(emailInput);
		
		// 2. 가입한 회원 있다면 해당 회원 userNo 조회
		if(result > 0) {
			result = dao.selectUserNo2(emailInput);
		}
		
		return result;
	}

	@Override
	public void sendEmail(String emailInput, String authCode) {
		

		
		
		final String bodyEncoding = "UTF-8"; //콘텐츠 인코딩

		String subject = "[NOSHOW] 인증 코드 : "; // 이메일 제목
		String fromEmail = "svlmin77@gmail.com"; // 이메일을 보낼 이메일(지금은 지민아이디)
		String fromUsername = "NOSHOWCOMPANY";
		String toEmail = emailInput; // 콤마(,)로 여러개 나열

		final String username = "iamjimin0722@gmail.com";         
		final String password = "ondd bchs cgyl logl";

		String portNo = "587"; // 587 또는 465;


		// 대문자만 나오도록
		// 이미지 때문에 url 따옴
//			StringBuffer url = req.getRequestURL();
//			String http = (String) url.subSequence(0, url.indexOf(req.getContextPath()));
		
		// 메일에 출력할 텍스트
		StringBuffer sb = new StringBuffer();
		
		sb.append(
				 "    <div class=\"mainContainer\" style=\"color: rgb(0, 67, 112);"
				+ "    border: 3px solid rgb(0, 67, 112);"
				+ "    width: 450px;"
				+ "    height: 600px;"
				+ "    text-align: center;\">"
				+ "        <div class=\"logo\" style=\"font-size: 20px;\"><h1>NXSHXW</h1></div>"
				+ "        <div class=\"co1\" style=\"font-size: 17px;"
				+ "    font-weight: bold;\">NXSHXW 인증코드 입니다</div>"
				+ "        <div class=\"Authkey\" style=\"margin: 35px auto;"
				+ "    height: 120px;"
				+ "    width: 320px;"
				+ "    border: 4px solid rgb(0, 67, 112);"
				+ "    border-radius: 5px;"
				+ "    padding-top: 25px;"
				+ "    color: white;"
				+ "    background-color: rgb(0, 67, 112);\"><h1 style=\"letter-spacing: 5px; font-size: 37px;\">"+ authCode +"</h1></div>"
				+ "        <div class=\"co2\" style=\"height: 90px;"
				+ "    padding-top: 60px;\">본 메일은 이용안내 알림을 위해 발송되었습니다.</div>"
				+ "        <div class=\"co3\" style=\"font-weight: bold;"
				+ "    height: 45px;\">개인정보 | 처리방침고객지원서비스 | 약관</div>"
				+ "        <div class=\"info\" style=\"font-size: 14px;\">Copyright © 2023-2024 Web site developed by<br> NXSHXW</div>"
				+ "    </div>");

		String html = sb.toString();

		// 메일 옵션 설정
		Properties props = new Properties();    
		props.put("mail.transport.protocol", "smtp");
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.port", portNo);
		props.put("mail.smtp.auth", "true");

		// 따로 추가한 부분
		props.put("mail.debug", "true");
		props.put("mail.smtp.starttls.required","true");
		props.put("mail.smtp.ssl.protocols", "TLSv1.2");
		props.put("mail.smtp.starttls.enable", "true");
		
		props.put("mail.smtp.quitwait", "false");

		try {
			// 메일 서버  인증 계정 설정
			Authenticator auth = new Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(username, password);
				}
			};

			// 메일 세션 생성
			Session session = Session.getInstance(props, auth);

			// 메일 송/수신 옵션 설정
			javax.mail.Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(fromEmail, fromUsername));
			message.setRecipients(RecipientType.TO, InternetAddress.parse(toEmail, false));
			message.setSubject(subject+authCode);
			message.setSentDate(new Date());

			// 메일 콘텐츠 설정
			Multipart mParts = new MimeMultipart();
			MimeBodyPart mTextPart = new MimeBodyPart();
			MimeBodyPart mFilePart = null;

			// 메일 콘텐츠 - 내용
			mTextPart.setText(html, bodyEncoding, "html");
			mParts.addBodyPart(mTextPart);

			// 메일 콘텐츠 설정
			message.setContent(mParts);

			// MIME 타입 설정
			MailcapCommandMap MailcapCmdMap = (MailcapCommandMap) CommandMap.getDefaultCommandMap();
			MailcapCmdMap.addMailcap("text/html;; x-java-content-handler=com.sun.mail.handlers.text_html");
			MailcapCmdMap.addMailcap("text/xml;; x-java-content-handler=com.sun.mail.handlers.text_xml");
			MailcapCmdMap.addMailcap("text/plain;; x-java-content-handler=com.sun.mail.handlers.text_plain");
			MailcapCmdMap.addMailcap("multipart/*;; x-java-content-handler=com.sun.mail.handlers.multipart_mixed");
			MailcapCmdMap.addMailcap("message/rfc822;; x-java-content-handler=com.sun.mail.handlers.message_rfc822");
			CommandMap.setDefaultCommandMap(MailcapCmdMap);

			// 메일 발송
			message.saveChanges();
			Transport.send( message );
			session.setDebug(true);


			// ajax로 인증코드 전송
//				resp.getWriter().print(AuthenticationCode);
			
		} catch ( Exception e ) {
			e.printStackTrace();
//				req.getRequestDispatcher("/WEB-INF/views/boarder/error.jsp").forward(req, resp);
		}
		
	}

	@Transactional(rollbackFor = Exception.class)
	@Override
	public int changePw(Map<String, Object> paramMap) {

		String newPw = bcrypt.encode((String) paramMap.get("newPwInput")); 
		
		// String newPw = (String) paramMap.get("newPwInput");
		String memberNoString = (String) paramMap.get("memberNo");
		int memberNo = Integer.parseInt(memberNoString);
		
		return dao.changePw(newPw, memberNo);
	}      
	
		
			   
		
		
	

		
}
