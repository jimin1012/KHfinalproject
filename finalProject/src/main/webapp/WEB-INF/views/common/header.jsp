<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link rel="stylesheet" href="/resources/css/common/header-style.css">

<!-- font awesome 라이브러리 추가 + key 등록 -->
<script src="https://kit.fontawesome.com/f7459b8054.js" crossorigin="anonymous"></script>




<header>
	<div class="container">

		<!-- 로고 / 로그인 -->
		<div class="container1">
			<div class="logoLogin">

				<div class="nav">
					<div class="menu1">
						<button type="button" class="fa-solid fa-bars" id="allManu-btn"
							onclick="allManuCon()"></button>
						<a href="/board/4">자유 게시판</a> <a href="/board/3">투표 게시판</a> <a href="/board/2">국내 축제</a>
					</div>
				</div>

				<!-- 로고 -->
				<div class="logo">
					<a href="/">NXSHXW</a>
				</div>
				
				<div class="content1">
					<section>

					<c:choose>
						<c:when test="${empty loginUser}">
							
						</c:when>

						<c:otherwise>
						<!-- 검색어 입력할 수 있는 요소 배치 -->
						<article class="search-area">
									
							<form action="/board/boardTotalList" method="GET">

								<fieldset> <!-- form태그 내 영역 구분 -->

												
									<input type="search" name="query" id="query"
										placeholder="검색어를 입력해주세요."
										autocomplete="off" value="${param.query}">

									<%-- 제목 검색 --%>
									<input type="hidden" name="key" value="t">

									<!-- 검색 버튼 -->
									<!-- button type="submit" 이 기본값 -->
									<button id="searchBtn" class="fa-solid fa-magnifying-glass"></button>

								</fieldset>

							</form>

							<div class="search-area">
								<ul id="autoSearch" class="close"></ul>
							</div>

						</article>
						</c:otherwise>
					</c:choose>

					</section>

					<%-- 날씨 아이콘 --%>
					<div class="weather"></div>

					<c:choose>
						<c:when test="${empty loginUser}">
							<!-- 로그인 X -->
							<div class="login">
								<a href="/login" >Log in</a>
							</div>
						</c:when>

						<c:otherwise>
							<!-- 로그인 O -->
							<label for="headerMenuToggle">
								${loginUser.userNickname} <i class="fa-solid fa-caret-down"></i>
							</label>

							<input type="checkbox" id="headerMenuToggle">

							<div class="my-info">
								<div class="Profile-area">
								<!-- 프로필 이미지가 없으면 기본 이미지 -->
                                    <c:if test="${empty loginUser.profileImage}">
                                    	<a href="/myPage/profile" id="userProfile">
                                        	<img src="/resources/images/main/user.png" id="profileImage">
                                        </a>
                                    </c:if>
            
                                    <!-- 프로필 이미지가 있으면 있는 이미지 -->
                                    <c:if test="${!empty loginUser.profileImage}">
                                    	<a href="/myPage/profile" id="userProfile">
                                        	<img src="${loginUser.profileImage}" id="profileImage">
                                        </a>
                                    </c:if>
									
									<%-- <span>닉네임</span> --%>
								</div> 


								<div class="myNav-area">
									<a href="/myPage/info">내정보</a> | <a href="/myPage/myMessage">쪽지함</a>
								</div>

								<div class="myNav-area2">
									<a href="/logout">로그아웃</a>
								</div>

								<div class="myNav-area3">
												
									<c:if test="${loginUser.authority == '1'}">
										<span>Welcome NXSHXW</span>
									</c:if>

									<c:if test="${loginUser.authority == '2'}">
										<a href="/ownerPage/photo">사업자 페이지</a>   
									</c:if> 

									<c:if test="${loginUser.authority == '3'}">
										<a href="/admin">관리자페이지</a>   
									</c:if> 

									<!-- 관리자 페이지 -->
									<!-- <a href="#">Welcome NXSHXW</a> -->

									<%-- <span>Welcome NXSHXW</span> --%>
								</div>
											

							</div>
						</c:otherwise>
					</c:choose>
				</div>
			</div>
		</div>

		<%-- 팝업창 --%>
		<%-- <div id="layer_popup">
			<div id="check">
				<input type="checkbox" value="checkbox" id='chkbox'>
				<label for="chkbox">&nbsp&nbsp오늘 하루동안 보지 않기</label>
			</div>
			<div id="close">
				<a href="javascript:closePop();">닫기</a>
			</div>
		</div> --%>
		
		<%-- 밑에 mmenuToggle까지 줄 맞춰놓았습니다! 여기에 1:1 채팅 추가할게요!(지선) --%>
		<div id="moveToChatArea">
			<a href="/chat/user">
				<div>
					1:1 상담
					<img id="chatLogo" src="/resources/images/main/chat1.png">
				<div>
			</a>
		</div>
	
	</div>

</header>

<div class="manuToggle">

	<div id="allMenu">
		<div id="close-btn">
			<button class="fa-solid fa-xmark"></button>
			<!-- x 버튼 -->
		</div>
		<div class="reservationIcon">
			<label>
				<a href="/train"> <i class="fa-solid fa-train-subway"></i> <!-- 기차 --> <span>기차 예약</span></a>
			</label>

			<label>
				<a href="/bus"> <i class="fa-solid fa-bus"></i> <!-- 버스 --> <span>버스 예약</span></a>
			</label>

			<label>
				<a href="/acc/changeList"> <i class="fa-solid fa-bed"></i> <!-- 숙소 --> <span>숙소 예약</span></a>
			</label>
			<label> <a href="/tastyRest/map"> <i class="fa-solid fa-bowl-food"></i> <!-- 맛집 --> <span>맛집 추천</span></a>
			</label>

		</div>

		<div class="noticeList">

			<div>
				<!-- 축제 -->
				<p>자유 게시판</p>
				<a href="/board/4">자유</a>
			</div>

			<div>
				<!-- 이벤트 -->
				<p>투표 게시판</p>
				<a href="/board/3">투표</a>
			</div>

			<div>
				<!-- 이벤트 -->
				<p>축제 게시판</p>
				<a href="/board/2">국내</a>
			</div>

			<div>
				<!-- 마이페이지 -->
				<p>마이페이지</p>
				<a href="/myPage/info">회원 정보</a> <a href="/myPage/purchaseDetails">예약 현황</a>
			</div>

			<div>
				<!-- 공지사항 -->
				<p>공지사항</p>
				<a href="/board/1">필수 공지</a>
			</div>

		</div>

		<div class="ment">
			<span>당신의 여행 준비 도우미 NXSHXW</span>
		</div>

	</div>
</div>

<script src="/resources/js/user/header.js"></script>