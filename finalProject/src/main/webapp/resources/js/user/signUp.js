// 비밀번호 눈 아이콘
$(function () {
    // 패스워드 보이기/감추기 기능
    const togglePasswordVisibility = (inputElement, eyeIcon) => {
        inputElement.toggleClass('active');
        if (inputElement.hasClass('active')) {
            eyeIcon.removeClass('fa-eye').addClass('fa-eye-slash');
            inputElement.attr('type', 'text');
        } else {
            eyeIcon.removeClass('fa-eye-slash').addClass('fa-eye');
            inputElement.attr('type', 'password');
        }
    };

    // 첫 번째 패스워드 입력란
    $('.eyes').on('click', function () {
        const passwordInput = $('.signUp-input-area #userPw');
        const eyeIcon = $(this).find('.fas');
        togglePasswordVisibility(passwordInput, eyeIcon);
    });

    // 두 번째 패스워드 입력란
    $('.eyes2').on('click', function () {
        const confirmPasswordInput = $('.signUp-input-area #userPwConfirm');
        const eyeIcon = $(this).find('.fas');
        togglePasswordVisibility(confirmPasswordInput, eyeIcon);
    });
});

/* ///////////////////////////////////////////////////////////////////////////////////// */

/* 유효성 검사 진행 여부 확인용 객체 */
const checkObj = {
    "userName": false,
    "userBirthDate": false,
    "userTel": false,
    "telAuthKey": false,
    "userId": false,
    "userPw": false,
    "userPwConfirm": false,
    "userNickname": false,
    "userEmail": false,
    "emailAuthKey": false
};

// 이름 유효성 검사
const userName = document.getElementById("userName");
const nameMessage = document.getElementById("nameMessage");

// 이름이 입력 될때 마다
userName.addEventListener("input", () => {

    //입력된 이름이 없을 경우

    if (userName.value.trim().length == 0) {

        userName.value = "";

        nameMessage.innerText = "이름을 입력해주세요.";

        //confirm, error 클래스 삭제해서 검정 글씨로 만들기

        nameMessage.classList.remove("confirm", "error");

        checkObj.userName = false;

        return;
    }

    // 정규 표현식을 이용해서 유효한 형식인지 판별
    // 1) 정규표현식 객체 생성
    const regEx = /^[가-힣]{2,15}$/;

    // 2) 입력받은 이름과 정규식 일치 여부 판별

    if (regEx.test(userName.value)) {
        nameMessage.innerText = "유효한 형식";
        nameMessage.classList.add("confirm");
        nameMessage.classList.remove("error");

        checkObj.userName = true;

    } else {
        nameMessage.innerText = "특수문자,영어,숫자는 사용할수 없습니다. 한글만 입력하여주세요.";
        nameMessage.classList.add("error");
        nameMessage.classList.remove("confirm");

        checkObj.userName = false;
    }

})

// 생년월일 유효성 검사
const userBirthDate = document.getElementById("userBirthDate");
const birthDateMessage = document.getElementById("birthDateMessage");

// 생년월일이 입력 될때 마다
userBirthDate.addEventListener("input", () => {

    //입력된 생년월일이 없을 경우

    if (userBirthDate.value.trim().length == 0) {

        userBirthDate.value = "";

        birthDateMessage.innerText = "생년월일을 입력해주세요.";

        //confirm, error 클래스 삭제해서 검정 글씨로 만들기

        birthDateMessage.classList.remove("confirm", "error");

        checkObj.userBirthDate = false;

        return;
    }

    // 정규 표현식을 이요해서 유효한 형식인지 판별
    // 1) 정규표현식 객체 생성
    const regEx = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

    // 2) 입력받은 생년월일과 정규식 일치 여부 판별

    if (regEx.test(userBirthDate.value)) {
        birthDateMessage.innerText = "유효한 형식";
        birthDateMessage.classList.add("confirm");
        birthDateMessage.classList.remove("error");

        checkObj.userBirthDate = true;

    } else {
        birthDateMessage.innerText = "8자리로 입력해주세요.(-제외)";
        birthDateMessage.classList.add("error");
        birthDateMessage.classList.remove("confirm");

        checkObj.userBirthDate = false;
    }

})

// 휴대폰 번호 유효성 검사
const userTel = document.getElementById("userTel");
const telMessage = document.getElementById("telMessage");
// 생년월일이 입력 될때 마다
userTel.addEventListener("input", () => {

    //입력된 휴대폰 번호가 없을 경우

    if (userTel.value.trim().length == 0) {

        userTel.value = "";

        telMessage.innerText = "휴대폰 번호를 입력해주세요.";

        //confirm, error 클래스 삭제해서 검정 글씨로 만들기

        telMessage.classList.remove("confirm", "error");

        checkObj.userTel = false;

        return;
    }

    // 정규 표현식을 이요해서 유효한 형식인지 판별
    // 1) 정규표현식 객체 생성
    const regEx = /^\d{3}\d{3,4}\d{4}$/;

    // 2) 입력받은 휴대폰 번호 정규식 일치 여부 판별
    if (regEx.test(userTel.value)) { // 유효한 경우

        fetch("/dupCheck/tel?tel=" + userTel.value)

            .then(response => response.text()) // 응답 객체 -> 파싱(parsing, 데이터 형태 변환)

            .then(count => {
                // count : 중복되면 1, 중복 아니면 0
                if (count == 0) {
                    telMessage.innerText = "사용 가능한 휴대폰입니다.";
                    telMessage.classList.add("confirm");
                    telMessage.classList.remove("error");

                    checkObj.userTel = true; // 유효 O

                } else {
                    telMessage.innerText = "이미 사용 중인 휴대폰입니다.";
                    telMessage.classList.add("error");
                    telMessage.classList.remove("confirm");

                    checkObj.userTel = false; // 유효 X
                }
            }) // 파싱한 데이터를 이용해서 수행할 코드 작성

            .catch(err => console.log(err)) // 예외 처리

        /****************************************************************/

    } else { // 유효하지 않은 경우
        telMessage.innerText = "올바른 휴대폰 번호를 입력해주세요.(-제외)";
        telMessage.classList.add("error");
        telMessage.classList.remove("confirm");

        checkObj.userTel = false; // 유효 X
    }

})

//  휴대폰 인증 코드 유효성 검사
const telAuthKey = document.getElementById("telAuthKey");
const telAuthKeyMessage = document.getElementById("telAuthKeyMessage");
const phoneTimer = document.getElementById("phoneTimer");
let authTimer1;
let authMin1 = 2;
let authSec1 = 59;
var code2 = "";
const checkTelAuthKeyBtn = document.getElementById("checkTelAuthKeyBtn");
checkTelAuthKeyBtn.addEventListener("click",()=>{
    authMin1 = 2;
    authSec1 = 59;

    phoneTimer.innerText="";
    clearInterval(authTimer1); 

    phoneTimer.innerText = "03:00";
    phoneTimer.classList.remove("confirm");
    authTimer1 = window.setInterval(()=>{

        phoneTimer.innerText = "0" + authMin1 + ":" + (authSec1<10 ? "0" + authSec1 : authSec1);
    
    // 남은 시간이 0분 0초인 경우
    if(authMin1 == 0 && authSec1 == 0){
        checkObj.authKey = false;
        clearInterval(authTimer1);
        return;
    }

    // 0초인 경우
    if(authSec1 == 0){
        authSec1 = 60;
        authMin1--;
    }
    authSec1--; // 1초 감소

}, 1000)

// fetch("telAuthKey",{
//     method : "POST",
//     headers : {"Content-Type" : "application/json"},
//     body : JSON.stringify({"userTel":userTel.value})
// })
// .then(res => res.text()) // 응답객체를 필요한 형태로 파싱하여 리턴
// .then(res => {
//     console.log("count : "+res);

//     telAuthKey.addEventListener("input", () => {

//         if (telAuthKey.value.trim().length == 0) {

//             telAuthKey.value = "";
    
//             telAuthKeyMessage.innerText = "인증 코드를 입력해주세요.";
    
//             //confirm, error 클래스 삭제해서 검정 글씨로 만들기
    
//             telAuthKeyMessage.classList.remove("confirm", "error");
    
//             checkObj.telAuthKey = false;
    
//             return;
//         } 

//         if (telAuthKey.value == res) {
//             telAuthKeyMessage.innerText = "인증되었습니다.";
//             telAuthKeyMessage.classList.add("confirm");
//             telAuthKeyMessage.classList.remove("error");
//             clearInterval(authTimer1);
//             telAuthKey.disabled = true;
//             emailTimer.innerText = "";
//             checkObj.telAuthKey = true; // 유효 O

//         } else {
//             telAuthKeyMessage.innerText = "다시 입력해주세요.";
//             telAuthKeyMessage.classList.add("error");
//             telAuthKeyMessage.classList.remove("confirm");

//             // e.preventDefault();
//             checkObj.telAuthKey = false; // 유효 X
//         }
//     })

// }) // 파싱된 데이터를 받아서 처리하는 코드 작성 
// .catch(err => {
//     console.log("예외 발생");
//     console.log(err);
// });


})

/* /////////////////////////////////////////////////////////////// */

// 휴대폰 인증 코드가 입력 될때 마다

// telAuthKey.addEventListener("input", () => {

//     //입력된 관리자 코드가 없을 경우

//     if (telAuthKey.value.trim().length == 0) {

//         telAuthKey.value = "";

//         telAuthKeyMessage.innerText = "인증 코드를 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기

//         telAuthKeyMessage.classList.remove("confirm", "error");

//         checkObj.telAuthKey = false;

//         return;
//     }


// })


checkTelAuthKeyBtn.addEventListener("click",()=>{

    alert("인증번호 발송이 완료되었습니다.\n휴대폰에서 인증번호 확인을 해주십시오.");
    var userTel = $("#userTel").val();

    $.ajax({
        type:"GET",
        url:"telAuthKey?userTel=" + userTel,
        cache : false,
        success:function(data){
            
            if(data == "error"){
                alert("휴대폰 번호가 올바르지 않습니다.")
                $("#telAuthKeyMessage").text("유효한 번호를 입력해주세요.");
                $("#telAuthKeyMessage").css("color","red");
                $("#userTel").attr("autofocus",true);
            }else{	        		
                $("#telAuthKey").attr("disabled",false);
                $("#checkTelAuthKeyBtn2").css("display","inline-block");
                $("#telAuthKeyMessage").text("인증번호를 입력한 뒤 본인인증을 눌러주십시오.");
                $("#telAuthKeyMessage").css("color","green");
                $("#userTel").attr("readonly",true);
                code2 = data;
            }
        }
    });
});

