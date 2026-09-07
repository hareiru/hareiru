/* =========================================================
   HAREIRU
   Common Header / Footer
   + HOME Poster Carousel
   + Genre Icon Spin
   + About / Commission Scroll Animation
   ========================================================= */


/* =========================================================
   COMMON HEADER / FOOTER
========================================================= */

const headerElement =
  document.getElementById("header");

const footerElement =
  document.getElementById("footer");


/* =========================================================
   LOAD HEADER
========================================================= */

if (headerElement) {

  fetch("components/header.html")

    .then((response) => response.text())

    .then((data) => {

      headerElement.innerHTML = data;


      /* -----------------------------------------------
         現在のページを判定
      ----------------------------------------------- */

      const currentPage =
        window.location.pathname
          .split("/")
          .pop() || "index.html";


      /* -----------------------------------------------
         現在のページに active を付ける
      ----------------------------------------------- */

      const navLinks =
        headerElement.querySelectorAll(
          ".global-nav a"
        );


      navLinks.forEach((link) => {

        const href =
          link.getAttribute("href") || "";


        const linkPage =
          href
            .split("?")[0]
            .split("#")[0];


        if (linkPage === currentPage) {

          link.classList.add("active");

        }

      });

    })

    .catch((error) => {

      console.error(
        "HEADERの読み込みに失敗しました:",
        error
      );

    });

}


/* =========================================================
   LOAD FOOTER
========================================================= */

if (footerElement) {

  fetch("components/footer.html")

    .then((response) => response.text())

    .then((data) => {

      footerElement.innerHTML = data;

    })

    .catch((error) => {

      console.error(
        "FOOTERの読み込みに失敗しました:",
        error
      );

    });

}


/* =========================================================
   HOME
   POSTER CAROUSEL
========================================================= */

