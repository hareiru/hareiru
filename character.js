/* =========================================================
   HAREIRU
   CHARACTER PAGE
========================================================= */

const characters = [
  {
    name: "らびぃ",
    work: "RAPID RABBIT",
    image: "images/character/rabby.png",
    affiliation: "解体屋",
    cv: "くるみ",
    quote: "「らびぃより速いヤツいないの～？？」",
    description:
      "子どもっぽい性格。気分で行動する。感情に素直。表情豊かで、好奇心旺盛。不安定な一面も。",
    link: "game.html?game=rabbit"
  },

  {
    name: "東雅",
    work: "RAPID RABBIT",
    image: "images/character/toga.png",
    affiliation: "解体屋",
    cv: "佐藤小織",
    quote: "「砂糖と塩…。大体同じね。」",
    description:
      "しっかり者に見えるが、おっちょこちょいで天然。天才エンジニアだが、家事や書類整理ができない。",
    link: "game.html?game=rabbit"
  },

  {
    name: "ナギ",
    work: "ZENNOU",
    image: "images/character/nagi.png",
    affiliation: "レシーバー",
    cv: "白露むゆゆ",
    quote: "「きっと大丈夫。私がみんなを連れて帰ってくるよ」",
    description:
      "レシーバーに選ばれた、めんどくさがりやの普通の女子高生。救えなかった親友に再会し、希望を取り戻す。クールに見えるが、決めたことに対して諦めが悪い。自分より人を優先して行動できる優しい子。",
    link: "animation.html"
  },

  {
    name: "リノ",
    work: "ZENNOU",
    image: "images/character/rino.png",
    affiliation: "ZENNOU管理局",
    cv: "ルカ-Luca-",
    quote: "「久しぶりだね、ナギ。」",
    description:
      "バグの行方不明から生還した、たった一人の少女。ナギと同級生。おとなしいが、どこか冷静で頭脳明晰。記憶がなく脳も動いていないがナギとは会話できる。",
    link: "animation.html"
  },

  {
    name: "白ナギ",
    work: "ZENNOU",
    image: "images/character/white-nagi.png",
    affiliation: "？？？",
    cv: "滝沢いたち",
    quote: "「私は世界が変わる瞬間を見てみたいのかもしれない」",
    description:
      "違う世界のナギ。高頻度のバグによって歪んだ時空からやってきた。第三者目線で冷たい。しかし正義感が強いというナギらしさはある。",
    link: "animation.html"
  }
];


/* =========================================================
   ELEMENTS
========================================================= */

const image =
  document.getElementById("characterImage");

const work =
  document.getElementById("characterWork");

const name =
  document.getElementById("characterName");

const quote =
  document.getElementById("characterQuote");

const affiliation =
  document.getElementById("characterAffiliation");

const cv =
  document.getElementById("characterCv");

const description =
  document.getElementById("characterDescription");

const workLink =
  document.getElementById("characterWorkLink");

const workLinkText =
  document.getElementById("characterWorkLinkText");

const dataNumber =
  document.getElementById("characterDataNumber");

const imageNumber =
  document.getElementById("characterImageNumber");

const selectedNumber =
  document.getElementById("selectedNumber");

const scan =
  document.getElementById("characterScan");

const options =
  document.querySelectorAll(".character-option");


/* =========================================================
   CURRENT INDEX
========================================================= */

let currentIndex = 0;


/* =========================================================
   SELECT CHARACTER
========================================================= */

function selectCharacter(index) {

  if (
    index < 0 ||
    index >= characters.length
  ) {
    return;
  }


  const character =
    characters[index];

  currentIndex = index;


  /* -----------------------------------------
     IMAGE OUT
  ----------------------------------------- */

  image.classList.remove(
    "is-entering"
  );

  image.classList.add(
    "is-changing"
  );


  /* -----------------------------------------
     SCAN EFFECT
  ----------------------------------------- */

  scan.classList.remove(
    "is-active"
  );

  void scan.offsetWidth;

  scan.classList.add(
    "is-active"
  );


  /* -----------------------------------------
     CHANGE DATA
  ----------------------------------------- */

  setTimeout(() => {

    /* IMAGE */

    image.src =
      character.image;

    image.alt =
      character.name;


    /* BASIC INFO */

    work.textContent =
      character.work;

    name.textContent =
      character.name;

    quote.textContent =
      character.quote;

    affiliation.textContent =
      character.affiliation;

    cv.textContent =
      character.cv;

    description.textContent =
      character.description;


    /* RELATED WORK */

    workLink.href =
      character.link;

    if (workLinkText) {

      workLinkText.textContent =
        character.work;

    }


    /* -----------------------------------------
       IMAGE ENTER
    ----------------------------------------- */

    image.classList.remove(
      "is-changing"
    );

    void image.offsetWidth;

    image.classList.add(
      "is-entering"
    );


    /* -----------------------------------------
       NUMBER
    ----------------------------------------- */

    const number =
      String(index + 1)
        .padStart(2, "0");

    dataNumber.textContent =
      `DATA ${number} / 05`;

    imageNumber.textContent =
      number;

    selectedNumber.textContent =
      number;


    /* -----------------------------------------
       SELECTOR
    ----------------------------------------- */

    options.forEach(
      (option, optionIndex) => {

        option.classList.toggle(
          "is-selected",
          optionIndex === index
        );

      }
    );

  }, 180);

}


/* =========================================================
   CHARACTER BUTTONS
========================================================= */

options.forEach((option) => {

  option.addEventListener(
    "click",
    () => {

      const index =
        Number(
          option.dataset.index
        );

      selectCharacter(index);

    }
  );

});


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "ArrowRight"
    ) {

      selectCharacter(
        (currentIndex + 1)
        % characters.length
      );

    }


    if (
      event.key === "ArrowLeft"
    ) {

      selectCharacter(
        (currentIndex - 1
          + characters.length)
        % characters.length
      );

    }

  }
);


/* =========================================================
   IMAGE LOAD ERROR
========================================================= */

image.addEventListener(
  "error",
  () => {

    console.warn(
      "Character image could not be loaded:",
      image.src
    );

  }
);


/* =========================================================
   INITIAL STATE
========================================================= */

selectCharacter(0);