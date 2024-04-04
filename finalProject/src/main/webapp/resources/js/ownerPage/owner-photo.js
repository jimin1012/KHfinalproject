// 프로필 이미지 추가/변경/삭제
const profileImage = document.getElementById("acc-profileImage"); // img 태크
const imageInput = document.getElementById("acc-profileInput"); // input 태그

let initCheck; // 초기 프로필 이미지 상태를 저장하는 변수
// false == 기본 이미지, true == 이전 업로드 이미지

let deleteCheck = -1;
// 프로필 이미지가 새로 업로드 되거나 삭제 되었음을 나타내는 변수
// -1 == 초기값, 0 == 프로필 삭제(X버튼), 1 == 새 이미지 업로드

let originalImage; // 초기 프로필 이미지 파일 경로 저장

// 프로필 이미지가 출력되는 img태그의 src 속성을 저장
originalImage = profileImage.getAttribute("src");

// 회원 프로필 화면 진입 시
// 현재 회원의 프로필 이미지 상태를 확인
if (originalImage == "https://i.postimg.cc/Dwv0Ns85/image.jpg") {
  // https://i.postimg.cc/Dwv0Ns85/image.jpg
  // /resources/images/ownerPage/ACC.jpg
  // 기본 이미지인 경우
  initCheck = false;
} else {
  initCheck = true;
}

imageInput.addEventListener("change", (e) => {
  // 2MB로 최대 크기 제한
  const maxSize = 1 * 1024 * 1024 * 2000; // 파일 최대 크기 지정(바이트 단위)

  // console.log(e.target); // input
  console.log(e.target.value); // 업로드된 파일 경로
  console.log(e.target.files); // 업로드된 파일의 정보가 담긴 배열

  const file = e.target.files[0]; //업로드한 파일의 정보가 담긴 객체

  // 파일을 한번 선택한 후 취소했을 때
  if (file == undefined) {
    console.log("파일 선택이 취소됨");
    deleteCheck = -1; // 취소 == 파일이 없음 == 초기상태

    // 취소 시 기존 프로필 이미지로 변경
    profileImage.setAttribute("src", originalImage);
    return;
  }

  if (file.size > maxSize) {
    // 선택된 파일의 크기가 최대 크기를 초과한 경우
    alert("2MB 이하의 이미지를 선택해주세요.");
    imageInput.value = "";

    deleteCheck = -1; // 초기상태

    // 기존 프로필 이미지로 변경
    profileImage.setAttribute("src", originalImage);
    return;
  }

  // JS에서 파일을 읽는 객체
  // - 파일을 읽고 클라이언트 컴퓨터에 파일을 저장할 수 있음
  const reader = new FileReader();

  reader.readAsDataURL(file);
  // 매개변수이 작성된 파일을 읽어서 저장 후
  // 파일을 나타네는 URL을 result 속성으로 얻어올 수 있게 함.

  // 다 읽었을 때
  reader.onload = (e) => {
    // console.log(e.target);
    // console.log(e.target.result); // 읽은 파일의 URL

    const url = e.target.result;
    // console.log("url : " + url);

    // 프로필 이미지(img)태그에 src 속성으로 추가
    profileImage.setAttribute("src", url);

    deleteCheck = 1;

    alert("변경을 희망하시면 변경버튼을 눌러주세요.");
  };
});

// 대표 이미지 삽입 ( 숙소 )
const accProfileBtn = document.getElementById("change-acc-profile");
accProfileBtn.addEventListener("click", (e) => {

  const formData = new FormData();
  formData.append("AccProfileImage", imageInput.files[0]);

  console.log("fo : " + formData);

  fetch("accProfile", {
    method: "POST",
    body: formData,
  })
    .then((resp) => resp.text())
    .then((data) => {
      console.log(data);
      // 성공적으로 이미지를 서버에 업로드했다면
      alert("대표이미지가 설정이 완료되었습니다.");
      location.reload(); //새로고침
    })
    .catch((error) => {
      console.error("Error:", error);
      // 오류 처리
    });
});

/* 이미지 삭제하기  */
document.querySelectorAll(".delete-image").forEach(function (button) {
  button.addEventListener("click", function () {
    const accImgNo = this.getAttribute("data-item-accImgNo"); // 데이터 속성에서 itemId를 가져옵니다.

    console.log(accImgNo);

    if (confirm("정말 해당 이미지를 삭제하시겠습니까?")) {
      fetch("deleteAccImg", {
        method: "DELETE",
        headers: {
          "Content-Type": "text/plain",
        },
        body: accImgNo,
      })
        .then((resp) => resp.text())
        .then((result) => {
          console.log(result);
          // 성공적으로 이미지를 서버에 업로드했다면, 사용자에게 알림 등의 처리를 할 수 있습니다.
          if (result > 0) {
            location.reload(); //새로고침
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // 오류 처리
        });
    }
  });
});

// acc 숙소 이미지 업로드
const otherAccImgUploadBtn = document.getElementById("upload-acc-img");
otherAccImgUploadBtn.addEventListener("click", (e) => {
  const currentDivs = document.querySelectorAll(".other-acc-img").length;

  if (currentDivs < 25) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("other-acc-img");
    const newInput = document.createElement("input");
    newInput.type = "file";
    newInput.accept = "image/*";

    newInput.onchange = function (e) {
      if (e.target.files.length > 0) {
        // 파일이 선택되었을 때

        console.log("파일이 선택되었습니다.");

        const maxSize = 1 * 1024 * 1024 * 2; // 파일 최대 크기 지정(바이트 단위)

        // console.log(e.target); // input
        // console.log(e.target.value); // 업로드된 파일 경로
        // console.log(e.target.files); // 업로드된 파일의 정보가 담긴 배열

        const file = e.target.files[0]; //업로드한 파일의 정보가 담긴 객체

        if (file.size > maxSize) {
          // 선택된 파일의 크기가 최대 크기를 초과한 경우
          alert("2gb 이하의 이미지를 선택해주세요.");
          imageInput.value = "";

          //생성한 div 삭제

          return;
        }

        // JS에서 파일을 읽는 객체
        const reader = new FileReader();
        reader.onload = function (e) {
          const newImage = document.createElement("img");

          newImage.src = e.target.result;
          newDiv.appendChild(newImage);

          const formData = new FormData();

          formData.append("accImg", file);

          console.log("formData" + formData);

          fetch("insertAccImg", {
            method: "POST",
            body: formData,
          })
          .then((resp) => resp.text())
          .then((data) => {
            console.log(data);
            // 성공적으로 이미지를 서버에 업로드했다면, 사용자에게 알림 등의 처리를 할 수 있습니다.
            if (data > 0) {
              alert("이미지가 추가되었습니다.")
              location.reload(); //새로고침
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            // 오류 처리
          });
        };
        reader.readAsDataURL(newInput.files[0]);
      } else {
        location.reload(); //새로고침
      }
    };

    // newDiv.appendChild(newInput);
    // imgContainer의 첫번째 자식 요소로 newDiv를 추가합니다.
    // document
    //   .getElementById("imgContainer")
    //   .insertBefore(newDiv, document.getElementById("imgContainer").firstChild);
    newInput.click(); // 자동으로 파일 선택 창을 엽니다.
  } else {
    alert("최대 25개의 이미지 업로드가 가능합니다.");
  }
});