//휴대폰 인증번호 대조
$("#telAuthKey").on("input", function() {
    var inputCode = $(this).val();
    if(inputCode == code2) {
        $("#telAuthKeyMessage").text("인증번호가 일치합니다.");
        $("#telAuthKeyMessage").css("color","green");
        $("#phoneDoubleChk").val("true");
        $(this).attr("disabled",true);
        clearInterval(authTimer1);
        $("#phoneTimer").text("");
        checkObj.telAuthKey = true;
    } else {
        $("#telAuthKeyMessage").text("인증번호가 일치하지 않습니다. 확인해주시기 바랍니다.");
        $("#telAuthKeyMessage").css("color","red");
        $("#phoneDoubleChk").val("false");
        checkObj.telAuthKey = false;
    }
});

/* /////////////////////////////////////////////////////////////// */

// 성별 유효성 검사
const userGender = document.querySelectorAll('input[name="userGender"]');
const genderMessage = document.getElementById("genderMessage");

document.getElementById("signUpFrm").addEventListener("submit", e => {
    // 성별 선택 유효성 검사를 위한 변수
    let genderSelected = false;

    // 성별 선택 옵션들을 가져옴
    const userGenderOptions = document.querySelectorAll('input[name="userGender"]');

    // 각 옵션을 확인하여 성별이 선택되었는지 확인
    userGenderOptions.forEach(option => {
        if (option.checked) {
            // 성별이 선택되었다면 플래그를 true로 설정
            genderSelected = true;

            // 성별이 선택되었다는 메시지를 표시
            genderMessage.innerText = "성별이 선택되었습니다.";
            genderMessage.classList.add("confirm");
            genderMessage.classList.remove("error");
        }
    });

    // 성별이 선택되지 않았을 경우
    if (!genderSelected) {
        // 에러 메시지 표시
        const genderMessage = document.getElementById("genderMessage");
        genderMessage.innerText = "성별을 선택해주세요.";
        genderMessage.classList.add("error");
        genderMessage.classList.remove("confirm");
        alert("성별을 선택해주세요");

        // 폼 제출 방지
        e.preventDefault();
    }
});

// 성별 옵션들에 클릭 이벤트 추가하여 선택됐을 때 메시지 표시
userGender.forEach(option => {
    option.addEventListener("click", () => {
        genderMessage.innerText = "성별이 선택되었습니다.";
        genderMessage.classList.add("confirm");
        genderMessage.classList.remove("error");
    });
});

// 관리자 코드
//authority 값을 업데이트하는 함수
document.getElementById("signUpFrm").addEventListener("submit", e => {
    // 관리자 코드 체크 여부 확인
    const managerCode = document.getElementById("managerCode");
    const authority = document.getElementById("authority");
    
    const checkCode = document.getElementById("checkCode").checked;
    // 관리자 코드 체크가 되어 있을 때
    if(checkCode){

        if (managerCode.value.trim().length != 0) {
            // 관리자 코드가 유효하지 않은 경우
            if (!checkObj["managerCode"]) {
                alert("관리자 코드가 유효하지 않습니다.");
                document.getElementById("managerCode").focus();
                // e.preventDefault(); // 이 부분에서 e가 어디서 왔는지 명시되지 않았습니다.
                return; // 함수 종료
            }
            // 관리자 코드가 유효한 경우
            authority.value = 3;
            console.log(authority.value)
    }
    } else {
        authority.value = 1;
        console.log(authority.value)
    }
});

$(function () {
    // 체크박스 클릭 시 관리자 코드 입력란 보이기/숨기기 및 중복 코드 제거
    $('input[type="checkbox"][id="checkCode"]').on('click', function () {
        var chkValue = $(this).prop('checked');
        $('#managerCode').attr('type', chkValue ? "text" : "hidden");

        // 관리자 코드 입력란이 활성화되었을 때 유효성 검사 추가
        if (chkValue) {

            // 관리자 코드가 입력될 때마다 유효성 검사
            $('#managerCode').on('input', function () {

                var managerCode = $(this).val();

                if (managerCode === '') {
                    $('#managerCode').text(""); // 메시지 초기화
                    $('#managerMessage').text("유효하지 않은 관리자 코드입니다.");
                    checkObj.managerCode = false;
                    return;
                }
                // Fetch API를 이용한 AJAX 요청
                fetch("/ManagerCode", {
                    method: "POST",
                    headers: { "Content-Type": "text/plain" }, // 헤더를 text/plain으로 변경
                    body: managerCode // 직접 문자열을 보냄
                })
                    .then(response => response.json())
                    .then(data => {

                        if (data.valid) {
                            $('#managerMessage').text("유효한 관리자 코드입니다.");
                            $('#managerMessage').addClass("confirm").removeClass("error");
                            checkObj.managerCode = true;
                        } else {
                            $('#managerMessage').text("유효하지 않은 관리자 코드입니다.");
                            $('#managerMessage').addClass("error").removeClass("confirm");
                            checkObj.managerCode = false;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        $('#managerMessage').text("서버 오류가 발생했습니다.");
                        $('#managerMessage').addClass("error").removeClass("confirm");
                        checkObj.managerCode = false;
                    });
            }).trigger('input'); // 최초에도 한 번 유효성 검사 실행
        } else {
            // 체크박스가 해제되면 유효성 검사 해제
            $('#managerCode').off('input');
            $('#managerMessage').text(""); // 메시지 초기화
            checkObj.managerCode = true;
        }
    });
});

// 아이디 유효성 검사
const userId = document.getElementById("userId");
const idMessage = document.getElementById("idMessage");

// 아이디가 입력 될때 마다
userId.addEventListener("input", () => {

    //입력된 아이디가 없을 경우

    if (userId.value.trim().length == 0) {

        userId.value = "";

        idMessage.innerText = "아이디를 입력해주세요.";

        //confirm, error 클래스 삭제해서 검정 글씨로 만들기

        idMessage.classList.remove("confirm", "error");

        checkObj.userId = false;

        return;
    }

    const regEx = /^[a-zA-Z0-9-_]{6,20}$/;

    // 2) 입력받은 아이디와 정규식 일치 여부 판별
    if (regEx.test(userId.value)) { // 유효한 경우
     
        fetch("/dupCheck/id?id=" + userId.value)

            .then(response => response.text()) // 응답 객체 -> 파싱(parsing, 데이터 형태 변환)

            .then(count => {
                // count : 중복되면 1, 중복 아니면 0
                if (count == 0) {
                    idMessage.innerText = "사용 가능한 아이디입니다.";
                    idMessage.classList.add("confirm");
                    idMessage.classList.remove("error");

                    checkObj.userId = true; // 유효 O

                } else {
                    idMessage.innerText = "이미 사용 중인 아이디입니다.";
                    idMessage.classList.add("error");
                    idMessage.classList.remove("confirm");

                    checkObj.userId = false; // 유효 X
                }
            }) // 파싱한 데이터를 이용해서 수행할 코드 작성

            .catch(err => console.log(err)) // 예외 처리

    } else { // 유효하지 않은 경우
        idMessage.innerText = "6~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
        idMessage.classList.add("error");
        idMessage.classList.remove("confirm");

        checkObj.userId = false; // 유효 X
    }

})

// 비밀번호 / 비밀번호 확인 유효성 검사
const userPw = document.getElementById("userPw");
const userPwConfirm = document.getElementById("userPwConfirm");
const pwMessage = document.getElementById("pwMessage");

const userPw_img1 = document.querySelector('#userPw_img1');
const userPwConfirm_img1 = document.querySelector('#userPwConfirm_img1');

//비밀번호 입력시 유효성 검사

userPw.addEventListener("input", () => {

    //입력된 비밀번호가 없을 경우
    if (userPw.value.trim().length == 0) {


        userPw.value = "";

        pwMessage.innerText = "비밀번호를 입력해주세요.";

        //confirm, error 클래스 삭제해서 검정 글씨로 만들기
        pwMessage.classList.remove("confirm", "error");

        userPw_img1.src = "/resources/images/signUp/m_icon_pass.png";
        userPwConfirm_img1.src = "/resources/images/signUp/m_icon_check_disable.png";

        checkObj.userPw = false;

        return;
    }


    // 정규 표현식을 이용해서 유효한 형식인지 판별
    // 1) 정규표현식 객체 생성
    const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

    // 2) 입력받은 비밀번호 정규식 일치 여부 판별

    if (regEx.test(userPw.value)) {
        checkObj.userPw = true;

        //비밀번호가 유효하게 작성된 상태에서 비밀번호확인이 입력되지 않았을때
        if (userPwConfirm.value.trim().length == 0) {
            pwMessage.innerText = "유효한 형식";
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");
            userPw_img1.src = "/resources/images/signUp/m_icon_normal.png";
            userPwConfirm_img1.src = "/resources/images/signUp/m_icon_danger.png";

        } else {
            //비밀번호가 유효하게 작성된 상태에서 비밀번호확인 입력되었을때

            // 비밀번호 == 비밀번호 확인이 같을 경우
            if (userPw.value == userPwConfirm.value) {
                pwMessage.innerText = "비밀번호 일치";
                pwMessage.classList.add("confirm");
                pwMessage.classList.remove("error");

                checkObj.userPwConfirm = true;

            } else {
                pwMessage.innerText = "비밀번호 일치하지않음.";
                pwMessage.classList.add("error");
                pwMessage.classList.remove("confirm");
                checkObj.userPwConfirm = false;
                userPw_img1.src = "/resources/images/signUp/m_icon_not_use.png";
                userPwConfirm_img1.src = "/resources/images/signUp/m_icon_danger.png";
            }

        }


    } else {
        pwMessage.innerText = "영어,숫자,특수문자(!,@,#,-,_) 6~20글자 사이로 입력해주세요.";
        pwMessage.classList.add("error");
        pwMessage.classList.remove("confirm");

        userPw_img1.src = "/resources/images/signUp/m_icon_not_use.png";
        userPwConfirm_img1.src = "/resources/images/signUp/m_icon_not_use.png";

        checkObj.userPw = false;
    }

})

// 비밀번호확인 입력시 유효성 검사
userPwConfirm.addEventListener("input", () => {

    if (checkObj.userPw) { //비밀번호가 유효하게 작성된 경우

        // 비밀번호 == 비밀번호 확인이 같을 경우
        if (userPw.value == userPwConfirm.value) {
            pwMessage.innerText = "비밀번호 일치";
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");
            userPw_img1.src = "/resources/images/signUp/m_icon_safe.png";
            userPwConfirm_img1.src = "/resources/images/signUp/m_icon_check_enable.png";

            checkObj.userPwConfirm = true;

        } else {
            pwMessage.innerText = "비밀번호 일치하지않음.";
            pwMessage.classList.add("error");
            pwMessage.classList.remove("confirm");
            checkObj.userPwConfirm = false;
        }

    } else { //비밀번호가 유효하지 않은 경우
        userPw_img1.src = "/resources/images/signUp/m_icon_not_use.png";
        userPwConfirm_img1.src = "/resources/images/signUp/m_icon_not_use.png";
        checkObj.userPwConfirm = false;
    }

})












// 닉네임 유효성 검사 : 한글,영어,숫자로만 2~10글자
const userNickname = document.getElementById("userNickname");
const nickMessage = document.getElementById("nickMessage");

// 닉네임 입력 시 유효성 검사
userNickname.addEventListener("input", () => {

    // 닉네임 입력 X
    if (userNickname.value.trim().length == 0) {
        userNickname.value = "";
        nickMessage.innerText = "닉네임을 입력해주세요.";
        nickMessage.classList.remove("confirm", "error");
        checkObj.userNickname = false;
        return;
    }

    const regEx = /^[A-z가-힇\d]{2,10}$/; // 한글,영어,숫자로만 2~10글자

    // 닉네임 유효성 검사
    if (regEx.test(userNickname.value)) {

        fetch("/dupCheck/nickName?nickName=" + userNickname.value)

        .then(response => response.text()) // 응답 객체 -> 파싱(parsing, 데이터 형태 변환)
        .then(count => {
            // count : 중복되면 1, 중복 아니면 0
            if (count == 0) {
                nickMessage.innerText = "사용 가능한 닉네임입니다.";
                nickMessage.classList.add("confirm");
                nickMessage.classList.remove("error");
                checkObj.userNickname = true; //유효 O

            } else {
                nickMessage.innerText = "이미 사용 중인 닉네임입니다.";
                nickMessage.classList.add("error");
                nickMessage.classList.remove("confirm");

                checkObj.userNickname = false; // 유효 X
            }
        }) // 파싱한 데이터를 이용해서 수행할 코드 작성

        .catch(err => console.log(err)) // 예외 처리

    } else {
        nickMessage.innerText = "한글,영어,숫자로만 2~10글자";
        nickMessage.classList.remove("confirm");
        nickMessage.classList.add("error");
        checkObj.userNickname = false;
        return;
    }
});

//이메일 유효성 검사

const userEmail = document.getElementById("userEmail");
const emailMessage = document.getElementById("emailMessage");

// 이메일이 입력 될때 마다
userEmail.addEventListener("input", () => {

    //입력된 이메일이 없을 경우

    if (userEmail.value.trim().length == 0) {

        userEmail.value = "";

        emailMessage.innerText = "이메일을 입력해주세요.";

        //confirm, error 클래스 삭제해서 검정 글씨로 만들기

        emailMessage.classList.remove("confirm", "error");

        checkObj.userEmail = false;

        return;
    }

    // 정규 표현식을 이요해서 유효한 형식인지 판별
    // 1) 정규표현식 객체 생성
    const regEx = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

    // 2) 입력받은 이메일과 정규식 일치 여부 판별
    if (regEx.test(userEmail.value)) { // 유효한 경우

        fetch("/dupCheck/email?email=" + userEmail.value)

            .then(response => response.text()) // 응답 객체 -> 파싱(parsing, 데이터 형태 변환)

            .then(count => {
                // count : 중복되면 1, 중복 아니면 0
                if (count == 0) {
                    emailMessage.innerText = "사용 가능한 이메일입니다.";
                    emailMessage.classList.add("confirm");
                    emailMessage.classList.remove("error");

                    checkObj.userEmail = true; // 유효 O

                } else {
                    emailMessage.innerText = "이미 사용 중인 이메일입니다.";
                    emailMessage.classList.add("error");
                    emailMessage.classList.remove("confirm");

                    checkObj.userEmail = false; // 유효 X
                }
            }) // 파싱한 데이터를 이용해서 수행할 코드 작성

            .catch(err => console.log(err)) // 예외 처리

        /****************************************************************/

    } else { // 유효하지 않은 경우
        emailMessage.innerText = "이메일 형식이 유효하지 않습니다.";
        emailMessage.classList.add("error");
        emailMessage.classList.remove("confirm");

        checkObj.userEmail = false; // 유효 X
    }

})

//  이메일 인증 코드 유효성 검사
const emailAuthKey = document.getElementById("emailAuthKey");
const authKeyMessage = document.getElementById("authKeyMessage");
const emailTimer = document.getElementById("emailTimer");
let authTimer;
let authMin = 2;
let authSec = 59;

const emailBtn = document.getElementById("emailBtn");
emailBtn.addEventListener("click",()=>{
    authMin = 2;
    authSec = 59;

    emailTimer.innerText="";
    clearInterval(authTimer); 

    emailTimer.innerText = "03:00";
    emailTimer.classList.remove("confirm");
    authTimer = window.setInterval(()=>{

        emailTimer.innerText = "0" + authMin + ":" + (authSec<10 ? "0" + authSec : authSec);
    
    // 남은 시간이 0분 0초인 경우
    if(authMin == 0 && authSec == 0){
        checkObj.authKey = false;
        clearInterval(authTimer);
        return;
    }

    // 0초인 경우
    if(authSec == 0){
        authSec = 60;
        authMin--;
    }
    authSec--; // 1초 감소

}, 1000)


fetch("mailSend",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({"userEmail":userEmail.value})
    })
    .then(res => res.text()) // 응답객체를 필요한 형태로 파싱하여 리턴
    .then(res => {
        console.log("count : "+res);

        emailAuthKey.addEventListener("input", () => {

            if (emailAuthKey.value.trim().length == 0) {

                emailAuthKey.value = "";
        
                authKeyMessage.innerText = "인증 코드를 입력해주세요.";
        
                //confirm, error 클래스 삭제해서 검정 글씨로 만들기
        
                authKeyMessage.classList.remove("confirm", "error");
        
                checkObj.emailAuthKey = false;
        
                return;
            } 

            if (emailAuthKey.value == res) {
                authKeyMessage.innerText = "인증되었습니다.";
                authKeyMessage.classList.add("confirm");
                authKeyMessage.classList.remove("error");
                clearInterval(authTimer);
                emailAuthKey.disabled = true;
                emailTimer.innerText = "";
                checkObj.emailAuthKey = true; // 유효 O
    
            } else {
                authKeyMessage.innerText = "다시 입력해주세요.";
                authKeyMessage.classList.add("error");
                authKeyMessage.classList.remove("confirm");
    
                // e.preventDefault();
                checkObj.emailAuthKey = false; // 유효 X
            }
        })

    }) // 파싱된 데이터를 받아서 처리하는 코드 작성 
    .catch(err => {
        console.log("예외 발생");
        console.log(err);
    });

})

