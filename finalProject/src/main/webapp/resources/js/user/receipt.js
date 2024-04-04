const cancleBtn = document.getElementById("cancleBtn");
const myPageBtn = document.getElementById("myPageBtn");


if(cancleBtn!=null){
    const params = {
        "reservUID" : reservUID , 
        "reservationNo" : reservationNo
    }
    cancleBtn.addEventListener("click",()=>{
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
                location.replace("/");
            }
         
        })
        .catch(e=>{console.log(e);})
    })


    myPageBtn.addEventListener("click",()=>{
        // location.href="/myPage/profile";
        location.replace("/myPage/purchaseDetails");
    })
}