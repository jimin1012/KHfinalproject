const accSelect = document.getElementById("accSelect");

const params = new URL(location.href).searchParams;

const accs = params.get("accs");

for (const i of accSelect.options) {

    if(i.value == accs){
        i.selected = true
    }
}

