    $(document).ready(function() {
        // 달력 입력 전에 "체크인 - 체크아웃"을 설정합니다.
        $('#startDate').val("체크인 - 체크아웃");

        // 달력을 초기화하고 설정합니다.
        $('#startDate').daterangepicker({
            "minYear": 1000,
            "maxYear": 9999,
            "locale": {
                "format": 'YYYY-MM-DD',
                "separator": " ~ ",
                "applyLabel": "확인",
                "cancelLabel": "취소",
                "fromLabel": "From",
                "toLabel": "To",
                "customRangeLabel": "Custom",
                "weekLabel": "주",
                "daysOfWeek": [
                    "일",
                    "월",
                    "화",
                    "수",
                    "목",
                    "금",
                    "토"
                ],
                "monthNames": [
                    "1월",
                    "2월",
                    "3월",
                    "4월",
                    "5월",
                    "6월",
                    "7월",
                    "8월",
                    "9월",
                    "10월",
                    "11월",
                    "12월"
                ],
                "firstDay": 1,
                // 월과 연도 표시 형식을 수정합니다.
                "monthYearFormat": "YYYY년 MMMM"
            },
            // 입력란 클릭 시 달력이 아래에 표시되도록 설정합니다.
            opens: 'bottom'
        });
    });
    
    
   
    const accAutoSearch = document.getElementById("accAutoSearch");
    const where = document.getElementById("where");
    if(where!=null){
    	where.addEventListener("input",(e)=>{
        if(where.value.trim().length!=0){
            fetch("/search/autoSearch",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body :  JSON.stringify({
                    "input" : where.value
                }) 
            })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                accAutoSearch.style.display="block";
                accAutoSearch.innerHTML="";

                // result의 얕은 복사본을 생성
                const data = [...result];

                for (let i = 0; i < data.length; i++) {
                    if (data[i].accAddr.includes('^^^')) {
                        let parts = data[i].accAddr.split('^^^');
                        // 변환된 주소로 업데이트
                        data[i].accAddr = parts[1] + " " + parts[2] + " (" + parts[0] + ")";
                    }
                }

                // 변환된 주소가 포함된 data 배열을 result에 할당
                // result = data;

                // 필요한 경우 변환된 결과를 확인
                // console.log(result);




                if(data.length == 0){
                    const li = document.createElement("li");
                    li.innerText="일치하는 값이 없습니다.";
                    accAutoSearch.append(li);

                }

                for(const key in data){
                    const li = document.createElement("li");
                    const a = document.createElement("a");

                    a.innerText = data[key].accAddr;

                    a.addEventListener("click", function(){
                        where.value = data[key].accAddr;
                        accAutoSearch.style.display="none";
                    })

                    li.append(a);
                    accAutoSearch.append(li);
                }
         
            })
            .catch(err => console.log(err));
        }else{
            accAutoSearch.style.display="none";
        }
        })


    }
    
    


      const totalPerShow = document.getElementById("totalPerShow");
		
      document.getElementById("totalPer").addEventListener("click", function(){
    	  totalPerShow.style.display="block";
      })
	
      const adultNum = document.getElementById("adultNum");
      const childNum = document.getElementById("childNum");
      const grNum = document.getElementById("grNum");
      
      document.getElementById("adultPlus").addEventListener("click", function(){
    	   adultNum.value = parseInt(adultNum.value)+1;
      })

      document.getElementById("adultMinus").addEventListener("click", function(){
    	   adultNum.value = parseInt(adultNum.value)-1;

         if(adultNum.value < 0){
            alert("0이하는 설정불가");
            adultNum.value = 0;
         }
      })



      document.getElementById("childPlus").addEventListener("click", function(){
         childNum.value = parseInt(childNum.value)+1;
      })

      document.getElementById("childMinus").addEventListener("click", function(){
         childNum.value = parseInt(childNum.value)-1;

         if(childNum.value < 0){
            alert("0이하는 설정불가");
            childNum.value = 0;
         }
      })



      document.getElementById("grPlus").addEventListener("click", function(){
         grNum.value = parseInt(grNum.value)+1;
      })

      document.getElementById("grMinus").addEventListener("click", function(){
         grNum.value = parseInt(grNum.value)-1;

         if(grNum.value < 0){
            alert("0이하는 설정불가");
            grNum.value = 0;
         }
      })


      document.getElementById("grSub").addEventListener("click", function(){
         totalPer.innerHTML = "성인 " + adultNum.value + "명 · 아동 " + childNum.value + "명 · 객실 " + grNum.value + "개";
         totalPerShow.style.display="none";
      })


	  
      document.getElementById("searchbtn").addEventListener("click", function(e){
      
		 const dateString = document.getElementById("startDate").value;
		 const dateArray = dateString.split(" ~ ");

		 const startDate = dateArray[0];
		 const endDate = dateArray[1];
		 
		 const today = new Date();

		 const year = today.getFullYear();
		 const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하기 때문에 +1을 해주고, 두 자리로 맞춰주기 위해 0을 추가합니다)
		 const day = String(today.getDate()).padStart(2, '0'); // 일 (두 자리로 맞춰주기 위해 0을 추가합니다)
		
		 const formattedDate = `${year}-${month}-${day}`;
		

		
         if(where.value.trim().length == 0 || where.value == ""){
            e.preventDefault();
            alert("주소를 입력해주세요.");

            return;
         }
         
         if(startDate < formattedDate || endDate < formattedDate){
            e.preventDefault();
            alert("날짜는 오늘보다 이전일 수 없습니다.");

            return;
         }

         if(startDate == endDate){
            e.preventDefault();
            alert("동일한 날짜는 입력이 불가능합니다.");

            return;
         }

         if(adultNum.value.trim().length == 0 || adultNum.value == 0){
            e.preventDefault();
            alert("성인은 1명 이상 가능합니다.");

            return;
         }

         if(grNum.value.trim().length == 0 || grNum.value == 0){
            e.preventDefault();
            alert("객실은 1개 이상 가능합니다.");

            return;
         }

         



      })

      where.addEventListener("click", () => {
         where.value="";
      })


      $('html').click(function(e){
    	if($(e.target).parents('.mainCla6').length < 1 && $(e.target).parents('.mainCla3').length < 1){
            totalPerShow.style.display="none";
        }
      });

      $('html').click(function(e){
    	if($(e.target).parents('.mainCla1').length < 1 && $(e.target).parents('#accAutoSearch').length < 1){
            accAutoSearch.style.display="none";
        }
      });
      
      
      
      
      
