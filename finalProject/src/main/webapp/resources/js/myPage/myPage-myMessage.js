
// ajax 실행 후에도 js가 작동하도록 함
$(document).on('click', '.fold-table tr.view',  function () {
    if ($(this).hasClass("open")) {
        $(this).removeClass("open").next(".fold").removeClass("open");
    } else {
        $(".fold-table tr.view").removeClass("open").next(".fold").removeClass("open");
        $(this).addClass("open").next(".fold").addClass("open");
    }
}); 

// 옵션 선택 시 데이터 가져오고 화면 업데이트하는 함수
$(function(){

    document.getElementById("categoryMessage").addEventListener("change",  e =>{
    
        fetch("/myPage/selectMyMessageCategory?categoryMessage="+ e.target.value)
        .then( resp => resp.json())
        .then( messageList => {
            allCheck.checked = false;

            const tbody = document.querySelector(".fold-table > tbody");
            tbody.innerHTML = "";
    
            for(let ms of messageList){
    
                const tr1 = document.createElement("tr");
                tr1.classList.add("view");
    
                const th1 = document.createElement("th");
                const checkBox = document.createElement("input");
                checkBox.setAttribute("type", "checkbox");
                checkBox.setAttribute("name", "deleteCheck");
                checkBox.setAttribute("class", "deleteCheck");
                checkBox.setAttribute("value", ms.messageNo);
                checkBox.setAttribute("onclick", 'event.cancelBubble=true;');
                th1.append(checkBox);
    
                const td1 = document.createElement("td");
                td1.innerText = ms.messageNo;
    
                const td2 = document.createElement("td");
                td2.classList.add("pcs");
                td2.innerText = ms.userNickname;
    
                const td3 = document.createElement("td");
                td3.classList.add("cur");
                const div1 = document.createElement("div");
                div1.classList.add("simpleContent");

                // XSS 방지 처리 해제
                ms.messageContent = ms.messageContent.replaceAll("&amp;", "&");
                ms.messageContent = ms.messageContent.replaceAll("&lt;", "<");
                ms.messageContent = ms.messageContent.replaceAll("&gt;", ">");
                ms.messageContent = ms.messageContent.replaceAll("&quot;", "\"");
                // 개행문자 처리 해제
                ms.messageContent = ms.messageContent.replaceAll("<br>","\n");
                div1.innerText = ms.messageContent;
                td3.append(div1);
    
                const td4 = document.createElement("td");
                td4.innerText = ms.messageCreateDate;
    
                tr1.append(th1, td1, td2, td3, td4);
    
                const tr2 = document.createElement("tr");
                tr2.classList.add("fold");
    
                const td5 = document.createElement("td");
                td5.setAttribute("colspan", "7");
                const div2 = document.createElement("div");
                div2.classList.add("fold-content");
                const h3 = document.createElement("h3");
                if(e.target.value == 'getMessage'){
                    h3.innerText = "FROM. " + ms.userNickname;
                } else{
                    h3.innerText = "To. " + ms.userNickname;
                }
                const p = document.createElement("p");
                p.innerText = ms.messageContent;
    
                div2.append(h3, p);
                td5.append(div2);
                tr2.append(td5);
    
                tbody.append(tr1, tr2);
            }
    
        })
        .catch(e => console.log(e))
    
    
    });


});



// '선택' 체크박스 클릭시 전체 선택
const allCheck = document.getElementById("allCheck");
const deleteCheckList = document.getElementsByName("deleteCheck");

allCheck.addEventListener("click", ()=>{
    for(let ch1 of deleteCheckList){
        ch1.checked = allCheck.checked;
    }
});



// 체크 박스 하나라도 unchecked인 경우 -> '선택' 체크박스 해제
$(document).on("change", 'input[name=deleteCheck]', function () {
    checkBoxListCheck();
});

function checkBoxListCheck(){
    for(let i=0; i<deleteCheckList.length; i++){
            
        // 모든 체크박스 checked X -> 전체 checked 해제
        if(allCheck.checked && !deleteCheckList[i].checked){
            allCheck.checked = false;
        }
        // 모든 체크박스 checked O -> 전체 checked
        let flag = true;
        for(let j=0; j<deleteCheckList.length; j++){
            if(!deleteCheckList[j].checked){
                flag = false;
            }
        }
        if(!allCheck.checked && flag){
            allCheck.checked = true;
        }
        
    }
}

// 선택한 쪽지 삭제
const deleteMessage = document.getElementById("deleteMessage")

deleteMessage.addEventListener("click", ()=>{
    
    let del = [];
    for(let ch2 of deleteCheckList){
        if(ch2.checked){
            del.push(ch2.value);
        }
    }

    if(del.length == 0){
        alert("쪽지 선택 후 삭제해주세요.");
        return;
    }

    console.log(del);

    if(confirm(`총 ${del.length}의 쪽지를 삭제하시겠습니까?`)){
        fetch("/message/deleteMessage",{
            method : "PUT",
            headers : {"Content-Type" : "application/JSON"},
            body : JSON.stringify(del)
        })
        .then(resp => resp.text())
        .then(result => {
            console.log(result);
            if(result == 0){
                alert("쪽지 삭제 실패");
                return;
            }

            alert("쪽지가 삭제되었습니다.");

            location.href = "myMessage";


        })
        .catch(e => console.log(e));

    } else{
        alert("쪽지 삭제 취소");
        return;
    }

})

