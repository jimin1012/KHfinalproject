// 채팅 필요한 요소 
let targetNickname; // 상대방의 닉네임
let targetProfile; // 상대방의 프로필

const showChatList = document.getElementById("showChatList"); // 채팅 내용 전체 공간 div태그
const displayChat = document.getElementById("displayChat"); // 채팅 내용 나열하는 ul태그
const chatCalendar = document.getElementById("chatCalendar"); // 날짜 select태그

// 로그인한 회원이 일반 -> targetNo == 관리자
// 로그인한 회원이 관리자 -> targetNo == 일반, 사업자회원


// 현재 날짜 구하기
function getToday() {
    let date = new Date();

    const month = date.getMonth() +1 < 10 ? '0' + (date.getMonth() +1) : date.getMonth() +1;
    const day = date.getDate() +1 < 10 ? '0' + (date.getDate() +1) : date.getDate();

    return(`${date.getFullYear()}-${month}-${day}`); // 오늘 날짜 (YYYY-MM-DD)

}

// 채팅 내역 날짜 저장하는 변수
let dateList = [];



// 채팅방 입장 시 채팅 내역 조회하기
async function selectChatList() {

    fetch("/admin/selectChat?" + `userNo=${userNo}&targetNo=${targetNo}&chatRoomNo=${chatRoomNo}`)
    .then(resp => resp.json())
    .then( chatList => {

        // 채팅 날짜 검색 제거
        chatCalendar.innerHTML = '';

        // 중복되는 전송날짜 제거
        let sendDate = chatList.map( chat => chat.sendDate);
        const dateCheck = [...new Set(sendDate)];
        dateList = dateCheck;
        
        // 제일 최신 날짜순서로 select태그 option 설정
        const copyDate = [...dateList];
        copyDate.reverse();
        for(let cp of copyDate){
            // 채팅 날짜 select태그 option에 저장 
            const op = document.createElement("option");
            op.innerText = cp;
            op.value = cp;
            chatCalendar.appendChild(op);
            
        }
        


        // 채팅 내역 화면 제거
        displayChat.innerHTML = '';

        for(let date of dateCheck){

            // 채팅 날짜 화면에 출력
            const liDate = document.createElement("li");
            liDate.classList.add("chatDate");
            liDate.innerText = date;
            displayChat.append(liDate);
            
            for(let ch of chatList){

                // 해당 날짜의 채팅 내역 생성
                if(date == ch.sendDate){
                    if(ch.senderNo == userNo){
                        // 전송한 채팅 내역
                        const liMyChat = document.createElement("li");
                        liMyChat.classList.add("myChat", "chatLi");
                        
                        const p1 = document.createElement("p");
                        // XSS 방지 처리 해제
                        ch.chatContent = ch.chatContent.replaceAll("&amp;", "&");
                        ch.chatContent = ch.chatContent.replaceAll("&lt;", "<");
                        ch.chatContent = ch.chatContent.replaceAll("&gt;", ">");
                        ch.chatContent = ch.chatContent.replaceAll("&quot;", "\"");
                        // 개행문자 처리 해제
                        ch.chatContent = ch.chatContent.replaceAll("<br>","\n");
                        p1.innerText = ch.chatContent;

                        const span1 = document.createElement("span");
                        span1.innerText = ch.sendTime;
                        
                        liMyChat.append(span1, p1);
                        displayChat.append(liMyChat);
                    } else{
                        // 받은 채팅 내역
                        const liTargetChat = document.createElement("li");
                        liTargetChat.classList.add("targetChat", "chatLi");
                        
                        const p2 = document.createElement("p");
                        // XSS 방지 처리 해제
                        ch.chatContent = ch.chatContent.replaceAll("&amp;", "&");
                        ch.chatContent = ch.chatContent.replaceAll("&lt;", "<");
                        ch.chatContent = ch.chatContent.replaceAll("&gt;", ">");
                        ch.chatContent = ch.chatContent.replaceAll("&quot;", "\"");
                        // 개행문자 처리 해제
                        ch.chatContent = ch.chatContent.replaceAll("<br>","\n");
                        p2.innerText = ch.chatContent;

                        const span2 = document.createElement("span");
                        span2.innerText = ch.sendTime;
                        
                        liTargetChat.append(p2, span2);
                        displayChat.append(liTargetChat);
                    
                    }
                }
                
            }


        } // 채팅 내역 생성 끝

        
        // 스크롤 최하단 이동
        displayChat.scrollTop = displayChat.scrollHeight;
       

    })
    .catch(e => console.log(e))


    

}



