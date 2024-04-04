<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/user/findId.css">
    <title>아이디 찾기</title>
</head>
<body>

    <main>

        <h1>계정 찾기</h1>

        <section class="findContainer">
            <div><a href="findId">아이디</a></div>            
            <div><a href="findPw">비밀번호</a></div>               
        </section>

        <div class="comment">
            <h3>아이디를 찾았습니다.</h3>
        </div>    

        <section class="findComment">
            
            <p><br>
                <h3 id="resultId">${memberId}</h3>
                
            </p>
            
        </section>
        
        <!-- <form id="findId" >
            
            <input type="text" placeholder="이메일" id="inputEmail" name="emailInput">
            <button class="findbtn">이메일 인증</button>
        </form> -->

        <div class="btnArea">
            <!-- <input type="text" placeholder="인증번호" id="checkNum" name="checkNumInput"> -->
            <button class="findbtn" onclick="location.href='/login'" id="gotoLogin">로그인하기</button>
        </div>


    </main>
    <script>
        const memberId = "${memberId}";
    </script>
    <script src="/resources/js/user/find.js"></script>

</body>
</html>