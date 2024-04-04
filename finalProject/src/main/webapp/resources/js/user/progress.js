
    // 페이지 식별
    const body = document.querySelector('body');
    let currentPage = 1;

    if (body.classList.contains('page1')) {
        currentPage = 1;
    } else if (body.classList.contains('page2')) {
        currentPage = 2;
    } else if (body.classList.contains('page3')) {
        currentPage = 3;
    }

    // 원의 색상 천천히 진해졌다 연해졌다 하는 효과
    let increasingOpacity = true;
    setInterval(() => {
        const circles = document.querySelectorAll(".circle");
        circles.forEach((circle, index) => {
            if (index === currentPage - 1) {
                let opacity = parseFloat(getComputedStyle(circle).opacity);
                let newOpacity = opacity + (increasingOpacity ? 0.05 : -0.05);
                if (newOpacity >= 1 || newOpacity <= 0.3) {
                    increasingOpacity = !increasingOpacity;
                }
                circle.style.opacity = newOpacity;
            }
        });
    }, 200);

    // 진행 상황 업데이트
    function updateProgress(step) {
        const circles = document.querySelectorAll(".circle");
        circles.forEach((circle, index) => {
            circle.classList.toggle("active", index === step - 1);
        });

        const progressBar = document.querySelectorAll(".progressBar");
        progressBar.forEach((bar, index) => {
            bar.classList.toggle("active", index === step - 1);
        });
    }

    updateProgress(currentPage);