document.getElementById("signUpFrm").addEventListener("submit", e => {

    // checkObj에 모든 value가 true인지 검사
    for (let key in checkObj) {
        if (!checkObj[key]) { // 각 key에 대한 value(true/false)를 얻어와 
            // false인 경우 == 유효하지 않다.
            switch (key) {
                case "userName": alert("이름이 유효하지 않음"); break;
                case "userBirthDate": alert("생년월일이 유효하지 않음"); break;
                case "userTel": alert("휴대폰번호가 유효하지 않음"); break;
                case "telAuthKey": alert("휴대폰 인증코드가 유효하지 않음"); break;
                case "userId": alert("아이디가 유효하지 않음"); break;
                case "userPw": alert("비밀번호가 유효하지 않음"); break;
                case "userPwConfirm": alert("비밀번호 확인이 유효하지 않음"); break;
                case "userNickname": alert("닉네임이 유효하지 않음"); break;
                case "userEmail": alert("이메일이 유효하지 않음"); break;
                case "emailAuthKey": alert("이메일 인증코드가 유효하지 않음"); break;
            }

            // 유효하지 않은 input 태그로 focus 이동
            // - key를 input의 id와 똑같이 설정 했음
            document.getElementById(key).focus();

            // form 태그 기본 이벤트 제거
            e.preventDefault();
            return; // 함수종료
        }
    }

});

// /* 비밀번호 눈표시 */
// $(function () {
//     // 눈표시 클릭 시 패스워드 보이기
//     $('.eyes').on('click', function () {
//         $('.signUp-input-area #userPw').toggleClass('active');

//         if ($('.signUp-input-area #userPw').hasClass('active') == true) {
//             $(this).find('.fa-eye').attr('class', "fas fa-eye-slash").parents('.int_userPw').find('#userPw').attr('type', "text");
//             // i 클래스                // 텍스트 보이기 i 클래스
//         }
//         else {
//             $(this).find('.fa-eye-slash').attr('class', "fas fa-eye").parents('.int_userPw').find('#userPw').attr('type', 'password');
//         }
//     });
// });

// $(function () {
//     // 눈표시 클릭 시 패스워드 보이기
//     $('.eyes2').on('click', function () {
//         $('.signUp-input-area #userPwConfirm').toggleClass('active');

//         if ($('.signUp-input-area #userPwConfirm').hasClass('active') == true) {
//             $(this).find('.fa-eye').attr('class', "fas fa-eye-slash").parents('.int_userPwConfirm').find('#userPwConfirm').attr('type', "text");
//             // i 클래스                // 텍스트 보이기 i 클래스
//         }
//         else {
//             $(this).find('.fa-eye-slash').attr('class', "fas fa-eye").parents('.int_userPwConfirm').find('#userPwConfirm').attr('type', 'password');
//         }
//     });
// });

// /* 유효성 검사 진행 여부 확인용 객체 */
// const checkObj = {
//     "userName": false,
//     "userBirthDate": false,
//     "userTel": false,
//     "telAuthKey": false,
//     //"managerCode": false,
//     "userId": false,
//     "userPw": false,
//     "userPwConfirm": false,
//     "userNickname": false,
//     "userEmail": false,
//     "emailAuthKey": false
// };

// // 이름 유효성 검사
// const userName = document.getElementById("userName");
// const nameMessage = document.getElementById("nameMessage");

// // 이름이 입력 될때 마다
// userName.addEventListener("input", () => {

//     //입력된 이름이 없을 경우

//     if (userName.value.trim().length == 0) {

//         userName.value = "";

//         nameMessage.innerText = "이름을 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기

//         nameMessage.classList.remove("confirm", "error");

//         checkObj.userName = false;

//         return;
//     }

//     // 정규 표현식을 이용해서 유효한 형식인지 판별
//     // 1) 정규표현식 객체 생성
//     const regEx = /^[가-힣]{2,15}$/;

//     // 2) 입력받은 이름과 정규식 일치 여부 판별

//     if (regEx.test(userName.value)) {
//         nameMessage.innerText = "유효한 형식";
//         nameMessage.classList.add("confirm");
//         nameMessage.classList.remove("error");

//         checkObj.userName = true;

