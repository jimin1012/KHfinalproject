document.addEventListener("click", function (event) {
    const targetElement = event.target;
    const allMenu = document.getElementById("allMenu");
    const allManuBtn = document.getElementById("allManu-btn");

    // 클릭된 요소가 메뉴 버튼이 아니면 메뉴를 닫습니다.
    if (!targetElement.closest("#allMenu") && !targetElement.closest("#allManu-btn")) {
        allMenu.style.display = "none";
    }
});

document.getElementById("allManu-btn").addEventListener("click", function () {

    const allMenu = document.getElementById("allMenu");

    allMenu.style.display = "block";
})

document.getElementById("close-btn").addEventListener("click", function () {

    const searchcon = document.getElementById("allMenu");

    searchcon.style.display = "none";
})

const autoSearch = document.getElementById("autoSearch");
const query = document.getElementById("query");
if (query != null) {
    query.addEventListener("input", (e) => {
        if (query.value.trim().length != 0) {
            fetch("/mainSearch/autoSearchMain", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "input": query.value
                }) // JS 객체 -> JSON 파싱 
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    autoSearch.style.display = "block";
                    autoSearch.innerHTML = "";

                    if (result.length == 0) {
                        const li = document.createElement("li");
                        li.innerText = "일치하는 값이 없습니다.";
                        autoSearch.append(li);

                    }

                    for (const key in result) {
                        const li = document.createElement("li");
                        const a = document.createElement("a");
                        console.log(result);
                        a.innerText = result[key].boardTitle + " - " + result[key].boardName;
                        a.setAttribute("href", "/board/" + result[key].boardCode + "/" + result[key].boardNo);
                        li.append(a);
                        autoSearch.append(li);

                    }

                })
                .catch(err => console.log(err));
        } else {
            autoSearch.style.display = "none";
        }
    })

    // 검색창 이외의 영역을 클릭했을 때 검색 내역을 숨기도록 합니다.
    document.addEventListener("click", function (event) {
        const targetElement = event.target; // 클릭된 요소를 가져옵니다.

        // 클릭된 요소가 검색창 또는 검색 내역이 아닌 경우에만 검색 내역을 숨깁니다.
        if (!targetElement.closest(".search-area") && !targetElement.closest("#autoSearch")) {
            autoSearch.style.display = "none";
            query.value = "";
        }

    });

}

