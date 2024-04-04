
(function () {
    const params = new URL(location.href).searchParams;

    const query = params.get("query");

    const key = params.get("key");

    if (key != null && query != null) {
        const inputSearch = document.getElementsByClassName("input-search")[0];
        inputSearch.value = query;
        const searchSelect = document.getElementById("search-select")
        searchSelect.value = key
    }

})();
function searchValidate() {
    const queryP = document.getElementsByClassName("input-search")[0];
    if (queryP.value.trim().length == 0) {
        queryP.value = "";
        alert("검색어를 입력해주세요.");
        queryP.focus();
        return false;
    }
    if (queryP.value.includes("'")) {
        alert("따옴표('') 사용금지!");
        queryP.value = "";
        queryP.focus();
        return false;
    }
    return true;
}