//     } else {
//         nameMessage.innerText = "특수문자,영어,숫자는 사용할수 없습니다. 한글만 입력하여주세요.";
//         nameMessage.classList.add("error");
//         nameMessage.classList.remove("confirm");

//         checkObj.userName = false;
//     }

// })

// // 생년월일 유효성 검사
// const userBirthDate = document.getElementById("userBirthDate");
// const birthDateMessage = document.getElementById("birthDateMessage");

// // 생년월일이 입력 될때 마다
// userBirthDate.addEventListener("input", () => {

//     //입력된 생년월일이 없을 경우

//     if (userBirthDate.value.trim().length == 0) {

//         userBirthDate.value = "";

//         birthDateMessage.innerText = "생년월일을 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기

//         birthDateMessage.classList.remove("confirm", "error");

//         checkObj.userBirthDate = false;

//         return;
//     }

//     // 정규 표현식을 이요해서 유효한 형식인지 판별
//     // 1) 정규표현식 객체 생성
//     const regEx = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

//     // 2) 입력받은 생년월일과 정규식 일치 여부 판별

//     if (regEx.test(userBirthDate.value)) {
//         birthDateMessage.innerText = "유효한 형식";
//         birthDateMessage.classList.add("confirm");
//         birthDateMessage.classList.remove("error");

//         checkObj.userBirthDate = true;

//     } else {
//         birthDateMessage.innerText = "8자리로 입력해주세요.(-제외)";
//         birthDateMessage.classList.add("error");
//         birthDateMessage.classList.remove("confirm");

//         checkObj.userBirthDate = false;
//     }

// })

// // 휴대폰 번호
// const userTel = document.getElementById("userTel");
// const telMessage = document.getElementById("telMessage");
// // 생년월일이 입력 될때 마다
// userTel.addEventListener("input", () => {

//     //입력된 생년월일이 없을 경우

//     if (userTel.value.trim().length == 0) {

//         userTel.value = "";

//         telMessage.innerText = "생년월일을 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기

//         telMessage.classList.remove("confirm", "error");

//         checkObj.userTel = false;

//         return;
//     }

//     // 정규 표현식을 이요해서 유효한 형식인지 판별
//     // 1) 정규표현식 객체 생성
//     const regEx = /^\d{3}\d{3,4}\d{4}$/;

//     // 2) 입력받은 생년월일과 정규식 일치 여부 판별

//     if (regEx.test(userTel.value)) {
//         telMessage.innerText = "유효한 형식";
//         telMessage.classList.add("confirm");
//         telMessage.classList.remove("error");

//         checkObj.userTel = true;

//     } else {
//         telMessage.innerText = "8자리로 입력해주세요.(-제외)";
//         telMessage.classList.add("error");
//         telMessage.classList.remove("confirm");

//         checkObj.userTel = false;
//     }

// })

// const userGender = document.querySelectorAll('input[name="userGender"]');
// const genderMessage = document.getElementById("genderMessage");

// document.getElementById("signUpFrm").addEventListener("submit", e => {
//     // 성별 선택 유효성 검사를 위한 변수
//     let genderSelected = false;

    
//     // 성별 선택 옵션들을 가져옴
//     const userGenderOptions = document.querySelectorAll('input[name="userGender"]');

//     // 각 옵션을 확인하여 성별이 선택되었는지 확인
//     userGenderOptions.forEach(option => {
//         if (option.checked) {
//             // 성별이 선택되었다면 플래그를 true로 설정
//             genderSelected = true;
//         }
//     });

//     // 성별이 선택되지 않았을 경우
//     if (!genderSelected) {
//         // 에러 메시지 표시
//         const genderMessage = document.getElementById("genderMessage");
//         genderMessage.innerText = "성별을 선택해주세요.";
//         genderMessage.classList.add("error");
//         genderMessage.classList.remove("confirm");
//         alert("성별을 선택해주세요");

//         // 폼 제출 방지
//         e.preventDefault();
//     }
// });

// //  휴대폰 인증 코드 유효성 검사
// const telAuthKey = document.getElementById("telAuthKey");
// const telAuthKeyMessage = document.getElementById("telAuthKeyMessage");

// // 휴대폰 인증 코드가 입력 될때 마다

// telAuthKey.addEventListener("input", () => {

//     //입력된 관리자 코드가 없을 경우

//     if (telAuthKey.value.trim().length == 0) {

//         telAuthKey.value = "";

//         telAuthKeyMessage.innerText = "인증 코드를 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기

//         telAuthKeyMessage.classList.remove("confirm", "error");

//         checkObj.telAuthKey = false;

//         return;
//     }

//     //  유효한 형식인지 판별
//     // 1) 휴대폰 인증 코드 객체 생성
//     let code = "qwe";

//     // 2) 입력받은 휴대폰 인증 코드와 제공한 인증 코드 비교

//     if (code == telAuthKey.value) {
//         telAuthKeyMessage.innerText = "인증되었습니다..";
//         telAuthKeyMessage.classList.add("confirm");
//         telAuthKeyMessage.classList.remove("error");

//         checkObj.telAuthKey = true;

//     } else {
//         telAuthKeyMessage.innerText = "유효한 인증 코드가 아닙니다.";
//         telAuthKeyMessage.classList.add("error");
//         telAuthKeyMessage.classList.remove("confirm");

//         checkObj.telAuthKey = false;
//     }

// })


// // $(document).ready(function() {
// //     $('#checkCode').on('click', function(e) {
// //         if ($('#checkCode').is(':checked')) {
// //             // 체크박스가 체크된 경우 authority 값을 3으로 설정
// //             $('#authority').val(3);
// //             console.log( $('#authority').val());
// //         } else {
// //             // 체크박스가 체크 해제된 경우 authority 값을 1으로 설정
// //             $('#authority').val(1);
// //             console.log( $('#authority').val());
// //         }
// //         // 폼 제출
// //         return;
// //     });
// // });


// /* $(document).ready(function() {
//     $('#signUpFrm').on('submit', function(e) {
//         if ($('#authority').is(':checked')) {
//             // 체크박스가 체크된 경우 authority 값을 3으로 설정
//             $('#authority').val(3);
//         } else {
//             // 체크박스가 체크 해제된 경우 authority 값을 1으로 설정
//             $('#authority').val(1);
//         }
//         // 폼 제출
//         return;
//     });
// }); */

// //authority 값을 업데이트하는 함수
// document.getElementById("signUpFrm").addEventListener("submit", e => {
//     // 관리자 코드 체크 여부 확인
//     const managerCode = document.getElementById("managerCode");
//     const authority = document.getElementById("authority");
    
//     const checkCode = document.getElementById("checkCode").checked;
//     // 관리자 코드 체크가 되어 있을 때
//     if(checkCode){

//         if (managerCode.value.trim().length != 0) {
//             // 관리자 코드가 유효하지 않은 경우
//             if (!checkObj["managerCode"]) {
//                 alert("관리자 코드가 유효하지 않습니다.");
//                 document.getElementById("managerCode").focus();
//                 // e.preventDefault(); // 이 부분에서 e가 어디서 왔는지 명시되지 않았습니다.
//                 return; // 함수 종료
//             }
//             // 관리자 코드가 유효한 경우
//             authority.value = 3;
//             console.log(authority.value)
//     }
//     } else {
//         authority.value = 1;
//         console.log(authority.value)
//     }
// });

// // 관리자 코드
// $(function () {
//     // 체크박스 클릭 시 관리자 코드 입력란 보이기/숨기기 및 중복 코드 제거
//     $('input[type="checkbox"][id="checkCode"]').on('click', function () {
//         var chkValue = $(this).prop('checked');
//         $('#managerCode').attr('type', chkValue ? "text" : "hidden");

//         // 관리자 코드 입력란이 활성화되었을 때 유효성 검사 추가
//         if (chkValue) {

//             // 관리자 코드가 입력될 때마다 유효성 검사
//             $('#managerCode').on('input', function () {

//                 var managerCode = $(this).val();

//                 if (managerCode === '') {
//                     $('#managerCode').text(""); // 메시지 초기화
//                     return;
//                 }
//                 // Fetch API를 이용한 AJAX 요청
//                 fetch("/ManagerCode", {
//                     method: "POST",
//                     headers: { "Content-Type": "text/plain" }, // 헤더를 text/plain으로 변경
//                     body: managerCode // 직접 문자열을 보냄
//                 })
//                     .then(response => response.json())
//                     .then(data => {

//                         if (data.valid) {
//                             $('#managerMessage').text("유효한 관리자 코드입니다.");
//                             $('#managerMessage').addClass("confirm").removeClass("error");
//                             checkObj.managerCode = true;
//                         } else {
//                             $('#managerMessage').text("유효하지 않은 관리자 코드입니다.");
//                             $('#managerMessage').addClass("error").removeClass("confirm");
//                             checkObj.managerCode = false;
//                         }
//                     })
//                     .catch(error => {
//                         console.log(error);
//                         $('#managerMessage').text("서버 오류가 발생했습니다.");
//                         $('#managerMessage').addClass("error").removeClass("confirm");
//                         checkObj.managerCode = false;
//                     });
//             }).trigger('input'); // 최초에도 한 번 유효성 검사 실행
//         } else {
//             // 체크박스가 해제되면 유효성 검사 해제
//             $('#managerCode').off('input');
//             $('#managerMessage').text(""); // 메시지 초기화
//             checkObj.managerCode = true;
//         }
//     });
// });

// // 아이디 유효성 검사
// const userId = document.getElementById("userId");
// const idMessage = document.getElementById("idMessage");

// // 아이디가 입력 될때 마다
// userId.addEventListener("input", () => {

//     //입력된 아이디가 없을 경우

//     if (userId.value.trim().length == 0) {

//         userId.value = "";

//         idMessage.innerText = "아이디를 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기

//         idMessage.classList.remove("confirm", "error");

//         checkObj.userId = false;

//         return;
//     }

//     // 정규 표현식을 이요해서 유효한 형식인지 판별
//     // 1) 정규표현식 객체 생성
//     const regEx = /^[a-zA-Z0-9-_]{6,20}$/;

//     // 2) 입력받은 아이디와 정규식 일치 여부 판별
//     if (regEx.test(userId.value)) { // 유효한 경우

//         /****************************************************************/
//         /* fetch() API를 이용한 ajax(비동기 통신) */

//         // GET 방식 ajax 요청(파라미터는 쿼리스트링으로!)
//         fetch("/dupCheck/id?id=" + userId.value)

//             .then(response => response.text()) // 응답 객체 -> 파싱(parsing, 데이터 형태 변환)

//             .then(count => {
//                 // count : 중복되면 1, 중복 아니면 0
//                 if (count == 0) {
//                     idMessage.innerText = "사용 가능한 아이디입니다.";
//                     idMessage.classList.add("confirm");
//                     idMessage.classList.remove("error");

