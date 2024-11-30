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

            // Tilføj iframe til videoContainer
            videoContainer.innerHTML = `
                <iframe 
                    id="youtubeVideo"
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/nrXj21VjD88?autoplay=1" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                ></iframe>`;

            // Sørg for scrolling og interaktion med iframe
            const iframe = document.getElementById("youtubeVideo");
            iframe.style.pointerEvents = "auto"; // Tillad interaktion med iframe
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

    // Sørg for, at ScrollTrigger forbliver opdateret
    ScrollTrigger.refresh();
});
