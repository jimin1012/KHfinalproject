<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>내 댓글</title>

     <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/sideMenu-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/myPageComment-style.css">
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
    
          <h1 class="myPage-title">내 댓글</h1>
          <span class="myPage-subject"><span class="myPostNick">${loginUser.userNickname}</span>의 댓글 목록입니다.</span>

            <div class="select-box">
              <select name="category" id="category">
                <option value="all">전체</option>
                <option value="2">국내축제</option>
                <option value="3">투표게시판</option>
                <option value="4">자유게시판</option>
              </select>
            </div>
            <div id="displayArea">
              <table class="fold-table">
                <thead>
                  <tr>
                    <th><input type="checkbox" id="allCheck"> 선택</th>
                    <th>내용</th>
                    <th>게시글 제목</th>
                  </tr>
                </thead>
                <tbody>
                  <c:choose>
                    <c:when test="${empty map.list}">
                      <tr>
                        <th colspan="3">내 댓글이 존재하지 않습니다.</th>
                      </tr>
                    </c:when>
                    <c:otherwise>
                      <c:forEach var="comment" items="${map.list}">
                        <tr class="view">
                          <th><input type="checkbox" class="deleteCheck" name="deleteCheck" value="${comment.commentNo}"
                              onclick='event.cancelBubble=true;'></th>
                          <td class="pcs">${comment.commentContent}</td>
                          <td class="pcs">${comment.boardTitle}</td>
                        </tr>
                        <tr class="fold">
                          <td colspan="3">
                            <div class="fold-content">
                              <h3>댓글</h3>
                              <p>${comment.commentContent}</p>
                            </div>
                          </td>
                        </tr>
                      </c:forEach>
                    </c:otherwise>
                  </c:choose>
                </tbody>
              </table>
            </div>
            <button id="deleteMyComment">삭제</button>

        </section>
      </div>
    </main>

    <!-- footer 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script src="/resources/js/myPage/myPage-myComment.js"></script>

</body>
</html>