(() => {


  const slides = [
    ...document.querySelectorAll(
      ".poster-slide"
    )
  ];


  const track =
    document.getElementById(
      "posterTrack"
    );


  const left =
    document.querySelector(
      ".carousel-arrow--left"
    );


  const right =
    document.querySelector(
      ".carousel-arrow--right"
    );


  const ticket =
    document.getElementById(
      "ticketNumber"
    );


  /* =======================================================
     STOP IF POSTERS DO NOT EXIST
  ======================================================= */

  if (!slides.length || !track) {

    return;

  }


  /* =======================================================
     CURRENT SLIDE
  ======================================================= */

  let current =
    slides.findIndex((slide) =>
      slide.classList.contains(
        "is-center"
      )
    );


  if (current < 0) {

    current = 0;

  }


  /* =======================================================
     CHARACTER PATTERNS
  ======================================================= */

  /*
    作品ごとに5枚。

    x:
      マイナス = 左
      プラス  = 右

    y:
      マイナス = 上
      プラス  = 下

    rotate:
      左 = マイナス
      右 = プラス

    size:
      large / medium / small
  */


  const characterPatterns = [


    /* =====================================================
       ZENNOU
    ===================================================== */

    [

      {
        x: -86,
        y: -70,
        rotate: -14,
        size: "large"
      },

      {
        x: 82,
        y: -45,
        rotate: 13,
        size: "medium"
      },

      {
        x: -78,
        y: 48,
        rotate: -10,
        size: "small"
      },

      {
        x: 88,
        y: 58,
        rotate: 12,
        size: "large"
      },

      {
        x: 8,
        y: 102,
        rotate: -5,
        size: "medium"
      }

    ],


    /* =====================================================
       LANEDY
    ===================================================== */

    [

      {
        x: -105,
        y: -55,
        rotate: -18,
        size: "large"
      },

      {
        x: 96,
        y: -68,
        rotate: 17,
        size: "medium"
      },

      {
        x: -92,
        y: 62,
        rotate: -7,
        size: "small"
      },

      {
        x: 102,
        y: 46,
        rotate: 16,
        size: "large"
      },

      {
        x: 18,
        y: 118,
        rotate: 8,
        size: "medium"
      }

    ],


    /* =====================================================
       NEW WORK
    ===================================================== */

    [

      {
        x: -72,
        y: -88,
        rotate: -10,
        size: "large"
      },

      {
        x: 105,
        y: -35,
        rotate: 20,
        size: "medium"
      },

      {
        x: -98,
        y: 35,
        rotate: -15,
        size: "small"
      },

      {
        x: 76,
        y: 72,
        rotate: 9,
        size: "large"
      },

      {
        x: -18,
        y: 112,
        rotate: -8,
        size: "medium"
      }

    ],


    /* =====================================================
       RAPID RABBIT
    ===================================================== */

    [

      {
        x: -82,
        y: -86,
        rotate: -14,
        size: "large"
      },

      {
        x: 98,
        y: -58,
        rotate: 18,
        size: "small"
      },

      {
        x: -100,
        y: 46,
        rotate: -18,
        size: "medium"
      },

      {
        x: 84,
        y: 84,
        rotate: 13,
        size: "large"
      },

      {
        x: 0,
        y: 104,
        rotate: 4,
        size: "medium"
      }

    ]

  ];


  /* =======================================================
     GET CHARACTERS
  ======================================================= */

  function getCharacters(slide) {

    return [

      ...slide.querySelectorAll(
        ".poster-character"
      )

    ].slice(0, 5);

  }


  /* =======================================================
     HIDE CHARACTERS
  ======================================================= */

  function hideCharacters(slide) {

    const characters =
      getCharacters(slide);


    characters.forEach((character) => {


      character.classList.remove(
        "pop-start"
      );


      character.style.animation =
        "none";


      character.style.animationDelay =
        "0ms";


      character.style.opacity =
        "0";


      character.style.visibility =
        "hidden";


      character.style.setProperty(
        "--pop-x",
        "0px"
      );


      character.style.setProperty(
        "--pop-y",
        "0px"
      );


      character.style.setProperty(
        "--pop-rotate",
        "0deg"
      );


      character.style.transform =
        "translate3d(0, 0, 0) rotate(0deg) scale(.35)";

    });

  }


  /* =======================================================
     POP CHARACTERS
  ======================================================= */

  function popCharacters(
    slide,
    slideIndex
  ) {

    const characters =
      getCharacters(slide);


    if (!characters.length) {

      return;

    }


    const pattern =
      characterPatterns[slideIndex] || [];


    characters.forEach(
      (character, index) => {


        const setting =
          pattern[index] || {

            x: 0,

            y: 0,

            rotate: 0,

            size: "medium"

          };


        /* -----------------------------------------------
           サイズ
        ----------------------------------------------- */

        character.classList.remove(

          "poster-character--large",

          "poster-character--medium",

          "poster-character--small"

        );


        character.classList.add(
          `poster-character--${setting.size}`
        );


        /* -----------------------------------------------
           飛び出す距離
        ----------------------------------------------- */

        character.style.setProperty(

          "--pop-x",

          `${setting.x}px`

        );


        character.style.setProperty(

          "--pop-y",

          `${setting.y}px`

        );


        /* -----------------------------------------------
           左右の傾き
        ----------------------------------------------- */

        let rotation =
          Number(setting.rotate) || 0;


        if (setting.x < 0) {

          rotation =
            -Math.abs(rotation);

        }


        if (setting.x > 0) {

          rotation =
            Math.abs(rotation);

        }


        character.style.setProperty(

          "--pop-rotate",

          `${rotation}deg`

        );


        /* -----------------------------------------------
           アニメーション完全リセット
        ----------------------------------------------- */

        character.classList.remove(
          "pop-start"
        );


        character.style.animation =
          "none";


        character.style.opacity =
          "0";


        character.style.visibility =
          "hidden";


        character.style.transform =
          "translate3d(0, 0, 0) rotate(0deg) scale(.35)";


        /*
          同じ作品をもう一度中央にした場合でも
          必ず最初から再生するための reflow。
        */

        void character.offsetWidth;


        /* -----------------------------------------------
           ランダムディレイ
        ----------------------------------------------- */

        const randomDelay =
          60 + Math.random() * 260;


        character.style.animationDelay =
          `${randomDelay}ms`;


        /* -----------------------------------------------
           アニメーション開始
        ----------------------------------------------- */

        requestAnimationFrame(() => {


          /*
            途中で別の作品に移動していたら
            そのキャラクターは出さない。
          */

          if (

            slides[current] !== slide ||

            !slide.classList.contains(
              "is-center"
            )

          ) {

            return;

          }


          character.style.animation =
            "";


          character.classList.add(
            "pop-start"
          );

        });

      }

    );

  }


  /* =======================================================
     POSITION TRACK
  ======================================================= */

  function positionTrack() {

    const active =
      slides[current];


    if (!active) {

      return;

    }


    const trackRect =
      track.getBoundingClientRect();


    const activeRect =
      active.getBoundingClientRect();


    const trackCenter =
      trackRect.left +
      trackRect.width / 2;


    const activeCenter =
      activeRect.left +
      activeRect.width / 2;


    const shift =
      trackCenter -
      activeCenter;


    track.style.transform =
      `translateX(${shift}px)`;

  }


  /* =======================================================
     RENDER
  ======================================================= */

  function render() {


    /* -----------------------------------------------
       中央作品を決定
    ----------------------------------------------- */

    slides.forEach(
      (slide, index) => {

        slide.classList.toggle(

          "is-center",

          index === current

        );

      }
    );


    /* -----------------------------------------------
       中央ではない作品を完全に消す
    ----------------------------------------------- */

    slides.forEach(
      (slide, index) => {

        if (index !== current) {

          hideCharacters(slide);

        }

      }
    );


    /* -----------------------------------------------
       トラック位置
    ----------------------------------------------- */

    positionTrack();


    /* -----------------------------------------------
       チケット表示
    ----------------------------------------------- */

    const active =
      slides[current];


    if (!active) {

      return;

    }


    const number =
      String(current + 1)
        .padStart(2, "0");


    const status =
      active.querySelector(
        ".showing-state span"
      );


    if (status && ticket) {

      ticket.textContent =
        `${status.textContent} / ${number}`;

    }


    /* -----------------------------------------------
       ポスターが中央に来てから
       キャラクターを飛び出させる
    ----------------------------------------------- */

    window.setTimeout(
      () => {


        /*
          待っている間に別作品へ移動した場合は
          飛び出さない。
        */

        if (

          slides[current] !== active ||

          !active.classList.contains(
            "is-center"
          )

        ) {

          return;

        }


        popCharacters(
          active,
          current
        );


      },
      260
    );

  }


  /* =======================================================
     MOVE
  ======================================================= */

  function move(direction) {

    current =
      (
        current +
        direction +
        slides.length
      ) % slides.length;


    render();

  }


  /* =======================================================
     LEFT ARROW
  ======================================================= */

  if (left) {

    left.addEventListener(
      "click",
      () => {

        move(-1);

      }
    );

  }


  /* =======================================================
     RIGHT ARROW
  ======================================================= */

  if (right) {

    right.addEventListener(
      "click",
      () => {

        move(1);

      }
    );

  }


  /* =======================================================
     POSTER CLICK
  ======================================================= */

  slides.forEach(
    (slide, index) => {


      const button =
        slide.querySelector(
          ".poster-button"
        );


      if (!button) {

        return;

      }


      button.addEventListener(
        "click",
        () => {


          /*
            中央ではない作品をクリック
            ↓
            まず中央へ移動。
          */

          if (index !== current) {

            current =
              index;


            render();


            return;

          }


          /*
            中央作品をクリック
            ↓
            作品ページへ。
          */

          const link =
            slide.dataset.link;


          if (link) {

            window.location.href =
              link;

          }

        }
      );

    }
  );


  /* =======================================================
     RESIZE
  ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      positionTrack();

    }
  );


  /* =======================================================
     INITIALIZE
  ======================================================= */

  render();


  /* =======================================================
     GENRE ICON SPIN
  ======================================================= */

  /*
    GAME / ANIMATION / ILLUSTRATION の
    アイコン画像を操作。

    マウスを乗せる
      ↓
    少し大きくなる

    マウスを離す
      ↓
    1回転する
  */


  const genreItems =
    document.querySelectorAll(
      ".model-item"
    );


  genreItems.forEach(
    (item) => {


      const icon =
        item.querySelector(
          ".genre-icon"
        );


      if (!icon) {

        return;

      }


      /* -----------------------------------------------
         マウスが入った時
      ----------------------------------------------- */

      item.addEventListener(
        "mouseenter",
        () => {


          /*
            回転中に再び入った場合は
            回転をリセット。
          */

          icon.classList.remove(
            "spin-on-leave"
          );

        }
      );


      /* -----------------------------------------------
         マウスが離れた時
      ----------------------------------------------- */

      item.addEventListener(
        "mouseleave",
        () => {


          /*
            一度クラスを外してから付け直すことで、
            何度マウスを離しても毎回
            アニメーションが最初から再生される。
          */

          icon.classList.remove(
            "spin-on-leave"
          );


          void icon.offsetWidth;


          icon.classList.add(
            "spin-on-leave"
          );

        }
      );


      /* -----------------------------------------------
         回転終了
      ----------------------------------------------- */

      icon.addEventListener(
        "animationend",
        () => {


          /*
            アニメーション終了後にクラスを外す。

            次にマウスを離した時も
            ちゃんと1回転できるようにする。
          */

          icon.classList.remove(
            "spin-on-leave"
          );

        }
      );

    }
  );


  /* =======================================================
     ABOUT / COMMISSION SCROLL ANIMATION
  ======================================================= */

  const aboutSection =
    document.querySelector(
      ".home-link-section:not(.commission-home)"
    );


  const commissionSection =
    document.querySelector(
      ".home-link-section.commission-home"
    );


  /* =======================================================
     INTERSECTION OBSERVER
  ======================================================= */

  const sectionObserver =
    new IntersectionObserver(

      (entries) => {


        entries.forEach(
          (entry) => {


            /*
              画面に入った
              ↓
              アニメーション開始

              画面から離れた
              ↓
              クラスを外して元の位置へ戻す

              そのため、もう一度スクロールしてくると
              毎回アニメーションが再生される。
            */

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "scroll-visible"
              );

            } else {

              entry.target.classList.remove(
                "scroll-visible"
              );

            }

          }
        );

      },

      {

        /*
          セクションが少し見えた時点で発動
        */

        threshold: 0.2

      }

    );


  /* =======================================================
     OBSERVE
  ======================================================= */

  if (aboutSection) {

    sectionObserver.observe(
      aboutSection
    );

  }


  if (commissionSection) {

    sectionObserver.observe(
      commissionSection
    );

  }


})();
/* =========================================================
   MOBILE HEADER MENU
========================================================= */

document.addEventListener("click", (event) => {

  const button = event.target.closest(".menu-toggle");

  if (!button) return;

  const header = button.closest(".site-header");

  if (!header) return;

  const isOpen = header.classList.toggle("menu-open");

  button.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );

  button.setAttribute(
    "aria-label",
    isOpen ? "メニューを閉じる" : "メニューを開く"
  );

});


document.addEventListener("click", (event) => {

  const link = event.target.closest(".mobile-nav a");

  if (!link) return;

  const header = link.closest(".site-header");

  if (!header) return;

  header.classList.remove("menu-open");

  const button = header.querySelector(".menu-toggle");

  if (button) {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "メニューを開く");
  }

});