// 마커를 담을 배열입니다
var markers = [];

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    const placeInput = document.getElementById('placeInput').value;
    const hiddenInput = document.getElementById('hiddenInput').value;

    var keyword = placeInput + hiddenInput

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB);
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for (var i = 0; i < places.length; i++) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function () {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function () {
                infowindow.close();
            });

            itemEl.onmouseover = function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout = function () {
                infowindow.close();
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
            '<div class="info">' +
            '   <h3>' + places.place_name + '</h3>';

    if (places.road_address_name) {
        itemStr += '    <span class="addr">' + places.road_address_name + '</span>' +
            '   <span class="jibun gray">' + places.address_name + '</span>';
    } else {
        itemStr += '    <span>' + places.address_name + '</span>';
    }

    itemStr += '  <span class="tel">' + places.phone + '</span>' +
        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function (i) {
                return function () {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}


const ulContainer = document.getElementById("placesList");

ulContainer.addEventListener("click", e => {

    let targetElement = e.target; // 클릭된 요소

    // 클릭된 요소가 div 내부 요소인 경우, 상위의 div를 찾음
    while (targetElement != null && targetElement.nodeName !== 'DIV') {
        targetElement = targetElement.parentNode;
    }

    // 상위에 div가 존재하고, 그 안의 span의 innerText 가져오기
    if (targetElement) {
        const addr = targetElement.querySelector('.addr').innerText;
        const jibun = targetElement.querySelector('.jibun').innerText;
        const tel = targetElement.querySelector('.tel').innerText;
        const restName = targetElement.querySelector('h3').innerText;


        // "menu_wrap" 요소의 모든 자식 요소 숨기기
        const menuWrap = document.getElementById("menu_wrap");
        Array.from(menuWrap.children).forEach(child => {
            // "hidden-div" 클래스를 가진 요소는 제외
            if (!child.classList.contains("hidden-div")) {
                child.style.display = "none"; // 숨김 처리
            }
        });

        // hidden -> block
        // "hidden-div" 클래스를 가진 요소를 보이게 처리
        const hiddenDiv = document.querySelector(".hidden-div");
        hiddenDiv.style.display = "block"; // 또는 "flex", "grid" 등 해당 요소에 맞는 display 속성 값 사용

        document.getElementsByClassName("restName")[0].innerText = restName;
        document.getElementsByClassName("restAddr")[0].innerText = "주소 :  " + addr;
        document.getElementsByClassName("restTel")[0].innerText = "전화번호 : " + tel;

        document.getElementsByClassName("hidden")[0].value = restName;
        // console.log(document.getElementsByClassName("hidden")[0].value);

        const data = {
            restName: restName
        };
        console.log("data" + JSON.stringify(data));

        const reviewSection = document.querySelector('.restReview-section');
        reviewSection.innerHTML = ''; // 기존 내용을 비웁니다.

        //ajax 영역
        fetch("getRestReviewList", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(resp => resp.json())
            .then(list => {

                const mainImgTag = document.getElementById("restProfile");
                // thumbnail 값이 비어 있지 않은 항목만 필터링
                const filteredList = list.filter(item => item.thumbnail);

                // 필터링된 목록에서 가장 높은 reviewNo를 가진 항목의 thumbnail을 찾음
                const highestIdItemThumbnail = filteredList.reduce((acc, item) => {
                    if (!acc || item.reviewNo > acc.reviewNo) {
                        return item; // 현재 항목이 acc보다 높은 ID를 가지면 현재 항목을 반환
                    }
                    return acc; // 그렇지 않으면 이전 acc 값을 유지
                }, null)?.thumbnail; // reduce 결과가 null이 아니라면 thumbnail을 가져오고, 그렇지 않으면 undefined

                // 찾은 thumbnail URL이 있다면 mainImgTag의 src 속성으로 설정
                if (highestIdItemThumbnail) {
                    mainImgTag.src = highestIdItemThumbnail;
                } else {
                    mainImgTag.src = "https://i.postimg.cc/Dwv0Ns85/image.jpg";
                }

                reviewSection.innerHTML = ''; // 기존 내용을 비웁니다.


                if (list != "") {

                    list.forEach(item => {

                        const div = document.createElement('div');
                        div.className = 'restReview-div';

                        div.innerHTML = `
                        <div class="review-title"><p>${item.title}</p></div>
                        <div class="userName">${item.userName}</div>
                        <div class="starPoint" id="${item.reviewNo}">${'⭐'.repeat(item.starPoint)}</div>
                        <div class="review-content">
                            <div class="review-main">
                                ${item.thumbnail ? `<div class="review-thumbnail-div"><img class="thumbnail" src="${item.thumbnail}"></div>` : ''}
                                <div class="review-text">${item.boardContent}</div>
                            </div>
                        </div>
                    `;
                        console.log("item.startPoint : "+item.startPoint);
                        reviewSection.appendChild(div);
                    });

                } else {

                    const div = document.createElement('div');
                    div.innerHTML = `리뷰 내역이 없습니다.`;
                    div.className = 'definedReview';

                    reviewSection.appendChild(div);

                }

                // 게시글 번호 추출
                document.querySelectorAll(".restReview-div").forEach(element => {
                    element.addEventListener("click", e => {
                        // 클릭한 요소 내에서 .starPoint 클래스를 가진 자식 요소의 id 값을 찾아 출력
                        const starPointDiv = e.target.closest('.restReview-div').querySelector('.starPoint');
                        if (starPointDiv) {
                            // console.log(starPointDiv.id); // starPoint 요소의 id 값을 출력
                            location.href = "/tastyRest/detail"+"?reviewNo="+starPointDiv.id;
                        }
                    });
                });





            })
            .catch(err => console.log(err));

    }

});



document.querySelector(".back-to-list").addEventListener("click", e => {

    // "hidden-div" 클래스를 안보이게 하기
    const hiddenDiv = document.querySelector(".hidden-div");
    hiddenDiv.style.display = "none";

    // 나머지 보이게 처리
    // "menu_wrap" 요소의 모든 자식 보이게 하기
    const menuWrap = document.getElementById("menu_wrap");
    Array.from(menuWrap.children).forEach(child => {
        if (!child.classList.contains("hidden-div")) {
            child.style.display = "block";
        }
    });


})

// 문서 읽은 후 실행
document.addEventListener("DOMContentLoaded", function () {
    // 별점 출력
    // 클래스가 'starPoint'인 모든 요소에 대해 반복
    document.querySelectorAll('.starPoint').forEach(function (item) {
        // 해당 리뷰의 별점을 가져옴
        let starPoint = item.innerText;
        // 별을 표시할 문자열
        let stars = '';
        // 별점 수만큼 반복하여 별 추가
        for (let i = 0; i < starPoint; i++) {
            stars += '⭐';
        }
        // 별점을 표시할 요소의 innerText로 별 설정
        item.innerText = stars;
    });


});



