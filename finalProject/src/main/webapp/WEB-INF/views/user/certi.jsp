<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="randomNum" value="${map.randomNum}" />
<c:set var="memberNo" value="${map.memberNo}" />
<c:set var="check" value="${map.check}" />

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/user/find.css">
    <title>인증번호 조회</title>
</head>
<body>

    <main>

        <h1>계정 찾기</h1>

        <section class="findContainer">
            <div id="idContainer"><a href="findId">아이디</a></div>            
            <div id="pwContainer"><a href="findPw">비밀번호</a></div>              
        </section>

        <section class="findComment">
            <!-- ${randomNum} -->
            <p>
    
                시간 안에 입력하세요.
                <h3 id="certiMessage">3:00</h3>
                
            </p>
            
            <div class="errMsg">
                
            </div>    
        </section>
        
  
        <form id="certiFrm" action="/check" method="post">
            <input type="text" placeholder="인증번호" id="checkCer" name="checkCer">
            <%-- 아이디/비밀번호  --%>
            <input type="hidden" name="checkFrm" value="${check}">
            <%-- memberNo 보내기 --%>
            <input type="hidden" name="memberNo" value="${memberNo}">
            <button class="findbtn">인증번호 확인</button>
        </form>


    </main>

    <script>
        const randomNum = "${randomNum}";
        const check ="${check}"
    </script>
     <script src="/resources/js/user/find.js"></script>
</body>
</html>