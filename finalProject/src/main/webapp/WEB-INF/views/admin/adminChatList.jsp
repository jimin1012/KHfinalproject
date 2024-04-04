<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%-- map 변수 저장 --%>
<c:set var="pagination" value="${map.pagination}"/>
<c:set var="chatRoomList" value="${map.chatRoomList}"/>

<%-- 중요, 차단 쿼리스트링 선언--%>
<c:if test="${!empty param.stateFl}" >
    <c:set var="fl" value="&stateFl=${param.stateFl}"/>
</c:if>

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

                <!-- 클래스 추가 -->
                <c:if test="${empty param.stateFl}">
                    <c:set var="showAll" value="class='showList'"/>
                </c:if>
                <c:if test="${param.stateFl eq 'vip'}">
                    <c:set var="showVIP" value="class='showList'"/>
                </c:if>
                <c:if test="${param.stateFl eq 'block'}">
                    <c:set var="showBlock" value="class='showList'"/>
                </c:if>

                <section class="moveChatList">
                    <span ${showAll}><a href="/admin/adminChatList">전체 채팅 목록</a></span>
                    <span ${showVIP}><a href="/admin/adminChatList?stateFl=vip">중요 채팅 목록</a></span>
                    <span ${showBlock}><a href="/admin/adminChatList?stateFl=block">차단/탈퇴한 회원</a></span>
                </section>
                <section class="searchCht-blockBtn-area">
                    <div>
                        <form action="adminChatList" method="GET">
                            <input type="hidden" name="stateFl" value="${param.stateFl}">
                            <select id="selectUserType" name="authority">
                                <option value="1">일반 회원</option>
                                <option value="2">사업자 회원</option>
                            </select>
                            <input id="searchChatRoom" name="userNickname" placeholder="닉네임으로 검색" autocomplete="off" value="${param.userNickname}">
                        </form>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" id="allCheck">전체 체크
                        </label>
                    </div>
                    <div>
                        <c:choose>
                            <c:when test="${param.stateFl eq 'block'}">
                                <button type="button" id="cancelBtn">차단풀기</button>
                                <button type="button" id="deleteBtn">삭제하기</button>
                            </c:when>
                            <c:otherwise>
                                <button type="button" id="blockBtn">차단하기</button>
                            </c:otherwise>
                        </c:choose>
                    </div>
                </section>
                <section class="chatRoomListArea">
                    <ul class="chatRoomList">

                        <c:choose>
                            <c:when test="${empty chatRoomList}">
                                <li>채팅방이 존재하지 않습니다.</li>
                            </c:when>
                            <c:otherwise>
                                <c:forEach var="chatRoom" items="${chatRoomList}">
                                    <li>
                                        <a href="/admin/chatDetail?chatRoomNo=${chatRoom.chatRoomNo}">
                                            <span>
                                                <input type="checkbox" name="blockCheck" class="blockCheck" value="${chatRoom.chatRoomNo}">
                                            </span>
                                            <span class="starArea">
                                                <c:if test="${chatRoom.chatRoomStateFL eq 'N'}">
                                                    <div class="fa-regular fa-star fa-xl"></div>
                                                </c:if>
                                                <c:if test="${chatRoom.chatRoomStateFL eq 'S'}">
                                                    <div class="fa-solid fa-star"></div>
                                                </c:if>
                                            </span>
                                            <span class="profileArea">
                                                <c:if test="${empty chatRoom.userProfile}">
                                                    <img src="/resources/images/main/user.png">
                                                </c:if>
                                                <c:if test="${!empty chatRoom.userProfile}">
                                                    <img src="${chatRoom.userProfile}">
                                                </c:if>
                                            </span>
                                            <span class="userNickname">${chatRoom.userNickname}</span>
                                            <span class="chatLastContent">
                                                <c:if test="${chatRoom.notReadCount ne 0}">
                                                    <span class="notReadCount">${chatRoom.notReadCount}</span>
                                                </c:if>
                                                ${chatRoom.lastMessage}
                                            </span>
                                            <span class="chatLastDate">${chatRoom.sendTime}</span>
                                        </a>
                                        
                                    </li>
                                </c:forEach>
                            </c:otherwise>
                        </c:choose>




                    </ul>
                    <section class="paginationArea">
                        <ul class="pagination">
                            <li><a href="/admin/adminChatList?cp=${pagination.prevPage}${fl}">◀</a></li>

                            <!-- 특정 페이지로 이동 -->
                            <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                                <c:choose>
                                    <c:when test="${i == pagination.currentPage}">
                                        <li><a class="current">${i}</a></li>
                                    </c:when>
                                    <c:otherwise>
                                        <li><a href="/admin/adminChatList?cp=${i}${fl}">${i}</a></li>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>

                            <li><a href="/admin/adminChatList?cp=${pagination.nextPage}${fl}">▶</a></li>
                        </ul>
                    </section>
                    
                </section>

            </section>
        </main>

    </div>

    
    <script>
        const stateFl = "${param.stateFl}"; // 중요 채팅, 차단 채팅 목록 확인용
    </script>
    
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="/resources/js/admin/adminChat.js"></script>

</body>
</html>