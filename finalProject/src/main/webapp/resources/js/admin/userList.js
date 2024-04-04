const userSelect = document.getElementById("userSelect");


const params = new URL(location.href).searchParams;

const users = params.get("users");

for (const i of userSelect.options) {

    if(i.value == users){
        i.selected = true
    }
}
