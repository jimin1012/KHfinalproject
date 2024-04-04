// input span태그
const displaySpan = document.getElementById('accountDisplay'); /* 계좌 span */
const inputField = document.getElementById('accountInput'); /* 계좌 input */

// buttons
const getInputBtn = document.getElementById('get-account-input'); /* 계좌 수정 시작 */
const changeBtn = document.getElementById('change-account'); /* 계좌 변경 제출 */


function toggleAccountInput() {

    // 현재 span 태그의 표시 상태에 따라 input 태그와 span 태그의 표시를 전환합니다.
    if (displaySpan.style.display === 'none') {
        displaySpan.style.display = 'inline'; // 또는 'block' 등 원하는 대로 조정
        inputField.style.display = 'none';

        // btn
        changeBtn.style.display = 'none';
        getInputBtn.style.display = 'inline';

    } else {
        displaySpan.style.display = 'none';
        inputField.style.display = 'inline'; // 또는 'block' 등 원하는 대로 조정

        // 요소가 화면에 표시된 후 focus
        inputField.focus();

        // btn
        changeBtn.style.display = 'inline';
        getInputBtn.style.display = 'none';

        changeBtn.style.backgroundColor = 'rgb(0, 67, 112)';
    }

}

changeBtn.addEventListener("click", (e) => {

    const accountNumber = inputField.value;

    console.log(accountNumber);

    fetch("updateAccount", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "bossAccount": accountNumber })
    })
        .then(resp => resp.text())
        .then(result => {
            // console.log(result);
            if (result > 0) {
                alert("계좌번호 변경이 완료되었습니다.");
                displaySpan.innerText = accountNumber;
                location.reload(); //새로고침
            }
        })
        .catch(err => console.log(err));

})

const accTel = document.getElementById("acc-tel").value;
const accState = document.getElementById("acc-state").value;
const Address1 = document.getElementById('sample6_postcode')
const Address2 = document.getElementById('sample6_address')
const Address3 = document.getElementById('sample6_detailAddress')
