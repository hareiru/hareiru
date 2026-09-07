/* =========================================================
   ILLUSTRATION PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     ELEMENTS
  ======================================================== */

  const gallery =
    document.getElementById(
      "illustrationGallery"
    );


  const lightbox =
    document.getElementById(
      "illustrationLightbox"
    );


  const lightboxImage =
    document.getElementById(
      "lightboxImage"
    );


  const lightboxClose =
    document.getElementById(
      "lightboxClose"
    );


  const lightboxBackdrop =
    document.getElementById(
      "lightboxBackdrop"
    );


  if (
    !gallery ||
    !lightbox ||
    !lightboxImage ||
    !lightboxClose ||
    !lightboxBackdrop
  ) {
    return;
  }



  /* =======================================================
     SETTINGS
  ======================================================== */

  const imageFolder =
    "images/illustration/";


  const maxImages =
    100;



  /* =======================================================
     CHECK IMAGE
  ======================================================== */

  function checkImage(path, number) {

    return new Promise((resolve) => {

      const image =
        new Image();


      image.onload = () => {

        resolve({
          exists: true,
          path: path,
          number: number
        });

      };


      image.onerror = () => {

        resolve({
          exists: false,
          path: path,
          number: number
        });

      };


      image.src = path;

    });

  }



  /* =======================================================
     LOAD IMAGE LIST
  ======================================================== */

  const imageChecks = [];


  for (
    let i = maxImages;
    i >= 1;
    i--
  ) {

    const number =
      String(i).padStart(2, "0");


    const imagePath =
      `${imageFolder}${number}.png`;


    imageChecks.push(
      checkImage(
        imagePath,
        number
      )
    );

  }



  /* =======================================================
     CREATE GALLERY
  ======================================================== */

  Promise.all(imageChecks)
    .then((images) => {

      images.forEach((item) => {

        if (!item.exists) {
          return;
        }


        createGalleryItem(
          item.path,
          item.number
        );

      });

    });



  /* =======================================================
     CREATE GALLERY ITEM
  ======================================================== */

  function createGalleryItem(
    imagePath,
    number
  ) {

    const button =
      document.createElement(
        "button"
      );


    button.type =
      "button";


    button.className =
      "illustration-item";


    button.setAttribute(
      "aria-label",
      `イラスト作品 ${number}`
    );



    const image =
      document.createElement(
        "img"
      );


    image.src =
      imagePath;


    image.alt =
      `イラスト作品 ${number}`;


    image.loading =
      "lazy";



    button.appendChild(
      image
    );


    gallery.appendChild(
      button
    );



    /* =====================================================
       OPEN LIGHTBOX
    ====================================================== */

    button.addEventListener(
      "click",
      () => {

        openLightbox(
          imagePath,
          image.alt
        );

      }
    );

  }



  /* =======================================================
     OPEN LIGHTBOX
  ======================================================== */

  function openLightbox(
    imagePath,
    altText
  ) {

    lightboxImage.src =
      imagePath;


    lightboxImage.alt =
      altText;


    lightbox.classList.add(
      "is-open"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.classList.add(
      "lightbox-open"
    );


    lightboxClose.focus();

  }



  /* =======================================================
     CLOSE LIGHTBOX
  ======================================================== */

  function closeLightbox() {

    lightbox.classList.remove(
      "is-open"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "lightbox-open"
    );


    setTimeout(() => {

      if (
        !lightbox.classList.contains(
          "is-open"
        )
      ) {

        lightboxImage.src =
          "";

        lightboxImage.alt =
          "";

      }

    }, 300);

  }



  /* =======================================================
     CLOSE BUTTON
  ======================================================== */

  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );



  /* =======================================================
     BACKDROP CLICK
  ======================================================== */

  lightboxBackdrop.addEventListener(
    "click",
    closeLightbox
  );



  /* =======================================================
     ESC KEY
  ======================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        lightbox.classList.contains(
          "is-open"
        )
      ) {

        closeLightbox();

      }

    }
  );

});