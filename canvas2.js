console.log("Starting script...");

const canvas = document.querySelector(".initialCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 534;

const currentFrame = (folder, index) =>
    `./${folder}/frame${(index + 1).toString()}.png`;

function addFrames(index, end = false) {
    console.log(end);
    let imagesToAdd = [];

    for (let i = 0; i <= 9; i++) {
        const img = new Image();
        img.src = `./compressedResult/frame${index.toString()}-${i * 10}.png`;
        imagesToAdd.push(img);
        imagesToAdd.push(img);
    }

    const fullText = new Image();
    fullText.src = `./compressedResult/frame${index.toString()}-100.png`;
    imagesToAdd.push(fullText);
    imagesToAdd.push(fullText);
    imagesToAdd.push(fullText);
    imagesToAdd.push(fullText);
    imagesToAdd.push(fullText);

    if (!end)
        for (let i = 9; i >= 0; i--) {
            const img = new Image();
            img.src = `./compressedResult/frame${index.toString()}-${
                i * 10
            }.png`;
            console.log(`frame${index.toString()}-${i * 10}`);
            imagesToAdd.push(img);
            imagesToAdd.push(img);
        }

    enteringScene = [...enteringScene, ...imagesToAdd];
}

let enteringScene = [];
let enteringSceneFrame = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
    const img = new Image();

    switch (i + 1) {
        case 230:
            addFrames(i + 1);
            break;

        case 330:
            addFrames(i + 1);
            break;

        case 420:
            addFrames(i + 1);
            break;

        case 534:
            addFrames(i + 1, true);
            break;

        default:
            img.src = currentFrame("compressedResult", i);
            enteringScene.push(img);
            break;
    }
}

gsap.to(enteringSceneFrame, {
    frame: enteringScene.length - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: 0.5,
        pin: "canvas",
        end: "1500%",
    },
    onUpdate: renderEntering,
});

enteringScene[0].onload = renderEntering;

function renderEntering() {
    context.canvas.width = enteringScene[0].width;
    context.canvas.height = enteringScene[0].height;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(enteringScene[enteringSceneFrame.frame], 0, 0);
}
