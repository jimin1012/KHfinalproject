<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- 왼쪽 사이드 메뉴 -->
<section class="left-side">
    <div class="side-title">
        <span id="side-title">마이페이지</span>
    </div>
    <div class="side-subTitle">
        <span id="side-subTitle">내 정보</span>
    </div>

    <ul class="list-group">
        <li><a href="/myPage/profile">프로필</a></li>

        <li> <a href="/myPage/info">내 정보</a> </li>

        <li> <a href="/myPage/changePw">비밀번호 변경</a> </li>

        <c:if test="${loginUser.authority == '1'}">
            <li> <a href="/changeAuthKeyAgree">사업자 회원전환</a> </li>
        </c:if>

    </ul>

    <div class="side-subTitle">
        <span id="side-subTitle">예약 정보</span>
    </div>
    <ul class="list-group">
        <li><a href="/myPage/purchaseDetails">구매내역</a></li>

        <li> <a href="/acc/wishListPage?userNo=${loginUser.userNo}">위시리스트</a> </li>
    </ul>

    <div class="side-subTitle">
        <span id="side-subTitle">내 활동</span>
    </div>
    <ul class="list-group">
        <li><a href="/myPage/myPost">내 게시글</a></li>

        <li> <a href="/myPage/myComment">내 댓글</a> </li>

        <li> <a href="/myPage/myMessage">쪽지함</a> </li>
    </ul>


</section>