<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>내 게시글</title>

    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/sideMenu-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/myPagePost.css">

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
        
                <h1 class="myPage-title">내 게시글</h1>
                <span class="myPage-subject"><span class="myPostNick">${loginUser.userNickname}</span>의 게시글입니다.</span>
        
                    <div class="select-box">
                        <select name="category" id="category">
                            <option value="all">전체</option>
                            <option value="2">국내축제</option>
                            <option value="3">투표게시판</option>
                            <option value="4">자유게시판</option>
                        </select>
                    </div>
                    <table class="fold-table">
                        <thead>
                            <tr>
                                <th><input type="checkbox" id="allCheck"> 선택</th>
                                <th>번호</th>
                                <th>제목</th>
                                <th>내용</th>
                                <th>
                                    <span class="visible-small" title="Writer">작성일</span><span class="visible-big">작성일</span>
                                </th>
                                <th>
                                    <span class="visible-small" title="Created">게시판</span><span class="visible-big">게시판</span>
                                </th>
                                <th>
                                    <span class="visible-small" title="views">조회수</span><span class="visible-big">조회수</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            <c:choose>
                                <c:when test="${empty map.list}">
                                    <tr>
                                        <th colspan="7">게시글이 존재하지 않습니다.</th>
                                    </tr>
                                </c:when>
                                <c:otherwise>
                                    <c:forEach var="myPost" items="${map.list}">
                                        <tr class="view">
                                            <td><input type="checkbox" class="deleteCheck" name="deleteCheck" value="${myPost.boardNo}" onclick='event.cancelBubble=true;'></td>
                                            <td>${myPost.boardNo}</td>
                                            <td class="pcs">${myPost.boardTitle}</td>
                                            <td class="cur">${myPost.boardContent}</td>
                                            <td>${myPost.boardCreateDate}</td>
                                            <td>${myPost.boardName}</td>
                                            <td class="per">${myPost.readCount}</td>
                                        </tr>
                                        <tr class="fold">
                                            <td colspan="7">
                                                <div class="fold-content">
                                                    <h3>${myPost.boardTitle}</h3>
                                                    <p>${myPost.boardContent}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </c:forEach>
                                </c:otherwise>
                            </c:choose>
                        </tbody>
                    </table>
                    <button id="deletePost">삭제</button>

        </div>
        
    </main>

    <!-- footer 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script src="/resources/js/myPage/myPage-myPost.js"></script>

    <!-- <script>
      // 선택한 옵션에 따라 내용을 표시하는 함수
      function displayContent() {
          var category = document.getElementById("category");
          var selectedOption = category.value;
          var displayArea = document.getElementById("displayArea");

          // 이전 내용 지우기
          displayArea.innerHTML = "";

          // 선택한 옵션에 따라 내용 표시
          switch (selectedOption) {
              case "all":
                  displayArea.innerHTML = `
                      <table class="fold-table">
                          <thead>
                              <tr>
                                  <th><input type="checkbox"></th>
                                  <th>번호</th>
                                  <th>제목</th>
                                  <th>내용</th>
                                  <th><span class="visible-small" title="Writer">작성일</span><span class="visible-big">작성일</span></th>
                                  <th><span class="visible-small" title="Created">게시판</span><span class="visible-big">게시판</span></th>
                                  <th><span class="visible-small" title="views">조회수</span><span class="visible-big">조회수</span></th>
                              </tr>
                          </thead>
                          <tbody>
                              <c:choose>
                                  <c:when test="${empty myPost}">
                                      <tr>
                                          <th colspan="7">게시글이 존재하지 않습니다.</th>
                                      </tr>
                                  </c:when>
                                  <c:otherwise>
                                      <c:forEach var="myPost" items="${myPost}">
                                          <tr class="view">
                                              <td><input type="checkbox"></td>
                                              <td>${myPost.boardNo}</td>
                                              <td class="pcs">${myPost.boardTitle}</td>
                                              <td class="cur">${myPost.boardContent}</td>
                                              <td>${myPost.boardCreateDate}</td>
                                              <td>${myPost.boardName}</td>
                                              <td class="per">${myPost.readCount}</td>
                                          </tr>
                                          <tr class="fold">
                                              <td colspan="7">
                                                  <div class="fold-content">
                                                      <h3>${myPost.boardTitle}</h3>
                                                      <p>${myPost.boardContent}</p>
                                                  </div>
                                              </td>
                                          </tr>
                                      </c:forEach>
                                  </c:otherwise>
                              </c:choose>
                          </tbody>
                      </table>`;
                  break;
                  case "2":
                  displayArea.innerHTML = `
                      <table class="fold-table">
                          <thead>
                              <tr>
                                  <th><input type="checkbox"></th>
                                  <th>번호</th>
                                  <th>제목</th>
                                  <th>내용</th>
                                  <th><span class="visible-small" title="Writer">작성일</span><span class="visible-big">작성일</span></th>
                                  <th><span class="visible-small" title="Created">게시판</span><span class="visible-big">게시판</span></th>
                                  <th><span class="visible-small" title="views">조회수</span><span class="visible-big">조회수</span></th>
                              </tr>
                          </thead>
                          <tbody>
                              <c:choose>
                                  <c:when test="${empty myPost}">
                                      <tr>
                                          <th colspan="7">게시글이 존재하지 않습니다.</th>
                                      </tr>
                                  </c:when>
                                  <c:otherwise>
                                      <c:forEach var="myPost" items="${myPost}">
                                          <tr class="view">
                                              <td><input type="checkbox"></td>
                                              <td>${myPost.boardNo}</td>
                                              <td class="pcs">${myPost.boardTitle}</td>
                                              <td class="cur">${myPost.boardContent}</td>
                                              <td>${myPost.boardCreateDate}</td>
                                              <td>${myPost.boardName}</td>
                                              <td class="per">${myPost.readCount}</td>
                                          </tr>
                                          <tr class="fold">
                                              <td colspan="7">
                                                  <div class="fold-content">
                                                      <h3>${myPost.boardTitle}</h3>
                                                      <p>${myPost.boardContent}</p>
                                                  </div>
                                              </td>
                                          </tr>
                                      </c:forEach>
                                  </c:otherwise>
                              </c:choose>
                          </tbody>
                      </table>`;
                  break;
                  case "3":
                      displayArea.innerHTML = "<p>옵션 2에 대한 내용</p>";
                      break;
                  case "4":
                      displayArea.innerHTML = "<p>옵션 3에 대한 내용</p>";
                      break;
                  // 다른 옵션들에 대한 처리는 생략
                  default:
                      displayArea.innerHTML = "";
                  break;
          }
      }

      // 선택 요소의 변경 이벤트를 감지하여 displayContent 함수 호출
      document.getElementById("category").addEventListener("change", displayContent);

      // 초기 내용 표시
      displayContent();
    </script> -->

</body>
</html>

