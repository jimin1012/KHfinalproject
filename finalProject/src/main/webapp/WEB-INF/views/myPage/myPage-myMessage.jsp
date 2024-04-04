<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>쪽지함</title>

    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/sideMenu-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/myPageMessage-style.css">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js"></script>

</head>
<body>

    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />

    <main>
    
      <div class="myPage-content">
    
        <!-- 사이트 바 -->
        <jsp:include page="/WEB-INF/views/myPage/sideMenu.jsp" />
    
        <!-- 오른쪽 마이페이지 주요 내용 부분 -->
        <section class="myPage-main">
    
          <h1 class="myPage-title">쪽지함</h1>
          <span class="myPage-subject"><span class="myPostNick">${loginUser.userNickname}</span>의 쪽지 목록입니다.</span>
          <span class="myPage-subject">받은 쪽지 목록입니다. 쪽지를 클릭 하면 내용이 보입니다</span>
            <div class="select-box">
              <select name="categoryMessage" id="categoryMessage">
                <option value="getMessage">받은 쪽지</option>
                <option value="sentMessage">보낸 쪽지</option>
              </select>
            </div>
            <div class="messageTable">
              <table class="fold-table">
                <thead>
                  <tr>
                    <th><input type="checkbox" id="allCheck"> 선택</th>
                    <th>번호</th>
                    <th>보낸이</th>
                    <th>내용</th>
                    <th><span class="visible-small" title="Created">작성일</span><span class="visible-big">작성일</span></th>
                  </tr>
                </thead>
                <tbody>
                  <c:if test="${empty messageList}">
                    <tr class="view" >
                      <td colspan="5">받은 쪽지가 없습니다.</td>
                    </tr>
                  </c:if>
                  <c:if test="${!empty messageList}">
                    <c:forEach var="message" items="${messageList}">
                      <tr class="view">
                        <th ><input type="checkbox" class="deleteCheck" name="deleteCheck" value="${message.messageNo}" onclick='event.cancelBubble=true;'></th>
                        <td>${message.messageNo}</td>
                        <td class="pcs">${message.userNickname}</td>
                        <td class="cur"><div class="simpleContent">${message.messageContent}</div></td>
                        <td>${message.messageCreateDate}</td>
                      </tr>
                      <tr class="fold">
                        <td colspan="7">
                          <div class="fold-content">
                            <h3>From. ${message.userNickname}</h3>
                            <p>${message.messageContent}</p>
                          </div>
                        </td>
                      </tr>
                    </c:forEach>

                  </c:if>
                  
                </tbody>
              </table>
            </div>
            <button id="deleteMessage">삭제</button>
        </section>
      </div>
    </main>

    <!-- footer 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script src="/resources/js/myPage/myPage-myMessage.js"></script>

</body>
</html>