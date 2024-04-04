

// selectDeparture 클릭 시 모달 창 표시
document.getElementById("departBox").addEventListener("click", function() {
    document.querySelector(".modal-background").style.display = "block";
    document.querySelector(".modalArea").style.display = "block";


    document.getElementById("desti").innerHTML = "";
    document.getElementById("cityArea").innerHTML="";



    let cityCode;

   // console.log(cityCode)



    // 비동기식으로 공공데이터를 얻어옴
    fetch("http://apis.data.go.kr/1613000/TrainInfoService/getCtyCodeList?serviceKey=GPdAsDfaYhG7KLmQpsSP3xfr554qpQPUEkMcZWO2ufiQZSuye43p7x8gqKN%2F6IpbMoxX%2FPUDWiQ13de5UzbYCA%3D%3D&_type=json")
    .then(res => res.json())
    .then(result => {
        // 도시 목록을 표시할 HTML 문자열
        let cityOptions = "";

        // 공공데이터에서 가져온 도시 목록을 순회하며 HTML 문자열에 추가
        result.response.body.items.item.forEach(item => {
            // 각 도시의 citycode와 cityname을 변수에 저장
            const cityCode = item.citycode;
            const cityName = item.cityname;
            //console.log(cityName);

            // 각 도시의 정보를 라디오 버튼의 id와 value에 설정하여 HTML 문자열에 추가
            cityOptions += `<label for="${cityCode}"><div class="cityBox">${cityName}</div></label><input type="radio" id="${cityCode}" name="cityName" class="cityCheck" value="${cityCode}">`;
        });

        // cityCheckArea 영역의 innerHTML을 새로운 도시 목록으로 설정
        document.querySelector(".cityCheckArea").innerHTML = cityOptions;
        
        cityName.forEach(element => element.addEventListener('click', function(e){

            // e는 클릭 이벤트, e.target 으로 클릭된 객체를 가져온다.
            // console.log(e.target);
            // console.log(e.target.value);
            cityCode =e.target.value;
            // console.log(cityCode);

            station(cityCode);
            
        }));

        // 모든 destiBox 요소를 가져옴
        const destiBoxes = document.querySelectorAll('.destiBox');

        // 각 destiBox 요소에 대해 이벤트 리스너 추가
        destiBoxes.forEach(function(destiBox) {
            destiBox.addEventListener('click', function() {
                // 이전에 선택된 destiBox 요소들의 selected 클래스 제거
                document.querySelectorAll('.destiBox.selectedCity').forEach(function(selectedDestiBox) {
                    selectedDestiBox.classList.remove('selectedCity');
                });
                
                // 현재 클릭된 destiBox 요소에 selected 클래스 추가
                this.classList.add('selectedCity');
            });
        });
        
        
        const cityBoxes = document.querySelectorAll('.cityBox');

        // 각 cityBox 요소에 대해 이벤트 리스너 추가
        cityBoxes.forEach(function(cityBox) {
            cityBox.addEventListener('click', function() {
                // 이전에 선택된 cityBox 요소들의 selected 클래스 제거
                document.querySelectorAll('.cityBox.selectedCity').forEach(function(selectedCityBox) {
                    selectedCityBox.classList.remove('selectedCity');
                });
                
                // 현재 클릭된 cityBox 요소에 selected 클래스 추가
                this.classList.add('selectedCity');
            });
        });




    
       // console.log(cityCode +"123");
    })
    .catch(error => console.error("Error fetching city data:", error));


    console.log(cityCode);

});





    /// 도착

    // selectArrival 클릭 시 모달 창 표시
    document.getElementById("arriveBox").addEventListener("click", function() {
        document.querySelector(".modal-background").style.display = "block";
        document.querySelector(".modalArea").style.display = "block";

        document.getElementById("desti").innerHTML = "";
        document.getElementById("cityArea").innerHTML="";

    
     

    let cityCode;

   // console.log(cityCode)

    

    // 비동기식으로 공공데이터를 얻어옴
    fetch("http://apis.data.go.kr/1613000/TrainInfoService/getCtyCodeList?serviceKey=GPdAsDfaYhG7KLmQpsSP3xfr554qpQPUEkMcZWO2ufiQZSuye43p7x8gqKN%2F6IpbMoxX%2FPUDWiQ13de5UzbYCA%3D%3D&_type=json")
    .then(res => res.json())
    .then(result => {
        // 도시 목록을 표시할 HTML 문자열
        let cityOptions = "";

        // 공공데이터에서 가져온 도시 목록을 순회하며 HTML 문자열에 추가
        result.response.body.items.item.forEach(item => {
            // 각 도시의 citycode와 cityname을 변수에 저장
            const cityCode = item.citycode;
            const cityName = item.cityname;

            // 각 도시의 정보를 라디오 버튼의 id와 value에 설정하여 HTML 문자열에 추가
            cityOptions += `<label for="${cityCode}"><div class="cityBox">${cityName}</div></label><input type="radio" id="${cityCode}" name="cityName" class="cityCheck" value="${cityCode}">`;
        });

        // cityCheckArea 영역의 innerHTML을 새로운 도시 목록으로 설정
        document.querySelector(".cityCheckArea").innerHTML = cityOptions;
        
        cityName.forEach(element => element.addEventListener('click', function(e){

            // e는 클릭 이벤트, e.target 으로 클릭된 객체를 가져온다.
            //console.log(e.target);
            // console.log(e.target.value);
            cityCode =e.target.value;
            //console.log(cityCode);

            stationA(cityCode);
        }));


        
        const cityBoxes = document.querySelectorAll('.cityBox');

        // 각 cityBox 요소에 대해 이벤트 리스너 추가
        cityBoxes.forEach(function(cityBox) {
            cityBox.addEventListener('click', function() {
                // 이전에 선택된 cityBox 요소들의 selected 클래스 제거
                document.querySelectorAll('.cityBox.selectedCity').forEach(function(selectedCityBox) {
                    selectedCityBox.classList.remove('selectedCity');
                });
                
                // 현재 클릭된 cityBox 요소에 selected 클래스 추가
                this.classList.add('selectedCity');
            });
        });
    })
    .catch(error => console.error("Error fetching city data:", error));
    
    
    //console.log(cityCode);
    });

    // 취소 버튼 클릭 시 모달 창 숨김
    document.getElementById("cancelBtn").addEventListener("click", function() {
        document.querySelector(".modal-background").style.display = "none";
        document.querySelector(".modalArea").style.display = "none";
    });


