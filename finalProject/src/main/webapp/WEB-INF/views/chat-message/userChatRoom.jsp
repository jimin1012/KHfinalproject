<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1:1 상담</title>

    <link rel="stylesheet" href="/resources/css/chat-message/chatRoom.css">
    <script src="https://kit.fontawesome.com/17b44c4a29.js" crossorigin="anonymous"></script>
</head>
<body>
    <!-- header 연결 -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />


    <main>
        <section class="content">
            <h1>1:1 상담 채팅</h1>
           
            <div class="chatRoomArea">
                <div class="calendarsearchArea">
                    <select id="chatCalendar">
                        <%--
                        <option>2024.03.14</option>
                        <option>2024.03.13</option> --%>
                    </select>
                    <input type="text" id="queryChat" placeholder="채팅 내역을 검색하세요" autocomplete="off">
                    <span class="upDownArea hideChatBtn">
                        <button id="nextBtn" data-search="next" class="fa-regular fa-circle-down"></button>
                        <button id="prevBtn" data-search="prev" class="fa-regular fa-circle-up"></button>
                        <button id="clearBtn" data-search="clear" class="fa-regular fa-circle-xmark"></button>
                        <span id="keyCount"> 0 / 0</span>
                    </span>
                </div>

                <div class="chatRoom">
                    <div id="showChatList">
                        <ul id="displayChat">
                            <%-- <li class="chatDate">2024-03-20</li>
                            <li class="targetChat chatLi">
                                <p>안녕하세요~노쇼입니다.</p>
                            </li>
                            <li class="myChat chatLi">
                                <p>안녕하세요</p>
                            </li> --%>
                        </ul>
                    </div>

                    <div class="writeChatArea">
                        <textarea id="inputChat"></textarea>
                        <button id="sendChatBtn">전송</button>
                    </div>


                </div>



            </div>

        </section>



    </main>


    <!-- footer 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />


    <script>
        const userNo = "${map.userNo}"; // 로그인한 회원 번호
        const targetNo = "${map.targetNo}"; // 상대방 번호(관리자 번호)
        const chatRoomNo = "${map.chatRoomNo}"; // 채팅방 번호
        const chatRoomStateFL = "${map.chatRoomStateFL}"; // 채팅방 번호
        const authority = "${loginUser.authority}"; // 회원 권한 유형
    </script>

    <%-- sockjs 라이브러리 --%>
    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
    
    <%-- 마크JS --%>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.min.js"></script>

    <script src="/resources/js/chat-message/chat.js"></script>
    <script src="/resources/js/chat-message/chatSelect.js"></script>


</body>
</html>