$(document).ready(function () {

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }


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
            "monthYearFormat": "YYYY년 MMMM"
        },
        startDate: startDate,
        endDate: endDate,
    });
});





// 검색어 자동완성

const accAutoSearch = document.getElementById("accAutoSearch");
const where = document.getElementById("where");
if (where != null) {
    where.addEventListener("input", (e) => {
        if (where.value.trim().length != 0) {
            fetch("/search/autoSearch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "input": where.value
                })
            })
                .then(res => res.json())
                .then(result => {
                    // console.log(result);
                    accAutoSearch.style.display = "block";
                    accAutoSearch.innerHTML = "";

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


                    if (data.length == 0) {
                        const li = document.createElement("li");
                        li.innerText = "일치하는 값이 없습니다.";
                        accAutoSearch.append(li);

                    }

                    for (const key in data) {
                        const li = document.createElement("li");
                        const a = document.createElement("a");

                        a.innerText = data[key].accAddr;

                        a.addEventListener("click", function () {
                            where.value = data[key].accAddr;
                            accAutoSearch.style.display = "none";
                        })

                        li.append(a);
                        accAutoSearch.append(li);
                    }

                })
                .catch(err => console.log(err));
        } else {
            accAutoSearch.style.display = "none";
        }
    })


}


// 인원수 입력

const totalPerShow = document.getElementById("totalPerShow");

document.getElementById("totalPer").addEventListener("click", function () {
    totalPerShow.style.display = "block";
})

const adultNum = document.getElementById("adultNum");
const childNum = document.getElementById("childNum");
const grNum = document.getElementById("grNum");

document.getElementById("adultPlus").addEventListener("click", function () {
    adultNum.value = parseInt(adultNum.value) + 1;
})

document.getElementById("adultMinus").addEventListener("click", function () {
    adultNum.value = parseInt(adultNum.value) - 1;

    if (adultNum.value < 0) {
        alert("0이하는 설정불가");
        adultNum.value = 0;
    }
})



document.getElementById("childPlus").addEventListener("click", function () {
    childNum.value = parseInt(childNum.value) + 1;
})

document.getElementById("childMinus").addEventListener("click", function () {
    childNum.value = parseInt(childNum.value) - 1;

    if (childNum.value < 0) {
        alert("0이하는 설정불가");
        childNum.value = 0;
    }
})



document.getElementById("grPlus").addEventListener("click", function () {
    grNum.value = parseInt(grNum.value) + 1;
})

document.getElementById("grMinus").addEventListener("click", function () {
    grNum.value = parseInt(grNum.value) - 1;

    if (grNum.value < 0) {
        alert("0이하는 설정불가");
        grNum.value = 0;
    }
})


document.getElementById("grSub").addEventListener("click", function () {
    totalPer.innerHTML = "성인 " + adultNum.value + "명 · 아동 " + childNum.value + "명 · 객실 " + grNum.value + "개";
    totalPerShow.style.display = "none";
})


document.getElementById("searchbtn").addEventListener("click", function (e) {

    const dateString = document.getElementById("startDate").value;
    const dateArray = dateString.split(" ~ ");

    const startDate = dateArray[0];
    const endDate = dateArray[1];

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하기 때문에 +1을 해주고, 두 자리로 맞춰주기 위해 0을 추가합니다)
    const day = String(today.getDate()).padStart(2, '0'); // 일 (두 자리로 맞춰주기 위해 0을 추가합니다)

    const formattedDate = `${year}-${month}-${day}`;


    if (where.value.trim().length == 0 || where.value == "") {
        e.preventDefault();
        alert("주소를 입력해주세요.");

        return;
    }

    if (startDate < formattedDate || endDate < formattedDate) {
        e.preventDefault();
        alert("날짜는 오늘보다 이전일 수 없습니다.");

        return;
    }

    if (startDate == endDate) {
        e.preventDefault();
        alert("동일한 날짜는 입력이 불가능합니다.");

        return;
    }

    if (adultNum.value.trim().length == 0 || adultNum.value == 0) {
        e.preventDefault();
        alert("성인은 1명 이상 가능합니다.");

        return;
    }

    if (grNum.value.trim().length == 0 || grNum.value == 0) {
        e.preventDefault();
        alert("객실은 1개 이상 가능합니다.");

        return;
    }




})

where.addEventListener("click", () => {
    where.value = "";
})


$('html').click(function (e) {
    if ($(e.target).parents('.mainCla6').length < 1 && $(e.target).parents('.mainCla3').length < 1) {
        totalPerShow.style.display = "none";
    }
});