//--------------------------------------------------------------------------------------//


const departNM = document.getElementById("stationNameD") ; 
const departCD = document.getElementById("stationCodeD");
const arriveNM = document.getElementById("stationNameA") ; 
const arriveCD = document.getElementById("stationCodeA");


    


const desName = document.getElementsByName("desName");
const cityName = document.getElementsByName("cityName");
const stationBtn = document.getElementById("stationBtnM");


function station(code){

          // 비동기식으로 공공데이터를 얻어옴
          fetch("https://apis.data.go.kr/1613000/TrainInfoService/getCtyAcctoTrainSttnList?serviceKey=GPdAsDfaYhG7KLmQpsSP3xfr554qpQPUEkMcZWO2ufiQZSuye43p7x8gqKN%2F6IpbMoxX%2FPUDWiQ13de5UzbYCA%3D%3D&pageNo=1&numOfRows=16&_type=json&cityCode=" +code)
          .then(res => res.json())
          .then(result => {
              // 도시 목록을 표시할 HTML 문자열
              let cityList = "";
      
              // 공공데이터에서 가져온 도시 목록을 순회하며 HTML 문자열에 추가
              result.response.body.items.item.forEach(item => {
                  // 각 도시의 citycode와 cityname을 변수에 저장
                  const nodeId = item.nodeid;
                  const nodeName = item.nodename;
      
                  // 각 도시의 정보를 라디오 버튼의 id와 value에 설정하여 HTML 문자열에 추가
                  cityList += `<label for="${nodeId}"><div class="destiBox">${nodeName}</div></label><input type="radio" id="${nodeId}" name="desName" class="desCheck" value="${nodeName}">`;
              });
      
              // cityCheckArea 영역의 innerHTML을 새로운 도시 목록으로 설정
              document.querySelector(".desti").innerHTML = cityList;
              
              desName.forEach(element => element.addEventListener('click', function(e){

                // e는 클릭 이벤트, e.target 으로 클릭된 객체를 가져온다.
                //console.log(e.target);
                // console.log(e.target.value);
                stationName =e.target.value;
                stationCode = e.target.id;
                //  console.log(stationName);
                //console.log(stationCode);

                stationBtn.addEventListener("click", function(){
                    departNM.innerText = stationName;
                    departCD.innerText = stationCode;

                    document.querySelector(".modal-background").style.display = "none";
                    document.querySelector(".modalArea").style.display = "none";

                })

    
                
            }))

            
            // 모든 destiBox 요소를 가져옴
            const destiBoxes = document.querySelectorAll('.destiBox');

            // 각 destiBox 요소에 대해 이벤트 리스너 추가
            destiBoxes.forEach(function(destiBox) {
                destiBox.addEventListener('click', function() {
                    // 이전에 선택된 destiBox 요소들의 selected 클래스 제거
                    document.querySelectorAll('.destiBox.selectedCity').forEach(function(selectedDestiBox) {
                        selectedDestiBox.classList.remove('selectedCity');
                    });
                    
                    // 현재 클릭된 destiBox 요소에 selected 클래스 추가
                    this.classList.add('selectedCity');
                });
            });


      
          })
          .catch(error => console.error("Error fetching city data:", error));
    
}

