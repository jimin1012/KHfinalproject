<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원상세</title>
<link rel="stylesheet" href="/resources/css/admin/userDetail-style.css">
    

</head>
<body>
	<div class="wrap">
     
        <!-- 관리자 헤더 -->
     	<jsp:include page="/WEB-INF/views/admin/adminHeader.jsp" />
            <main>
                <div class="main-wrap">
                    <div>
                        <h3>회원상세</h3>
                    </div>
                    
                    <div id="resultWrap">
                        <ul>
                            <li>
                                <div class="resultTitle">이름</div>
                                <div class="resultCon">${user.userName}</div>
                            </li>
                            <li>
                                <div class="resultTitle">아이디</div>
                                <div class="resultCon">${user.userId}</div>
                            </li>
                            <li>
                                <div class="resultTitle">이메일</div>
                                <div class="resultCon">${user.userEmail}</div>
                            </li>
                            <li>
                                <div class="resultTitle">생년월일</div>
                                <div class="resultCon">${user.userBirthDate}</div>
                            </li>
                            <li>
                                <div class="resultTitle">구분</div>
                                <div class="resultCon">
                                    <c:if test="${user.authority==1}">
                                        <c:set var="authority" value="일반회원"/>
                                    </c:if>
                                    <c:if test="${user.authority==2}">
                                        <c:set var="authority" value="사업자"/>
                                    </c:if>
                                    <c:if test="${user.authority==3}">
                                        <c:set var="authority" value="관리자"/>
                                    </c:if>
                                    ${authority}
                                </div>
                            </li>
                            <li>
                                <div class="resultTitle">주소</div>
                                <div class="resultCon">${user.userAddress}</div>
                            </li>
                            <li>
                                <div class="resultTitle">가입일</div>
                                <div class="resultCon">${user.enrollDate}</div>
                            </li>
                            <li>
                                <div class="resultTitle">전화번호</div>
                                <div class="resultCon">${user.userTel}</div>
                            </li>
                            <li>
                                <div class="resultTitle">성별</div>
                                <div class="resultCon">
                                    <c:choose>
                                        <c:when test="${fn:contains(user.userGender, 'M')}">
                                            <c:set var="userGender" value="남자"/>
                                        </c:when>
                                        <c:when test="${fn:contains(user.userGender, 'F')}">
                                            <c:set var="userGender" value="여자"/>
                                        </c:when>
                                    </c:choose>
                                    ${userGender}
                                </div>
                            </li>
                        </ul>
                        <div>
                            <!-- 이미지 -->
                        </div>
                    </div>
                    <c:if test="${loginUser.userNo != user.userNo}">
                           <button id="deleteBtn">회원 탈퇴시키기</button>
                    </c:if>
                </div>
                
            </main>
    </div>
    <script>
        const userName = "${user.userName}";
        const userNo = "${user.userNo}";
    </script>
    <script src="/resources/js/admin/userDetail.js"></script>
</body>
</html>