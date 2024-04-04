package com.nxshxw.project.common.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.nxshxw.project.common.aop.BeforeAspect;
import com.nxshxw.project.user.model.dto.User;

/**
 * Servlet Filter implementation class LoginStatusFilter
 */
@WebFilter(filterName="LoginStatusFilter", 
urlPatterns = {"/login"})
public class LoginStatusFilter implements Filter {

	public void init(FilterConfig fConfig) throws ServletException {
		System.out.println("--- 로그인상태 확인 필터 생성 ---");
	}

	public void destroy() {
		System.out.println("--- 로그인상태 확인 필터 파괴 ---");
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse resp = (HttpServletResponse)response;
		
		HttpSession session = req.getSession();
		
		
		// 이미 로그인되어있는데 로그인페이지로 갈 이유가 없기 때문에 막아놈
		// 로그아웃하면 갈 수 있음
		if(session.getAttribute("loginUser") != null ) {
			resp.sendRedirect("/");
			return;
		}
		
		
		
		if("192.168.10.11".equals(BeforeAspect.getRemoteAddr(req))||"192.168.10.13".equals(BeforeAspect.getRemoteAddr(req))) {
     		resp.sendRedirect("/error");
     		return;
 		}
		
		chain.doFilter(request, response);
	}

}
