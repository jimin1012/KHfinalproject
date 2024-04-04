
// selectDeparture 클릭 시 모달 창 표시
 document.getElementById("departBox").addEventListener("click", function() {
    document.querySelector(".modal-background").style.display = "block";
    document.querySelector(".modalArea").style.display = "block";


    document.getElementById("desti").innerHTML = "";
    document.getElementById("cityArea").innerHTML="";

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
            // console.log(e.target);
            // console.log(e.target.value);
            cityCode =e.target.value;
            // console.log(cityCode);

            station(cityCode);

            
        }))

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

});








    /// 도착

    // selectArrival 클릭 시 모달 창 표시
    document.getElementById("arriveBox").addEventListener("click", function() {
        document.querySelector(".modal-background").style.display = "block";
        document.querySelector(".modalArea").style.display = "block";

        document.getElementById("desti").innerHTML = "";
        document.getElementById("cityArea").innerHTML="";


    let cityCode;


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
            // console.log(e.target);
            // console.log(e.target.value);
            cityCode =e.target.value;
            // console.log(cityCode);

            stationA(cityCode);
        }))

        
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
    
    
    // console.log(cityCode);
    });

    // 취소 버튼 클릭 시 모달 창 숨김
    document.getElementById("cancelBtn").addEventListener("click", function() {
        document.querySelector(".modal-background").style.display = "none";
        document.querySelector(".modalArea").style.display = "none";
    });


//--------------------------------------------------------------------------------------//


  



    


