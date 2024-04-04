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

@WebFilter(filterName = "ownerPageFilter", urlPatterns = { "/ownerPage/*" })
public class OwnerPageFilter implements Filter {

	public void init(FilterConfig fConfig) throws ServletException {
		System.out.println("--- 사업자 페이지 필터 생성 ---");
	}

	public void destroy() {
		System.out.println("--- 사업자 페이지 필터 파괴 ---");
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		HttpSession session = req.getSession();

		User loginUser = (User) session.getAttribute("loginUser");
		if (loginUser == null || loginUser.getAuthority() != 2) {
			resp.sendRedirect("/");
			session.setAttribute("message", "사업자 회원으로 로그인 후 접속하실 수 있습니다."); // 메시지 설정
			return;
		}

		chain.doFilter(request, response); // 다음 필터로 이동 또는 서블릿 요청 처리
	}

}
