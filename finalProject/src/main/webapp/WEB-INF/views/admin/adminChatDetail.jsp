<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%-- map 변수 저장 --%>
<c:set var="chatRoomInfo" value="${map.chatRoomInfo}"/>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1:1 상담</title>

    <link rel="stylesheet" href="/resources/css/admin/adminChatList-style.css">

</head>
<body>
    <div class="wrap">
        <!-- 관리자 헤더 -->
		<jsp:include page="/WEB-INF/views/admin/adminHeader.jsp" />
    
        <main>
          
            <section class="main-box">

                <section>
                    <h3>1:1 상담</h3>
                </section>
                
                <section class="chatRoomArea">
                <section class="userInfoArea">
                    <section>
                        <c:if test="${empty chatRoomInfo.userProfile}">
                            <img src="/resources/images/main/user.png" id="userProfileImg">
                        </c:if>
                        <c:if test="${!empty chatRoomInfo.userProfile}">
                            <img src="${chatRoomInfo.userProfile}" id="userProfileImg">
                        </c:if>
                        <p>${chatRoomInfo.userNickname}</p>
                        <c:if test="${chatRoomInfo.authority == 1}">
                            <p>일반 회원</p>
                        </c:if>
                        <c:if test="${chatRoomInfo.authority == 2}">
                            <p>사업자 회원</p>
                        </c:if>
                        <span class="starArea">
                            <c:if test="${chatRoomInfo.chatRoomStateFL eq 'N'}">
                                <i class="fa-regular fa-star fa-xl starCheck"></i>
                            </c:if>
                            <c:if test="${chatRoomInfo.chatRoomStateFL eq 'S'}">
                                <i class="fa-solid fa-star starCheck"></i>
                            </c:if>
                        </span>
                    </section>
                    <button type="button" id="blockBtn"> 차단하기</button>

                </section>
                <section class="chatArea">  
                    <section class="searchChatContentArea">
                        <%-- <form action="#" method="GET">
                            <input type="text" id="searchChatContent" name="chatContent" placeholder="검색어를 입력하세요">
                            <button id="searchChatBtn" class="fa-solid fa-magnifying-glass"></button>
                        </form> --%>
                        <select id="chatCalendar">
                        
                        </select>
                        <input type="text" id="queryChat" placeholder="채팅 내역을 검색하세요" autocomplete="off">
                        <span class="upDownArea hideChatBtn">
                            <button id="nextBtn" data-search="next" class="fa-regular fa-circle-down"></button>
                            <button id="prevBtn" data-search="prev" class="fa-regular fa-circle-up"></button>
                            <button id="clearBtn" data-search="clear" class="fa-regular fa-circle-xmark"></button>
                            <span id="keyCount"> 0 / 0</span>
                        </span>
                    </section>
                    <section class="showChatList">
                        
                        <ul id="displayChat">

                        </ul>
                        
                        <div id="writeChat">
                            <textarea id="inputChat"></textarea>
                            <button id="sendChatBtn">전송</button>
                        </div>


                    </section>


                </section>
            </section>

            </section>
        </main>

    </div>

    
    <script>
        const userNo = "${map.managerNo}"; //  관리자 번호
        const targetNo = "${map.userNo}"; // 상대방 번호(회원 번호)
        const chatRoomNo = "${param.chatRoomNo}"; // 채팅방 번호
        const authority = "${loginUser.authority}"; // 회원 권한 유형
    </script>

    <%-- sockjs 라이브러리 --%>
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
    
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="/resources/js/admin/adminchatDetail.js"></script>
    <script src="/resources/js/admin/adminChatSelect.js"></script>
</body>
</html>