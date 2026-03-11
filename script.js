let moralityPoints = 0;
let influencePoints = 0;
let index = 0;

let textBox = document.getElementById("mainText");
let speakerName = document.getElementById("speakerName");
let background = document.getElementById("background");

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
    {
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
        bg: "images/dining_hall.jpg",
        spriteVisible: false,
        text: "Here we are. The real reason Birkin and I are senior researchers at Umbrella."
    },
    {
        speaker: "Wesker",
        bg: "images/dining_hall.jpg",
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
        bg: "images/dining_hall.jpg",
        text: "...Either way, the future of Umbrella lies in our hands now."
    }
];


const sprite = document.getElementById("characterSprite");
const spriteContainer = sprite.parentElement;

function renderScene() {
  let scene = story[index];
  if (scene.choice) { showChoices(scene); return; }

  speakerName.innerText = scene.speaker;
  background.src = scene.bg;

  if (scene.spriteVisible && scene.sprite) {
    sprite.src = scene.sprite;
    spriteContainer.classList.remove("hidden");
  } else if (scene.spriteVisible === false) {
    spriteContainer.classList.add("hidden");
  }

  textBox.innerText = scene.text;
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