// 부모 URL, 자식 URL, 추가 데이터 URL을 모두 포함하는 배열
var allURLs = [
    ['seoul', 'kyung', 'dataCh'], // 부모 URL
    ['reviewData', 'imageData'],   // 자식 URL
    ['sampleData', 'rateData']     // 추가 데이터 URL
];

// URL을 순차적으로 처리하는 함수
function fetchURLsSequentially(allURLs, index) {
    // 첫 번째 배열을 가져옴
    var currentURLs = allURLs[index];
    
    // 현재 배열에 대한 처리가 완료된 경우
    if (currentURLs && currentURLs.length > 0) {
        var currentIndex = 0;

        // 현재 배열의 URL을 순차적으로 처리
        function fetchNextURL() {
            if (currentIndex < currentURLs.length) {
                var url = currentURLs[currentIndex];
                // AJAX 요청 보내기
                $.ajax({
                    url: url,
                    success: function(data) {
                        currentIndex++;
                        fetchNextURL();
                    },
                    error: function(xhr, status, error) {
                        console.error("URL " + url + "의 데이터를 가져오는 중 오류 발생:", error);
                    },
                    async: false // 동기식 요청 설정
                });
            } else {

                index++;
                fetchURLsSequentially(allURLs, index);
            }
        }

        // 첫 번째 URL에 대한 처리 실행
        fetchNextURL();
    } else {
        // 모든 배열에 대한 처리가 완료됨을 알림
    }
}

// 페이지 로드 후 첫 번째 요청 실행
$(document).ready(function() {
    // 페이지 로드 시에만 실행
    if (sessionStorage.getItem('firstLoad') !== 'done') {
        // URL 배열들을 순차적으로 처리
        fetchURLsSequentially(allURLs, 0);
        // 페이지 로드가 완료되었음을 표시
        sessionStorage.setItem('firstLoad', 'done');
    }
});


      
      
      
      
      
      
      
      
      
document.getElementById("searchFrm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    const dateString = document.getElementById("startDate").value;
    const dateArray = dateString.split(" ~ ");

    const startDate = dateArray[0];
    const endDate = dateArray[1];

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    if (where.value.trim().length == 0 || where.value == "") {
        alert("주소를 입력해주세요.");
        return;
    }

    if (startDate < formattedDate || endDate < formattedDate) {
        alert("날짜는 오늘보다 이전일 수 없습니다.");
        return;
    }

    if (startDate == endDate) {
        alert("동일한 날짜는 입력이 불가능합니다.");
        return;
    }

    if (adultNum.value.trim().length == 0 || adultNum.value == 0) {
        alert("성인은 1명 이상 가능합니다.");
        return;
    }

    if (grNum.value.trim().length == 0 || grNum.value == 0) {
        alert("객실은 1개 이상 가능합니다.");
        return;
    }
    
    this.submit();

});

      
