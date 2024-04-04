<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>
<c:set var="pagination" value="${map.pagination}"/>
<c:set var="userList" value="${map.userList}"/>
<c:if test="${!empty param.users}" >
    <c:set var="kq" value="&users=${param.users}&query=${param.query}"/>
</c:if>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원목록</title>
<link rel="stylesheet" href="/resources/css/admin/userList-style.css">
    

</head>
<body>
	<div class="wrap">
        <!-- 관리자 헤더 -->
     	<jsp:include page="/WEB-INF/views/admin/adminHeader.jsp" />
            <main>
                <div class="main-wrap">
                    <div>
                        <h3>회원목록</h3>
                    </div>
                    <form action="/admin" method="get">
                        <div class="userSearch">
                        
                                <div>
                                    <select name="users" id="userSelect">
                                        <option value="0">전체</option>
                                        <option value="1">일반사용자</option>
                                        <option value="2">사업자</option>
                                        <option value="3">관리자</option>
                                    </select>
                                </div>
                                <div>
                                    <input type="search" name="query" id="userSearch" placeholder="회원명을 입력해주세요.(입력 안할 시 전체)" maxlength="100">
                                    <button id="searchBtn">검색</button>
                                </div>
                        </div>
                    </form>
                  
                  
             
                    <div class="userResult">
                        <div>총 ${pagination.listCount}명</div>
                        <div>
                            <table id="result">
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>이름</th>
                                        <th>이메일</th>
                                        <th>생년월일</th>
                                        <th>분류</th>
                                        <th>성별</th>
                                    </tr>
                                </thead>
                                <tbody>

                                <c:choose>
                                    <c:when test="${empty userList}">
                                        <tr>
                                            <th colspan="6">회원이 존재하지 않습니다.</th>
                                        </tr>
                                    </c:when>
                                    <c:otherwise>
                                        <c:forEach var="user" items="${userList}">

                                            <c:if test="${user.authority == '1'}">
                                                <c:set var="authority" value="일반회원"/>
                                            </c:if>
                                            <c:if test="${user.authority == '2'}">
                                                <c:set var="authority" value="사업자"/>
                                            </c:if>
                                            <c:if test="${user.authority == '3'}">
                                                <c:set var="authority" value="관리자"/>
                                            </c:if> 

                                            <tr>
                                                <td>${user.userNo}</td>
                                                <td><a href="/admin/userDetail/${user.userNo}">${user.userName}</a></td>
                                                <td>${user.userEmail}</td>
                                                <td>${user.userBirthDate}</td>
                                                <td>${authority}</td>
                                                <td>${user.userGender}</td>
                                            </tr>
                                        </c:forEach>
                                    </c:otherwise>
                                </c:choose>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="pagination-area">


                        <ul class="pagination">
                        
                            <!-- 첫 페이지로 이동 -->
                            <li><a href="/admin?cp=1${kq}">&lt;&lt;</a></li>
        
                            <!-- 이전 목록 마지막 번호로 이동 -->
                            <li><a href="/admin?cp=${pagination.prevPage}${kq}">&lt;</a></li>
                        
                            
                            <!-- 특정 페이지로 이동 -->
                            <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                                <c:choose>
                                    <c:when test="${i == pagination.currentPage}">
                                          <!-- 현재 보고있는 페이지 -->
                                           <li><a class="current">${i}</a></li>
                                    </c:when>
                                    <c:otherwise>
                                         <!-- 현재 페이지를 제외한 나머지 -->
                                            <li><a href="/admin?cp=${i}${kq}">${i}</a></li>
                                    </c:otherwise>
                                </c:choose>
                            
                            </c:forEach>
                          
                            
                            <!-- 다음 목록 시작 번호로 이동 -->
                            <li><a href="/admin?cp=${pagination.nextPage}${kq}">&gt;</a></li>
        
                            <!-- 끝 페이지로 이동 -->
                            <li><a href="/admin?cp=${pagination.maxPage}${kq}">&gt;&gt;</a></li>
        
                        </ul>
                    </div>
                </div>
                
            </main>
    </div>
    <script src="/resources/js/admin/userList.js"></script>
</body>
</html>