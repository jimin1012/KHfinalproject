<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/user/find.css">
    <title>비밀번호 찾기</title>
</head>
<body>

    <main>

        <h1>계정 찾기</h1>

        <section class="findContainer">
            <div class="not"><a href="findId">아이디</a></div>            
            <div class="selected"><a href="findPw">비밀번호</a></div>           
        </section>

        <section class="findComment">

            <p>
                가입한 이메일을 입력해주세요. <br>
                이메일 본인인증을 통해<br>
                비밀번호를 변경합니다. <br>
    
                <!-- 시간 안에 입력하세요.
                <h3>3:00</h3> -->
                
            </p>
            
            <div class="errMsg">
                <!-- 일치하는 이메일이 없습니다. -->
            </div>    
        </section>
        
        <form class="findFrm" id="findPw" method="POST" action="/findPw">
            
            <input type="text" placeholder="이메일" id="inputEmail" name="emailInput">
            <button class="findbtn">이메일 인증</button>
        </form>

        <!-- <form id="findId" >
            <input type="text" placeholder="인증번호" id="checkNum" name="checkNumInput">
            <button class="findbtn">인증번호 확인</button>
        </form> -->


    </main>

    <c:if test="${!empty message}">
        <script>
            alert("${message}");
			
            // EL 작성시 scope를 지정하지 않으면
            // page -> rquest -> session -> application 순서로 검색하여
            // 일치하는 속성이 있으면 출력
        </script>
        <!-- message 1회 출력 후 session에서 제거 -->

        <c:remove var="message" />
    </c:if>

    
</body>
</html>