$(document).ready(function () {
  // '객실 정보 변경' 버튼 클릭 이벤트
  $("button[id='get-roomInput']").click(function () {
    var tr = $(this).closest('tr');

    const originCode = tr.find('#originCode').text();
    const originType = tr.find('#originType').text();
    const originCapacity = tr.find('#originCapacity').text();
    const originPrice = tr.find('#originPrice').text();

    //console.log("original :" + originCode, originType, originCapacity, originPrice);
    /* "original" 콘솔도 안찍히고 ,  */
    const originData = {
      "originCode": originCode,
      "originType": originType,
      "originCapacity": originCapacity,
      "originPrice": originPrice,
    }
    /* 데이터도 안담와집니다.  */
    //console.log("originData" + originData);

    tr.find('input').css('display', 'block');
    tr.find('span').css('display', 'none');
    $(this).css('display', 'none');
    tr.find("button[id='change-accGrade']").css('display', 'block');


  });


  // '변경내역 제출' 버튼 클릭 이벤트
  $("button[id='change-accGrade']").click(function () {

    const tr = $(this).closest('tr');

    // UI 원상태로 복구
    tr.find('input').css('display', 'none');
    tr.find('span').css('display', 'block');
    tr.find("button[id='get-roomInput']").css('display', 'block');
    tr.find("button[id='change-accGrade']").css('display', 'none');

    const accCode = tr.find('input[name="accCode"]').val();
    const accType = tr.find('input[name="accType"]').val();
    const roomCapacity = tr.find('input[name="roomCapacity"]').val();
    const roomPrice = tr.find('input[name="roomPrice"]').val();

    const roomCheckInTime = tr.find('input[name="roomCheckInTime"]').val();
    const roomCheckOutTime = tr.find('input[name="roomCheckOutTime"]').val();

    console.log(roomCheckInTime , roomCheckOutTime);
    if(roomCheckInTime == ""|| roomCheckInTime == ""){
      alert("체크인 , 체크아웃 시간을 기입해주세요.");
      return;
    }

    const room = {
      "accCode": accCode,
      "accType": accType,
      "roomCapacity": roomCapacity,
      "roomPrice": roomPrice,
      "roomCheckIn": roomCheckInTime,
      "roomCheckOut": roomCheckOutTime
    }

    const jsonString = JSON.stringify(room);

    fetch("updateRoom", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json', // 콘텐츠 타입을 JSON으로 지정
      },
      body: jsonString
    })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        alert("객실코드" + "\'" + accCode + "\'" + "번 방의 정보가 변경되었습니다.")
        location.reload(); //새로고침
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // 오류 처리
    });

  });


  $(".deleteSpan").on("click", function (event) {

    // 클릭된 요소가 deleteSpan인지 확인합니다.
    if (confirm("해당 객실을 삭제하시겠습니까?")) {

      // 클릭된 요소의 가장 가까운 상위 tr 요소를 찾습니다.
      const tr = event.target.closest('tr');
      // tr 요소 내에서 accCode 값을 찾습니다.
      const accCode = tr.querySelector('input[name="accCode"]').value;
      console.log(accCode); // 확인용 로그

      const jsonString = JSON.stringify(accCode);

      fetch("deleteRoom", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json', // 콘텐츠 타입을 JSON으로 지정
        },
        body: jsonString
      })
      .then((resp) => resp.text())
      .then((result) => {

        if (result > 0) {
          if(result==999){
            alert("해당 객실에 예약 내역이 있습니다. 삭제가 불가능합니다.");
            return;
          }else{
            alert("객실이 삭제되었습니다.");
            location.reload(); //새로고침
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // 오류 처리
      });



    }


  });


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






//   // fetch API를 사용하여 서버에 요청을 보냅니다.
//     method: 'POST', // 또는 'DELETE' 등 요청 메소드
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ accCode: accCode }),
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data); // 서버로부터의 응답 처리
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }


