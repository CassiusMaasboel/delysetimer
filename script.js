document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // **Album Wrapper Pinning and Scroll Animation**
    gsap.timeline({
        scrollTrigger: {
            trigger: ".vinyl-section",
            start: "top top",
            end: "+=1500vh",
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
            const body = document.body;

            // Tilføj iframe til videoContainer
            videoContainer.innerHTML = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/nrXj21VjD88?autoplay=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                ></iframe>`;

            // Sørg for, at scrolling forbliver aktiveret
            body.style.overflowY = "auto";
            videoContainer.style.overflow = "visible";

            // Tilføj pointer-events til iframe for at tillade interaktion og scrolling
            const iframe = videoContainer.querySelector("iframe");
            iframe.style.pointerEvents = "none";

            // Aktiver pointer-events ved touchstart eller mousedown
            iframe.addEventListener("touchstart", () => {
                iframe.style.pointerEvents = "auto";
            });

            iframe.addEventListener("mousedown", () => {
                iframe.style.pointerEvents = "auto";
            });

            // Deaktiver pointer-events efter en kort periode uden interaktion
            iframe.addEventListener("touchend", () => {
                setTimeout(() => iframe.style.pointerEvents = "none", 500);
            });

            iframe.addEventListener("mouseup", () => {
                setTimeout(() => iframe.style.pointerEvents = "none", 500);
            });
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

    // Sørg for, at ScrollTrigger forbliver opdateret
    ScrollTrigger.refresh();
});
