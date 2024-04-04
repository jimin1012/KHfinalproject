(function(){
    const inputFree = document.getElementsByClassName("FreeSearch")[0];

 
    const params = new URL(location.href).searchParams;

    const query = params.get("query");

    inputFree.value = query;


})();


function searchValidate(){
    const queryF = document.getElementsByClassName("FreeSearch")[0];

    if(queryF.value.trim().length == 0){
        queryF.value = "";
        alert("검색어를 입력해주세요.");
        queryF.focus();

        return false;
    }

    if(queryF.value.includes("'")){
        alert("따옴표('') 사용금지!");
        queryF.value = "";
        queryF.focus();

        return false;
    }

    return true;
}

//console.log("123")