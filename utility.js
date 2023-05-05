
function changeMap() {
    const carousel = document.getElementById("carousel");

    carousel.classList.toggle("map1");
    carousel.classList.toggle("map2");
}

function changeProblem(goNext) {
    const currentImage = document.getElementById("problemi");
    const currentIndex =
        +currentImage.classList[1][currentImage.classList[1].length - 1];

    console.log({ currentIndex });

    let newIndex;

    if (goNext) {
        newIndex = currentIndex + 1;

        if (newIndex > 4) {
            newIndex = 1;
        }
    } else {
        newIndex = currentIndex - 1;

        if (newIndex < 1) {
            newIndex = 4;
        }
    }

    currentImage.classList.remove(currentImage.classList[1]);
    currentImage.classList.add(`criticita${newIndex}`);
}
