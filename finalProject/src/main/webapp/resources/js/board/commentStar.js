
// 별점 선택
const star1 = document.getElementById("star1");
const star2 = document.getElementById("star2");
const star3 = document.getElementById("star3");
const star4 = document.getElementById("star4");
const star5 = document.getElementById("star5");

star1.addEventListener("click", ()=>{
    star2.nextElementSibling.classList.remove("fa-solid");
    star3.nextElementSibling.classList.remove("fa-solid");
    star4.nextElementSibling.classList.remove("fa-solid");
    star5.nextElementSibling.classList.remove("fa-solid");

    star2.nextElementSibling.classList.add("fa-regular");
    star3.nextElementSibling.classList.add("fa-regular");
    star4.nextElementSibling.classList.add("fa-regular");
    star5.nextElementSibling.classList.add("fa-regular");


})

star2.addEventListener("click", ()=>{
    star2.nextElementSibling.classList.remove("fa-solid");
    star3.nextElementSibling.classList.remove("fa-solid");
    star4.nextElementSibling.classList.remove("fa-solid");
    star5.nextElementSibling.classList.remove("fa-solid");

    star2.nextElementSibling.classList.add("fa-regular");
    star3.nextElementSibling.classList.add("fa-regular");
    star4.nextElementSibling.classList.add("fa-regular");
    star5.nextElementSibling.classList.add("fa-regular");

    star2.nextElementSibling.classList.toggle("fa-regular");
    star2.nextElementSibling.classList.toggle("fa-solid");

})

star3.addEventListener("click", ()=>{

    star2.nextElementSibling.classList.remove("fa-solid");
    star3.nextElementSibling.classList.remove("fa-solid");
    star4.nextElementSibling.classList.remove("fa-solid");
    star5.nextElementSibling.classList.remove("fa-solid");

    star2.nextElementSibling.classList.add("fa-regular");
    star3.nextElementSibling.classList.add("fa-regular");
    star4.nextElementSibling.classList.add("fa-regular");
    star5.nextElementSibling.classList.add("fa-regular");



    star2.nextElementSibling.classList.toggle("fa-regular");
    star2.nextElementSibling.classList.toggle("fa-solid");
    star3.nextElementSibling.classList.toggle("fa-regular");
    star3.nextElementSibling.classList.toggle("fa-solid");

})


star4.addEventListener("click", ()=>{
    star2.nextElementSibling.classList.remove("fa-solid");
    star3.nextElementSibling.classList.remove("fa-solid");
    star4.nextElementSibling.classList.remove("fa-solid");
    star5.nextElementSibling.classList.remove("fa-solid");

    star2.nextElementSibling.classList.add("fa-regular");
    star3.nextElementSibling.classList.add("fa-regular");
    star4.nextElementSibling.classList.add("fa-regular");
    star5.nextElementSibling.classList.add("fa-regular");

    star2.nextElementSibling.classList.toggle("fa-regular");
    star2.nextElementSibling.classList.toggle("fa-solid");
    star3.nextElementSibling.classList.toggle("fa-regular");
    star3.nextElementSibling.classList.toggle("fa-solid");
    star4.nextElementSibling.classList.toggle("fa-regular");
    star4.nextElementSibling.classList.toggle("fa-solid");

})

star5.addEventListener("click", ()=>{
    star2.nextElementSibling.classList.remove("fa-solid");
    star3.nextElementSibling.classList.remove("fa-solid");
    star4.nextElementSibling.classList.remove("fa-solid");
    star5.nextElementSibling.classList.remove("fa-solid");

    star2.nextElementSibling.classList.add("fa-regular");
    star3.nextElementSibling.classList.add("fa-regular");
    star4.nextElementSibling.classList.add("fa-regular");
    star5.nextElementSibling.classList.add("fa-regular");

    star2.nextElementSibling.classList.toggle("fa-regular");
    star2.nextElementSibling.classList.toggle("fa-solid");
    star3.nextElementSibling.classList.toggle("fa-regular");
    star3.nextElementSibling.classList.toggle("fa-solid");
    star4.nextElementSibling.classList.toggle("fa-regular");
    star4.nextElementSibling.classList.toggle("fa-solid");
    star5.nextElementSibling.classList.toggle("fa-regular");
    star5.nextElementSibling.classList.toggle("fa-solid");
    

})
