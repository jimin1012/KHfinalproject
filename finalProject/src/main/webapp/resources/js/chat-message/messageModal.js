// 쪽지 작성 글자수 제한
const messageContent = document.getElementById("messageContent"); // 쪽지 작성란

if(messageContent != null){
    messageContent.addEventListener("input", function(){
            
        let length = this.value.length;
        $("#counter").text(length);
            
        if(length <= 900){
            $("#counter").css("color", "black");
        }else if( length <=999){
            $("#counter").css("color", "orange");
        } else{
            $("#counter").css("color", "red");
            
            const str = this.value;
            this.value = str.substr(0,1000);
            $("#counter").text(1000);
        }
        
    })
    
}




// 쪽지 모달창 꺼내기 + 끄기
const wm = document.getElementsByClassName("writeMessage"); // 쪽지창 배열 개수용
const modalMessage = document.querySelector(".modalMessage"); // 쪽지 모달창
const sendMessageBtn = document.getElementById("sendMessageBtn"); // 전송하기 버튼

// 모달창 닫는 함수
function closeModal(){
   
    messageContent.value = "";
    $("#counter").text(0);

    modalMessage.classList.toggle("hideM"); // hide 클래스 추가
                        
    setTimeout( function(){ // 0.45초 후 동작
        modalMessage.classList.toggle("hideM"); // hide 클래스 제거
        modalMessage.classList.toggle("showM"); // remove
    } ,450);

    
}



// 쪽지보내기 상자 열기
function showMessageModal(userNo1, userNickName, userArea, board){

    if(wm.length > 0){
        wm[0].remove();
    }
    
    const divMsg = document.createElement("div");
    divMsg.innerText = "쪽지보내기";
    divMsg.classList.add("writeMessage");
    
    if(board == 'board'){
        divMsg.classList.add("boardFL");
        userArea.after(divMsg);
    } else if( board == 'boardF'){
        userArea.children[0].before(divMsg);
    }
    else{
        userArea.after(divMsg);
    }

    // 쪽지 모달창 오픈함수 추가
    divMsg.setAttribute("onclick", `openMessageModal(${userNo1}, '${userNickName}')`);
     
    
};




// 쪽지 모달창 닫기
if(document.getElementById("modalMessageCloseBtn") != null){
    document.getElementById("modalMessageCloseBtn").addEventListener("click", ()=>{
        wm[0].remove(); 
        
        if(messageContent.value.trim().length == 0){
            closeModal();
        }else{

            if(confirm("쪽지 작성 중입니다. 쪽지 작성을 취소하시겠습니까?")){
                closeModal();
            }
        }
        
    })
}


// 쪽지 모달창 열기
function openMessageModal(userNo1, userNickName){

    if(loginMemberNo.trim().length ==0){
        alert("로그인한 쪽지를 작성할 수 있습니다.");
        return;
    }

    modalMessage.classList.toggle("showM");
        
    document.getElementById("recieverName").innerText = "To. " + userNickName;
    
    // 작성한 쪽지내용 전송
    sendMessageBtn.setAttribute("onclick", `sendMessage(${userNo1})`)
}


// 쪽지 전송
function sendMessage(userNo1){

    if(messageContent.value.trim().length == 0){
        alert("쪽지 내용을 작성한 후 전송버튼을 눌러주세요.");
        return;
    }

    
    fetch("/message/sendMessage", {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            "senderNo" : loginMemberNo,
            "recieverNo": userNo1,
            "messageContent" : messageContent.value
        })
    })
    .then(resp => resp.text())
    .then( result => {
       
        if(result == 0){
            alert("쪽지 전송 실패");
            return;
        }
        alert("쪽지가 전송되었습니다.");
        wm[0].remove(); 
        closeModal();
    })
    .catch(e => console.log(e))

}