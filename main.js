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
    const birthday = "2007-12-08";
    ageElement.textContent = calculateAge(birthday) + "歳";

    const pageTitle = document.getElementById("page-title");
    pageTitle.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

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

            if (slides.length === 0) return;

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