//                     checkObj.userId = true; // 유효 O

//                 } else {
//                     idMessage.innerText = "이미 사용 중인 아이디입니다.";
//                     idMessage.classList.add("error");
//                     idMessage.classList.remove("confirm");

//                     checkObj.userId = false; // 유효 X
//                 }
//             }) // 파싱한 데이터를 이용해서 수행할 코드 작성

//             .catch(err => console.log(err)) // 예외 처리

//         /****************************************************************/

//     } else { // 유효하지 않은 경우
//         idMessage.innerText = "6~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
//         idMessage.classList.add("error");
//         idMessage.classList.remove("confirm");

//         checkObj.userId = false; // 유효 X
//     }

// })


// // 비밀번호 / 비밀번호 확인 유효성 검사
// const userPw = document.getElementById("userPw");
// const userPwConfirm = document.getElementById("userPwConfirm");
// const pwMessage = document.getElementById("pwMessage");

// const userPw_img1 = document.querySelector('#userPw_img1');
// const userPwConfirm_img1 = document.querySelector('#userPwConfirm_img1');

// //비밀번호 입력시 유효성 검사

// userPw.addEventListener("input", () => {

//     //입력된 비밀번호가 없을 경우
//     if (userPw.value.trim().length == 0) {


//         userPw.value = "";

//         pwMessage.innerText = "비밀번호를 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기
//         pwMessage.classList.remove("confirm", "error");

//         userPw_img1.src = "/resources/images/signUp/m_icon_pass.png";
//         userPwConfirm_img1.src = "/resources/images/signUp/m_icon_check_disable.png";

//         checkObj.userPw = false;

//         return;
//     }


//     // 정규 표현식을 이용해서 유효한 형식인지 판별
//     // 1) 정규표현식 객체 생성
//     const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

//     // 2) 입력받은 비밀번호 정규식 일치 여부 판별

//     if (regEx.test(userPw.value)) {
//         checkObj.userPw = true;

//         //비밀번호가 유효하게 작성된 상태에서 비밀번호확인이 입력되지 않았을때
//         if (userPwConfirm.value.trim().length == 0) {
//             pwMessage.innerText = "유효한 형식";
//             pwMessage.classList.add("confirm");
//             pwMessage.classList.remove("error");
//             userPw_img1.src = "/resources/images/signUp/m_icon_normal.png";
//             userPwConfirm_img1.src = "/resources/images/signUp/m_icon_danger.png";

//         } else {
//             //비밀번호가 유효하게 작성된 상태에서 비밀번호확인 입력되었을때

//             // 비밀번호 == 비밀번호 확인이 같을 경우
//             if (userPw.value == userPwConfirm.value) {
//                 pwMessage.innerText = "비밀번호 일치";
//                 pwMessage.classList.add("confirm");
//                 pwMessage.classList.remove("error");

//                 checkObj.userPwConfirm = true;

//             } else {
//                 pwMessage.innerText = "비밀번호 일치하지않음.";
//                 pwMessage.classList.add("error");
//                 pwMessage.classList.remove("confirm");
//                 checkObj.userPwConfirm = false;
//                 userPw_img1.src = "/resources/images/signUp/m_icon_not_use.png";
//                 userPwConfirm_img1.src = "/resources/images/signUp/m_icon_danger.png";
//             }

//         }


//     } else {
//         pwMessage.innerText = "영어,숫자,특수문자(!,@,#,-,_) 6~20글자 사이로 입력해주세요.";
//         pwMessage.classList.add("error");
//         pwMessage.classList.remove("confirm");

//         userPw_img1.src = "/resources/images/signUp/m_icon_not_use.png";
//         userPwConfirm_img1.src = "/resources/images/signUp/m_icon_not_use.png";

//         checkObj.userPw = false;
//     }

// })

// //비밀번호확인 입력시 유효성 검사

// userPwConfirm.addEventListener("input", () => {

//     if (checkObj.userPw) { //비밀번호가 유효하게 작성된 경우

//         // 비밀번호 == 비밀번호 확인이 같을 경우
//         if (userPw.value == userPwConfirm.value) {
//             pwMessage.innerText = "비밀번호 일치";
//             pwMessage.classList.add("confirm");
//             pwMessage.classList.remove("error");
//             userPw_img1.src = "/resources/images/signUp/m_icon_safe.png";
//             userPwConfirm_img1.src = "/resources/images/signUp/m_icon_check_enable.png";

//             checkObj.userPwConfirm = true;

//         } else {
//             pwMessage.innerText = "비밀번호 일치하지않음.";
//             pwMessage.classList.add("error");
//             pwMessage.classList.remove("confirm");
//             checkObj.userPwConfirm = false;
//         }

//     } else { //비밀번호가 유효하지 않은 경우
//         userPw_img1.src = "/resources/images/signUp/m_icon_not_use.png";
//         userPwConfirm_img1.src = "/resources/images/signUp/m_icon_not_use.png";
//         checkObj.userPwConfirm = false;
//     }

// })


// // 닉네임 유효성 검사 : 한글,영어,숫자로만 2~10글자
// const userNickname = document.getElementById("userNickname");
// const nickMessage = document.getElementById("nickMessage");

// // 닉네임 입력 시 유효성 검사
// userNickname.addEventListener("input", () => {

//     // 닉네임 입력 X
//     if (userNickname.value.trim().length == 0) {
//         userNickname.value = "";
//         nickMessage.innerText = "닉네임을 입력해주세요.";
//         nickMessage.classList.remove("confirm", "error");
//         checkObj.userNickname = false;
//         return;
//     }

//     const regEx = /^[A-z가-힇\d]{2,10}$/; // 한글,영어,숫자로만 2~10글자

//     // 닉네임 유효성 검사
//     if (regEx.test(userNickname.value)) {
//         /****************************************************************/
//         /* fetch() API를 이용한 ajax(비동기 통신) */

//         // GET 방식 ajax 요청(파라미터는 쿼리스트링으로!)
//         fetch("/dupCheck/nickName?nickName=" + userNickname.value)

//             .then(response => response.text()) // 응답 객체 -> 파싱(parsing, 데이터 형태 변환)

//             .then(count => {
//                 // count : 중복되면 1, 중복 아니면 0
//                 if (count == 0) {
//                     nickMessage.innerText = "사용 가능한 닉네임입니다.";
//                     nickMessage.classList.add("confirm");
//                     nickMessage.classList.remove("error");

//                     checkObj.userNickname = true; // 유효 O

//                 } else {
//                     nickMessage.innerText = "이미 사용 중인 닉네임입니다.";
//                     nickMessage.classList.add("error");
//                     nickMessage.classList.remove("confirm");

//                     checkObj.userNickname = false; // 유효 X
//                 }
//             }) // 파싱한 데이터를 이용해서 수행할 코드 작성

//             .catch(err => console.log(err)) // 예외 처리

//         /****************************************************************/
        
//     } else {
//         nickMessage.innerText = "한글,영어,숫자로만 2~10글자";
//         nickMessage.classList.remove("confirm");
//         nickMessage.classList.add("error");
//         checkObj.userNickname = false;
//         return;
//     }
// });


// //이메일 유효성 검사

// const userEmail = document.getElementById("userEmail");
// const emailMessage = document.getElementById("emailMessage");

// // 이메일이 입력 될때 마다
// userEmail.addEventListener("input", () => {

//     //입력된 이메일이 없을 경우

//     if (userEmail.value.trim().length == 0) {

//         userEmail.value = "";

//         emailMessage.innerText = "이메일을 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기

//         emailMessage.classList.remove("confirm", "error");

//         checkObj.userEmail = false;

//         return;
//     }

//     // 정규 표현식을 이요해서 유효한 형식인지 판별
//     // 1) 정규표현식 객체 생성
//     // const regEx = /^[A-Za-z\d\-_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;
//     const regEx = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

//     // 2) 입력받은 이메일과 정규식 일치 여부 판별
//     if (regEx.test(userEmail.value)) { // 유효한 경우

//         /****************************************************************/
//         /* fetch() API를 이용한 ajax(비동기 통신) */

//         // GET 방식 ajax 요청(파라미터는 쿼리스트링으로!)
//         fetch("/dupCheck/email?email=" + userEmail.value)

//             .then(response => response.text()) // 응답 객체 -> 파싱(parsing, 데이터 형태 변환)

//             .then(count => {
//                 // count : 중복되면 1, 중복 아니면 0
//                 if (count == 0) {
//                     emailMessage.innerText = "사용 가능한 이메일입니다.";
//                     emailMessage.classList.add("confirm");
//                     emailMessage.classList.remove("error");

//                     checkObj.userEmail = true; // 유효 O

//                 } else {
//                     emailMessage.innerText = "이미 사용 중인 이메일입니다.";
//                     emailMessage.classList.add("error");
//                     emailMessage.classList.remove("confirm");

//                     checkObj.userEmail = false; // 유효 X
//                 }
//             }) // 파싱한 데이터를 이용해서 수행할 코드 작성

//             .catch(err => console.log(err)) // 예외 처리

//         /****************************************************************/

//     } else { // 유효하지 않은 경우
//         emailMessage.innerText = "이메일 형식이 유효하지 않습니다.";
//         emailMessage.classList.add("error");
//         emailMessage.classList.remove("confirm");

//         checkObj.userEmail = false; // 유효 X
//     }

// })

// //  이메일 인증 코드 유효성 검사
// const emailAuthKey = document.getElementById("emailAuthKey");
// const authKeyMessage = document.getElementById("authKeyMessage");

// const emailBtn = document.getElementById("emailBtn");
// emailBtn.addEventListener("click",()=>{

// fetch("mailSend",{
//         method : "POST",
//         headers : {"Content-Type" : "application/json"},
//         body : JSON.stringify({"userEmail":userEmail.value})
//     })
//     .then(res => res.text()) // 응답객체를 필요한 형태로 파싱하여 리턴
//     .then(res => {
//         console.log("count : "+res);

//         emailAuthKey.addEventListener("input", () => {

//             if (emailAuthKey.value.trim().length == 0) {

//                 emailAuthKey.value = "";
        
//                 authKeyMessage.innerText = "인증 코드를 입력해주세요.";
        
//                 //confirm, error 클래스 삭제해서 검정 글씨로 만들기
        
//                 authKeyMessage.classList.remove("confirm", "error");
        
//                 checkObj.emailAuthKey = false;
        
//                 return;
//             } 
//             if (emailAuthKey.value == res) {
//                 authKeyMessage.innerText = "인증되었습니다.";
//                 authKeyMessage.classList.add("confirm");
//                 authKeyMessage.classList.remove("error");
    
