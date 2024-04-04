$(document).ready(function () {
  // jQuery 선택자를 사용하여 모든 <tr> 요소 내의 input을 선택
  $('tr').find('input').css('display', 'block');
});



const insertRooms = document.getElementById("insertRooms");

insertRooms.addEventListener("click", () => {


  location.href = "/ownerPage/insertRooms";

  allRooms.classList.remove("currentList");
  insertRooms.classList.add("currentList");
});

const allRooms = document.getElementById("allRooms");
allRooms.addEventListener("click", () => {

  location.href = "/ownerPage/rooms";

  insertRooms.classList.remove("currentList");
  allRooms.classList.add("currentList");
});


const insertBtn = document.getElementById("insertRoomBtn");



insertBtn.addEventListener("click", e => {

  console.log("클릭");

  const accType = $('tr').find('input[name="accType"]').val();
  const roomCapacity = $('tr').find('input[name="roomCapacity"]').val();
  const roomPrice = $('tr').find('input[name="roomPrice"]').val();
  const roomCount = $('tr').find('input[name="roomCount"]').val();

  const roomCheckInTime = $('tr').find('input[name="roomCheckInTime"]').val();
  const roomCheckOutTime = $('tr').find('input[name="roomCheckOutTime"]').val();


  const room = {
    "accType": accType,
    "roomCapacity": roomCapacity,
    "roomPrice": roomPrice,
    "roomCount": roomCount,
    "roomCheckIn": roomCheckInTime,
    "roomCheckOut": roomCheckOutTime
  }
  const jsonString = JSON.stringify(room);

  // 필수 입력 필드 선택자
  const requiredFields =
    $('tr').find('input[name="accType"], input[name="roomCapacity"], input[name="roomPrice"], input[name="roomCount"], input[name="roomCheckInTime"], input[name="roomCheckOutTime"]');

  // 필수 입력 필드가 모두 채워져 있는지 확인하는 함수
  function areAllFieldsFilled() {
    let allFilled = true;
    requiredFields.each(function () {
      if ($(this).val() === '') {
        allFilled = false;
        return false; // 반복 중단
      }
    });
    return allFilled;
  }


  if (areAllFieldsFilled()) {

    console.log("값확인");

    fetch("insertRooms", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // 콘텐츠 타입을 JSON으로 지정
      },
      body: jsonString
    })
      .then((resp) => resp.text())
      .then((result) => {

        console.log("result" + result);
        if (result > 0) {

          alert("객실이 추가되었습니다.");
          location.href = "/ownerPage/rooms";

        } else {
          alert("통신실패");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // 오류 처리
      });
  } else {
    alert("값을 입력해주세요.");
  }


});
