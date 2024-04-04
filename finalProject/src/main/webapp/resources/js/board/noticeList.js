(function(){
    const select = document.getElementById("search-select");
    const input = document.getElementsByClassName("input-search")[0];
    const option = document.querySelectorAll("#search-select > option");

    if(select != null){

        const params = new URL(location.href).searchParams;

        const key = params.get("key");
        const query = params.get("query");

        input.value = query;

        for(let op of option){
            if(op.value == key){
                op.selected = true;
            }
        }
    }
})();

function searchValidate(){
    const query = document.getElementsByClassName("input-search")[0];

    if(query.value.trim().length == 0){
        query.value = "";
        alert("검색어를 입력해주세요.");
        query.focus();

        return false;
    }

    if(query.value.includes("'")){
        alert("따옴표('') 사용금지!");
        query.value = "";
        query.focus();

        return false;
    }

    return true;
}
