function toggleFingers() {
    const fingers = document.getElementById("fingers");
    fingers.parentElement.classList.toggle("show");
}

function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

document.addEventListener("DOMContentLoaded", () => {
    const ageElement = document.getElementById("age");
    if (ageElement) {
        const birthday = "2007-12-08";
        ageElement.textContent = calculateAge(birthday) + "歳";
    }

    const pageTitle = document.getElementById("page-title");
    pageTitle.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const oteteKart = document.getElementById("oteteKart");
    let previousScrollY = window.scrollY;
    let scrollDirection = 1;
    let kartPositionUpdatePending = false;

    function updateKartPosition() {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = maxScroll > 0
            ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
            : 0;
        const maxTravel = Math.max(0, window.innerWidth - pageTitle.offsetWidth);

        pageTitle.style.transform = `translate3d(${scrollProgress * maxTravel}px, 0, 0)`;
        oteteKart.style.transform = `scaleX(${scrollDirection})`;
        kartPositionUpdatePending = false;
    }

    function handleScroll() {
        const currentScrollY = window.scrollY;
        if (currentScrollY !== previousScrollY) {
            scrollDirection = currentScrollY > previousScrollY ? 1 : -1;
            previousScrollY = currentScrollY;
        }

        if (!kartPositionUpdatePending) {
            kartPositionUpdatePending = true;
            window.requestAnimationFrame(updateKartPosition);
        }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateKartPosition);
    updateKartPosition();

    const scrollButton = document.getElementById("scrollToTop");
    function toggleScrollTop() {
        if (window.scrollY > 100) {
            scrollButton.classList.add("show");
            scrollButton.classList.remove("hide");
        } else {
            scrollButton.classList.add("hide");
            scrollButton.classList.remove("show");
        }
    }

    window.addEventListener("scroll", toggleScrollTop);
    toggleScrollTop();

    function initCarousels() {
        const carousels = document.querySelectorAll('.carousel-container');
        
        carousels.forEach(container => {
            const slides = container.querySelectorAll('.carousel-slide');
            const prevBtn = container.querySelector('.carousel-btn.prev');
            const nextBtn = container.querySelector('.carousel-btn.next');
            let currentIndex = 0;
            let slideInterval;

            if (slides.length <= 1) {
                if (nextBtn) nextBtn.style.display = 'none';
                if (prevBtn) prevBtn.style.display = 'none';
                return;
            }

            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.classList.remove('active');
                    if (i === index) {
                        slide.classList.add('active');
                    }
                });
            }

            function nextSlide() {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            }

            function prevSlide() {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                showSlide(currentIndex);
            }
            
            function resetInterval() {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 3500); // 3.5秒ごとに次のスライドへ
            }

            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });

            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });

            // Auto-slideスタート
            slideInterval = setInterval(nextSlide, 3500);
        });
    }

    initCarousels();
});