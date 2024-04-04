<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>내 정보</title>

<link rel="stylesheet" href="/resources/css/myPage/myPage-style.css">
<link rel="stylesheet" href="/resources/css/myPage/sideMenu-style.css">
<link rel="stylesheet" href="/resources/css/myPage/myPageInfo-style.css">
</head>
<body>

    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />

    <main>
        <section class="myPage-content">

            <jsp:include page="/WEB-INF/views/myPage/sideMenu.jsp" />

            <section class="myPage-main">

                <h1 class="myPage-title">내 정보</h1>
                <span class="myPage-subject">${loginUser.userNickname}님의 회원 정보를 수정할 수 있습니다.</span>

                <!-- 현재 페이지 : http://localhost/myPage/info
                    제일 뒤에 info 지우고
                    action에 작성된 경로 추가
                -->
                <!-- 상대 경로 -->
                <form action="info" method="POST" name="myPageFrm-info" id="updateInfo" enctype="multipart/form-data">

                    <!-- 컨테이너1 -->
                    <div class="info-container1">

                        <!-- 우측 프로필 사진 -->
                        <div class="info-content2">
                            <!-- 프로필 이미지 -->
                            <div id="profile-image">
                                <div class="contents">
                                    <div class="upload-box">
                                        <div id="drop-file" class="drag-file">
                                            <c:if test="${empty loginUser.profileImage}">
                                                <img src="/resources/images/main/user.png" class="preview" id="profileImage1"
                                                    name="profileImage1">
                                                <!-- 수정된 부분 -->
                                                <p class="message">사진을 올려주세요.</p>
                                            </c:if>
                        
                                            <c:if test="${!empty loginUser.profileImage}">
                                                <img src="${loginUser.profileImage}" class="preview" id="profileImage1" name="profileImage1">
                                            </c:if>
                                        </div>
                                        <div class="profile-btn-area">
                                            <label class="file-label" for="imageInput">이미지 선택</label>
                                            <input class="file" id="imageInput" name="imageInput" type="file" accept="image/*">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 왼쪽 이름 아이디 닉네임 -->
                        <div class="info-content1">
                            <!-- 이름 -->
                            <span id="infoUserName">${loginUser.userName}</span>
                        
                            <!-- 아이디 -->
                           <span id="infoUserId">${loginUser.userId}</span>

                           <div class="aboutTitle">
                                <i class="fa-solid fa-user"></i><span id="aboutTitle">   About</span>
                           </div>
                        
                        <div class="about-container">
                        
                            <span id="aboutCommemt">content user infoUpdate</span>
                            <!-- 닉네임 -->
                            <div class="infoRow-nick">
                                <label>닉네임</label>
                                <input type="text" name="userNickname" maxlength="10" value="${loginUser.userNickname}" id="userNickname">
                            </div>
                        
                            <!-- 전화번호 -->
                            <div class="infoRow-tel">
                                <label>전화번호</label>

                                <span id="userTel">${loginUser.userTel}</span>

                                

                            </div>

                            <!-- 컨테이너2 -->
                            <div class="info-container2">
                        
                                <div class="infoRow-adrr">
                                    <label>주소</label>
                                </div>
                                <c:set var="addr" value="${fn:split(loginUser.userAddress, '·')}" />
                        
                                <div class="myPage-info-row info-address">
                                    <input type="text" name="userAddress" placeholder="우편번호" value="${addr[0]}" id="sample6_postcode">
                                    <button type="button" onclick="sample6_execDaumPostcode()">검색</button>
                                </div>
                        
                                <div class="myPage-info-row info-address">
                                    <input type="text" name="userAddress" placeholder="도로명/지번 주소" value="${addr[1]}" id="sample6_address">
                                </div>
                        
                                <div class="myPage-info-row info-address">
                                    <input type="text" name="userAddress" placeholder="상세 주소" value="${addr[2]}" id="sample6_detailAddress">
                                </div>
                        
                                <button class="myPage-submit" submit()>수정하기</button>
                                <div class="info-userDelete-area">
                                    <a href="/myPage/secession"><span>회원탈퇴</span></a>
                                </div>
                            </div>
                        
                        </div>
                       
                    </div>
                    
                </form>


            </section>

        </section>

    </main>

    <!-- footer 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <!-- 다음 주소 api 추가 -->
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script>
        function sample6_execDaumPostcode() {
            new daum.Postcode({
                oncomplete: function(data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var addr = ''; // 주소 변수

                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('sample6_postcode').value = data.zonecode;
                    document.getElementById("sample6_address").value = addr;
                    // 커서를 상세주소 필드로 이동한다.
                    document.getElementById("sample6_detailAddress").focus();
                },
                
                /* 주소 AIP css */
                theme: {
                    //bgColor: "", //바탕 배경색
                    searchBgColor: "#455ba8", //검색창 배경색
                    //contentBgColor: "", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
                    //pageBgColor: "", //페이지 배경색
                    //textColor: "", //기본 글자색
                    queryTextColor: "#FFFFFF" //검색창 글자색
                    //postcodeTextColor: "", //우편번호 글자색
                    //emphTextColor: "", //강조 글자색
                    //outlineColor: "", //테두리
                }
            }).open();
        }
    </script>

    <script src="/resources/js/myPage/myPage-info.js"></script>



</body>
</html>