$('html').click(function (e) {
    if ($(e.target).parents('.mainCla1').length < 1 && $(e.target).parents('#accAutoSearch').length < 1) {
        accAutoSearch.style.display = "none";
    }
});


var currentURL = window.location.href;
var filterName = currentURL.substring(currentURL.lastIndexOf('/') + 1);
var filterElement = document.getElementById('filter');


if (filterName == 'inputSearch' || filterName == 'lowPrice') {
    filterElement.innerHTML = '요금(낮은 순)';
} else if (filterName == 'highPrice') {
    filterElement.innerHTML = '요금(높은 순)';
} else if (filterName == 'highGrade') {
    filterElement.innerHTML = '평점(높은 순)';
} else if (filterName == 'lowGrade') {
    filterElement.innerHTML = '평점(낮은 순)';
}


var userNo = document.getElementById('userNo').value;

$(document).ready(function () {
    var start = 5;
    var totalResults = start;


    // 더 보기 버튼에 대한 클릭 이벤트 핸들러
    $(document).on("click", ".mor", function () {
        $.ajax({
            url: "/acc/loadMore",
            type: "GET",
            data: { start: start, filter: filterName, inputName: inputName, inputAdultNum: inputAdultNum, inputChildNum: inputChildNum, inputGrNum: inputGrNum, userNo: userNo, startDate: startDate, endDate: endDate },
            success: function (data) {
                if (data && data.detailMore && Array.isArray(data.detailMore)) {
                    data.detailMore.forEach(function (item) {

                        addNewItem(item);

                    });
                } else {
                    console.error("데이터 형식이 잘못되었거나 데이터가 없습니다.");
                }

                // 시작 위치 업데이트
                start += 5;

                // 총 개수 업데이트
                totalResults += data.detailMore.length;

                addMoreButton();

                if (start > totalResults) {
                    $(".cla20").hide();
                }

            },
            error: function (xhr, status, error) {
                console.error("오류 발생:", error);
            }
        });
    });



    // 새로운 항목을 추가하는 함수
    function addNewItem(item) {
        var reservationForm = $('<form></form>').attr({
            id: 'reservationForm_' + item.accNo,
            action: '/acc/reservation',
            method: 'post'
        });

        var con5 = $('<div></div>').addClass('con5');
        var cla10 = $('<div></div>').addClass('cla10');
        var img = $('<img>').attr({
            src: item.thumbnail,
            id: 'cap2',
            name: 'thumbnail'
        });
        cla10.append(img);

        var cla11 = $('<div></div>').addClass('cla11');
        var cla12 = $('<div></div>').addClass('cla12');
        cla12.append($('<span></span>').text(item.accName));
        cla12.append($('<input>').attr({
            type: 'hidden',
            name: 'accName',
            value: item.accName
        }));
        cla11.append(cla12);

        var cla13 = $('<div></div>').addClass('cla13');

        // 주소 꺽쇠 ^^^ 처리 변경 시작 점
        let parts = item.accAddr.split('^^^');
        const changeAddr = parts[1] + " " + parts[2] + " (" + parts[0] + ")";

        cla13.append($('<span></span>').text('주소 : ' + changeAddr));
        cla13.append($('<input>').attr({
            type: 'hidden',
            name: 'accAddr',
            value: changeAddr
        }));
        cla11.append(cla13);
        // 주소 꺽쇠 ^^^ 처리 변경 내역 끝

        var cla14 = $('<div></div>').addClass('cla14');
        if (item.accTel) {
            cla14.append($('<span></span>').text('번호 : ' + item.accTel));
        } else {
            cla14.append($('<span></span>').text('번호 : 미 입력'));
        }
        cla14.append($('<input>').attr({
            type: 'hidden',
            name: 'accTel',
            value: item.accTel || ''
        }));
        cla11.append(cla14);

        var cla15 = $('<div></div>').addClass('cla15');
        if (item.price != 0) {
            cla15.append($('<span></span>').text('가격 : ' + item.price));
            cla15.append($('<input>').attr({
                type: 'hidden',
                name: 'roomPrice',
                value: item.price
            }));
        } else {
            cla15.append($('<span></span>').text('매진'));
            cla15.append($('<input>').attr({
                type: 'hidden',
                name: 'roomPrice',
                value: item.price
            }));
            con5.css('background-color', 'gray');
        }
        cla11.append(cla15);

        var cla16 = $('<div></div>').addClass('cla16');
        var cla17 = $('<div></div>').addClass('cla17');
        var gradeSpan = $('<span></span>').addClass('grade');
        var gradeText;
        if (item.rate == 0) {
            gradeText = '미등록';
        } else if (item.rate >= 9) {
            gradeText = '추천';
        } else if (item.rate >= 7) {
            gradeText = '우수함';
        } else if (item.rate >= 5) {
            gradeText = '평범함';
        } else {
            gradeText = '비추천';
        }
        gradeSpan.text(gradeText);

        var squa = $('<div></div>').addClass('squa').text(item.rate);
        var rateInput = $('<input>').attr({
            type: 'hidden',
            name: 'rate',
            value: item.rate
        });
        cla17.append(gradeSpan, squa, rateInput);
        cla16.append(cla17);


        var cla18 = $('<div></div>').addClass('cla18');
        var wishList = $('<div></div>').addClass('wishList');
        var wishCheckValue = item.wishCheck;

        var heartIcon = $('<i></i>').addClass('wishCheck').attr({
            id: 'wishList',
            'data-value': item.accNo,
            'data-check': wishCheckValue
        });

        // data-check 값에 따라 하트 아이콘의 클래스를 설정합니다.
        if (wishCheckValue == "on") {
            heartIcon.addClass('fa-solid fa-heart'); // 좋아요 O (꽉찬하트)
        } else {
            heartIcon.addClass('fa-regular fa-heart'); // 좋아요 X (빈하트)
        }

        // 하트 아이콘에 클릭 이벤트를 추가합니다.
        heartIcon.click(function () {
            var accNo = $(this).attr('data-value');
            var check = $(this).hasClass("fa-regular") ? 0 : 1;
            var dataCheck = $(this).attr('data-check');

            var data = {
                "accNo": accNo,
                "check": check,
                "dataCheck": dataCheck,
                "userNo": userNo
            };

            if (data.userNo == 0) {
                alert("로그인 후 이용해주세요");
                return;
            }

            fetch("/acc/wishList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.text())
                .then(count => {
                    console.log("count : " + count);

                    if (count == -1) {
                        alert("로그인 후 이용해주세요");
                        return;
                    }

                    // 클릭된 요소를 토글하는 것으로 변경
                    $(this).toggleClass("fa-regular fa-solid");
                })
                .catch(err => {
                    console.log("예외 발생");
                    console.log(err);
                });
        });

        // wishList에 추가할 하트 아이콘과 hidden input을 wishList에 추가합니다.
        wishList.append(heartIcon);
        wishList.append($('<input>').attr({
            type: 'hidden',
            name: 'accNo',
            value: item.accNo
        }));

        // cla18에 wishList를 추가합니다.
        cla18.append(wishList);




        cla16.append(cla18);

        var cla19 = $('<div></div>').addClass('cla19');
        var button = $('<button></button>').addClass('rev').attr('type', 'submit').text('예약 하기');
        cla19.append(button);
        cla16.append(cla19);

        con5.append(cla10, cla11, cla16);
        reservationForm.append(con5);

        $(".con4").append(reservationForm);
    }
});

function addMoreButton() {
    $(".cla20").remove();

    var moreButton = $('<div></div>').addClass('cla20');
    moreButton.append($('<button></button>').addClass('mor').text('검색 결과 더 보기'));
    $(".con4").append(moreButton);
};






const wishListElements = document.querySelectorAll('[data-value]');

wishListElements.forEach(function (element) {
    // item.accNo 값을 사용하여 data-value 속성에 값을 지정
    const accNo = element.getAttribute('data-value');

    element.addEventListener('click', function (e) {
        console.log(accNo);

        let check;

        // 클릭된 요소를 확인하도록 수정
        if (element.classList.contains("fa-regular")) { // 좋아요 X (빈하트)
            check = 0;
        } else { // 좋아요 O (꽉찬하트)
            check = 1;
        }

        const data = {
            "accNo": accNo,
            "check": check,
            "userNo": userNo
        };

        fetch("/acc/wishList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(count => {
                console.log("count : " + count);

                if (count == -1) {
                    alert("로그인 후 이용해주세요");
                    return;
                }

                // 클릭된 요소를 토글하는 것으로 변경
                element.classList.toggle("fa-regular");
                element.classList.toggle("fa-solid");
            })
            .catch(err => {
                console.log("예외 발생");
                console.log(err);
            });
    });
});






document.getElementById("searchFrm").addEventListener("submit", function (e) {
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


