window.onload = function () {
    scrollMove();
};

function scrollMove() {
    const mainSections = document.querySelectorAll(".main-section");
    let currentPosition = 0; // 0: header, 1: first section, 2: second section, ...
    let isScrolling = false;
    const headerHeight = 10 * parseFloat(getComputedStyle(document.documentElement).fontSize);

    document.addEventListener(
        "wheel",
        (e) => {
            e.preventDefault();
            if (isScrolling) return;

            const clientHeight = window.innerHeight;

            if (e.deltaY > 0) { // 아래로 스크롤
                if (currentPosition <= mainSections.length) {
                    currentPosition++;
                    scrollToPosition(currentPosition, clientHeight, headerHeight);
                }
            } else if (e.deltaY < 0) { // 위로 스크롤
                if (currentPosition > 0) {
                    currentPosition--;
                    scrollToPosition(currentPosition, clientHeight, headerHeight);
                }
            }

            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 500);
        },
        { passive: false }
    );

    function scrollToPosition(position, clientHeight, headerHeight) {
        let targetPosition;
        
        if (position === 0) { // 헤더로 이동
            targetPosition = 0;
        } else { // 각 섹션으로 이동
            targetPosition = headerHeight + (clientHeight * (position - 1));
        }

        scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    }
}
