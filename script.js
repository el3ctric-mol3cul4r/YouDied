let moralityPoints = 0;
let influencePoints = 0;
let index = 0;

let textBox = document.getElementById("mainText");
let speakerName = document.getElementById("speakerName");
let background = document.getElementById("background");
let sceneCrest = document.getElementById("crest");

let hintLine = document.getElementById("hintText");
let extraLine = document.getElementById("extraText");

let b1 = document.getElementById("option1");
let b2 = document.getElementById("option2");
let nextButton = document.getElementById("next");

hintLine.setAttribute("hidden", "hidden");
extraLine.setAttribute("hidden", "hidden");
b1.setAttribute("hidden", "hidden");
b2.setAttribute("hidden", "hidden");

const story = [
    // Chapter 1
    {
        chapter: 1,
        speaker: "James Marcus",
        bg: "images/mpscene0.jpg",
        sprite: "sprites/JamesMarcus.jpg",  
        spriteVisible: true,
        text: "As the co-founder of Umbrella, I couldn't help but notice how you two excelled at the Umbrella Executive Training Center."
    },
    {
        speaker: "James Marcus",
        bg: "images/mpscene0.jpg",
        text: "The entire class was lackluster apart from you two. As they say, 'Everyone else is so much chaff!'"
    },
    {
        speaker: "James Marcus",
        bg: "images/mpscene0.jpg",
        text: "I look forward to working with you two at the prestigious Arklay Laboratory."
    },
    {
        speaker: "Wesker",
        bg: "images/marcusdesk.jpg",
        spriteVisible: false,
        text: "Here we are. The real reason Birkin and I are senior researchers at Umbrella."
    },
    {
        speaker: "Wesker",
        bg: "images/marcusdesk.jpg",
        sprite: "assets/research.jpg",  
        spriteVisible: true,
        text: "James Marcus's research. He wouldn't suspect his star pupils..."
    },
    {
        speaker: "Wesker",
        bg: "images/marcusdesk.jpg",
        text: "Damn fool."
    },
    {
        speaker: "Wesker",
        bg: "images/marcusdesk.jpg",
        hint: "Hint: The choice you make influence your endings, but you cannot see how.",
        text: "Should I steal Marcus's research? It's right there..."
    },
    {
        choice: true,
        options: [
            {
                text: "Yes, it would benefit the T-virus research.",
                effect: () => { influencePoints++; console.log("Influence:", influencePoints); }
            },
            {
                text: "No.",
                effect: () => { moralityPoints++; console.log("Morality:", moralityPoints); }
            }
        ]
    },
    {
        speaker: "Wesker",
        bg: "images/marcusdesk.jpg",
        spriteVisible: false,
        text: "Umbrella is damn corrupt. Especially Spencer."
    },
    {
        speaker: "Wesker",
        bg: "images/marcusdesk.jpg",
        extra: "Note: Oswell E. Spencer, the co-founder of Umbrella, hired Wesker and Birkin on behalf of them being spies. He is paranoid to say the least…",
        text: "Can’t believe he would do that to his own colleague.."
    },
    {
        speaker: "Wesker",
        bg: "images/marcusdesk.jpg",
        text: "...Either way, the future of Umbrella lies in our hands now."
    },
    {
        speaker: "",
        bg: "images/marcusdesk.jpg",
        text: "End of chapter 1."
    }

    // Chapter 2
];


const sprite = document.getElementById("characterSprite");
const spriteContainer = sprite.parentElement;

function renderScene() {
  let scene = story[index];
  if (scene.choice) { showChoices(scene); return; }

  if (scene.chapter) {
    sceneCrest.innerText = `✦ Chapter ${scene.chapter} ✦`;
  }

  speakerName.innerText = scene.speaker;
  background.src = scene.bg;

  if (scene.spriteVisible && scene.sprite) {
    sprite.src = scene.sprite;
    spriteContainer.classList.remove("hidden");
  } else if (scene.spriteVisible === false) {
    spriteContainer.classList.add("hidden");
  }

  textBox.innerText = scene.text;
  showHint(scene);
  showExtra(scene);    
}

nextButton.onclick = function () {
    index++;
    if (index >= story.length) {
        textBox.innerText = "End.";
        speakerName.innerText = "";
        nextButton.disabled = true;
        return;
    }
    renderScene();
};

function showChoices(scene) {
    nextButton.setAttribute("hidden", "hidden");
    b1.removeAttribute("hidden");
    b2.removeAttribute("hidden");

    b1.innerText = scene.options[0].text;
    b2.innerText = scene.options[1].text;

    b1.onclick = function () {
        scene.options[0].effect();
        continueStory();
    };
    b2.onclick = function () {
        scene.options[1].effect();
        continueStory();
    };
}

function showHint(scene) {
    if (scene.hint) {
        hintLine.removeAttribute("hidden");
        hintLine.innerText = scene.hint;
    } else {
        hintLine.setAttribute("hidden", "hidden");
    }
}

function showExtra(scene) {
    if (scene.extra) {
        extraLine.removeAttribute("hidden");
        extraLine.innerText = scene.extra;
    } else {
        extraLine.setAttribute("hidden", "hidden");
    }
}

function continueStory() {
    b1.setAttribute("hidden", "hidden");
    b2.setAttribute("hidden", "hidden");
    nextButton.removeAttribute("hidden");

    index++;
    

    if (index >= story.length) {
        textBox.innerText = "End.";
        speakerName.innerText = "";
        nextButton.disabled = true;
        return;
    }

    renderScene();
}

renderScene();