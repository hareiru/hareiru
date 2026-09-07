/* =========================================================
   ANIMATION PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     CUSTOM VIDEO PLAYERS
  ======================================================== */

  const videoFrames =
    document.querySelectorAll(".animation-video-frame");


  videoFrames.forEach((frame) => {

    const video =
      frame.querySelector(".animation-video");

    const playButton =
      frame.querySelector(".video-play-button");

    const progress =
      frame.querySelector(".video-progress");

    const currentTimeText =
      frame.querySelector(".video-time");

    const durationText =
      frame.querySelector(".video-duration");

    const muteButton =
      frame.querySelector(".video-mute-button");

    const volume =
      frame.querySelector(".video-volume");

    const fullscreenButton =
      frame.querySelector(".video-fullscreen-button");


    if (!video) return;



    /* =====================================================
       TIME FORMAT
    ====================================================== */

    function formatTime(seconds) {

      if (!Number.isFinite(seconds)) {
        return "00:00";
      }


      const minutes =
        Math.floor(seconds / 60);


      const remainingSeconds =
        Math.floor(seconds % 60);


      return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
      );

    }



    /* =====================================================
       PLAY / PAUSE UI
    ====================================================== */

    function updatePlayButton() {

      if (!playButton) return;


      if (video.paused) {

        playButton.textContent = "▶";
        playButton.setAttribute(
          "aria-label",
          "再生"
        );

      } else {

        playButton.textContent = "Ⅱ";
        playButton.setAttribute(
          "aria-label",
          "一時停止"
        );

      }

    }



    /* =====================================================
       MUTE UI
    ====================================================== */

    function updateMuteButton() {

      if (!muteButton) return;


      if (video.muted || video.volume === 0) {

        muteButton.textContent = "🔇";

        muteButton.setAttribute(
          "aria-label",
          "ミュート解除"
        );

        muteButton.setAttribute(
          "aria-pressed",
          "true"
        );

      } else {

        muteButton.textContent = "🔊";

        muteButton.setAttribute(
          "aria-label",
          "ミュート"
        );

        muteButton.setAttribute(
          "aria-pressed",
          "false"
        );

      }

    }



    /* =====================================================
       VIDEO DATA
    ====================================================== */

    video.addEventListener(
      "loadedmetadata",
      () => {

        if (durationText) {

          durationText.textContent =
            formatTime(video.duration);

        }


        if (currentTimeText) {

          currentTimeText.textContent =
            formatTime(video.currentTime);

        }


        if (progress) {

          progress.value = 0;

        }

      }
    );



    /* =====================================================
       TIME UPDATE
    ====================================================== */

    video.addEventListener(
      "timeupdate",
      () => {

        if (currentTimeText) {

          currentTimeText.textContent =
            formatTime(video.currentTime);

        }


        if (progress && video.duration) {

          progress.value =
            (video.currentTime / video.duration) * 100;

        }

      }
    );



    /* =====================================================
       PLAY / PAUSE
    ====================================================== */

    function togglePlay() {

      if (video.paused) {

        video.play();

      } else {

        video.pause();

      }

    }


    if (playButton) {

      playButton.addEventListener(
        "click",
        togglePlay
      );

    }


    video.addEventListener(
      "click",
      togglePlay
    );


    video.addEventListener(
      "play",
      updatePlayButton
    );


    video.addEventListener(
      "pause",
      updatePlayButton
    );


    video.addEventListener(
      "ended",
      () => {

        updatePlayButton();

      }
    );



    /* =====================================================
       PROGRESS BAR
    ====================================================== */

    if (progress) {

      progress.addEventListener(
        "input",
        () => {

          if (!video.duration) return;


          const percentage =
            Number(progress.value) / 100;


          video.currentTime =
            video.duration * percentage;

        }
      );

    }



    /* =====================================================
       MUTE
    ====================================================== */

    if (muteButton) {

      muteButton.addEventListener(
        "click",
        () => {

          video.muted =
            !video.muted;

          updateMuteButton();

        }
      );

    }



    /* =====================================================
       VOLUME
    ====================================================== */

    if (volume) {

      volume.addEventListener(
        "input",
        () => {

          video.volume =
            Number(volume.value);


          if (video.volume > 0) {

            video.muted = false;

          }


          updateMuteButton();

        }
      );

    }



    /* =====================================================
       FULLSCREEN
    ====================================================== */

    if (fullscreenButton) {

      fullscreenButton.addEventListener(
        "click",
        async () => {

          try {

            if (document.fullscreenElement) {

              await document.exitFullscreen();

            } else {

              await frame.requestFullscreen();

            }

          } catch (error) {

            console.log(
              "Fullscreen is not available.",
              error
            );

          }

        }
      );

    }



    /* =====================================================
       INITIAL STATE
    ====================================================== */

    video.muted = true;
    video.volume = 1;

    if (volume) {
      volume.value = 1;
    }

    updatePlayButton();
    updateMuteButton();

  });



  /* =======================================================
     FILM STILL SLIDERS
  ======================================================== */

  const sliders =
    document.querySelectorAll(".film-still-slider");


  sliders.forEach((slider) => {

    const track =
      slider.querySelector(".still-track");

    const viewport =
      slider.querySelector(".still-viewport");

    const leftButton =
      slider.querySelector(".still-arrow--left");

    const rightButton =
      slider.querySelector(".still-arrow--right");

    const count =
      slider
        .closest(".film-still-section")
        .querySelector(".film-still-count");


    if (
      !track ||
      !viewport ||
      !leftButton ||
      !rightButton
    ) {
      return;
    }


    const items =
      Array.from(
        track.querySelectorAll(".still-item")
      );


    const total =
      items.length;


    let currentIndex = 0;



    /* =====================================================
       VISIBLE COUNT
    ====================================================== */

    function getVisibleCount() {

      if (window.innerWidth <= 520) {
        return 1;
      }

      if (window.innerWidth <= 700) {
        return 2;
      }

      return 3;

    }



    /* =====================================================
       UPDATE SLIDER
    ====================================================== */

    function updateSlider() {

      const visibleCount =
        getVisibleCount();


      const maxIndex =
        Math.max(
          0,
          total - visibleCount
        );


      currentIndex =
        Math.max(
          0,
          Math.min(
            currentIndex,
            maxIndex
          )
        );


      const item =
        items[0];


      if (!item) return;


      const itemWidth =
        item.getBoundingClientRect().width;


      const gap =
        parseFloat(
          getComputedStyle(track).gap
        ) || 0;


      const moveAmount =
        (itemWidth + gap) *
        currentIndex;


      track.style.transform =
        `translateX(-${moveAmount}px)`;


      leftButton.disabled =
        currentIndex <= 0;


      rightButton.disabled =
        currentIndex >= maxIndex;


      if (count) {

        const displayIndex =
          String(currentIndex + 1)
            .padStart(2, "0");


        const displayTotal =
          String(total)
            .padStart(2, "0");


        count.textContent =
          `${displayIndex} / ${displayTotal}`;

      }

    }



    /* =====================================================
       BUTTONS
    ====================================================== */

    leftButton.addEventListener(
      "click",
      () => {

        if (currentIndex <= 0) {
          return;
        }

        currentIndex--;

        updateSlider();

      }
    );


    rightButton.addEventListener(
      "click",
      () => {

        const visibleCount =
          getVisibleCount();

        const maxIndex =
          Math.max(
            0,
            total - visibleCount
          );


        if (currentIndex >= maxIndex) {
          return;
        }


        currentIndex++;

        updateSlider();

      }
    );



    /* =====================================================
       RESIZE
    ====================================================== */

    window.addEventListener(
      "resize",
      updateSlider
    );


    updateSlider();

  });



  /* =======================================================
     FILM STILL LIGHTBOX
  ======================================================== */

  const stillItems =
    document.querySelectorAll(".still-item");


  if (stillItems.length > 0) {

    const lightbox =
      document.createElement("div");


    lightbox.className =
      "animation-still-lightbox";


    lightbox.innerHTML = `
      <div class="animation-still-lightbox-backdrop"></div>

      <button
        type="button"
        class="animation-still-lightbox-close"
        aria-label="Close"
      >
        ×
      </button>

      <img
        class="animation-still-lightbox-image"
        src=""
        alt=""
      >
    `;


    document.body.appendChild(lightbox);


    const backdrop =
      lightbox.querySelector(
        ".animation-still-lightbox-backdrop"
      );


    const closeButton =
      lightbox.querySelector(
        ".animation-still-lightbox-close"
      );


    const lightboxImage =
      lightbox.querySelector(
        ".animation-still-lightbox-image"
      );


    function openLightbox(image) {

      lightboxImage.src =
        image.src;

      lightboxImage.alt =
        image.alt;

      lightbox.classList.add(
        "is-open"
      );

      document.body.style.overflow =
        "hidden";

    }


    function closeLightbox() {

      lightbox.classList.remove(
        "is-open"
      );

      document.body.style.overflow =
        "";

    }


    stillItems.forEach((item) => {

      const image =
        item.querySelector("img");

      if (!image) return;


      item.addEventListener(
        "click",
        () => {
          openLightbox(image);
        }
      );

    });


    closeButton.addEventListener(
      "click",
      closeLightbox
    );


    backdrop.addEventListener(
      "click",
      closeLightbox
    );


    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape" &&
          lightbox.classList.contains("is-open")
        ) {

          closeLightbox();

        }

      }
    );

  }

});