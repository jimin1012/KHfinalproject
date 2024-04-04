<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/user/find.css">
    <title>아이디 찾기</title>
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
                새 비밀번호를 입력하세요.
                

                    <h5>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</h5>
            
            </p>

        </section>

        <div class="errMsg" id="errMsg">
            <!-- 비밀번호가 유효하지 않습니다. -->
            <!-- 비밀번호가 일치하지 않습니다. -->
        </div>    
        
        <form action="/newPwC" method="POST" name="newPasswordFrm" id="newPasswordFrm" >
            <input type="text" placeholder="새 비밀번호" id="newPwInput" name="newPwInput">
            <input type="text" placeholder="비밀번호 확인" id="checkPwInput" name="checkPwInput">
            <input type="hidden" name="memberNo" value="${memberNo}">
            <button class="findbtn">확인</button>
        </form>



    </main>
    <script src="/resources/js/user/changePw.js"></script>
</body>
</html>