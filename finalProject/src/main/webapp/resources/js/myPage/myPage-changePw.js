if (document.getElementById("changePwFrm")) {


        // 정규 표현식
        const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    
        const newPwInput = document.getElementById("newPw");
        const newPwConfirmInput = document.getElementById("newPwConfirm");
        const pwMessage = document.getElementById("pwMessage");
        const pwMessage2 = document.getElementById("pwMessage2");
        const changePwBtn = document.getElementById("changePwBtn");
    
        // newPw 유효성 검사
        newPwInput.addEventListener("keyup", function() {
            if (!regEx.test(newPwInput.value)) {
                pwMessage.innerText = "영어,숫자,특수문자(!,@,#,-,_) 6~20글자 사이로 입력해주세요.";
                pwMessage.classList.add("error");
                pwMessage.classList.remove("confirm");
            } else {
                pwMessage.innerText = "";
            }
        });
    
        // newPwConfirm 일치 여부 검사
        newPwConfirmInput.addEventListener("keyup", function() {
            if (newPwInput.value !== newPwConfirmInput.value) {
                pwMessage2.innerText = "비밀번호가 일치하지 않습니다.";
                pwMessage2.classList.add("error");
                pwMessage2.classList.remove("confirm");
            } else {
                pwMessage2.innerText = "";
                if (regEx.test(newPwInput.value)) {
                }
            }
        });
    
        // 폼 제출 시 마지막 확인
        document.getElementById("changePwFrm").addEventListener("submit", function(event) {
            if (newPwInput.value !== newPwConfirmInput.value) {
                pwMessage2.innerText = "비밀번호가 일치하지 않습니다.";
                alert("비밀번호와 비밀번호 확인이 일치 하지 않습니다.")
                newPwConfirmInput.focus();
                event.preventDefault(); // 폼 제출 방지
            }
        });
  
}
