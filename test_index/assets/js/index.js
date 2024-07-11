document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.ri-menu-line');
    const asideMenu = document.querySelector('.menu');
    const mainMenu = document.querySelector('main')
    const footerMenu = document.querySelector('footer')

    menuIcon.addEventListener('click', function () {
        asideMenu.classList.toggle('toggle')
        mainMenu.classList.toggle('toggle')
        footerMenu.classList.toggle('toggle')
    });

    const menuActive = document.querySelectorAll('.menu li a');

    // 현재 페이지 URL
    const currentUrl = window.location.pathname;

    menuActive.forEach(item => {
        // 메뉴 항목의 href 속성 값
        const menuUrl = item.getAttribute('href');

        // #을 제외하고 현재 페이지 URL과 메뉴 항목의 URL이 일치하는지 확인
        if (menuUrl !== '#' && currentUrl.includes(menuUrl)) {
            item.parentElement.classList.add('active');
        }

        item.addEventListener('click', function (event) {
            if (menuUrl === '#') {
                // # 링크에 대한 기본 동작 방지
                event.preventDefault();
                menuActive.forEach(el => el.parentElement.classList.remove('active'));
                item.parentElement.classList.add('active');
            }
        });
    });

    const searchIcon = document.querySelector('.mb__search');
    const mbSearch = document.querySelector('.m__search__box');
    const cancelIcon = document.querySelector('.mb__cancel');

    searchIcon.addEventListener('click', function () {
        // 'block'과 'none' 상태를 토글
        mbSearch.style.display = (mbSearch.style.display === 'none' || mbSearch.style.display === '') ? 'block' : 'none';
    });

    cancelIcon.addEventListener('click', function () {
        // 취소 버튼 클릭 시 항상 'none'으로 설정
        mbSearch.style.display = 'none';
    });
});
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    const scrollPosition = window.scrollY || window.pageYOffset;

    // 스크롤 위치에 따라 배경 투명도 조절
    if (scrollPosition > 50) {
        // 스크롤 위치가 50px 이상일 때 더 투명하게
        header.style.backgroundColor = 'rgba(25, 26, 31, 90%)';
    } else {
        // 스크롤을 맨 위로 올렸을 때 원래 투명도로
        header.style.backgroundColor = '#191A1F';
    }
});