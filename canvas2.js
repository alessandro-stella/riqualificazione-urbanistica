console.log("Starting script...");

const canvas = document.querySelector(".initialCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 534;
let imageLoaded = 0;
let imageToLoad = 603;

const currentFrame = (folder, index) =>
    `./${folder}/frame${(index + 1).toString()}.png`;

function createImage(src) {
    const img = new Image();

    img.src = src;

    img.onload = function () {
        imageLoaded++;

        if (imageLoaded == imageToLoad) {
            const hideContent = document.getElementById("hide-content");
            const initialAnimationContainer =
                document.getElementById("initialAnimation");

            initialAnimationContainer.classList.remove("stopScroll");
            hideContent.classList.add("hidden");
        }
    };

    return img;
}

function addFrames(index, end = false) {
    let imagesToAdd = [];

    for (let i = 0; i <= 9; i++) {
        const img = createImage(
            `./compressedResult/frame${index.toString()}-${i * 10}.png`
        );

        imagesToAdd.push(img.cloneNode());
        imagesToAdd.push(img.cloneNode());
    }

    const fullText = createImage(
        `./compressedResult/frame${index.toString()}-100.png`
    );

    for (let i = 0; i < 30; i++) {
        imagesToAdd.push(fullText.cloneNode());
    }

    if (!end)
        for (let i = 9; i >= 0; i--) {
            const img = createImage(
                `./compressedResult/frame${index.toString()}-${i * 10}.png`
            );

            imagesToAdd.push(img.cloneNode());
            imagesToAdd.push(img.cloneNode());
        }

    enteringScene = [...enteringScene, ...imagesToAdd];
}

let enteringScene = [];
let enteringSceneFrame = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
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
            const img = createImage(currentFrame("compressedResult", i));
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
