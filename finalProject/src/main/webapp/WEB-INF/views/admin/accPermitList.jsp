<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>사업자 전환 요청</title>

    <link rel="stylesheet" href="/resources/css/admin/accPermitList-style.css">

</head>
<body>
    <div class="wrap">
        <!-- 관리자 헤더 -->
		<jsp:include page="/WEB-INF/views/admin/adminHeader.jsp" />

        <main>
        
            <section class="main-box">
                <h3>사업자 전환 요청</h3>
                <section class="main-header">
                    <select id="selectAccState">
                        <option value="wait">요청대기</option>
                        <option value="accept">가입승인</option>
                    </select>
                </section>
                <section class="main-table">
                    <table id="applyTable">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>이름</th>
                                <th>업체명</th>
                                <th>이메일</th>
                                <th>생년월일</th>
                                <th>사업자번호</th>
                                <th>요청상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:forEach var="owner" items="${ownerList}">
                                <tr class="tRow">
                                    <td>${owner.accNo}</td>
                                    <td>${owner.userName}</td>
                                    <td><div>${owner.accName}</div></td>
                                    <td>${owner.userEmail}</td>
                                    <td>${owner.userBirthDate}</td>
                                    <td>${owner.bossNo}</td>
                                    <td onclick='event.cancelBubble=true;'>
                                        <select class="changeAccState" onChange="updateAccStateFl(${owner.userNo},${owner.accNo}, ${owner.bossNo}, this)">
                                            <option value="wait">요청대기</option>
                                            <option value="accept">가입승인</option>
                                            <option value="refuse">가입거절</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr class="tableSlide applyDetail">
                                    <td colspan="7" >

                                        <div>
                                            <span>아이디 : ${owner.userId}</span>
                                            <span>휴대폰 : ${owner.userTel}</span>
                                        </div>
                                        <div>
                                            <c:set var="addr" value="${fn:split(owner.accAddr,'^^^')}"/>
                                            <span class="infoBusinessRegister">
                                                사업자 등록 번호 : ${owner.bossNo} <br>
                                                상호 : ${owner.accName}<br>
                                                대표자 : ${owner.userName}<br>
                                                개업연월일 : ${owner.openDate}<br>
                                                사업장 소재지 : ${addr[0]} ${addr[1]} <c:if test="${!empty addr[2]}">${addr[2]}</c:if> <br>
                                            </span>
                                           
                                        </div>
                                    </td>
                                </tr>
                            </c:forEach>
                            

                        </tbody>
                    </table>
                </section>

            </section>
        </main>
    
    
    </div>

    


    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="/resources/js/admin/accPermitList.js"></script>
</body>
</html>