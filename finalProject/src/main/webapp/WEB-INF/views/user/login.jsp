<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>로그인</title>
	<link rel="stylesheet" href="/resources/css/user/login-style.css">
	<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
 	<script src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" charset="utf-8"></script>

 
</head>
<body>
	<div class="wrap">
		<main>
			<div class="main-content">
				<div class="main-login">
					<h2>NXSHXW</h2>
				
					<form action="login" method="POST" name="login" class="login-form">
						<fieldset>
							<c:if test="${!empty message}">
							<div id="errorMsg">${message}</div>
							</c:if>
							<input type="text" name="userId" id="userId" placeholder="아이디">
							<input type="password" name="userPw" id="password" placeholder="비밀번호">
						</fieldset>
						<input type="hidden" name="snsState" id="snsState" value="N">
						<button id="login-btn" type="submit">로그인</button>
					</form>
				</div>
				<div class="main-option">
					<div>
						<span><a href="agree">회원가입</a></span>
						<span><a href="findId">아이디/비밀번호 찾기</a></span>
					</div>
				</div>
				<div class="sns-login">
					<div>
						<div class="line">
							<hr>
						</div>
						<span>다른 로그인 방식</span>
						<div class="line">
							<hr>
						</div>
					</div>
					<div>
						<div>
							<a href="javascript:kakaoLogin();" id="kakaoLogin"> 
								<img src="https://cdn.imweb.me/thumbnail/20220403/a8e484f2dfe39.png">
							</a>
							<div>kakao</div>
						</div>
						<div>
							<a href="javascript:void(0)" id="naverIdLogin_loginButton"> 
								<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQb93sjSI5hrWVQzD3NoQ1fU3M3xQtWPKACw&usqp=CAU">
							</a>
							<div>Naver</div>
						</div>

					</div>
				</div>
			</div>
		</main>
	</div>
	<script>
		const loginUser = "${loginUser}";
	</script>
	<script src="/resources/js/user/login.js"></script>
</body>
</html>