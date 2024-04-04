// 내 정보 (수정) 페이지

const profileImage = document.getElementById("profileImage1"); // img 태크
const imageInput = document.getElementById("imageInput"); // input 태그
const updateInfo = document.getElementById("updateInfo");

let initCheck;
let deleteCheck;
let originalImage;
let isImageChanged = false;


function DropFile(dropAreaId, fileListId) {
    let dropArea = document.getElementById(dropAreaId);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        preventDefaults(e);
        dropArea.classList.add("highlight");
    }

    function unhighlight(e) {
        preventDefaults(e);
        dropArea.classList.remove("highlight");
    }

    function handleDrop(e) {
        unhighlight(e);
        let dt = e.dataTransfer;
        let files = dt.files;

        // 드롭된 파일이 하나일 때만 처리하도록 수정
        if (files.length === 1) {
            handleFile(files[0]); // 파일을 처리하는 함수 호출
            imageInput.files = files;
        }
    
        const fileList = document.getElementById(fileListId);
        if (fileList) {
            fileList.scrollTo({ top: fileList.scrollHeight });
        }
    }
    
    function handleFile(file) {
        // 이미지 파일인지 확인
        if (file.type.match('image.*')) {
            renderFile(file); // 이미지 파일이면 렌더링 함수 호출
        } else {
            console.log('이미지 파일이 아닙니다.');
        }
    }
    
    function renderFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            profileImage.src = reader.result;
            profileImage.style.display = "block";
            isImageChanged = true;
        };
    }

    dropArea.addEventListener("dragenter", highlight, false);
    dropArea.addEventListener("dragover", highlight, false);
    dropArea.addEventListener("dragleave", unhighlight, false);
    dropArea.addEventListener("drop", handleDrop, false);
}

// 드래그 앤 드롭 이벤트 리스너 등록
DropFile("drop-file", "files");

// 파일 선택(input 태그) 이벤트 리스너 등록
if (imageInput !== null) {
    imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            renderFile(file); // 파일을 미리보기 이미지에 할당
            isImageChanged = true; // 이미지 변경 여부를 표시
        }
    });
}

if(imageInput != null){ // 화면에 imageInput이 있을 경우
  

    // 프로필 이미지가 출력되는 img태그의 src 속성을 저장
    originalImage = profileImage.getAttribute("src");

    // 회원 프로필 화면 진입 시
    // 현재 회원의 프로필 이미지 상태를 확인
    if(originalImage == "/resources/images/user/user.png"){
        // 기본 이미지인 경우
        initCheck = false;
    } else{
        initCheck = false;
    }
    
    imageInput.addEventListener("change", e => {

        // 2MB로 최대 크기 제한
        const maxSize = 1 * 1024 * 1024 * 2; // 파일 최대 크기 지정(바이트 단위)
       
    
        const file = e.target.files[0]; //업로드한 파일의 정보가 담긴 객체

        // console.log("file : " + file)
    
        // 파일을 한번 선택한 후 취소했을 때
        if(file == undefined){
            console.log("파일 선택이 취소됨");
            deleteCheck = -1; // 취소 == 파일이 없음 == 초기상태
    
            // 취소 시 기존 프로필 이미지로 변경
            profileImage.setAttribute("src", originalImage);
            return;
        }
    
        if(file.size > maxSize){ // 선택된 파일의 크기가 최대 크기를 초과한 경우
            alert("2MB 이하의 이미지를 선택해주세요.");
            imageInput.value = "";
    
            deleteCheck = -1; // 초기상태
    
            // 기존 프로필 이미지로 변경
            profileImage.setAttribute("src", originalImage);
            return;
        }
    
        // JS에서 파일을 읽는 객체
        // - 파일을 읽고 클라이언트 컴퓨터에 파일을 저장할 수 있음
        // 파일을 읽는 객체
        const reader = new FileReader();

        // 파일을 읽기 시작할 때 deleteCheck 값을 설정
        deleteCheck = 0;

        reader.readAsDataURL(file);

        reader.onload = e => {
            //  console.log(e.target);
            //console.log(e.target.result); // 읽은 파일의 URL

            const url = e.target.result;
            // console.log("url : " + url)
            // 프로필 이미지(img)태그에 src 속성으로 추가
            profileImage.setAttribute("src", url);
            

            deleteCheck = 1;
         //   console.log("확인1" + profileImage.src);

            // console.log(profileImage)
        };
    
    });
} 

// 내 정보 수정 form태그가 존재할 때 (내 정보 페이지)
if(updateInfo != null){

    // 닉네임/전화번호 초기값 저장
    let initNickname = userNickname.value;

    let initAddress  = sample6_postcode.value;

    // 파일 최초 상태 저장
    let originalImage = profileImage.src;

    // 닉네임 유효성 검사
    userNickname.addEventListener("input", () =>{
        
        // 변경 전 닉네임과 입력 값이 같은 경우
        if(initNickname == userNickname.value){
            userNickname.removeAttribute("style");
            return;
        }

        // 정규표현식으로 유효성 검사
        const regEx = /^[가-힣\w\d]{2,10}$/;

        if(regEx.test(userNickname.value)){
            userNickname.style.color = "green";
        } else{
            userNickname.style.color = "red";
        }
    })

     
 
    imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            renderFile(file); // 파일을 미리보기 이미지에 할당
            isImageChanged = true; // 이미지 변경 여부를 표시
        }
    });
    
    // form태그 제출 시 유효하지 않은 값이 있으면 제출 X
    updateInfo.addEventListener("submit", e => {

        // 사용자가 아무런 수정을 하지 않았을 때
        if (initNickname === userNickname.value && initAddress === sample6_postcode.value && profileImage.src === originalImage) {
            alert("수정된 내용이 없습니다.");
            e.preventDefault();
            return;
        }

        // 닉네임이 유효하지 않을 경우
        if (userNickname.style.color == "red") {
            alert("닉네임이 유효하지 않습니다.");
            userNickname.focus();
            e.preventDefault();
            return;
        }

        if (profileImage.src === originalImage) {
            alert("프로필 이미지가 변경되지 않았습니다.");
            e.preventDefault();
            return;
        }
        
        if (isImageChanged) {
            alert("프로필 이미지가 변경되었습니다.");
        }

        let flag = true;

        // 프로필 이미지가 없다 -> 있다.
        if (!initCheck && deleteCheck == 1) flag = false;

        // 이전 프로필 이미지가 있가 -> 삭제
        if (initCheck && deleteCheck == 0) flag = false;
        // 이전 프로필 이미지가 있다 -> 새 이미지
        if (initCheck && deleteCheck == 1) flag = false;

        alert("수정되었습니다.");
        updateInfo.submit();
    })
    
}    