//                 checkObj.emailAuthKey = true; // 유효 O
    
//             } else {
//                 authKeyMessage.innerText = "다시 입력해주세요.";
//                 authKeyMessage.classList.add("error");
//                 authKeyMessage.classList.remove("confirm");
    
//                 // e.preventDefault();
//                 checkObj.emailAuthKey = false; // 유효 X
//             }
//         })


//     }) // 파싱된 데이터를 받아서 처리하는 코드 작성 
//     .catch(err => {
//         console.log("예외 발생");
//         console.log(err);
//     });
// })



// document.getElementById("signUpFrm").addEventListener("submit", e => {

//     // checkObj에 모든 value가 true인지 검사
//     for (let key in checkObj) {
//         if (!checkObj[key]) { // 각 key에 대한 value(true/false)를 얻어와 
//             // false인 경우 == 유효하지 않다.
//             switch (key) {
//                 case "userName": alert("이름이 유효하지 않음"); break;
//                 case "userBirthDate": alert("생년월일이 유효하지 않음"); break;
//                 case "userTel": alert("휴대폰번호가 유효하지 않음"); break;
//                 case "telAuthKey": alert("휴대폰 인증코드가 유효하지 않음"); break;
//                 //case "managerCode": alert("관리자 인증코드가 유효하지 않음"); break;
//                 case "userId": alert("아이디가 유효하지 않음"); break;
//                 case "userPw": alert("비밀번호가 유효하지 않음"); break;
//                 case "userPwConfirm": alert("비밀번호 확인이 유효하지 않음"); break;
//                 case "userNickname": alert("닉네임이 유효하지 않음"); break;
//                 case "userEmail": alert("이메일이 유효하지 않음"); break;
//                 case "emailAuthKey": alert("이메일 인증코드가 유효하지 않음"); break;
//             }

//             // 유효하지 않은 input 태그로 focus 이동
//             // - key를 input의 id와 똑같이 설정 했음
//             document.getElementById(key).focus();

//             // form 태그 기본 이벤트 제거
//             e.preventDefault();
//             return; // 함수종료
//         }
//     }

// });





























// // 페이지가 로드될 때 실행할 함수
// window.onload = function () {
//     updateAuthority();
// };

// // authority 값을 업데이트하는 함수
// function updateAuthority() {
//     // 관리자 코드 체크 여부 확인
//     const managerCodeChecked = document.getElementById("checkCode");
//     const managerCode = document.getElementById("managerCode");
//     const authority = document.getElementById("authority");

//     // 관리자 코드 체크가 되어 있을 때
//     if (managerCode.value.trim().length != 0) {
//         // 관리자 코드가 유효하지 않은 경우
//         if (!checkObj["managerCode"]) {
//             alert("관리자 코드가 유효하지 않습니다.");
//             document.getElementById("managerCode").focus();
//             // e.preventDefault(); // 이 부분에서 e가 어디서 왔는지 명시되지 않았습니다.
//             return; // 함수 종료
//         }
//         // 관리자 코드가 유효한 경우
//         authority.value = 3;
//     } else {
//         authority.value = 1;
//     }
// }

// /* 비밀번호 눈표시 */
// $(function () {
//     // 눈표시 클릭 시 패스워드 보이기
//     $('.eyes').on('click', function () {
//         $('.signUp-input-area #userPw').toggleClass('active');

//         if ($('.signUp-input-area #userPw').hasClass('active') == true) {
//             $(this).find('.fa-eye').attr('class', "fas fa-eye-slash").parents('.int_userPw').find('#userPw').attr('type', "text");
//             // i 클래스                // 텍스트 보이기 i 클래스
//         }
//         else {
//             $(this).find('.fa-eye-slash').attr('class', "fas fa-eye").parents('.int_userPw').find('#userPw').attr('type', 'password');
//         }
//     });
// });

// $(function () {
//     // 눈표시 클릭 시 패스워드 보이기
//     $('.eyes2').on('click', function () {
//         $('.signUp-input-area #userPwConfirm').toggleClass('active');

//         if ($('.signUp-input-area #userPwConfirm').hasClass('active') == true) {
//             $(this).find('.fa-eye').attr('class', "fas fa-eye-slash").parents('.int_userPwConfirm').find('#userPwConfirm').attr('type', "text");
//             // i 클래스                // 텍스트 보이기 i 클래스
//         }
//         else {
//             $(this).find('.fa-eye-slash').attr('class', "fas fa-eye").parents('.int_userPwConfirm').find('#userPwConfirm').attr('type', 'password');
//         }
//     });
// });

// /* 유효성 검사 진행 여부 확인용 객체 */
// const checkObj = {
//     "userName": false,
//     "userBirthDate": false,
//     "userTel": false,
//     "telAuthKey": false,
//     // "userGender": false,
//     "userId": false,
//     "userPw": false,
//     "userPwConfirm": false,
//     "userNickname": false,
//     "userEmail": false,
//     "authKey": false
// };

// // 이름 유효성 검사
// const userName = document.getElementById("userName");
// const nameMessage = document.getElementById("nameMessage");

// // 이름이 입력 될때 마다
// userName.addEventListener("input", () => {

//     //입력된 이름이 없을 경우

//     if (userName.value.trim().length == 0) {

//         userName.value = "";

//         nameMessage.innerText = "이름을 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기

//         nameMessage.classList.remove("confirm", "error");

//         checkObj.userName = false;

//         return;
//     }

//     // 정규 표현식을 이용해서 유효한 형식인지 판별
//     // 1) 정규표현식 객체 생성
//     const regEx = /^[가-힣]{2,15}$/;

//     // 2) 입력받은 이름과 정규식 일치 여부 판별

//     if (regEx.test(userName.value)) {
//         nameMessage.innerText = "유효한 형식";
//         nameMessage.classList.add("confirm");
//         nameMessage.classList.remove("error");

//         checkObj.userName = true;

//     } else {
//         nameMessage.innerText = "특수문자,영어,숫자는 사용할수 없습니다. 한글만 입력하여주세요.";
//         nameMessage.classList.add("error");
//         nameMessage.classList.remove("confirm");

//         checkObj.userName = false;
//     }

// })

// // 생년월일 유효성 검사
// const userBirthDate = document.getElementById("userBirthDate");
// const birthDateMessage = document.getElementById("birthDateMessage");

// // 생년월일이 입력 될때 마다
// userBirthDate.addEventListener("input", () => {

//     //입력된 생년월일이 없을 경우

//     if (userBirthDate.value.trim().length == 0) {

//         userBirthDate.value = "";

//         birthDateMessage.innerText = "생년월일을 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기

//         birthDateMessage.classList.remove("confirm", "error");

//         checkObj.userBirthDate = false;

//         return;
//     }

//     // 정규 표현식을 이요해서 유효한 형식인지 판별
//     // 1) 정규표현식 객체 생성
//     const regEx = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

//     // 2) 입력받은 생년월일과 정규식 일치 여부 판별

//     if (regEx.test(userBirthDate.value)) {
//         birthDateMessage.innerText = "유효한 형식";
//         birthDateMessage.classList.add("confirm");
//         birthDateMessage.classList.remove("error");

//         checkObj.userBirthDate = true;

//     } else {
//         birthDateMessage.innerText = "8자리로 입력해주세요.(-제외)";
//         birthDateMessage.classList.add("error");
//         birthDateMessage.classList.remove("confirm");

//         checkObj.userBirthDate = false;
//     }

// })

// // 휴대폰 번호
// const userTel = document.getElementById("userTel");
// const telMessage = document.getElementById("telMessage");
// // 생년월일이 입력 될때 마다
// userTel.addEventListener("input", () => {

//     //입력된 생년월일이 없을 경우

//     if (userTel.value.trim().length == 0) {

//         userTel.value = "";

//         telMessage.innerText = "생년월일을 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기

//         telMessage.classList.remove("confirm", "error");

//         checkObj.userTel = false;

//         return;
//     }

//     // 정규 표현식을 이요해서 유효한 형식인지 판별
//     // 1) 정규표현식 객체 생성
//     const regEx = /^\d{3}\d{3,4}\d{4}$/;

//     // 2) 입력받은 생년월일과 정규식 일치 여부 판별

//     if (regEx.test(userTel.value)) {
//         telMessage.innerText = "유효한 형식";
//         telMessage.classList.add("confirm");
//         telMessage.classList.remove("error");

//         checkObj.userTel = true;

//     } else {
//         telMessage.innerText = "8자리로 입력해주세요.(-제외)";
//         telMessage.classList.add("error");
//         telMessage.classList.remove("confirm");

//         checkObj.userTel = false;
//     }

// })

// const userGender = document.querySelectorAll('input[name="userGender"]');
// const genderMessage = document.getElementById("genderMessage");

// document.getElementById("signUpFrm").addEventListener("submit", e => {
//     // 성별 선택 유효성 검사를 위한 변수
//     let genderSelected = false;

//     // 성별 선택 옵션들을 가져옴
//     const userGenderOptions = document.querySelectorAll('input[name="userGender"]');

//     // 각 옵션을 확인하여 성별이 선택되었는지 확인
//     userGenderOptions.forEach(option => {
//         if (option.checked) {
//             // 성별이 선택되었다면 플래그를 true로 설정
//             genderSelected = true;
//         }
//     });

//     // 성별이 선택되지 않았을 경우
//     if (!genderSelected) {
//         // 에러 메시지 표시
//         const genderMessage = document.getElementById("genderMessage");
//         genderMessage.innerText = "성별을 선택해주세요.";
//         genderMessage.classList.add("error");
//         genderMessage.classList.remove("confirm");
//         alert("성별을 선택해주세요");

//         // 폼 제출 방지
//         e.preventDefault();
//     }
// });

// //  이메일 인증 코드 유효성 검사
// const telAuthKey = document.getElementById("telAuthKey");
// const telAuthKeyMessage = document.getElementById("telAuthKeyMessage");

// // 관리자 코드가 입력 될때 마다

// telAuthKey.addEventListener("input", () => {

//     //입력된 관리자 코드가 없을 경우

//     if (telAuthKey.value.trim().length == 0) {

//         telAuthKey.value = "";

//         telAuthKeyMessage.innerText = "인증 코드를 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기

//         telAuthKeyMessage.classList.remove("confirm", "error");

//         checkObj.telAuthKey = false;

//         return;
//     }

//     //  유효한 형식인지 판별
//     // 1) 관리자 코드 객체 생성
//     let code = "qwe";

//     // 2) 입력받은 관리자 코드와 제공한 관리자 코드 비교

//     if (code == telAuthKey.value) {
//         telAuthKeyMessage.innerText = "인증되었습니다..";
//         telAuthKeyMessage.classList.add("confirm");
//         telAuthKeyMessage.classList.remove("error");

