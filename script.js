document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // **Album Wrapper Pinning and Scroll Animation**
    gsap.timeline({
        scrollTrigger: {
            trigger: ".vinyl-section",
            start: "top top",
            end: "+=1500vh", // Mindre afstand for mere præcis oplevelse
            pin: true,
            scrub: true,
        },
    })
    .to(".album-cover", {
        x: () => getComputedStyle(document.documentElement).getPropertyValue("--album-cover-x"),
        ease: "power2.out",
    })
    .to(".vinyl", {
        x: () => getComputedStyle(document.documentElement).getPropertyValue("--vinyl-x"),
        ease: "power2.out",
    }, "<")
    .to(".vinyl-section", {
        backgroundPosition: "0 100%",
        ease: "none",
    }, "<");

    // **Play Video on Button Click**
    const listenNowBtn = document.getElementById("listenNowBtn");
    if (listenNowBtn) {
        listenNowBtn.addEventListener("click", () => {
            const videoContainer = document.getElementById("videoContainer");
            videoContainer.innerHTML = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/nrXj21VjD88?autoplay=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                ></iframe>`;
        });
    }

    // **Typewriter Effect**
    const typewriterText = [" Like • Lyt • Følg ", " Lyt • Følg • Like ", " Følg • Like • Lyt "];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterSpeed = 250;

    function typewriter() {
        const typewriterElement = document.getElementById("typewriter");
        if (typewriterElement) {
            const currentWord = typewriterText[wordIndex];
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typewriterElement.textContent = currentWord.substring(0, charIndex);

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(typewriter, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % typewriterText.length;
                setTimeout(typewriter, 500);
            } else {
                setTimeout(typewriter, typewriterSpeed);
            }
        }
    }
    typewriter();

    // **Slider Functionality**
    const slider = document.querySelector(".yt-slider");
    if (slider) {
        const slides = Array.from(slider.children);
        const slideCount = slides.length;
        let currentIndex = 0;

        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        document.querySelector(".yt-left-arrow")?.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSlider();
        });

        document.querySelector(".yt-right-arrow")?.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSlider();
        });

        updateSlider();
    }

    // Refresh ScrollTrigger on DOMContentLoaded
    ScrollTrigger.refresh();
});
