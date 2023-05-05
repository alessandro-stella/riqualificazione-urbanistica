console.log("Starting script...");

const canvas = document.querySelector(".initialCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 177;

const currentFrame = (folder, index) =>
    `./${folder}/frame${(index + 1).toString()}.jpg`;

const enteringScene = [];
let enteringSceneFrame = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame("enteringScene", i);
    enteringScene.push(img);
}

gsap.to(enteringSceneFrame, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: 0.5,
        pin: "canvas",
        end: "300%",
    },
    onUpdate: renderEntering,
});

gsap.fromTo(
    ".pageTitleInner",
    { opacity: 0 },
    {
        opacity: 1,
        scrollTrigger: {
            trigger: ".pageTitleInner",
            start: "50% bottom",
        },
    }
);

enteringScene[0].onload = renderEntering;

function renderEntering() {
    context.canvas.width = enteringScene[0].width;
    context.canvas.height = enteringScene[0].height;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(enteringScene[enteringSceneFrame.frame], 0, 0);
}
