document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Pinner .album-wrapper i længere tid for at gøre scrolloplevelsen langsommere
    gsap.to(".album-wrapper", {
        scrollTrigger: {
            trigger: ".vinyl-section",
            start: "top top",
            end: "+=2000vh", // Øger længden af scrollanimationen for pinningen
            pin: true,
            scrub: 1,
        }
    });

    // Animerer baggrundsgradienten langsommere baseret på scroll-positionen
    gsap.to(".vinyl-section", {
        backgroundPosition: "0 100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".vinyl-section",
            start: "top top",
            end: "+=2300vh", // Øger længden af scrollanimationen for gradientændringen
            scrub: 1,
        }
    });

    // Animation for .album-cover to move to the left based on CSS variable
    gsap.to(".album-cover", {
        x: () => getComputedStyle(document.documentElement).getPropertyValue("--album-cover-x"),
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".album-wrapper",
            start: "top top",
            end: "+=2000vh",
            scrub: 1,
            markers: false, // Fjern debugging markører
        },
    });

    // Animation for .vinyl to move to the right based on CSS variable
    gsap.to(".vinyl", {
        x: () => getComputedStyle(document.documentElement).getPropertyValue("--vinyl-x"),
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".album-wrapper",
            start: "top top",
            end: "+=2000vh",
            scrub: 1,
            markers: false, // Fjern debugging markører
        },
    });
});

// Video play button functionality
document.addEventListener("DOMContentLoaded", function() {
    const listenNowBtn = document.getElementById("listenNowBtn");
    if (listenNowBtn) {
        listenNowBtn.addEventListener("click", function() {
            const videoContainer = document.getElementById("videoContainer");
            const thumbnail = document.querySelector(".thumbnail");
            const tigerSection = document.querySelector("#tiger");

            // Ændrer baggrundsfarven på sektionen til sort, når der klikkes på "Lyt" knappen
            if (tigerSection) {
                tigerSection.style.backgroundColor = "black";
                tigerSection.style.backgroundImage = "none"; // Fjern baggrundsbilledet
            }

            // Indsætter YouTube-video i videoContainer
            videoContainer.innerHTML = `
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/nrXj21VjD88?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;

            // Skjuler thumbnail
            if (thumbnail) {
                thumbnail.style.display = "none";
            }

            // Justerer video-styling
            const video = videoContainer.querySelector("iframe");
            if (video) {
                video.style.display = "block";
                video.style.position = "absolute";
                video.style.top = "0";
                video.style.left = "0";
                video.style.width = "100%";
                video.style.height = "100%";
                video.style.zIndex = "5";
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const words = [" Like • Lyt • Følg ", " Lyt • Følg • Like ", " Følg • Like • Lyt "];
    let i = 0;
    let j = 0;
    let currentWord = '';
    let isDeleting = false;
    const speed = 250; // Hastighed for animation

    function type() {
        const typewriter = document.getElementById("typewriter");
        if (i < words.length) {
            if (!isDeleting && j <= words[i].length) {
                // Tilføj bogstaver
                currentWord = words[i].substring(0, j);
                j++;
                typewriter.innerHTML = currentWord;
            }

            if (isDeleting && j >= 0) {
                // Fjern bogstaver
                currentWord = words[i].substring(0, j);
                j--;
                typewriter.innerHTML = currentWord;
            }

            if (j === words[i].length) {
                // Når ordet er færdigskrevet, begynder sletning efter en pause
                isDeleting = true;
                setTimeout(type, 1000); // Vent 1 sekund, før sletning starter
                return;
            }

            if (isDeleting && j === 0) {
                // Når ordet er slettet helt, skift til næste ord
                isDeleting = false;
                i++;
                if (i === words.length) {
                    i = 0;
                }
                setTimeout(type, 500); // Vent 0,5 sekunder, før skrivning starter igen
                return;
            }

            setTimeout(type, speed); // Hastigheden for skrivning/sletning
        }
    }

    // Start typewriter-effekten
    type();
});

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".yt-slider");
    const slides = Array.from(document.querySelectorAll(".yt-slide"));
    const totalSlides = slides.length;
    const leftArrow = document.querySelector(".yt-left-arrow");
    const rightArrow = document.querySelector(".yt-right-arrow");
    const dots = Array.from(document.querySelectorAll(".yt-dot"));
    
    let currentIndex = 1;

    // Duplicate first and last slides for infinite looping effect
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[totalSlides - 1].cloneNode(true);

    slider.appendChild(firstSlideClone);
    slider.insertBefore(lastSlideClone, slides[0]);

    const updatedSlides = document.querySelectorAll(".yt-slide");
    const updatedTotalSlides = updatedSlides.length;

    function updateSlider() {
        const offset = currentIndex * -100;
        slider.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    function updateDots() {
        dots.forEach(dot => dot.classList.remove("active"));
        let dotIndex = currentIndex - 1;
        
        if (currentIndex === 0) {
            dotIndex = totalSlides - 1;
        } else if (currentIndex === updatedTotalSlides - 1) {
            dotIndex = 0;
        }
        
        dots[dotIndex].classList.add("active");
    }

    function nextSlide() {
        if (currentIndex < updatedTotalSlides - 1) {
            currentIndex++;
            updateSlider();
        }
        
        if (currentIndex === updatedTotalSlides - 1) {
            setTimeout(() => {
                slider.style.transition = "none";
                currentIndex = 1;
                updateSlider();
                setTimeout(() => {
                    slider.style.transition = "transform 0.5s ease";
                }, 50);
            }, 500);
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }

        if (currentIndex === 0) {
            setTimeout(() => {
                slider.style.transition = "none";
                currentIndex = updatedTotalSlides - 2;
                updateSlider();
                setTimeout(() => {
                    slider.style.transition = "transform 0.5s ease";
                }, 50);
            }, 500);
        }
    }

    function goToSlide(index) {
        currentIndex = index + 1;
        updateSlider();
    }

    rightArrow.addEventListener("click", nextSlide);
    leftArrow.addEventListener("click", prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => goToSlide(index));
    });

    updateSlider();
});

ScrollTrigger.refresh();

