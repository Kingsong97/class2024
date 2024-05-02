document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.remove('loading');

    const items = document.querySelectorAll('.column__item');

    items.forEach(item => {
        item.addEventListener('click', function () {
            gsap.to(this, {
                scale: this.style.transform === "scale(1.2)" ? 1 : 1.2,
                duration: 0.7,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseenter', function () {
            gsap.to(this, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power1.out'
            });
        });

        item.addEventListener('mouseleave', function () {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
    });

    // ScrollTrigger를 사용한 애니메이션
    document.querySelectorAll('.column__item-imgwrap').forEach((imgWrap, index) => {
        const pos = parseInt(imgWrap.dataset.pos);
        gsap.to(imgWrap, {
            scrollTrigger: {
                trigger: imgWrap,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: (self) => -self.getVelocity() / 100 * pos,
            ease: 'none'
        });
    });
});