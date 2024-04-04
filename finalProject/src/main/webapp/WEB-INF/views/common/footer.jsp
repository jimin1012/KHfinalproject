<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" href="/resources/css/common/footer-style.css">

<footer>
    <div class="container1">
        <div class="content1">
            <div class="content1-left">
                <span id="footer-item1">투어 . 상담문의</span>
                <span id="footer-item2">02-0000-0000</span>
                <span id="footer-item3">평일 09:00 - 18:00 (점심 12:00 - 13:00)</span>
            </div>
            <div class="content1-rith">
                <span id="footer-item4">견적문의 <span id="footer-item5">02-0000-0000</span><span id="footer-item6">(수신자요금부담)</span></span>
                <span id="footer-item7">
                    GitHub<a href="https://github.com/WhereToGo2024">https://github.com/WhereToGo2024</a>
                </span>
                <span id="footer-item8">(기타문의 및 노쇼 투어 등 문의는 이메일 문의)</span>
            </div>
            <div class="sns-area">
                <i class="fa-brands fa-github"></i>
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-youtube"></i>
            </div>
        </div>
        <div class="container2">
            <span id="footer-item10">(주) 노쇼 컴퍼니</span>
            <span id="footer-item11">
                대표이사 : 어디가조 <span id="footer-item11-1">주소: 서울 강남구 테헤란로14길 6 [6층]</span><span id="footer-item11-2">사업자등록번호: 000-00-00000</span>
            </span>
            <span id="footer-item12">사업자 정보확인</span>
            <span id="footer-item13">통신판매업신고번호 : 2024-서울강남-0000호 <span id="footer-item13-1">호스팅제공자: (주) 노쇼컴퍼니</span></span>
            <span id="footer-item14">C 2024 .NXSHXW. ALL Rights Reserved </span>
        </div>
    </div>
</footer>

<%-- session에 message 속성이 존재하는 경우 alert 창으로 해당 내용을 출력 --%>

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

