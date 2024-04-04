
const loginForm = document.getElementsByClassName("login-form")[0];
const userId = document.getElementById("userId");
const password = document.getElementById("password");
// 로그인 시도 할때
if(loginForm != null){

    let div1 = document.createElement("div");
    div1.setAttribute("name","div1");
    let div2 = document.createElement("div");
    div2.setAttribute("name","div2");

    loginForm.addEventListener("submit", e => {

        if(userId.value.trim().length ==0){
         
            div1.innerText="아이디를 입력해주세요.";
            div1.style.color="#ff6060";
            div1.style.width="80%";
            div1.style.fontSize="12px";
            div1.style.textAlign="left";
            
            if(document.getElementsByName("div1").length == 0 ) userId.after(div1);
            
            userId.value=""; // 잘목 입력된 값 (공백) 제거
            userId.focus(); // 이메일input 태그에 초점
            e.preventDefault();
            return;
        }
        
        if(password.value.trim().length ==0){

            div2.innerText="비밀번호를 입력해주세요.";
            div2.style.color="#ff6060";
            div2.style.width="80%";
            div2.style.fontSize="12px";
            div2.style.textAlign="left";
            
            if(document.getElementsByName("div2").length == 0 ) password.after(div2);
         
            password.value=""; // 잘목 입력된 값 (공백) 제거
            password.focus(); // 이메일input 태그에 초점
            e.preventDefault();
            return;
        }
    })

    userId.addEventListener("input",()=>{
        if(userId.value.trim().length !=0){
            document.getElementsByName("div1")[0].remove();
        }
    })
    password.addEventListener("input",()=>{
        if(password.value.trim().length !=0){
           document.getElementsByName("div2")[0].remove();
        }
    })
}






// -----------------------------SNS 로그인 시작

const snsState = document.getElementById("snsState");

//네이버

var naverLogin = new naver.LoginWithNaverId(
    {
        clientId: "i56HuzxjOTUNogziomDr", //내 애플리케이션 정보에 cliendId를 입력해줍니다.
        callbackUrl: "http://localhost/login", // 내 애플리케이션 API설정의 Callback URL 을 입력해줍니다.
        isPopup: false, // 팝업창으로 로그인 진행할건지
        callbackHandle: true
    }
);	


let naverLogoutParams =  {
  client_id: "i56HuzxjOTUNogziomDr",
  client_secret: "twOUrpQmxA",
  grant_type: 'delete',
  access_token: '',
  service_provider: 'NAVER'
};

naverLogin.init();


window.addEventListener('load', function() {

  naverLogin.getLoginStatus(function (status) {
		if (status) {
			const email = naverLogin.user.getEmail(); // 필수로 설정할것을 받아와 아래처럼 조건문을 줍니다.
      const number = naverLogin.user.getMobile().split("-").join("");
      const birthDay = naverLogin.user.getBirthyear()+naverLogin.user.getBirthday().split("-").join("");

			console.log(naverLogin.user); 
      
    	naverLogoutParams.access_token = naverLogin.accessToken.accessToken;

      if( email == undefined || email == null) {
				alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
				naverLogin.reprompt();
				return;
			}else{
				// 네이버 로그인 후 정보 가져왔을 때
        fetch("/selectSnsUser",{
          method : "POST",
          headers : {"Content-Type" : "application/text"},
          body :  email
        })
        .then(res=>res.json())
        .then(res => {
          console.log(res);

          if(res!=null){
                userId.value = res.userId
                password.value = res.userPw
                snsState.value = "Y";
                loginForm.method = "POST";
                loginForm.submit();
                // snsLogin(res.userId,res.userPw);
          }
        })
        .catch(err => {
          console.log(err);
          // 로그인 하려는 사람이 기존 회원이 아니면 회원가입으로 ㄱㄱ
          location.href="/signUp?userEmail="+email+"&userName="+naverLogin.user.getName()+"&userNickname="+naverLogin.user.getNickName()+"&userTel="+number+"&userBirth="+birthDay;
        });


			}
		} else {
			console.log("callback 처리에 실패하였습니다.");
		}
	});

});




// 카카오
window.Kakao.init("646b52ccfdaf772345ce5a7280b5cb40");
console.log(Kakao.isInitialized()); // sdk초기화여부판단
function kakaoLogin() {
    Kakao.Auth.login({
      success: function (response) {
        Kakao.API.request({
          url: '/v2/user/me',
          success: function (response) {
        	  console.log(response)
        	  console.log(response.kakao_account.email)
        	  console.log(response.kakao_account.profile.thumbnail_image_url)
        	  console.log(response.kakao_account.profile.nickname)
            
            if(Kakao.Auth.getAccessToken()!=null){

              // 카톡 로그인 정보 가져왔을 때
              fetch("/selectSnsUser",{
                method : "POST",
                headers : {"Content-Type" : "application/text"},
                body :  response.kakao_account.email 
              })
              .then(res=>res.json())
              .then(res => {
                console.log(res);

                if(res!=null){
                      userId.value = res.userId
                      password.value = res.userPw
                      snsState.value = "Y";
                      loginForm.method = "POST";
                      loginForm.submit();
                      // snsLogin(res.userId,res.userPw);
                }
              })
              .catch(err => {
                console.log(err);
                // 로그인 하려는 사람이 기존 회원이 아니면 회원가입으로 ㄱㄱ
                location.href="/signUp?userEmail="+response.kakao_account.email+"&userNickname="+response.kakao_account.profile.nickname;
              });
           
            }
          },
          fail: function (error) {
            console.log(error)
          },
        })
      },
      fail: function (error) {
        console.log(error)
      },
    })
  }


 

window.addEventListener('load', function() {
  // 즉시 실행 함수
  console.log(loginUser.length);
  if(loginUser.length==0){
    (
      ()=>{
        kakaoLogoutFn();
        naverLogoutFn();
      }
    )()
  }
})

function kakaoLogoutFn(){
  // 카카오 부분 로그아웃
  if (Kakao.Auth.getAccessToken() != null) {
    Kakao.API.request({
      url: '/v1/user/unlink',
      success: function (response) {
        console.log(response)
      },
      fail: function (error) {
        console.log(error)
      },
    })
    Kakao.Auth.setAccessToken(undefined)
  }
}

function naverLogoutFn(){
  let url = `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${naverLogoutParams.client_id}&client_secret=${naverLogoutParams.client_secret}&access_token=${naverLogin.accessToken.accessToken}&service_provider=NAVER`;
  //  네이버 로그아웃
  fetch(
    url,
    { mode: 'no-cors' } // CORS
  )
  .then(() => {
    localStorage.removeItem('access');
    // setIsLoggedIn(false); // 로그인 상태 갱신
    console.log('logout!');
    // navigate('/'); // 홈으로 이동
  })
  .catch((e) => console.log('error!', e));
}


function snsLogin(userId,userPw){

  const param = {
    "userId" : userId,
    "userPw" : userPw
  }
  fetch("/snsLogin",{
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body :  JSON.stringify(param)
  })
  .then(res=> res.text())
  .then(resp => {
    console.log(resp);
  })
  .catch(e=>{console.log(e);})
}