// sockjs를 이용한 WebSocket 구현
// 로그인 상태에서만 이용 가능
let chattingSock;
if(userNo != ""){
    chattingSock = new SockJS("/chattingSock");
}

// 채팅 입력
const sendChatBtn = document.getElementById("sendChatBtn");

const sendChat = () => {
    const inputChat = document.getElementById("inputChat");

    // 입력된 값이 없는 경우 실행x
    if(inputChat.value.trim().length == 0){
        alert("채팅을 입력해주세요");
        inputChat.value = "";
    } else{

        // 작성한 내용 채팅 전송
        var obj = {
            "senderNo" : userNo,
            "targetNo" : targetNo,
            "chatRoomNo" : chatRoomNo,
            "chatContent" : inputChat.value
        };

        chattingSock.send(JSON.stringify(obj));

        inputChat.value = ""; // 전송 후 인풋창 클린
    }
    selectChatList();
}


// 엔터 == 제출
// 쉬프트 + 엔터 == 줄바꿈
inputChat.addEventListener("keyup", e => {
    if(e.key == "Enter"){ 
       if (!e.shiftKey) {
        sendChat();
       }
    }
})




// WebSocket 객체 chattingSock이 서버로부터 메세지를 통지 받으면 자동으로 실행될 콜백 함수
chattingSock.onmessage = e => {
     
    const chat = JSON.parse(e.data);

    // 현재 채팅방 번호 == 가져온 채팅방 번호인 경우
    if(chatRoomNo == chat.chatRoomNo){

        // 실시간 전송/받은 메세지 출력
        const li = document.createElement("li");

        // 메세지 내용
        const p = document.createElement("p");
        p.innerHTML = chat.chatContent;

        // 실시간으로 전송한 채팅
        if(userNo == chat.senderNo){
            li.classList.add("myChat", "chatLi");
            li.append(p);
        } else{
            // 실시간으로 받은 채팅
            li.classList.add("targetChat" , "chatLi");
            li.append(p);
        }

        // ul태그(displayChat)
        displayChat.append(li);

        // 스크롤 최하단 이동
        displayChat.scrollTop = displayChat.scrollHeight;
    }

    selectChatList();
}





document.addEventListener("DOMContentLoaded", () =>{

    // 채팅 내역 추가
    selectChatList();

    //전송 버튼 클릭 시 전송
    sendChatBtn.addEventListener("click", sendChat);

});



// 중요 채팅방 변경
const starCheck = document.getElementsByClassName("starCheck");
const blockCheck = document.getElementsByClassName("blockCheck");


starCheck[0].addEventListener("click", e =>{
        
    let check = 0; // 중요 별 표시 확인

    if(e.target.classList.contains("fa-regular")){ // 빈 별
        check = 0;
    }else{ // 컬러 별
        check = 1;
    }

    fetch( "/admin/starCheck", {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            "chatRoomNo" : chatRoomNo,
            "check" : check
        })
    })
    .then( resp => resp.text())
    .then( result => {
        if(result > 0){
            e.target.classList.toggle("fa-regular");
            e.target.classList.toggle("fa-solid");
        }
    })
    .catch(e => console.log(e))

})



// 차단하기
const blockBtn = document.getElementById("blockBtn");

blockBtn.addEventListener("click", ()=> {
    
    
    if(confirm("현재 채팅방을 차단하시겠습니까?")){
        fetch("/admin/chatBlock",{
            method : "PUT",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({"chatRoomNo" : chatRoomNo})
        })
        .then(resp => resp.text())
        .then(result => {
            console.log(result);
            if(result > 0){
                alert("차단되었습니다.");
                
                location.href = "/admin/adminChatList";
                
            }
            
        })
        .catch(e => console.log(e))
    }
    
})