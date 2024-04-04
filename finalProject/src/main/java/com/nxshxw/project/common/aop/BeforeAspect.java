package com.nxshxw.project.common.aop;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Locale;

import javax.servlet.ServletOutputStream;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.nxshxw.project.user.model.dto.User;

import lombok.extern.slf4j.Slf4j;


@Component
@Aspect
@Slf4j
public class BeforeAspect {

	
	@Order(1) // 순서, 하나의 타겟에 대한 여러advice 수행 시 순서지정
	// 지정된 클래스.메소드에 작성된 @Pointcut() 어노테이션의 내용을 타겟으로 지정
	@Before("CommonPointcut.ServiceImplPointcut()") 
	public void beforeLog(JoinPoint jp) { // Advice(수행할코드)
		
	
		// 매개변수 JoinPoint : AOP의 부가 기능이 적용된 대상의
		//					 객체, 메소드, 파라미터 정보를 얻을 수 있게 해주는 객체
		
		// 대상 객체의 간단한 클래스명(패키지명 제외)
		String className = jp.getTarget().getClass().getSimpleName();
		
		// 메소드 선언부(== 메소드 시그니처)에서 메소드명만 얻어옴
		String methodName = jp.getSignature().getName();
		
		String str = "-----------------------------------------------------------\n";
		
		str += "[Start] : "+className+" - "+methodName+"()\n";
		// [Start] : MemberServiceImpl - login()
		
		// jp.getArgs() : 파라미터 묶음(배열)
		str += "[Parameter] :" +Arrays.toString(jp.getArgs()) + "\n";
	
		
		try {
	         // 접속자 IP 얻어오기
	         HttpServletRequest req = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
	         User loginUser = (User)req.getSession().getAttribute("loginUser");
	         
	         str += "[ip]" + getRemoteAddr(req);
	         
	         
	         if(loginUser != null) {
	            str += "(email:" + loginUser.getUserEmail() + ")";
	         }
	      }catch (Exception e) {
	         str += "[스프링 스케쥴러]";
	      }
		
		
//		System.out.println(str);
		log.info(str);

	}
	
	
	public static String getRemoteAddr(HttpServletRequest request) {

        String ip = null;

        ip = request.getHeader("X-Forwarded-For");

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("Proxy-Client-IP"); 
        } 

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("WL-Proxy-Client-IP"); 
        } 

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("HTTP_CLIENT_IP"); 
        } 

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("HTTP_X_FORWARDED_FOR"); 
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("X-Real-IP"); 
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("X-RealIP"); 
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("REMOTE_ADDR");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getRemoteAddr(); 
        }

      return ip;
   }
}
