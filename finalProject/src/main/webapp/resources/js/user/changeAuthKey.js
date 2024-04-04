/* 유효성 검사 진행 여부 확인용 객체 */
const checkObj = {
    "bossNo": false,
    "accName": false,
    "openDate": false,
    "accTel": false,
    //"accAddress": false,
};

// 사업자 번호 유효성 검사
const bossNo = document.getElementById("bossNo");
const bossNoMessage = document.getElementById("bossNoMessage");

// 업자 번호가 입력 될때 마다
bossNo.addEventListener("input", () => {

    //업자 번호가 없을 경우
    if (bossNo.value.trim().length == 0) {

        bossNo.value = "";

        bossNoMessage.innerText = "사업자번호를 입력해주세요.( - 제외)";

        //confirm, error 클래스 삭제해서 검정 글씨로 만들기

        bossNoMessage.classList.remove("confirm", "error");

        checkObj.bossNo = false;

        return;
    }

    // 정규 표현식을 이용해서 유효한 형식인지 판별
    // 1) 정규표현식 객체 생성
    // 기본 사업자 번호 정규식 : /^[0-9]{4}[1-9][0-9]{3}[1-9]$/;
    const regEx = /^[0-9]{10}$/;
    // 2) 입력받은 사업자번호와 정규식 일치 여부 판별
    if (regEx.test(bossNo.value)) {
        
        // 사업자 번호 중복검사
        fetch("/dupCheck/bossNo?bossNo=" + bossNo.value)

        .then(response => response.text()) 

        .then(count => {
            
            if (count == 0) {
                bossNoMessage.innerText = "사용 가능한 사업자 번호입니다.";
                bossNoMessage.classList.add("confirm");
                bossNoMessage.classList.remove("error");

                checkObj.bossNo = true; 

            } else {
                bossNoMessage.innerText = "이미 사용 중인 사업자 번호입니다.";
                bossNoMessage.classList.add("error");
                bossNoMessage.classList.remove("confirm");

                checkObj.bossNo = false; 
            }
        }) 

        .catch(err => console.log(err)) 

    } else {
        bossNoMessage.innerText = "숫자만 입력하여주세요.(-제외)";
        bossNoMessage.classList.add("error");
        bossNoMessage.classList.remove("confirm");

        checkObj.bossNo = false;
    }

})

// 사업장 이름 유효성 검사
const accName = document.getElementById("accName");
const accNameMessage = document.getElementById("accNameMessage");

// 사업장 이름이 입력 될때 마다
accName.addEventListener("input", () => {

    //사업장 이름이 없을 경우

    if (accName.value.trim().length == 0) {

        accName.value = "";

        accNameMessage.innerText = "사업장 이름을 입력해주세요.";

        //confirm, error 클래스 삭제해서 검정 글씨로 만들기

        accNameMessage.classList.remove("confirm", "error");

        checkObj.accName = false;

        return;
    }

    // 정규 표현식을 이용해서 유효한 형식인지 판별
    // 1) 정규표현식 객체 생성
    const regEx = /^(?=.*[가-힣a-zA-Zㄱ-ㅎㅏ-ㅣ!@#$%^&*()\-_=+\\\[\]{}|;':",./<>?0-9])[가-힣a-zA-Zㄱ-ㅎㅏ-ㅣ!@#$%^&*()\-_=+\\\[\]{}|;':",./<>?0-9]{1,20}$/;

    // 2) 입력받은 사업자번호와 정규식 일치 여부 판별

    if (regEx.test(accName.value)) {
        accNameMessage.innerText = "유효한 형식";
        accNameMessage.classList.add("confirm");
        accNameMessage.classList.remove("error");

        checkObj.accName = true;

    } else {
        accNameMessage.innerText = "한글, 자음, 모음, 영어, 특수문자, 숫자 포함 20자 이내로 작성해주세요.";
        accNameMessage.classList.add("error");
        accNameMessage.classList.remove("confirm");

        checkObj.bossNo = false;
    }

})

// 오픈일 유효성 검사
const openDate = document.getElementById("openDate");
const openDateMessage = document.getElementById("openDateMessage");

// 생년월일이 입력 될때 마다
openDate.addEventListener("input", () => {

    //입력된 생년월일이 없을 경우

    if (openDate.value.trim().length == 0) {

        openDate.value = "";

        openDateMessage.innerText = "오픈일을 입력해주세요.";

        //confirm, error 클래스 삭제해서 검정 글씨로 만들기

        openDateMessage.classList.remove("confirm", "error");

        checkObj.openDate = false;

        return;
    }

    // 정규 표현식을 이요해서 유효한 형식인지 판별
    // 1) 정규표현식 객체 생성
    const regEx = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

    // 2) 입력받은 생년월일과 정규식 일치 여부 판별

    if (regEx.test(openDate.value)) {
        openDateMessage.innerText = "유효한 형식";
        openDateMessage.classList.add("confirm");
        openDateMessage.classList.remove("error");

        checkObj.openDate = true;

    } else {
        openDateMessage.innerText = "8자리로 입력해주세요.(-제외)";
        openDateMessage.classList.add("error");
        openDateMessage.classList.remove("confirm");

        checkObj.openDate = false;
    }

})

// 사업장 번호
const accTel = document.getElementById("accTel");
const accTelMessage = document.getElementById("accTelMessage");
// 사업장 번호가 입력 될때 마다
accTel.addEventListener("input", () => {

    //사업장 번호가 없을 경우

    if (accTel.value.trim().length == 0) {

        accTel.value = "";

        accTelMessage.innerText = "생년월일을 입력해주세요.";

        //confirm, error 클래스 삭제해서 검정 글씨로 만들기

        accTelMessage.classList.remove("confirm", "error");

        checkObj.accTel = false;

        return;
    }

    // 정규 표현식을 이요해서 유효한 형식인지 판별
    // 1) 정규표현식 객체 생성
    const regEx = /^\d{3}\d{3,4}\d{4}$/;

    // 2) 입력받은 사업장 번호와 정규식 일치 여부 판별

    if (regEx.test(accTel.value)) {
        accTelMessage.innerText = "유효한 형식";
        accTelMessage.classList.add("confirm");
        accTelMessage.classList.remove("error");

        checkObj.accTel = true;

    } else {
        accTelMessage.innerText = "8자리로 입력해주세요.(-제외)";
        accTelMessage.classList.add("error");
        accTelMessage.classList.remove("confirm");

        checkObj.accTel = false;
    }

})

document.getElementById("signUpFrm").addEventListener("submit", e => {

    // checkObj에 모든 value가 true인지 검사
    for (let key in checkObj) {
        if (!checkObj[key]) { // 각 key에 대한 value(true/false)를 얻어와 
            // false인 경우 == 유효하지 않다.
            switch (key) {
                case "bossNo": alert("사업자 번호가 유효하지 않음"); break;
                case "accName": alert("사업장이름 유효하지 않음"); break;
                case "openDate": alert("오픈일니 유효하지 않음"); break;
                case "accTel": alert("사업장 번호가 유효하지 않음"); break;
                //case "accAddress": alert("사업장 주소가 유효하지 않음"); break;
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
