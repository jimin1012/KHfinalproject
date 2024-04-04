<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"  %>
<c:set var="pagination" value="${map.pagination}"/>
<c:set var="accList" value="${map.accList}"/>
<c:if test="${!empty param.accs}" >
    <c:set var="kq" value="&accs=${param.accs}&query=${param.query}"/>
</c:if>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>사업장 목록</title>
<link rel="stylesheet" href="/resources/css/admin/accList-style.css">
</head>
<body>

	<div class="wrap">
		<!-- 관리자 헤더 -->
		<jsp:include page="/WEB-INF/views/admin/adminHeader.jsp" />
		<main>
			<div class="main-wrap">
				<div>
					<h3>사업장목록</h3>
				</div>
				<form action="accList" method="get">
					<div class="accSearch">
						<div>
							<select name="accs" id="accSelect">
								<option value="0">전체</option>
								<option value="1">엽업중</option>
								<option value="2">휴업</option>
								<option value="3">폐업</option>
							</select>
						</div>
						<div>
							<input type="search" name="query" id="accSearch" placeholder="사업장 이름을 입력해주세요.(입력 안할 시 전체)" maxlength="100">
							<button id="searchBtn">검색</button>
						</div>
					</div>
				</form>

				<div class="accResult">
					<div>총 ${pagination.listCount}명</div>
					<div>
						<table id="result">
							<thead>
								<tr>
									<th>번호</th>
									<th>사업자명</th>
									<th>숙소 전화번호</th>
									<th>사업장 이름</th>
									<th>지역</th>
									<th>사업자번호</th>
									<th>분류</th>
								</tr>
							</thead>
							<tbody>
						
								<c:choose>
                                    <c:when test="${empty accList}">
                                        <tr>
                                            <th colspan="6">숙소가 존재하지 않습니다.</th>
                                        </tr>
                                    </c:when>
                                    <c:otherwise>
                                        <c:forEach var="acc" items="${accList}">
											<c:choose>
												<c:when test="${fn:contains(acc.accStFl, 'Y')}">
													<c:set var="accStFl" value="영업중"/>
												</c:when>
												<c:when test="${fn:contains(acc.accStFl, 'N')}">
													<c:set var="accStFl" value="휴업중"/>
												</c:when>
												<c:when test="${fn:contains(acc.accStFl, 'C')}">
													<c:set var="accStFl" value="폐업"/>
												</c:when>
                                    		</c:choose>
                                            <tr>
                                                <td>${acc.accNo}</td>
                                                <td>${acc.userName}</td>
                                                <td>${acc.accTel}</td>
												<td><a href="/admin/accDetail/${acc.accNo}">${acc.accName}</a></td>
                                                <td>${acc.accAddr}</td>
                                                <td>${acc.bossNo}</td>
                                                <td>${accStFl}</td>
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
                        <li><a href="accList?cp=1${kq}">&lt;&lt;</a></li>
        
                        <!-- 이전 목록 마지막 번호로 이동 -->
                        <li><a href="accList?cp=${pagination.prevPage}${kq}">&lt;</a></li>
                        
                            
                        <!-- 특정 페이지로 이동 -->
                        <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">
                            <c:choose>
                                <c:when test="${i == pagination.currentPage}">
                                    <!-- 현재 보고있는 페이지 -->
                                    <li><a class="current">${i}</a></li>
                                </c:when>
                                <c:otherwise>
                                    <!-- 현재 페이지를 제외한 나머지 -->
                                    <li><a href="accList?cp=${i}${kq}">${i}</a></li>
                                </c:otherwise>
                            </c:choose>
                            
                        </c:forEach>
                          
                            
                        <!-- 다음 목록 시작 번호로 이동 -->
                        <li><a href="accList?cp=${pagination.nextPage}${kq}">&gt;</a></li>
        
                        <!-- 끝 페이지로 이동 -->
                        <li><a href="accList?cp=${pagination.maxPage}${kq}">&gt;&gt;</a></li>
                    </ul>
                </div>
			</div>
		</main>
	</div>

	<script src="/resources/js/admin/accList.js"></script>
</body>
</html>