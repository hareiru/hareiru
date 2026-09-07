document.addEventListener("DOMContentLoaded", () => {

  const choices = Array.from(
    document.querySelectorAll(".game-choice")
  );

  const visualItems = Array.from(
    document.querySelectorAll(".game-visual-item")
  );

  const prevButton =
    document.getElementById("gamePrev");

  const nextButton =
    document.getElementById("gameNext");

  const screenNumber =
    document.getElementById("screenNumber");

  const screenStatus =
    document.getElementById("screenStatus");

  const screenMessage =
    document.getElementById("screenMessage");

  const infoTitle =
    document.getElementById("infoTitle");

  const infoType =
    document.getElementById("infoType");

  const infoStatus =
    document.getElementById("infoStatus");

  const gameStart =
    document.getElementById("gameStart");

  const startText =
    document.getElementById("startText");


  /*
   * =========================================================
   * BGM / GAME AUDIO
  ========================================================== */

  const bgmToggle =
    document.getElementById("bgmToggle");

  const bgmText =
    document.getElementById("bgmText");


  /*
   * =========================================================
   * GAME DATA
  ========================================================== */

  const games = [

    {
      id: "demonisity",

      title: "デモニシティの冒険",

      number: "01",

      type: "ADVENTURE",

      status: "PLAYABLE",

      screenStatus: "● PLAYABLE",

      screenMessage: "INSERT COIN",

      startText: "START",

      url: "https://www.freem.ne.jp/win/game/32931"
    },


    {
      id: "rabbit",

      title: "RAPID RABBIT",

      number: "02",

      type: "ACTION GAME",

      status: "ARCHIVE",

      screenStatus: "● ARCHIVE",

      screenMessage: "TOKYO GAME DUNGEON 10",

      startText: "TGD10",

      url: "https://gamedungeon.jp/events/tokyo10/exhibit_informations?day=1&floor=3%E9%9A%8E#132"
    },


    {
      id: "lanedy",

      title: "LANEDY",

      number: "03",

      type: "GAME",

      status: "IN DEVELOPMENT",

      screenStatus: "● IN DEVELOPMENT",

      screenMessage: "COMING SOON",

      startText: "COMING SOON",

      url: null
    }

  ];


  let currentIndex = 0;


  /*
   * =========================================================
   * VIDEO CONTROL
  ========================================================== */

  const videos = Array.from(
    document.querySelectorAll(".game-video")
  );


  /*
   * =========================================================
   * AUDIO STATE
  ========================================================== */

  let audioEnabled = false;


  /*
   * 最初は全動画をミュート
   */

  videos.forEach((video) => {
    video.muted = true;
  });


  /*
   * =========================================================
   * UPDATE AUDIO BUTTON
  ========================================================== */

  function updateAudioButton() {

    if (!bgmToggle || !bgmText) {
      return;
    }

    if (audioEnabled) {

      bgmText.textContent = "ON";

      bgmToggle.classList.add(
        "is-on"
      );

      bgmToggle.setAttribute(
        "aria-pressed",
        "true"
      );

    } else {

      bgmText.textContent = "OFF";

      bgmToggle.classList.remove(
        "is-on"
      );

      bgmToggle.setAttribute(
        "aria-pressed",
        "false"
      );

    }

  }


  /*
   * =========================================================
   * SET AUDIO
  ========================================================== */

  function setAudioEnabled(enabled) {

    audioEnabled = enabled;


    /*
     * 全動画を一旦ミュート
     */

    videos.forEach((video) => {
      video.muted = true;
    });


    /*
     * ONなら現在選択中の動画だけ音声ON
     */

    if (audioEnabled) {

      const currentGame =
        games[currentIndex];

      videos.forEach((video) => {

        const visualItem =
          video.closest(".game-visual-item");

        if (!visualItem) {
          return;
        }

        const isActive =
          visualItem.dataset.game ===
          currentGame.id;

        if (isActive) {
          video.muted = false;
        }

      });

    }


    updateAudioButton();

  }


  /*
   * =========================================================
   * AUDIO BUTTON CLICK
  ========================================================== */

  if (bgmToggle) {

    bgmToggle.addEventListener(
      "click",
      () => {

        setAudioEnabled(
          !audioEnabled
        );

      }
    );

  }


  /*
   * =========================================================
   * UPDATE GAME
  ========================================================== */

  function updateGame(index) {

    currentIndex = index;

    const game = games[currentIndex];


    /*
     * GAME LIST
     */

    choices.forEach((choice, choiceIndex) => {

      choice.classList.toggle(
        "is-active",
        choiceIndex === currentIndex
      );

    });


    /*
     * VISUAL
     */

    visualItems.forEach((item) => {

      const isActive =
        item.dataset.game === game.id;

      item.classList.toggle(
        "is-active",
        isActive
      );

    });


    /*
     * SCREEN NUMBER
     */

    screenNumber.textContent =
      game.number;


    /*
     * SCREEN STATUS
     */

    screenStatus.textContent =
      game.screenStatus;


    /*
     * SCREEN MESSAGE
     */

    screenMessage.textContent =
      game.screenMessage;


    /*
     * INFO
     */

    infoTitle.textContent =
      game.title;

    infoType.textContent =
      game.type;

    infoStatus.textContent =
      game.status;


    /*
     * START BUTTON
     */

    if (game.url) {

      gameStart.href =
        game.url;

      gameStart.target =
        "_blank";

      gameStart.rel =
        "noopener noreferrer";

      gameStart.classList.remove(
        "is-disabled"
      );

    } else {

      gameStart.removeAttribute("href");

      gameStart.removeAttribute("target");

      gameStart.removeAttribute("rel");

      gameStart.classList.add(
        "is-disabled"
      );

    }


    startText.textContent =
      game.startText;


    /*
     * =======================================================
     * VIDEO CONTROL
     * =======================================================
     */

    videos.forEach((video) => {

      const visualItem =
        video.closest(".game-visual-item");

      if (!visualItem) {
        return;
      }


      const isActive =
        visualItem.dataset.game === game.id;


      if (isActive) {

        video.muted =
          !audioEnabled;

        video.currentTime = 0;

        const playPromise =
          video.play();

        if (
          playPromise !== undefined
        ) {

          playPromise.catch(() => {
            /*
             * ブラウザ側で再生が
             * ブロックされた場合は何もしない
             */
          });

        }

      } else {

        video.pause();

        video.currentTime = 0;

        video.muted = true;

      }

    });

  }


  /*
   * =========================================================
   * CHOICE CLICK
  ========================================================== */

  choices.forEach((choice, index) => {

    choice.addEventListener(
      "click",
      () => {

        updateGame(index);

      }
    );

  });


  /*
   * =========================================================
   * PREVIOUS
  ========================================================== */

  if (prevButton) {

    prevButton.addEventListener(
      "click",
      () => {

        const nextIndex =
          (currentIndex - 1 + games.length)
          % games.length;

        updateGame(nextIndex);

      }
    );

  }


  /*
   * =========================================================
   * NEXT
  ========================================================== */

  if (nextButton) {

    nextButton.addEventListener(
      "click",
      () => {

        const nextIndex =
          (currentIndex + 1)
          % games.length;

        updateGame(nextIndex);

      }
    );

  }


  /*
   * =========================================================
   * KEYBOARD
  ========================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "ArrowUp"
      ) {

        event.preventDefault();

        const nextIndex =
          (currentIndex - 1 + games.length)
          % games.length;

        updateGame(nextIndex);

      }


      if (
        event.key === "ArrowDown"
      ) {

        event.preventDefault();

        const nextIndex =
          (currentIndex + 1)
          % games.length;

        updateGame(nextIndex);

      }

    }
  );


  /*
   * =========================================================
   * INITIAL
   * ========================================================== */

  updateAudioButton();


  /*
   * URLからゲームを取得
   *
   * game.html
   * → デモニシティ
   *
   * game.html?game=demonisity
   * → デモニシティ
   *
   * game.html?game=rabbit
   * → RAPID RABBIT
   *
   * game.html?game=lanedy
   * → LANEDY
   */

  const params =
    new URLSearchParams(
      window.location.search
    );

  const gameId =
    params.get("game");


  const urlGameIndex =
    games.findIndex(
      (game) => game.id === gameId
    );


  if (urlGameIndex !== -1) {

    updateGame(urlGameIndex);

  } else {

    updateGame(0);

  }

});