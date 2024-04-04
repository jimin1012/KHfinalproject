$(document).on('click', '.fold-table tr.view',  function () {
    if ($(this).hasClass("open")) {
        $(this).removeClass("open").next(".fold").removeClass("open");
    } else {
        $(".fold-table tr.view").removeClass("open").next(".fold").removeClass("open");
        $(this).addClass("open").next(".fold").addClass("open");
    }
}); 

const table = document.querySelector(".fold-table> tbody");

$(function () {
    document.getElementById("category").addEventListener("change", e => {

        const category = e.target.value;
        console.log(category)

        fetch("myCommentCategory?category=" + category)
            .then(resp => resp.json())
            .then(data => {

                console.log(data)

                allCheck.checked = false;

                const tbody = document.querySelector(".fold-table > tbody");
                tbody.innerHTML = "";

                if (!Array.isArray(data)) {
                    data = [data];
                }

                if (data.length == 0) {
                    let tr = document.createElement("tr");
                    let th = document.createElement("th");
                    th.innerText = "내 댓글이 존재하지 않습니다.";
                    th.setAttribute("colspan", "3");
                    tr.append(th);
                    table.append(tr);
                } else {

                    data.forEach(comment => {

                        comment.map.list.forEach(item => {

                            const tr1 = document.createElement("tr");
                            tr1.classList.add("view");
                            const th1 = document.createElement("th");
                            const checkBox = document.createElement("input");
                            checkBox.setAttribute("type", "checkbox");
                            checkBox.setAttribute("name", "deleteCheck");
                            checkBox.setAttribute("class", "deleteCheck");
                            checkBox.setAttribute("value", item.commentNo);
                            checkBox.setAttribute("onclick", 'event.cancelBubble=true;');
                            th1.append(checkBox);

                            const td1 = document.createElement("td");
                            td1.innerText = item.commentContent;

                            // const td2 = document.createElement("td");
                            // td2.classList.add("pcs");
                            // td2.innerText = comment.commentCreateDate;

                            const td2 = document.createElement("td");
                            td2.classList.add("cur");
                            const div1 = document.createElement("div");
                            div1.classList.add("simpleContent");
                            div1.innerText = item.boardTitle;
                            td2.append(div1);

                            tr1.append(th1, td1, td2);

                            const tr2 = document.createElement("tr");
                            tr2.classList.add("fold");

                            const td3 = document.createElement("td");
                            td3.setAttribute("colspan", "4");
                            const div2 = document.createElement("div");
                            div2.classList.add("fold-content");
                            const h3 = document.createElement("h3");
                            h3.innerText = item.boardTitle;

                            const p = document.createElement("p");
                            p.innerText = item.boardContent;

                            div2.append(h3, p);
                            td3.append(div2);
                            tr2.append(td3);

                            tbody.append(tr1, tr2);
                        })


                    })
                }
            })

            .catch(e => console.log(e));
    })
})


// 전체 선택
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
        for(let j = 0; j < deleteCheckList.length; j++){
            if(!deleteCheckList[j].checked){
                flag = false;
            }
        }
        if(!allCheck.checked && flag){
            allCheck.checked = true;
        }
        
    }
}

// 선택한 댓글 삭제
const deleteMyComment = document.getElementById("deleteMyComment")

deleteMyComment.addEventListener("click", (e)=>{
    
    let del = [];
    for(let ch2 of deleteCheckList){
        if(ch2.checked){
            del.push(ch2.value);
            console.log(del);
            
        }
    }

    if(del.length == 0){
        alert("삭제할 댓글을 선택 후 삭제해주세요.");
        e.preventDefault();
        return;
    }

    if(confirm(`정말 ${del.length}의 댓글을 삭제하시겠습니까?`)){
        fetch("deleteMyComment",{
            method : "PUT",
            headers : {"Content-Type" : "application/JSON"},
            body : JSON.stringify(del)
        })
        .then(resp => resp.text())
        .then(result => {
            console.log(result);
            if(result == 0){
                alert("댓글 삭제 실패");
                return;
            }

            alert("댓글이 삭제되었습니다.");

            location.href = "myComment";

        })
        .catch(e => console.log(e));

    } else{
        alert("댓글 삭제가 취소되었습니다.");
        e.preventDefault();
        return;
    }

})