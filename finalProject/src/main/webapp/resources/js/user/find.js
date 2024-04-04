const findIdFrm = document.getElementById("findIdFrm");
const phoneInput = document.getElementById("phoneNum");
if(findIdFrm != null){
    findIdFrm.addEventListener("submit", e => {

        if(phoneNum.value.trim().length ==0){
            alert("이메일를 입력해주세요.");

            memberEmail.value=""; // 잘목 입력된 값 (공백) 제거
            memberEmail.focus(); // 이메일input 태그에 초점

            e.preventDefault(); // 제출 못하게 하기

            return;
        }

    })
}


// ---------- certi Jsp

let authTimer;
let authMin = 4;
let authSec = 59;

const certiFrm = document.getElementById("certiFrm");
const certiMessage = document.getElementById("certiMessage");
const checkCer = document.getElementById("checkCer");


// -- css를 위한 class 추가
const idBox = document.getElementById("idContainer");
const pwBox = document.getElementById("pwContainer");

if(certiFrm != null){
    (function(){
        authMin = 2;
        authSec = 59;

        certiMessage.innerText ="";
        clearInterval(authTimer); 

        certiMessage.innerText = "03:00";

        authTimer = window.setInterval(()=>{

            certiMessage.innerText = "0" + authMin + ":" + (authSec<10 ? "0" + authSec : authSec);
            
            // 남은 시간이 0분 0초인 경우
            if(authMin == 0 && authSec == 0){
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

    })();



    // 인증 확인
    certiFrm.addEventListener("submit", e => {

        if(checkCer.value.trim().length ==0){
            alert("번호를 입력해주세요.");

            checkCer.value=""; // 잘목 입력된 값 (공백) 제거
            checkCer.focus(); // 이메일input 태그에 초점

            e.preventDefault(); // 제출 못하게 하기

            return;
        }

        if(authMin > 0 || authSec > 0){
            if(checkCer.value != randomNum){
                alert("인증번호가 일치하지 않습니다.");
                e.preventDefault();
                return;
            }
        }else{
            alert("인증 시간이 만료되었습니다. 다시 시도해주세요.");
            e.preventDefault(); 
            location.href="/findId"
            return;
        }        


    })

    // console.log(check)
    if(check == "id"){
        idBox.classList.add("selected");
        idBox.classList.remove("not");
        pwBox.classList.add("not");
        pwBox.classList.remove("selected");
        
    }

    if(check == "pw"){
        idBox.classList.add("not");
        idBox.classList.remove("selected");
        pwBox.classList.add("selected");
        pwBox.classList.remove("not");
        
    }
    
    


}




// ------ resultId.jsp

// 아이디 뒤 세자리 *** 표시 
const resultId= document.getElementById("resultId");

if(resultId != null){
    resultId.innerHTML =  memberId.slice(0, -3) + '***';
}