//         checkObj.telAuthKey = true;

//     } else {
//         telAuthKeyMessage.innerText = "유효한 인증 코드가 아닙니다.";
//         telAuthKeyMessage.classList.add("error");
//         telAuthKeyMessage.classList.remove("confirm");

//         checkObj.telAuthKey = false;
//     }

// })


// // 관리자 코드
// $(function () {
//     // 체크박스 클릭 시 관리자 코드 입력란 보이기/숨기기 및 중복 코드 제거
//     $('input[type="checkbox"][id="checkCode"]').on('click', function () {
//         var chkValue = $(this).prop('checked');
//         $('#managerCode').attr('type', chkValue ? "text" : "hidden");

//         // 관리자 코드 입력란이 활성화되었을 때 유효성 검사 추가
//         if (chkValue) {

//             // 관리자 코드가 입력될 때마다 유효성 검사
//             $('#managerCode').on('input', function () {

//                 var managerCode = $(this).val();

//                 if (managerCode === '') {
//                     $('#managerCode').text(""); // 메시지 초기화
//                     return;
//                 }
//                 // Fetch API를 이용한 AJAX 요청
//                 fetch("/ManagerCode", {
//                     method: "POST",
//                     headers: { "Content-Type": "text/plain" }, // 헤더를 text/plain으로 변경
//                     body: managerCode // 직접 문자열을 보냄
//                 })
//                     .then(response => response.json())
//                     .then(data => {

//                         if (data.valid) {
//                             $('#managerMessage').text("유효한 관리자 코드입니다.");
//                             $('#managerMessage').addClass("confirm").removeClass("error");
//                             checkObj.managerCode = true;
//                         } else {
//                             $('#managerMessage').text("유효하지 않은 관리자 코드입니다.");
//                             $('#managerMessage').addClass("error").removeClass("confirm");
//                             checkObj.managerCode = false;
//                         }
//                     })
//                     .catch(error => {
//                         console.log(error);
//                         $('#managerMessage').text("서버 오류가 발생했습니다.");
//                         $('#managerMessage').addClass("error").removeClass("confirm");
//                         checkObj.managerCode = false;
//                     });
//             }).trigger('input'); // 최초에도 한 번 유효성 검사 실행
//         } else {
//             // 체크박스가 해제되면 유효성 검사 해제
//             $('#managerCode').off('input');
//             $('#managerMessage').text(""); // 메시지 초기화
//             checkObj.managerCode = true;
//         }
//     });
// });

// // 아이디 유효성 검사
// const userId = document.getElementById("userId");
// const idMessage = document.getElementById("idMessage");

// // 아이디가 입력 될때 마다
// userId.addEventListener("input", () => {

//     //입력된 아이디가 없을 경우

//     if (userId.value.trim().length == 0) {

//         userId.value = "";

//         idMessage.innerText = "아이디를 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기

//         idMessage.classList.remove("confirm", "error");

//         checkObj.userId = false;

//         return;
//     }

//     // 정규 표현식을 이요해서 유효한 형식인지 판별
//     // 1) 정규표현식 객체 생성
//     const regEx = /^[a-zA-Z0-9-_]{6,20}$/;

//     // 2) 입력받은 아이디와 정규식 일치 여부 판별
//     if (regEx.test(userId.value)) { // 유효한 경우

//         /****************************************************************/
//         /* fetch() API를 이용한 ajax(비동기 통신) */

//         // GET 방식 ajax 요청(파라미터는 쿼리스트링으로!)
//         fetch("/dupCheck/id?id=" + userId.value)

//             .then(response => response.text()) // 응답 객체 -> 파싱(parsing, 데이터 형태 변환)

//             .then(count => {
//                 // count : 중복되면 1, 중복 아니면 0
//                 if (count == 0) {
//                     idMessage.innerText = "사용 가능한 아이디입니다.";
//                     idMessage.classList.add("confirm");
//                     idMessage.classList.remove("error");

//                     checkObj.userId = true; // 유효 O

//                 } else {
//                     idMessage.innerText = "이미 사용 중인 아이디입니다.";
//                     idMessage.classList.add("error");
//                     idMessage.classList.remove("confirm");

//                     checkObj.userId = false; // 유효 X
//                 }
//             }) // 파싱한 데이터를 이용해서 수행할 코드 작성

//             .catch(err => console.log(err)) // 예외 처리

//         /****************************************************************/

//     } else { // 유효하지 않은 경우
//         idMessage.innerText = "6~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
//         idMessage.classList.add("error");
//         idMessage.classList.remove("confirm");

//         checkObj.userId = false; // 유효 X
//     }

// })


// // 비밀번호 / 비밀번호 확인 유효성 검사
// const userPw = document.getElementById("userPw");
// const userPwConfirm = document.getElementById("userPwConfirm");
// const pwMessage = document.getElementById("pwMessage");

// const userPw_img1 = document.querySelector('#userPw_img1');
// const userPwConfirm_img1 = document.querySelector('#userPwConfirm_img1');

// //비밀번호 입력시 유효성 검사

// userPw.addEventListener("input", () => {

//     //입력된 비밀번호가 없을 경우
//     if (userPw.value.trim().length == 0) {


//         userPw.value = "";

//         pwMessage.innerText = "비밀번호를 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기
//         pwMessage.classList.remove("confirm", "error");

//         userPw_img1.src = "../test/image/m_icon_pass.png";
//         userPwConfirm_img1.src = "../test/image/m_icon_check_disable.png";

//         checkObj.userPw = false;

//         return;
//     }


//     // 정규 표현식을 이용해서 유효한 형식인지 판별
//     // 1) 정규표현식 객체 생성
//     const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

//     // 2) 입력받은 비밀번호 정규식 일치 여부 판별

//     if (regEx.test(userPw.value)) {
//         checkObj.userPw = true;

//         //비밀번호가 유효하게 작성된 상태에서 비밀번호확인이 입력되지 않았을때
//         if (userPwConfirm.value.trim().length == 0) {
//             pwMessage.innerText = "유효한 형식";
//             pwMessage.classList.add("confirm");
//             pwMessage.classList.remove("error");
//             userPw_img1.src = "../test/image/m_icon_normal.png";
//             userPwConfirm_img1.src = "../test/image/m_icon_danger.png";

//         } else {
//             //비밀번호가 유효하게 작성된 상태에서 비밀번호확인 입력되었을때

//             // 비밀번호 == 비밀번호 확인이 같을 경우
//             if (userPw.value == userPwConfirm.value) {
//                 pwMessage.innerText = "비밀번호 일치";
//                 pwMessage.classList.add("confirm");
//                 pwMessage.classList.remove("error");

//                 checkObj.userPwConfirm = true;

//             } else {
//                 pwMessage.innerText = "비밀번호 일치하지않음.";
//                 pwMessage.classList.add("error");
//                 pwMessage.classList.remove("confirm");
//                 checkObj.userPwConfirm = false;
//                 userPw_img1.src = "../test/image/m_icon_not_use.png";
//                 userPwConfirm_img1.src = "../test/image/m_icon_danger.png";
//             }

//         }


//     } else {
//         pwMessage.innerText = "영어,숫자,특수문자(!,@,#,-,_) 6~20글자 사이로 입력해주세요.";
//         pwMessage.classList.add("error");
//         pwMessage.classList.remove("confirm");

//         userPw_img1.src = "../test/image/m_icon_not_use.png";
//         userPwConfirm_img1.src = "../test/image/m_icon_not_use.png";

//         checkObj.userPw = false;
//     }

// })

// //비밀번호확인 입력시 유효성 검사

// userPwConfirm.addEventListener("input", () => {

//     if (checkObj.userPw) { //비밀번호가 유효하게 작성된 경우

//         // 비밀번호 == 비밀번호 확인이 같을 경우
//         if (userPw.value == userPwConfirm.value) {
//             pwMessage.innerText = "비밀번호 일치";
//             pwMessage.classList.add("confirm");
//             pwMessage.classList.remove("error");
//             userPw_img1.src = "../test/image/m_icon_safe.png";
//             userPwConfirm_img1.src = "../test/image/m_icon_check_enable.png";

//             checkObj.userPwConfirm = true;

//         } else {
//             pwMessage.innerText = "비밀번호 일치하지않음.";

//             checkObj.userPwConfirm = false;
//         }

//     } else { //비밀번호가 유효하지 않은 경우
//         userPw_img1.src = "../test/image/m_icon_not_use.png";
//         userPwConfirm_img1.src = "../test/image/m_icon_not_use.png";
//         checkObj.userPwConfirm = false;
//     }

// })


// // 닉네임 유효성 검사 : 한글,영어,숫자로만 2~10글자
// const userNickname = document.getElementById("userNickname");
// const nickMessage = document.getElementById("nickMessage");

// // 닉네임 입력 시 유효성 검사
// userNickname.addEventListener("input", () => {

//     // 닉네임 입력 X
//     if (userNickname.value.trim().length == 0) {
//         userNickname.value = "";
//         nickMessage.innerText = "닉네임을 입력해주세요.";
//         nickMessage.classList.remove("confirm", "error");
//         checkObj.userNickname = false;
//         return;
//     }

//     const regEx = /^[A-z가-힇\d]{2,10}$/; // 한글,영어,숫자로만 2~10글자

//     // 닉네임 유효성 검사
//     if (regEx.test(userNickname.value)) {
//         /****************************************************************/
//         /* fetch() API를 이용한 ajax(비동기 통신) */

//         // GET 방식 ajax 요청(파라미터는 쿼리스트링으로!)
//         fetch("/dupCheck/nickName?nickName=" + userNickname.value)

//             .then(response => response.text()) // 응답 객체 -> 파싱(parsing, 데이터 형태 변환)

//             .then(count => {
//                 // count : 중복되면 1, 중복 아니면 0
//                 if (count == 0) {
//                     nickMessage.innerText = "사용 가능한 닉네임입니다.";
//                     nickMessage.classList.add("confirm");
//                     nickMessage.classList.remove("error");

//                     checkObj.userNickname = true; // 유효 O

//                 } else {
//                     nickMessage.innerText = "이미 사용 중인 닉네임입니다.";
//                     nickMessage.classList.add("error");
//                     nickMessage.classList.remove("confirm");

//                     checkObj.userNickname = false; // 유효 X
//                 }
//             }) // 파싱한 데이터를 이용해서 수행할 코드 작성

//             .catch(err => console.log(err)) // 예외 처리

//         /****************************************************************/
        
//     } else {
//         nickMessage.innerText = "한글,영어,숫자로만 2~10글자";
//         nickMessage.classList.remove("confirm");
//         nickMessage.classList.add("error");
//         checkObj.userNickname = false;
//         return;
//     }
// });