function stationA(code){

    // 비동기식으로 공공데이터를 얻어옴
    fetch("https://apis.data.go.kr/1613000/TrainInfoService/getCtyAcctoTrainSttnList?serviceKey=GPdAsDfaYhG7KLmQpsSP3xfr554qpQPUEkMcZWO2ufiQZSuye43p7x8gqKN%2F6IpbMoxX%2FPUDWiQ13de5UzbYCA%3D%3D&pageNo=1&numOfRows=16&_type=json&cityCode=" +code)
    .then(res => res.json())
    .then(result => {
        // 도시 목록을 표시할 HTML 문자열
        let cityList = "";

        // 공공데이터에서 가져온 도시 목록을 순회하며 HTML 문자열에 추가
        result.response.body.items.item.forEach(item => {
            // 각 도시의 citycode와 cityname을 변수에 저장
            const nodeId = item.nodeid;
            const nodeName = item.nodename;

            // 각 도시의 정보를 라디오 버튼의 id와 value에 설정하여 HTML 문자열에 추가
            cityList += `<label for="${nodeId}"><div class="destiBox">${nodeName}</div></label><input type="radio" id="${nodeId}" name="desName" class="desCheck" value="${nodeName}">`;
        });

        // cityCheckArea 영역의 innerHTML을 새로운 도시 목록으로 설정
        document.querySelector(".desti").innerHTML = cityList;
        
        desName.forEach(element => element.addEventListener('click', function(e){

          // e는 클릭 이벤트, e.target 으로 클릭된 객체를 가져온다.
         // console.log(e.target);
          // console.log(e.target.value);
          stationNameA =e.target.value;
          stationCodeA = e.target.id;
          // console.log(stationNameA);
          // console.log(stationCodeA);

          stationBtn.addEventListener("click", function(){
              arriveNM.innerText= stationNameA;
              arriveCD.innerText = stationCodeA;
              
              document.querySelector(".modal-background").style.display = "none";
              document.querySelector(".modalArea").style.display = "none";

          })


          
      }))

        // 모든 destiBox 요소를 가져옴
        const destiBoxes = document.querySelectorAll('.destiBox');

        // 각 destiBox 요소에 대해 이벤트 리스너 추가
        destiBoxes.forEach(function(destiBox) {
            destiBox.addEventListener('click', function() {
                // 이전에 선택된 destiBox 요소들의 selected 클래스 제거
                document.querySelectorAll('.destiBox.selectedCity').forEach(function(selectedDestiBox) {
                    selectedDestiBox.classList.remove('selectedCity');
                });
                
                // 현재 클릭된 destiBox 요소에 selected 클래스 추가
                this.classList.add('selectedCity');
            });
        });



    })
    .catch(error => console.error("Error fetching city data:", error));

}

const realDate = document.getElementById("datepicker");

/* 출발지 코드, 도착지 코드, 좌석등급 */
function goTrain() {

    if(departCD.innerText=="" || arriveCD.innerText==""){
        alert("지역을 먼저 선택해주세요.")
        return;
    }

    if(realDate.value.trim().length == 0){
        alert("가는 날을 입력해주세요.");
        return;
    }
        location.href = `/train?depCode=${departCD.innerText}&arrCode=${arriveCD.innerText}&depName=${departNM.innerText}&arrName=${arriveNM.innerText}&realDate=${realDate.value}`

       // location.href = "/bus/selectBus" + "?depTerminalId=" + DepartCode + "&arrTerminalId=" + ArrivalCode + "&depPlandTime=" + date.value  +"&busGradeId=" + seatLevel;
}


