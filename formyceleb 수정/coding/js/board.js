function openTab(evt, tabName) {
    // 모든 tabcontent 요소 숨기기
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // 모든 tablink 요소의 active 클래스 제거
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // 클릭한 tablink 요소에 active 클래스 추가
    evt.currentTarget.className += " active";

    // 클릭한 탭의 제목으로 header-title 변경
    var newTitle = evt.currentTarget.getAttribute("data-title");
    document.getElementById("header-title").textContent = newTitle;

    // 클릭한 tabcontent 요소 보이기
    document.getElementById(tabName).style.display = "block";
}

// 기본으로 표시할 탭 설정
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".tablink.active").click();
});