<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>signUp</title>

    <link rel="stylesheet" href="/resources/css/user/signUp-style.css">

    <script   script src="https://kit.fontawesome.com/97cdc46e56.js" crossorigin="anonymous"></script>

    <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.js"></script>
</head>
<body class="page2">
    <main>
        <section class="container">
    
            <section class="signUp-content">
    
                <h1 class="logo"><a href="/">NXSHXW</a></h1>
    
                <div class="title">
                    <p>회원가입</p>
                </div>
    
<div class="progress-area">
    <div class="progress">
        <div class="circle active">1</div>
        <div class="progressBar" id="progressBar1"></div>
        <div class="circle">2</div>
        <div class="progressBar" id="progressBar2"></div>
        <div class="circle">3</div>
    </div>
</div>
    
                <!-- 부제목 -->
                <div class="titleSub1">
                    <p>개인정보 입력<br><span>회원가입에 필요한 개인정보를 입력해주세요.</span></p>
                </div>
    
                <form action="/signUp" method="POST" name="signUpFrm" id="signUpFrm">
                    <div class="personalInformation">

                         <!-- [필수] 이름 -->
                         <div class="form-title">
                            <label for="userName">
                                <span><span class="required">[필수]</span> 이름</span>
                                <span class="signUp-message" id="nameMessage"></span>
                            </label>
                        </div>

                        <div class="signUp-input-area">
                            <span class="box int_userName">
                                <input type="text" name="userName" id="userName" class="int"  value="${param.userName}" placeholder="이름을 입력해주세요." 
                                    maxlength="20" autocomplete="off">
                            </span>
                        </div>
    
                        <!-- [필수] 생년월일 -->
                        <div class="form-title">
                            <label for="userBirthDate">
                                <span><span class="required">[필수]</span> 생년월일</span>
                                <span class="signUp-message" id="birthDateMessage"></span>
                            </label>
                        </div>
    
                        <div class="signUp-input-area">
                            <span class="box int_userBirthDate">
                                <input type="test" name="userBirthDate" id="userBirthDate" class="int"  value="${param.userBirth}"
                                    placeholder="생년월일을 입력해주세요." maxlength="20">
                            </span>
                        </div>

                         <!-- [필수] 휴대폰 -->
                         <div class="form-title">
                            <label for="userTel">
                                <span><span class="required">[필수]</span> 휴대폰</span>
                                <span class="signUp-message" id="telMessage"></span>
                                <span class="signUp-message" id="telAuthKeyMessage"></span>
                            </label>
                        </div>

                        <div class="signUp-input-area tel">
                            <span class="box int_userTel">
                                <input type="text" name="userTel" id="userTel" class="int" placeholder="전화번호를 입력해주세요."
                                    maxlength="20" autocomplete="off" required>
                                <button id="checkTelAuthKeyBtn" type="button">인증번호 받기</button>
                            </span>
                            <span class="box int_authKey">
                                <input type="text" name="telAuthKey" id="telAuthKey" class="int" s placeholder="인증번호를 입력해주세요." maxlength="6" autocomplete="off"  disabled required>
                                <div id="phoneTimer"></div>
                                <input type="hidden" id="phoneDoubleChk"/>
                            </span>
                            
                        </div>
    
                        <!-- [선택] 성별 -->
                        <div class="form-title">
                            <label for="">
                                <span>성별</span><span id="genderMessage" class="signUp-message"></span>
                            </label>
                        </div>
    
                        <div class="signUp-input-area mg">
                            <span class="box int_userGender">
                                <input type="radio" name="userGender" id="userGenderMale" class="int" value="M">
                                <label for="userGenderMale">남자</label>
                            </span>
    
                            <span class="box int_userGender">
                                <input type="radio" name="userGender" id="userGenderFemale" class="int" value="F">
                                <label for="userGenderFemale">여자</label>
                            </span>
                        </div>

                        <br>
    
                        <!-- [선택] 주소 -->
                        <div class="form-title">
                            <label for="userAddress">
                                <span>주소</span>
                            </label>
                        </div>
    
                        <div class="signUp-input-area addr">
                            <span class="box int_userAddress">
                                <input type="text" name="userAddress" placeholder="우편번호" maxlength="6"
                                    id="sample6_postcode">
                                <button type="button" id="addressCheckBtn" onclick="sample6_execDaumPostcode()">검색</button>
                            </span>
                            <span class="box int_userAddress2">
                                <input type="text" name="userAddress" placeholder="도로명/지번 주소" id="sample6_address">
                            </span>
                            <span class="box int_userAddress3">
                                <input type="text" name="userAddress" placeholder="상세 주소" id="sample6_detailAddress">
                            </span>
                        </div>

                        <%-- ------------------------------------------------------------------ --%>

                         <!-- 관리자 계정 -->
                         <div class="signUp-input-area">
                            <span class="box int_managerCode">
                                <div>
                                    <input type="hidden" name="managerCode" id="managerCode" placeholder="관리자 코드를 입력해주세요">
                                </div>
                                <div>
                                    <label for="checkCode"><input type="checkbox" id="checkCode" name="checkCode">관리자 코드</label>
                                    <input type="hidden" name="authority" id="authority">
                                    <%-- <input type="checkbox" id="authorityCheck">관리자 코드
                                    <input type="hidden" id="authority" name="authority"> --%>
                                </div>
                            </span>
                        </div>
                        <div class="int_message">
                            <span class="signUp-message" id="managerMessage"></span>
                        </div>
                        
                        <!-- 부제목 -->
                        <div class="titleSub2">
                            <p>기본정보 입력<br><span>회원가입에 필요한 기본정보를 입력해주세요.</span></p>
                        </div>
        
                        <!-- [필수] 아이디 -->
                        <div class="form-title">
                            <label for="userId">
                                <span><span class="required">[필수]</span> 아이디</span>
                                <span class="signUp-message" id="idMessage"></span>
                            </label>
                        </div>

                        <div class="signUp-input-area">
                            <span class="box int_userId">
                                <input type="text" name="userId" id="userId" class="int"
                                placeholder="아이디를 입력해주세요." maxlength="20" autocomplete="off">
                                <%-- <button id="idCheckBtn" type="button">중복 받기</button> --%>
                            </span>
                        </div>
    
                        <!-- [필수] 비밀번호/비밀번호 확인 입력 -->
                        <div class="form-title">
                            <label for="userPw">
                                <span><span class="required">[필수]</span> 비밀번호</span>
                                <span class="signUp-message" id="pwMessage"></span>
                            </label>
                        </div>
    
                        <div class="signUp-input-area pw">
                            <span class="box int_userPw">
                                <input type="password" name="userPw" id="userPw" class="int"
                                placeholder="비밀번호를 입력해주세요." maxlength="20" >
                                <div class="eyes">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <img src="/resources/images/signUp/m_icon_pass.png" id="userPw_img1" class="pswdImg">
                            </span>
                            <span class="box int_userPwConfirm">
                                <input type="password" name="userPwConfirm" id="userPwConfirm" class="int"
                                placeholder="비밀번호 확인" maxlength="20" >
                                <div class="eyes2">
                                    <i class="fas fa-eye"></i>
                                </div>
                                <img src="/resources/images/signUp/m_icon_check_disable.png" id="userPwConfirm_img1" class="pswdImg">
                            </span>
                        </div>
    
                        <!-- [선택] 닉네임 입력 -->
                        <div class="form-title">
                            <label for="userNickname">
                                <span><span class="required">[필수]</span> 닉네임</span>
                                <span class="signUp-message" id="nickMessage"></span>
                            </label>
                        </div>
    
                        <div class="signUp-input-area">
                            <span class="box int_userNickname">
                                <input type="text" name="userNickname" id="userNickname" class="int" value="${param.userNickname}" placeholder="닉네임을 입력해주세요." maxlength="10" >
                                <%-- <button type="button" class="userNickName-btn" id="userNicknameBtn">중복 확인</button> --%>
                            </span>
                        </div>
    
                        <!-- [필수] 이메일 입력 -->
                        <div class="form-title">
                            <label for="userEmail">
                                <span><span class="required">[필수]</span> 이메일</span>
                                <span class="signUp-message" id="emailMessage"></span>
                                <span class="signUp-message" id="authKeyMessage"></span>
                            </label>
                        </div>
    
                        <div class="signUp-input-area email">
                            <span class="box int_userEmail">
                            
                                <input type="text" name="userEmail" id="userEmail" class="int"
                                placeholder="이메일을 입력해주세요." maxlength="30" autocomplete="off" value="${param.userEmail}">
                                <button id="emailBtn" type="button">인증번호 받기</button>
                            </span>
                            <span class="box int_authKey">
                                <input type="text" name="emailAuthKey" id="emailAuthKey"  class="int" s placeholder="인증번호를 입력해주세요." maxlength="6" autocomplete="off" >
                                <div id="emailTimer"></div>
                                <%-- <button id="checkAuthKeyBtn" type="button">인증하기</button> --%>
                            </span>
                        </div>
                        
                    </div>

                    <div class="btn">
                        <a class="back-button" href="/agree">뒤로가기</a>
                        <button type="submit" class="next-button">가입하기</button>
                    </div>
    
                </form>
    
            </section>
        </section>
    </main>

   
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script>
        function sample6_execDaumPostcode() {
            new daum.Postcode({
                oncomplete: function(data) {
                    
                    var addr = ''; // 주소 변수

                    if (data.userSelectedType === 'R') {
                        addr = data.roadAddress;
                    } else { 
                        addr = data.jibunAddress;
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('sample6_postcode').value = data.zonecode;
                    document.getElementById("sample6_address").value = addr;
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

    <script src="/resources/js/user/signUp.js"></script>
     <script src="/resources/js/user/progress.js"></script>




</body>
</html>