// //이메일 유효성 검사

// const userEmail = document.getElementById("userEmail");
// const emailMessage = document.getElementById("emailMessage");

// // 이메일이 입력 될때 마다
// userEmail.addEventListener("input", () => {

//     //입력된 이메일이 없을 경우

//     if (userEmail.value.trim().length == 0) {

//         userEmail.value = "";

//         emailMessage.innerText = "이메일을 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기

//         emailMessage.classList.remove("confirm", "error");

//         checkObj.userEmail = false;

//         return;
//     }

//     // 정규 표현식을 이요해서 유효한 형식인지 판별
//     // 1) 정규표현식 객체 생성
//     // const regEx = /^[A-Za-z\d\-_]{4,}@[가-힣\w\-\_]+(\.\w+){1,3}$/;
//     const regEx = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

//     // 2) 입력받은 이메일과 정규식 일치 여부 판별
//     if (regEx.test(userEmail.value)) { // 유효한 경우

//         /****************************************************************/
//         /* fetch() API를 이용한 ajax(비동기 통신) */

//         // GET 방식 ajax 요청(파라미터는 쿼리스트링으로!)
//         fetch("/dupCheck/email?email=" + userEmail.value)

//             .then(response => response.text()) // 응답 객체 -> 파싱(parsing, 데이터 형태 변환)

//             .then(count => {
//                 // count : 중복되면 1, 중복 아니면 0
//                 if (count == 0) {
//                     emailMessage.innerText = "사용 가능한 이메일입니다.";
//                     emailMessage.classList.add("confirm");
//                     emailMessage.classList.remove("error");

//                     checkObj.userEmail = true; // 유효 O

//                 } else {
//                     emailMessage.innerText = "이미 사용 중인 이메일입니다.";
//                     emailMessage.classList.add("error");
//                     emailMessage.classList.remove("confirm");

//                     checkObj.userEmail = false; // 유효 X
//                 }
//             }) // 파싱한 데이터를 이용해서 수행할 코드 작성

//             .catch(err => console.log(err)) // 예외 처리

//         /****************************************************************/

//     } else { // 유효하지 않은 경우
//         emailMessage.innerText = "이메일 형식이 유효하지 않습니다.";
//         emailMessage.classList.add("error");
//         emailMessage.classList.remove("confirm");

//         checkObj.userEmail = false; // 유효 X
//     }

// })

// //  이메일 인증 코드 유효성 검사
// const authKey = document.getElementById("authKey");
// const authKeyMessage = document.getElementById("authKeyMessage");

// const emailBtn = document.getElementById("emailBtn");
// emailBtn.addEventListener("click",()=>{

// fetch("mailSend",{
//         method : "POST",
//         headers : {"Content-Type" : "application/json"},
//         body : JSON.stringify({"userEmail":userEmail.value})
//     })
//     .then(res => res.text()) // 응답객체를 필요한 형태로 파싱하여 리턴
//     .then(res => {
//         console.log("count : "+res);

//         authKey.addEventListener("input", () => {

//             if (authKey.value.trim().length == 0) {

//                 authKey.value = "";
        
//                 authKeyMessage.innerText = "인증 코드를 입력해주세요.";
        
//                 //confirm, error 클래스 삭제해서 검정 글씨로 만들기
        
//                 authKeyMessage.classList.remove("confirm", "error");
        
//                 checkObj.authKey = false;
        
//                 return;
//             } 
//             if (authKey.value == res) {
//                 authKeyMessage.innerText = "인증되었습니다.";
//                 authKeyMessage.classList.add("confirm");
//                 authKeyMessage.classList.remove("error");
    
//                 checkObj.authKey = true; // 유효 O
    
//             } else {
//                 authKeyMessage.innerText = "다시 입력해주세요.";
//                 authKeyMessage.classList.add("error");
//                 authKeyMessage.classList.remove("confirm");
    
//                 // e.preventDefault();
//                 checkObj.authKey = false; // 유효 X
//             }
//         })


//     }) // 파싱된 데이터를 받아서 처리하는 코드 작성 
//     .catch(err => {
//         console.log("예외 발생");
//         console.log(err);
//     });
// })



// document.getElementById("signUpFrm").addEventListener("submit", e => {

//     updateAuthority();

//     // checkObj에 모든 value가 true인지 검사
//     for (let key in checkObj) {
//         if (!checkObj[key]) { // 각 key에 대한 value(true/false)를 얻어와 
//             // false인 경우 == 유효하지 않다.
//             switch (key) {
//                 case "userName": alert("이름이 유효하지 않음"); break;
//                 case "userBirthDate": alert("생년월일이 유효하지 않음"); break;
//                 case "userTel": alert("휴대폰번호가 유효하지 않음"); break;
//                 case "telAuthKey": alert("휴대폰 인증코드가 유효하지 않음"); break;
//                 // case "userGender": alert("성별이 유효하지 않음"); break;
//                 case "userId": alert("아이디가 유효하지 않음"); break;
//                 case "userPw": alert("비밀번호가 유효하지 않음"); break;
//                 case "userPwConfirm": alert("비밀번호 확인이 유효하지 않음"); break;
//                 case "userNickname": alert("닉네임이 유효하지 않음"); break;
//                 case "userEmail": alert("이메일이 유효하지 않음"); break;
//                 case "authKey": alert("이메일 인증코드가 유효하지 않음"); break;
//             }

//             // 유효하지 않은 input 태그로 focus 이동
//             // - key를 input의 id와 똑같이 설정 했음
//             document.getElementById(key).focus();

//             // form 태그 기본 이벤트 제거
//             e.preventDefault();
//             return; // 함수종료
//         }
//     }

// });


// // 비밀번호 / 비밀번호 확인 유효성 검사
// const userPw = document.getElementById("userPw");
// const userPwConfirm = document.getElementById("userPwConfirm");
// const pwMessage = document.getElementById("pwMessage");

// const userPw_img1 = document.querySelector('#userPw_img1');
// const userPwConfirm_img1 = document.querySelector('#userPwConfirm_img1');

// //비밀번호 입력시 유효성 검사

// userPw.addEventListener("input", () => {

//     //입력된 비밀번호가 없을 경우
//     if (userPw.value.trim().length == 0) {

//         userPw.value = "";

//         pwMessage.innerText = "비밀번호를 입력해주세요.";

//         //confirm, error 클래스 삭제해서 검정 글씨로 만들기
//         pwMessage.classList.remove("confirm", "error");

//         userPw_img1.src = "/resources/images/signUp/m_icon_pass.png";
//         userPwConfirm_img1.src = "/resources/images/signUp/m_icon_check_disable.png";

//         checkObj.userPw = false;

//         return;
//     }

//     // 정규 표현식을 이용해서 유효한 형식인지 판별
//     // 1) 정규표현식 객체 생성
//     const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;

//     // 2) 입력받은 비밀번호 정규식 일치 여부 판별

//     if (regEx.test(userPw.value)) {
//         checkObj.userPw = true;

//         //비밀번호가 유효하게 작성된 상태에서 비밀번호확인이 입력되지 않았을때
//         if (userPwConfirm.value.trim().length == 0) {
//             pwMessage.innerText = "유효한 형식";
//             pwMessage.classList.add("confirm");
//             pwMessage.classList.remove("error");
//             userPw_img1.src = "/resources/images/signUp/m_icon_normal.png";
//             userPwConfirm_img1.src = "/resources/images/signUp/m_icon_danger.png";

//         } else {
//             //비밀번호가 유효하게 작성된 상태에서 비밀번호확인 입력되었을때

//             // 비밀번호 == 비밀번호 확인이 같을 경우
//             if (userPw.value == userPwConfirm.value) {
//                 pwMessage.innerText = "비밀번호 일치";
//                 pwMessage.classList.add("confirm");
//                 pwMessage.classList.remove("error");

//                 checkObj.userPwConfirm = true;

//             } else {
//                 pwMessage.innerText = "비밀번호 일치하지않음.";
//                 pwMessage.classList.add("error");
//                 pwMessage.classList.remove("confirm");
//                 checkObj.userPwConfirm = false;
//                 userPw_img1.src = "/resources/images/signUp/m_icon_not_use.png";
//                 userPwConfirm_img1.src = "/resources/images/signUp/m_icon_danger.png";
//             }

//         }


//     } else {
//         pwMessage.innerText = "영어,숫자,특수문자(!,@,#,-,_) 6~20글자 사이로 입력해주세요.";
//         pwMessage.classList.add("error");
//         pwMessage.classList.remove("confirm");

//         userPw_img1.src = "/resources/images/signUp/m_icon_not_use.png";
//         userPwConfirm_img1.src = "/resources/images/signUp/m_icon_not_use.png";

//         checkObj.userPw = false;
//     }

   

// })

// //비밀번호확인 입력시 유효성 검사

// userPwConfirm.addEventListener("input", () => {

//     if (checkObj.userPw) { //비밀번호가 유효하게 작성된 경우

//         // 비밀번호 == 비밀번호 확인이 같을 경우
//         if (userPw.value == userPwConfirm.value) {
//             pwMessage.innerText = "비밀번호 일치";
//             pwMessage.classList.add("confirm");
//             pwMessage.classList.remove("error");
//             userPw_img1.src = "/resources/images/signUp/m_icon_safe.png";
//             userPwConfirm_img1.src = "/resources/images/signUp/m_icon_check_enable.png";

//             checkObj.userPwConfirm = true;

//         } else {
//             pwMessage.innerText = "비밀번호 일치하지않음.";
//             pwMessage.classList.add("error");
//             pwMessage.classList.remove("confirm");
//             checkObj.userPwConfirm = false;
//         }

//     } else { //비밀번호가 유효하지 않은 경우
//         if (userPwConfirm.value.trim().length > 0) { // userPwConfirm은 입력되어 있지만 userPw가 입력되지 않은 경우
//             pwMessage.innerText = "비밀번호를 먼저 입력해주세요.";
//             pwMessage.classList.add("error");
//             pwMessage.classList.remove("confirm");
//             userPw_img1.src = "/resources/images/signUp/m_icon_not_use.png";
//             userPwConfirm_img1.src = "/resources/images/signUp/m_icon_not_use.png";
//             checkObj.userPwConfirm = false;
//         }
//     }

//     if (userPw.value.trim().length > 0) { // userPw가 입력된 경우
//         pwMessage.innerText = "비밀번호 일치";
//         pwMessage.classList.add("confirm");
//         pwMessage.classList.remove("error");
//         userPw_img1.src = "/resources/images/signUp/m_icon_safe.png";
//         userPwConfirm_img1.src = "/resources/images/signUp/m_icon_check_enable.png";
//         checkObj.userPwConfirm = true;
//     }

// })