const desName = document.getElementsByName("desName");
const cityName = document.getElementsByName("cityName");
const stationBtn = document.getElementById("stationBtn");


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
                // console.log(e.target);
                // console.log(e.target.value);
                stationName =e.target.value;
                stationCode = e.target.id;
                //console.log(stationName);
                //console.log(stationCode);

                stationBtn.addEventListener("click", function(){
                    document.getElementById("stationNameD").innerText = stationName;
                    document.getElementById("stationCodeD").innerText = stationCode;

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
        //  console.log(e.target);
          // console.log(e.target.value);
          stationNameA =e.target.value;
          stationCodeA = e.target.id;
          //console.log(stationNameA);
          //console.log(stationCodeA);

          stationBtn.addEventListener("click", function(){
              document.getElementById("stationNameA").innerText = stationNameA;
              document.getElementById("stationCodeA").innerText = stationCodeA;

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














//__________________________________________________________________//
/********* 시간표 조회!!!! ********** */
// 시간 형식 변환 함수
const formatTime = (timeNumber) => {
    // 숫자를 문자열로 변환
    const timeString = String(timeNumber);
    
    // 날짜 및 시간 정보 추출
    const year = timeString.substring(0, 4);
    const month = timeString.substring(4, 6);
    const day = timeString.substring(6, 8);
    const hour = timeString.substring(8, 10);
    const minute = timeString.substring(10, 12);
    
    // 시간과 분을 문자열로 반환
    return `${hour}:${minute}`;
};

const infoMsg = document.getElementById("info-msg");
const trainInformation = document.getElementById("trainInformation");
const timeCon = document.getElementById("timeCon");
const infoPre = document.getElementById("info-pre");

selectBtn.addEventListener("click", function(){

    const deCode = document.getElementById("stationCodeD");
    const arCode = document.getElementById("stationCodeA");
    const deName = document.getElementById("stationNameD");
    const arName = document.getElementById("stationNameA");
    const realDate = document.getElementById("datepicker");
    const date = document.getElementById("date")
   


    if(deCode.innerText =="" || arCode.innerText ==""){

        alert("지역을 먼저 선택해주세요.");
        return;

    }else{

        document.getElementById("loading").style.display = 'block';
        
        trainInformation.classList.remove("disNone");
        timeCon.classList.remove("disNone");
        infoMsg.classList.add("disNone");
        infoPre.classList.add("disNone");

        fetch(`https://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo?serviceKey=GPdAsDfaYhG7KLmQpsSP3xfr554qpQPUEkMcZWO2ufiQZSuye43p7x8gqKN%2F6IpbMoxX%2FPUDWiQ13de5UzbYCA%3D%3D&pageNo=1&numOfRows=100&_type=json&depPlandTime=20230403&depPlaceId=${deCode.innerText}&arrPlaceId=${arCode.innerText}`)
        .then(res => res.json())
        .then(result => {
            date.innerText = realDate.value;
            to.innerText = deName.innerText;
            from.innerText = arName.innerText;
            const tbody = document.getElementById("tbody");
            tbody.innerHTML = "";
    
            const items = result.response.body.items.item;
            
            //console.log(items)
    
            if(items  == undefined) {
                tbody.innerHTML = "<tr><td colspan='7'>이용 가능한 열차가 없습니다.</td></tr>";
            } else {
                items.forEach(item => {
                    tbody.innerHTML += `
                        <tr>
                            <td>직통</td>
                            <td>${item.traingradename}</td>
                            <td>${item.trainno}</td>
                            <td>${formatTime(item.depplandtime)}</td>
                            <td>${formatTime(item.arrplandtime)}</td>
                            <td>${item.adultcharge}</td>
                            <td><button class='checkBtn'>선택</button></td>
                        </tr>`;
                });
    
                // 선택 버튼에 대한 클릭 이벤트 핸들러 추가
                const checkBtns = document.querySelectorAll('.checkBtn');
                checkBtns.forEach((btn, index) => {
                    btn.addEventListener('click', function() {
                        // 클릭한 버튼의 데이터 가져오기
                        const sel = items[index];
                        // console.log(sel.traingradename) // 선택한 항목의 traingradename 출력
                        // 선택한 항목에 대한 추가 로직 처리 가능
    
                        location.href = "train/trainBooking?trainGrade="
                        +sel.traingradename +"&depTime=" + sel.depplandtime
                        +"&arrTime=" + sel.arrplandtime + "&charge=" +sel.adultcharge
                        +"&depName=" + sel.depplacename + "&arrName=" +sel.arrplacename
                        +"&realDate=" +realDate.value
                        
                    });
                });
            }
            document.getElementById("loading").style.display = 'none';
        })
        .catch(error => console.error("Error fetching train data:", error));
        
    }
    


});




/********* 시간표 조회!!!! ********** */
// const selectBtn = document.getElementById("selectBtn");
// let deCode;
// let arCode;
// let deName;
// let arName;
// const to = document.getElementById("to");
// const from =document.getElementById("from");
// selectBtn.addEventListener("click", function(){
    
//     deCode = document.getElementById("stationCodeD");
//     arCode = document.getElementById("stationCodeA");
//     deName = document.getElementById("stationNameD");
//     arName = document.getElementById("stationNameA");

//     console.log(deCode.innerText);
//     console.log(arCode.innerText);

//     // 비동기식으로 공공데이터를 얻어옴
//     fetch("https://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo?serviceKey=GPdAsDfaYhG7KLmQpsSP3xfr554qpQPUEkMcZWO2ufiQZSuye43p7x8gqKN%2F6IpbMoxX%2FPUDWiQ13de5UzbYCA%3D%3D&pageNo=1&numOfRows=10&_type=json&depPlandTime=20230403&depPlaceId="+deCode.innerText +"&arrPlaceId="+arCode.innerText)
//     .then(res => res.json())
//     .then(result => {



//         console.log(result);

//         to.innerText = deName.innerText;
//         from.innerText = arName.innerText;
//         const tbody = document.getElementById("tbody");
//         tbody.innerHTML="";

        

//         const itemArr = result.response.body.items;
//         let value = "";
        
//         if(itemArr.length == 0){
//             value += "<tr>"+
//                     "<td colspan='7'>이용가능한 열차가 없습니다.</td>"    
//                 +"</tr>"
//         }else{
            
//             result.response.body.items.item.forEach(item => {
    
//                 value += "<tr>"
//                 +"<td>" + "직통" + "</td>" 
//                 +"<td>" + item.traingradename + "</td>" 
//                 +"<td>" + item.trainno + "</td>" 
//                 +"<td>" + item.arrplandtime + "</td>" 
//                 +"<td>" + item.depplandtime + "</td>"
//                 +"<td>" + item.adultcharge + "</td>" 
//                 +"<td><button id='checkBtn'> 선택 </button></td>" 
//                 +"</tr>"
    
    
//             });
//         }


//         tbody.innerHTML = value;

          
//     })
//     .catch(error => console.error("Error fetching city data:", error));

// })

const params = new URL(location.href).searchParams;

const depCodeP = params.get('depCode'); 
const arrCodeP = params.get('arrCode'); 
const depNameP = params.get('depName'); 
const arrNameP = params.get('arrName'); 
const realDate = params.get('realDate'); 


(function(){

    
    if(depCodeP != null) {
        document.getElementById("loading").style.display = 'block';
        
        trainInformation.classList.remove("disNone");
        timeCon.classList.remove("disNone");
        infoMsg.classList.add("disNone");
        infoPre.classList.add("disNone");

    fetch(`https://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo?serviceKey=GPdAsDfaYhG7KLmQpsSP3xfr554qpQPUEkMcZWO2ufiQZSuye43p7x8gqKN%2F6IpbMoxX%2FPUDWiQ13de5UzbYCA%3D%3D&pageNo=1&numOfRows=100&_type=json&depPlandTime=20230403&depPlaceId=${depCodeP}&arrPlaceId=${arrCodeP}`)
    .then(res => res.json())
    .then(result => {
        date.innerText = realDate;
        to.innerText = depNameP;
        from.innerText = arrNameP
        const tbody = document.getElementById("tbody");
        tbody.innerHTML = "";

        const items = result.response.body.items.item;
        
        // console.log(items)

        if(items  == undefined) {
            tbody.innerHTML = "<tr><td colspan='7'>이용 가능한 열차가 없습니다.</td></tr>";
        } else {
            items.forEach(item => {
                tbody.innerHTML += `
                    <tr>
                        <td>직통</td>
                        <td>${item.traingradename}</td>
                        <td>${item.trainno}</td>
                        <td>${formatTime(item.depplandtime)}</td>
                        <td>${formatTime(item.arrplandtime)}</td>
                        <td>${item.adultcharge}</td>
                        <td><button class='checkBtn'>선택</button></td>
                    </tr>`;
            });

            // 선택 버튼에 대한 클릭 이벤트 핸들러 추가
            const checkBtns = document.querySelectorAll('.checkBtn');
            checkBtns.forEach((btn, index) => {
                btn.addEventListener('click', function() {
                    // 클릭한 버튼의 데이터 가져오기
                    const sel = items[index];
                    //console.log(sel.traingradename) // 선택한 항목의 traingradename 출력
                    // 선택한 항목에 대한 추가 로직 처리 가능

                    location.href = "train/trainBooking?trainGrade="
                    +sel.traingradename +"&depTime=" + sel.depplandtime
                    +"&arrTime=" + sel.arrplandtime + "&charge=" +sel.adultcharge
                    +"&depName=" + sel.depplacename + "&arrName=" +sel.arrplacename
                    +"&realDate=" + realDate
                    
                });
            });
        }
        document.getElementById("loading").style.display = 'none';

        
    })
    .catch(error => console.error("Error fetching train data:", error))


    }
    



})();
