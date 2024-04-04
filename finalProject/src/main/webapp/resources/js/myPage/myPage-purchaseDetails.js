// const frm = document.getElementById("myPost");
const table = document.querySelector(".fold-table> tbody");
console.log(table);

document.getElementById('category').addEventListener('change', function() {
    var selectedValue = this.value;
    if (selectedValue === 'train') {
        reLoad(selectedValue);

    } else if (selectedValue === 'bus') {
        reLoad(selectedValue);
    } else if (selectedValue === 'acc') {
        reLoad(selectedValue);
    } else {
        reLoad(selectedValue);
    }
});

const hiddenInput = document.querySelector('.reservationNo');
const reservationNos = document.querySelectorAll('.reserVal');
function reLoad(selectedValue) {
    fetch("/myPage/purchaseDetailsSearch?category=" + selectedValue)
    .then(res => res.json())
    .then(resp => {
        console.log(resp);
        console.log(resp.map.list.length);
        table.innerText = "";
        let reservType = "";


        if(resp.map.list.length == 0){
            let tr = document.createElement("tr");
            let th = document.createElement("th");
            th.innerText="결제내역이 존재하지 않습니다.";
            th.setAttribute("colspan","10");
            tr.append(th);
            table.append(tr);
        }else{

            for (const i of resp.map.list) {
                if (i.reservType == "A") reservType = "숙소";
                if (i.reservType == "B") reservType = "버스";
                if (i.reservType == "T") reservType = "기차";
    
                console.log(i);
                let tr = document.createElement("tr");
                tr.setAttribute("class","view");
                let td1 = document.createElement("td");
                td1.innerText = i.reservationNo;
                let td2 = document.createElement("td");
                td2.innerText = i.reservationName;
                let td3 = document.createElement("td");
                if (i.reservType == "A")  td3.innerText = i.accAddr;
                else  td3.innerText = i.depPlace;
    
                let td4 = document.createElement("td");
                td4.innerText = i.arrPlace;
                let td5 = document.createElement("td");
                td5.innerText = i.reservationStartDate;
                let td6 = document.createElement("td");
                td6.innerText = i.reservationEndDate;
                let td7 = document.createElement("td");
                td7.innerText = i.price;
                let td8 = document.createElement("td");
                td8.innerText = i.payTime;
                let td9 = document.createElement("td");
                td9.innerText = reservType;
    
                let td10 = document.createElement("td");
                let button = document.createElement("button");
                
                

                if(reservationNos.length == 0){
                    button.innerText = "취소";
                    button.setAttribute("onclick", "return orderCancle(" + i.reservationNo + ",'" + i.reservUID + "')");
                }else{
                    for(const inputElement of reservationNos) {
                        const reservationNo = inputElement.value;
                        var found = false; 
    
                        if (i.reservationNo == reservationNo) {       
                            button.style.backgroundColor = "blue";
                            button.style.color = "white";
                            button.innerText = "리뷰";
                            button.setAttribute("data-reservationNo", i.reservationNo);
							button.setAttribute("id", "reviewBtn");
							button.setAttribute("class", "reviewBtn");
							                                                                              
                            found = true; 
                               break;
                        } else {
                            button.innerText = "취소";
                            button.setAttribute("onclick", "return orderCancle(" + i.reservationNo + ",'" + i.reservUID + "')");
                        }
                    };
                }
               
    
    
    
                td10.append(button);
                tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9, td10);
                table.append(tr);
            }
        }


        
    })
    .catch(e => {
        console.log(e);
    });
}



function orderCancle(reservationNo,UID){
    const params = {
        "reservUID" : UID , 
        "reservationNo" : reservationNo
    }
    fetch("/orderCancle",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
    })
    .then(res=>res.text())
    .then(res=>{
        if(res>0){
            alert("결제 취소 되었습니다.");
            // location.href="/";
            location.replace("/myPage/purchaseDetails");
        }
     
    })
    .catch(e=>{console.log(e);})


}







  var modal1 = document.getElementById("myModal1");
  var modalContent1 = document.getElementById("modal-content1");
  var modalUserName = document.getElementById("modal-userName");
  var modalBackground = document.getElementById("modal-background1"); 

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("reviewBtn")) {
        event.preventDefault();
        
        const accReviewContent = document.getElementById("accReviewContent"); 
        const accCleanRate = document.getElementById("accCleanRate"); 
        const accFacRate = document.getElementById("accFacRate"); 
        const accKindRate = document.getElementById("accKindRate"); 
        
        accReviewContent.value = "";
        accCleanRate.value = 5;
        accFacRate.value = 5;
        accKindRate.value = 5;
        
        const reservationNo = event.target.getAttribute('data-reservationNo');
        hiddenInput.value = reservationNo;
        
        modal1.style.display = "block";
        modalBackground.style.display = "block";
    }
});



  modalBackground.addEventListener("click", function() {
	    modal1.style.display = "none"; 
	    this.style.display = "none"; 
	});
	
const reviewCan = document.getElementById("reviewCan"); 
reviewCan.addEventListener("click", function() {	
	    modal1.style.display = "none"; 
	    modalBackground.style.display = "none";
  });