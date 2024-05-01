document.addEventListener('DOMContentLoaded', function () {
    // 페이지가 전부 로드되면 로딩 클래스 제거
    document.body.classList.remove('loading');

    // 모든 이미지 컨테이너에 대한 참조를 가져옵니다.
    const items = document.querySelectorAll('.column__item');

    // 이미지 클릭 애니메이션
    items.forEach(item => {
        item.addEventListener('click', function () {
            // 클릭된 아이템에 대해 확대/축소 토글
            gsap.to(this, {
                scale: this.style.transform === "scale(1.2)" ? 1 : 1.2,
                duration: 0.7,
                ease: 'power2.out'
            });
        });
    });

    // 이미지에 마우스 오버 및 아웃 이벤트
    items.forEach(item => {
        item.addEventListener('mouseenter', function () {
            // 마우스 오버 시 이미지 확대
            gsap.to(this, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power1.out'
            });
        });

        item.addEventListener('mouseleave', function () {
            // 마우스 아웃 시 이미지 축소
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
    });

    // Locomotive Scroll 초기화
    const scrollContainer = document.querySelector('[data-scroll-container]');
    const locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        multiplier: 0.5, // 전체 스크롤 속도 조정
        getDirection: true
    });

    // 스크롤 이벤트를 사용하여 GSAP 애니메이션 트리거
    locoScroll.on('scroll', (instance) => {
        document.querySelectorAll('.column__item-imgwrap').forEach((imgWrap, index) => {
            const pos = parseInt(imgWrap.dataset.pos);  // data-pos 값을 정수로 변환
            // pos 값에 따라 다른 이동 계수를 적용
            const moveFactor = 0.1 * (pos % 5);
            gsap.to(imgWrap, {
                duration: 1,
                y: -instance.scroll.y * moveFactor, // 이동 거리 계산
                ease: 'none'
            });
        });
    });

    // Locomotive Scroll 업데이트 이벤트
    locoScroll.on('call', (value, way, obj) => {
        console.log(value, way, obj); // 필요한 경우 사용자 지정 로직을 추가할 수 있습니다.
    });

    // 페이지의 이미지가 로드되면 스크롤 업데이트
    window.addEventListener('load', function () {
        locoScroll.update();
    });
});