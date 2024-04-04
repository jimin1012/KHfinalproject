const deleteBtn = document.getElementById("deleteBtn");

if(deleteBtn!=null){
    deleteBtn.addEventListener("click",()=>{
        if(confirm("정말 "+userName+" 유저를 탈퇴시키시겠습니까?")){
            fetch("/deleteUser/"+userNo)
            .then(res=>res.text())
            .then(resp=>{
                console.log(resp);
                if(resp>0){
                    alert("회원을 탈퇴시켰습니다.");
                    location.href="/admin";
                }else{
                    alert("회원 탈퇴에 실패했습니다.");
                }
               
            })
            .catch(e=>{console.log(e);})
        }else{
            return;
        }
    })
}
