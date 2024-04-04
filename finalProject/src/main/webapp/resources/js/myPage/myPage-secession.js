// 숙제 회원 탈퇴
const mysecessionFrm = document.getElementById("mysecessionFrm");
const userPw = document.getElementById("userPw");
const agree = document.getElementById("agree");

// 회원 탈퇴 페이지인 경우
if(mysecessionFrm != null){

    mysecessionFrm.addEventListener("submit", e => {
        
        // 비밀번호 미작성
        // 현재 비밀번호 미작성 시
        if(userPw.value.trim() == ""){
            alert("비밀번호를 입력해주세요.")
            e.preventDefault();
            userPw.focus();
            userPw.value = "";
            return;
        }

        // 동의 체크가 되지 않은 경우
        if(!agree.checked){
            alert("동의 체크를 해주세요.")
            e.preventDefault();
            agree.focus();
            return;
        }

        // 정말로 탈퇴 하시겠습니까? -> 취소 클릭 시
        // 제출 안되게 해오기
        const confirmResult = confirm("정말로 탈퇴하시겠습니까?");
       
        if (!confirmResult) {
            e.preventDefault(); 
            return;
        }
        
    })

}
