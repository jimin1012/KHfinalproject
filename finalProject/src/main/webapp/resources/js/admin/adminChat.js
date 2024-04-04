
// 비동기로 채팅 마지막 내역 보여주기
// (() => {
//     console.log("확인");

//     fetch("/admin/adminChatLastContent")
//     .then( resp => resp.json())
//     .then( map => {

//         console.log(map);
//         for(let m of map){
//             console.log("확인");
//             console.log(map.lastMessage);
//         }

//     })
//     .catch( e => console.log(e))

// })();




// 중요 채팅방 변경
const starCheck = document.getElementsByClassName("fa-star");
const blockCheck = document.getElementsByClassName("blockCheck");

for(let s=0; s<starCheck.length; s++){
    starCheck[s].addEventListener("click", e =>{
        
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
                "chatRoomNo" : blockCheck[s].value,
                "check" : check
            })
        })
        .then( resp => resp.text())
        .then( result => {
            if(result > 0){
                e.target.classList.toggle("fa-regular");
                e.target.classList.toggle("fa-solid");
            }

            // 전체 채팅방 목록인 경우 -> 다시 목록 조회
            if(stateFl == "" || stateFl == null){
               const params = new URL(location.href).searchParams;
               
               if(params.get("authority") != null){ // 검색한 경우
                   const authority = "?authority=" + params.get("authority");
                   const userNickname = "&userNickname=" + params.get("userNickname");
                   location.href = `/admin/adminChatList${authority}${userNickname}`;
               } else{ // 검색 X
                   location.href = "/admin/adminChatList";

               }
           }
            // 중요 채팅방 목록인 경우 -> 다시 목록 조회
            if(stateFl == "vip"){
                const params = new URL(location.href).searchParams;
                
                if(params.get("authority") != null){ // 검색한 경우
                    const authority = "&authority=" + params.get("authority");
                    const userNickname = "&userNickname=" + params.get("userNickname");
                    location.href = `/admin/adminChatList?stateFl=vip${authority}${userNickname}`;
                } else{ // 검색 X
                    location.href = "/admin/adminChatList?stateFl=vip";

                }
            }
        })
        .catch(e => console.log(e))

    })
}



// 검색창 상태 유지
(function(){
    const options = document.querySelectorAll("#selectUserType > option");

    for(let op of options){
        const params = new URL(location.href).searchParams;
        const authority = params.get("authority");

        if(op.value == authority){
            op.selected = true;
        }
    }

})()



// 전체, 중요 채팅방 -> 차단으로 상태 변경
const allCheck = document.getElementById("allCheck");
const blockList = document.getElementsByName("blockCheck");
const blockBtn = document.getElementById("blockBtn");


// 전체 선택 클릭 시 모든 체크 박스 선택

if(allCheck != null){
    allCheck.addEventListener("click", function(){
        for(let i=0; i<blockList.length; i++){
            blockList[i].checked = allCheck.checked;
        }
    })

}

this.addEventListener("click", function(e){ // 화면에 클릭 이벤트 발생
    for(let i=0; i<blockList.length; i++){
        if(e.target == blockList[i]){
            // 모든 체크박스 checked X -> 전체 checked 해제
            if(allCheck.checked && !blockList[i].checked){
                allCheck.checked = false;
            }
        }
    }



    // 모든 체크박스 checked O -> 전체 checked
    let flag = true;
    for(let j=0; j<blockList.length; j++){
        if(!blockList[j].checked){
            flag = false;
        }
    }
    if(!allCheck.checked && flag){
        allCheck.checked = true;
    }
})


// 체크된 채팅방 -> 차단 처리
if(blockBtn != null){

    blockBtn.addEventListener("click", ()=> {
        
        let arrayB = [];
        for(let i=0; i<blockList.length; i++){
            if(blockList[i].checked){
                arrayB.push(blockList[i].value);
            }
        }
        
        if(confirm(`총 ${arrayB.length}개의 방을 차단하시겠습니까?`)){
            fetch("/admin/chatBlock",{
                method : "PUT",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({"arrayB" : arrayB})
            })
            .then(resp => resp.text())
            .then(result => {
                console.log(result);
                if(result > 0){
                    alert("차단되었습니다.");
                    
                    const params = new URL(location.href).searchParams;
                    const paramFl = "?stateFl=" + params.get("stateFl");
                    const authority = "&authority=" + params.get("authority");
                    const userNickname = "&userNickname=" + params.get("userNickname");
                    
                    if(params.get("stateFl") == null){
                        location.href = "/admin/adminChatList";
                    } else if(params.get("authority") == null ){
                        location.href = `/admin/adminChatList${paramFl}`;
                    } else {
                        location.href = `/admin/adminChatList${paramFl}${authority}${userNickname}`;
                    }
                    
                }
                
            })
            .catch(e => console.log(e))
        }
        
    })
}


const cancelBtn = document.getElementById("cancelBtn");

// 체크된 채팅방 -> 차단 해제 처리
if(cancelBtn != null){

    cancelBtn.addEventListener("click", ()=> {
        console.log("확인");
        let arrayB = [];
        for(let i=0; i<blockList.length; i++){
            if(blockList[i].checked){
                arrayB.push(blockList[i].value);
            }
        }
        
        if(confirm(`총 ${arrayB.length}개 방의 차단을 해제하시겠습니까?`)){
            fetch("/admin/chatCancelBlock",{
                method : "PUT",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({"arrayB" : arrayB})
            })
            .then(resp => resp.text())
            .then(result => {
                console.log(result);
                if(result > 0){
                    alert("차단되었습니다.");
                    
                    const params = new URL(location.href).searchParams;
                    const authority = "&authority=" + params.get("authority");
                    const userNickname = "&userNickname=" + params.get("userNickname");
                    
                    
                    
                    if(params.get("authority") == null ){
                        location.href = `/admin/adminChatList?stateFl=block`;
                    } else {
                        location.href = `/admin/adminChatList?stateFl=block${authority}${userNickname}`;
                    }
                    
                }
                
            })
            .catch(e => console.log(e))
        }
        
        
        
        
    })
}
    
    
const deleteBtn = document.getElementById("deleteBtn");

// 체크된 채팅방 -> 삭제 처리
if(deleteBtn != null){

    deleteBtn.addEventListener("click", ()=> {
        console.log("확인");
        let arrayB = [];
        for(let i=0; i<blockList.length; i++){
            if(blockList[i].checked){
                arrayB.push(blockList[i].value);
            }
        }
        
        if(confirm(`총 ${arrayB.length}개 방을 삭제 하시겠습니까?`)){
            fetch("/admin/chatDeleteBlock",{
                method : "DELETE",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify({"arrayB" : arrayB})
            })
            .then(resp => resp.text())
            .then(result => {
                console.log(result);
                if(result > 0){
                    alert("삭제되었습니다.");
                    
                    const params = new URL(location.href).searchParams;
                    const authority = "&authority=" + params.get("authority");
                    const userNickname = "&userNickname=" + params.get("userNickname");
                    
                    
                    
                    if(params.get("authority") == null ){
                        location.href = `/admin/adminChatList?stateFl=block`;
                    } else {
                        location.href = `/admin/adminChatList?stateFl=block${authority}${userNickname}`;
                    }
                    
                }
                
            })
            .catch(e => console.log(e))
        }
        
        
        
        
    })
}
    
    
    
    
    
    
    
    
    
    
    