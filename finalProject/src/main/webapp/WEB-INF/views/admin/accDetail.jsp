<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>사업장상세</title>
<link rel="stylesheet" href="/resources/css/admin/accDetail-style.css">
    

</head>
<body>
	<div class="wrap">
     
        <!-- 관리자 헤더 -->
     	<jsp:include page="/WEB-INF/views/admin/adminHeader.jsp" />
            <main>
                <div class="main-wrap">
                    <div>
                        <h3>사업장상세</h3>
                    </div>
                    
                    <div id="resultWrap">
                        <ul>
                            <li>
                                <div class="resultTitle">회원 이름</div>
                                <div class="resultCon">${owner.userName}</div>
                            </li>
                            <li>
                                <div class="resultTitle">사업장 이름</div>
                                <div class="resultCon">${owner.accName}</div>
                            </li>
                            <li>
                                <div class="resultTitle">사업자번호</div>
                                <div class="resultCon">${owner.userTel}</div>
                            </li>
                            <li>
                                <div class="resultTitle">이메일</div>
                                <div class="resultCon">${owner.userEmail}</div>
                            </li>
                            <li>
                                <div class="resultTitle">생년월일</div>
                                <div class="resultCon">${owner.userBirthDate}</div>
                            </li>
                            <li>
                                <div class="resultTitle">분류</div>
                                <div class="resultCon">
                                    <c:choose>
                                        <c:when test="${fn:contains(owner.accStFl, 'Y')}">
                                            <c:set var="accStFl" value="영업중"/>
                                        </c:when>
                                        <c:when test="${fn:contains(owner.accStFl, 'N')}">
                                            <c:set var="accStFl" value="휴업중"/>
                                        </c:when>
                                        <c:when test="${fn:contains(owner.accStFl, 'C')}">
                                            <c:set var="accStFl" value="폐업"/>
                                        </c:when>
                                    </c:choose>
                                    ${accStFl}
                                </div>
                            </li>
                            <li>
                                <div class="resultTitle">사업장 주소</div>
                                <div class="resultCon">${owner.accAddr}</div>
                            </li>
                            <li>
                                <div class="resultTitle">사업장 오픈 일</div>
                                <div class="resultCon">${owner.openDate}</div>
                            </li>
                            <li>
                                <div class="resultTitle">사업장 전화번호</div>
                                <div class="resultCon">${owner.accTel}</div>
                            </li>
                            <li>
                                <div class="resultTitle">전체 방 개수</div>
                                <div class="resultCon">${owner.totalRoomCount} 개</div>
                            </li>
                        </ul>
                        <div>
                            <!-- 이미지 -->
                        </div>
                    </div>


                
                  
             
                </div>
                
            </main>
    </div>
</body>
</html>