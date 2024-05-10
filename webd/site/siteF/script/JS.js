$(function () {
    let currentIndex = 0;


    setInterval(() => {
        let nextIndex = (currentIndex + 1) % 3;
        $("#slider .slider").eq(currentIndex).fadeOut(1000);
        $("#slider .slider").eq(nextIndex).fadeIn(1000);
        currentIndex = nextIndex;
    }, 1000);
})

// 2차메뉴 

$(function () {
    $(".nav>ul>li").mouseenter(function () {
        $(this).find(">ul").stop().slideDown();
        $(".nav>ul>li").mouseleave(function () {
            $(this).find(">ul").stop().slideUp();
        })
    })
})

// 탭 메뉴

$(function () {
    const tabBtn = $(".notice .title ul > li");
    const tabCont = $(".notice .cont > div");

    // 모든 콘텐츠를 안보이게 설정 -- > 첫번째 컨텐츠만 보이게 처리

    tabCont.hide().eq(0).show();

    tabBtn.click(function (e) {
        e.preventDefault();
        const index = $(this).index();  //내가 클릭한 번호를 저장

        $(this).addClass("active").siblings().removeClass("active");
        tabCont.eq(index).show().siblings().hide();
    });
})