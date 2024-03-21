document.addEventListener('DOMContentLoaded', function () {
    updateTimer();
    setInterval(updateTimer, 86400000);
});

function updateTimer() {
    const currentAge = 28;
    const targetAge = 80;
    const currentDate = new Date();
    const targetDate = new Date(currentDate.getFullYear() + (targetAge - currentAge), currentDate.getMonth(), currentDate.getDate());

    const daysLeft = Math.floor((targetDate - currentDate) / (1000 * 60 * 60 * 24));
    const weeksLeft = Math.floor(daysLeft / 7);
    const monthsLeft = Math.floor(daysLeft / 30);

    document.getElementById('days').innerHTML = `남은 일수: ${daysLeft}일`;
    document.getElementById('weeks').innerHTML = `남은 주수: ${weeksLeft}주`;
    document.getElementById('months').innerHTML = `남은 월수: ${monthsLeft}개월`;
}
