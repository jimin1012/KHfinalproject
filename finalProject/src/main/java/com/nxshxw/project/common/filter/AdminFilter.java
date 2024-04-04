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

import com.nxshxw.project.user.model.dto.User;

/**
 * Servlet Filter implementation class AdminFilter
 */


@WebFilter(filterName="AdminFilter", urlPatterns = {"/admin/*"})
public class AdminFilter implements Filter {

	
	public void init(FilterConfig fConfig) throws ServletException {
		System.out.println("--- 관리자 필터 생성 ---");
	}

	public void destroy() {
		System.out.println("--- 관리자 필터 파괴 ---");
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse resp = (HttpServletResponse)response;
		
		HttpSession session = req.getSession();
	
		User loginUser = (User)session.getAttribute("loginUser");
		if(loginUser == null||loginUser.getAuthority() != 3) {
			resp.sendRedirect("/");
			session.setAttribute("message", "관리자페이지입니다. ^오^ 관리자로 로그인하세요.");
			return;
		}
		
		chain.doFilter(request, response);
	}

	

}
