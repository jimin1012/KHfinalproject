<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>프로필</title>

    <link rel="stylesheet" href="/resources/css/myPage/myPage-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/sideMenu-style.css">
    <link rel="stylesheet" href="/resources/css/myPage/myPageProfile-style.css">
</head>
<body>

    <!-- header -->
    <jsp:include page="/WEB-INF/views/common/header.jsp" />

    <main>

        <div class="myPage-content">

            <!-- 사이트 바 -->
            <jsp:include page="/WEB-INF/views/myPage/sideMenu.jsp" />
    
            <!-- myprofile-info -->
            <div class="myPage-main">
                
                <!-- 타이틀 -->
                <h1 class="myPage-title">프로필</h1>
                <span class="myPage-subject"><span class="myPostNick">${loginUser.userNickname}</span>의 프로필을 확인할 수 있습니다.</span>
                
                <div class="myprofile-info">
    
                    <form action="profile" method="POST" name="myPageFrm" id="profileFrm" enctype="multipart/form-data">
                    
                        <div class="profile-container2">
                    
                            <div class="profile-contant1">

                                <div class="profile-image-area">
                                    <!-- 프로필 이미지가 없으면 기본 이미지 -->
                                    <c:if test="${empty loginUser.profileImage}">
                                        <img src="/resources/images/main/user.png" id="profileImage1"  name="profileImage1">
                                    </c:if>
                                    
                                    <!-- 프로필 이미지가 있으면 있는 이미지 -->
                                    <c:if test="${!empty loginUser.profileImage}">
                                        <img src="${loginUser.profileImage}" id="profileImage1"  name="profileImage1">
                                    </c:if>
                                </div>

                                <span id="deleteImage">x</span>
                    
                                <div class="profile-btn-area">
                                    <label for="imageInput">이미지 선택</label>
                                    <input type="file" name="profileImage" id="imageInput" accept="image/*">
                                    <button>변경</button>
                                </div>
                                
                            </div>
                            <!-- 로그인 회원 이메일 -->
                            <div class="contant2-area1">
                            
                                <div class="profileInfo">
                                    <span id="myprofile-userNickname">${loginUser.userNickname}</span>
                                        
                                    <span id="myprofile-userId">${loginUser.userId}</span>
    
                                    <span id="myprofile-userBirthDate">${loginUser.userBirthDate}</span>
    
                                    <span id="myprofile-userTel">${loginUser.userTel}</span>
    
                                    <span id="myprofile-userEmail">${loginUser.userEmail}</span>
                                    ${loginUser.userAddress}
                                </div>

                                <div class="profilecount">

                                </div>

                            </div>
                              
                            
                        </div>
                        <div class="profile-container3"></div>
                    </form>
                </div>
            
            </div>
        </div>
        
    </main>

    <!-- footer 연결 -->
    <jsp:include page="/WEB-INF/views/common/footer.jsp" />

    <script src="/resources/js/myPage/myPage.js"></script>

</body>
</html>