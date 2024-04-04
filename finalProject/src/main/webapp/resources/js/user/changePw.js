
  // 비밀번호 / 비밀번호 확인 유효성 검사
  const newPwInput = document.getElementById("newPwInput");
  const checkPwInput = document.getElementById("checkPwInput");
  const errMsg = document.getElementById("errMsg");
  
  const checkObj = {
    "newPwInput"    : false,
    "checkPwInput" : false,
   };
  
  //비밀번호 입력시 유효성 검사
  
  newPwInput.addEventListener("input", () =>{
  
  
   // 정규 표현식을 이용해서 유효한 형식인지 판별
   // 1) 정규표현식 객체 생성
   const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
   
   // 2) 입력받은 비밀번호 정규식 일치 여부 판별
   
   if(regEx.test(newPwInput.value)){
       checkObj.newPwInput =true;
       
       //비밀번호가 유효하게 작성된 상태에서 비밀번호확인이 입력되지 않았을때
       if(checkPwInput.value.trim().length == 0){
            errMsg.innerText =  "";
  
          }else{
              //비밀번호가 유효하게 작성된 상태에서 비밀번호확인 입력되었을때
          
              // 비밀번호 == 비밀번호 확인이 같을 경우
              if(newPwInput.value == checkPwInput.value){
                errMsg.innerText =  "";
              
              checkObj.checkPwInput =true;
          
              }else{
                errMsg.innerText =  "비밀번호 일치하지않음.";
                  errMsg.classList.add("errMsg");
                  checkObj.checkPwInput = false;
              }
          
          }
  
  
      }else{
        errMsg.innerText =  "비밀번호가 유효하지 않습니다.";
        errMsg.classList.add("errMsg");
  
          
          checkObj.userPw = false;
      }
  
  })
  
  //비밀번호확인 입력시 유효성 검사
  
  checkPwInput.addEventListener("input", () =>{
  
   if(checkObj.newPwInput){ //비밀번호가 유효하게 작성된 경우
  
       // 비밀번호 == 비밀번호 확인이 같을 경우
       if(newPwInput.value == checkPwInput.value){
            errMsg.innerText =  "";
    
            checkObj.checkPwInput =true;
       
       }else{
            errMsg.innerText =  "비밀번호가 일치하지 않습니다.";
           
            checkObj.checkPwInput = false;
       }
  
   }else{ //비밀번호가 유효하지 않은 경우
        checkObj.checkPwInput = false;
   }
  
  })

  // 회원가입 form 태그가 제출 되었을 때 
  document.getElementById("newPasswordFrm").addEventListener("submit", e =>{
  
    // checkobj에  모든 value가 true인지 검사
    for(let key in checkObj){
   
        if(!checkObj[key]){ // 각 key에 대한 value(true/false)를 얻어와 
              // flase인 경우 == 유효하지 않다.
            switch(key){
                case "newPwInput" : alert("비밀번호가 유효하지 않음"); break;
                case "checkPwInput" : alert("비밀번호 확인이 유효하지 않음"); break;
            }
   
            //유효하지 않은 input 태그로 focus 이동
            // -key를 input의 id와 똑같이 설정 했음
            document.getElementById(key).focus();
   
            //form 태그 기본 이벤트 제거
            e.preventDefault();
            return; // 함수종료
        }
    }
   
   })
  