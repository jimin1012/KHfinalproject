// showChatList = 채팅 내용 전체 공간 div태그
// displayChat = 채팅 내용 나열하는 ul태그
// chatCalendar = 날짜 select태그
// options =  날짜 select태그 option태그들

// 로그인한 회원이 일반 -> targetNo == 관리자
// 로그인한 회원이 관리자 -> targetNo == 일반, 사업자회원

// 선택한 날짜로 스크롤 이동
chatCalendar.addEventListener("change", e => {
    const chatDate = document.querySelectorAll(".chatDate");

    for(let cd of chatDate){
        
        if(cd.innerText == e.target.value){
            let location = cd.offsetTop;
            showChatList.scrollTo({top:location - 300, behavior:'smooth'});
        }
    }

})




// 채팅 검색창
const queryChat = document.getElementById("queryChat");

// 채팅 검색 이동버튼 영역
const upDownArea = document.getElementsByClassName("upDownArea")[0];

// 검색된 단어 수
const keyCount = document.getElementById("keyCount"); 


queryChat.addEventListener("keyup", e =>{

    if(e.key == "Enter"){ 
        
        if(queryChat.value.trim().length == 0){
            alert("검색어를 입력한 뒤 이용해주세요");
            queryChat.value="";
            return;
        }
        
        // 채팅 배열
        const chatP = document.querySelectorAll(".chatLi > p");
        
        let array = [];
        for(let i=0; i< chatP.length; i++){
            
            if(chatP[i].innerText.includes(e.target.value)){
                        
                // 검색된 채팅 내용 담는 배열
                array.push(chatP[i].innerText);
                
                if(array[0] == chatP[i].innerText){
                    // 첫 위치로 이동  
                    showChatList.scrollTo({top:chatP[i].offsetTop- 300, behavior:'smooth'});
                }
            }
        }
        
        // 검색 결과가 없는 경우    
        if(array.length == 0){
            alert("조회 결과가 없습니다.");
            return;
        }

        // 검색 결과를 mark 태그 처리
        for(let p of chatP){
            p.innerHTML = p.innerText.replace(e.target.value, `<mark>${e.target.value}</mark>`);
        }

        // 조회 결과 개수 출력
        let currentNo = 1; // 항상 첫번째 위치
        let totalCount = array.length;
        keyCount.innerText = `${currentNo} / ${totalCount}`;

        // 채팅 검색 이동버튼 영역 보여주기
        upDownArea.classList.add("showChatBtn");
        
        
    }

})


// 검색 버튼
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const clearBtn = document.getElementById("clearBtn");

// next버튼(아래) 클릭 시 다음 조회 결과로 이동
let y = 0; // 위치 넘버
nextBtn.addEventListener("click", ()=>{
    
    // 채팅 배열
    const chatP = document.querySelectorAll(".chatLi > p");
    
    let array = [];
    for(let i=0; i< chatP.length; i++){
        if(chatP[i].innerText.includes(queryChat.value)){        
            // 검색된 채팅 내용 담는 배열
            array.push(chatP[i].innerText);
        }
    }


    // 클릭 마다 증가
    y++;
    
    // 위치 넘버가 array끝 번호까지 다다른 뒤
    if(y === array.length){
        y = 0; // 처음 결과로 이동
    }else{
        y = y;
    }

    for(let i=0; i< chatP.length; i++){
        if(array[y] == chatP[i].innerText){
            
            showChatList.scrollTo({top:chatP[i].offsetTop- 300, behavior:'smooth'});
        }
    }

    // 조회 결과 개수 출력
    let currentNo = y+1; // 항상 첫번째 위치
    let totalCount = array.length;
    keyCount.innerText = `${currentNo} / ${totalCount}`;

})


// prev버튼(위) 클릭 시 다음 조회 결과로 이동
prevBtn.addEventListener("click", ()=>{
   

    // 채팅 배열
    const chatP = document.querySelectorAll(".chatLi > p");
    let array = [];
    for(let i=0; i< chatP.length; i++){
        if(chatP[i].innerText.includes(queryChat.value)){        
            // 검색된 채팅 내용 담는 배열
            array.push(chatP[i].innerText);
        }
    }

    // 위치넘버가 첫자리에 다다른 후
    if(y == 0){
        y = array.length; // 제일 마지막 위치로 이동
    }

    // 클릭 마다 감소
    y--;

    for(let i=0; i< chatP.length; i++){
        if(array[y] == chatP[i].innerText){
            
            showChatList.scrollTo({top:chatP[i].offsetTop- 300, behavior:'smooth'});
        }
    }

    // 조회 결과 개수 출력
    let currentNo = y+1; // 항상 첫번째 위치
    let totalCount = array.length;
    keyCount.innerText = `${currentNo} / ${totalCount}`;

})





// 검색창 X 버튼 클릭시
clearBtn.addEventListener("click", () => {
    y = 0;
    console.log("X클릭확인");
    console.log(y);

    // 채팅 배열
    const chatP = document.querySelectorAll(".chatLi > p");

    // mark 태그 없애기
    for(let p of chatP){
        p.innerHTML = p.innerText.replace(`<mark>${queryChat.value}</mark>`, queryChat.value);
    }

    // 검색창 비우기
    queryChat.value = '';

    // 조회 결과 개수 0처리
    keyCount.innerText = "0 / 0";

    // 채팅 검색 이동버튼 영역  숨기기
    upDownArea.classList.remove("showChatBtn");

})

















