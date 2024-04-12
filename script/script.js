let playerPosition;
let imagesOnMap = [];
let currentDisplayedImage;
let gameStarted = false;
let gameEnded = false;
let katterCounter = 0;


function startGame() {
    placeImagesOnMap();
    gameStarted = true;
    playerPosition = Math.floor(Math.random() * 25); 
    checkPosition();
    changeImage();
    drawMap();
    gameEnded = false;
    katterCounter = 0;
    livCounter = 3;
    updateCounters();
}

function placeImagesOnMap() {
    let images = [
        { src: "images/almost.jpg", description: "snart där..." },
        { src: "images/forest.jpg", description: "Du befinner dig i en skog någonstans.." },
        { src: "images/scaryman.gif", description: "Creepy va?😲" },
        { src: "images/zombie.gif", description: "Neeeeej nu blev du tagen av en Zombie!👿👹" },
        { src: "images/autumn.jpg", description: "Höst är ju mysigt" },
        { src: "images/avenue.jpg", description: "Ser du en katt där borta?🧐" },
        { src: "images/ballong.jpg", description: "Tror du katterna flyger?" },
        { src: "images/bats.gif", description: "Oj, nu väckte du fladdermössen!" },
        { src: "images/buu.jpg", description: "BUUU!!!!👻👻" },
        { src: "images/cat.gif", description: "Grattis, du hittade en katt!🐱" },
        { src: "images/elephant.jpg", description: "Elefanten kanske skyddar en katt.." },
        { src: "images/ghost.jpg", description: "Akta bakom dig!!" },
        { src: "images/graveyard.jpg", description: "Här vill man helst inte hamna..." },
        { src: "images/halloween.gif", description: "I den här farten hittar du aldrig någon katt! hahaha" },
        { src: "images/hus.gif", description: "Är det en katt där inne i huset kanske?" },
        { src: "images/kanin.gif", description: "Gulliiii😍" },
        { src: "images/lykta.gif", description: "Kusligt värre.." },
        { src: "images/mountain.jpg", description: "Vackert😇" },
        { src: "images/nature.jpg", description: "Känner du lugnet?😎" },
        { src: "images/ocean.jpg", description: "Katterna kanske finns i en annan värld.." },
        { src: "images/rain.gif", description: "Hör du regnet?" },
        { src: "images/ruin.jpg", description: "Akta dig!" },
        { src: "images/trees.jpg", description: "Ser du ljuset?" },
        { src: "images/vår.gif", description: "Lite vårkänsla här va?" },
        { src: "images/woman.jpg", description: "du är på rätt väg.." }
    ];

    imagesOnMap = images.slice().sort(() => Math.random() - 0.5);
}

function changeImage() {

    currentDisplayedImage = imagesOnMap[playerPosition].src;
    document.getElementById('game-image').src = currentDisplayedImage;
    document.getElementById('platsbeskrivning').textContent = imagesOnMap[playerPosition].description;

}


function drawMap() {
    let map = document.getElementById('spelplan');
    map.innerHTML = '';

    let gridSize = 5;
    let count = 0;

    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement('div');
        for (let j = 0; j < gridSize; j++) {
            let position = document.createElement('span');
            if (count === playerPosition) {
                position.textContent = 'X';
            } else {
                position.textContent = 'O';
            }
            row.appendChild(position);
            count++;
        }
        map.appendChild(row);
    }
}

document.getElementById('start').addEventListener('click', startGame);
document.getElementById('norr').addEventListener('click', moveNorth);
document.getElementById('syd').addEventListener('click', moveSouth);
document.getElementById('väst').addEventListener('click', moveWest);
document.getElementById('öst').addEventListener('click', moveEast);


function moveNorth() {
    if (!gameEnded && playerPosition >= 5) {
        playerPosition -= 5; // Flyttar spelaren uppåt
        drawMap();
        changeImage();
        checkPosition();
    }
}

function moveSouth() {
    if (!gameEnded && playerPosition < 20) {
        playerPosition += 5; // Flyttar spelaren nedåt
        drawMap();
        changeImage();
        checkPosition();
    }
}

function moveWest() {
    if (!gameEnded && playerPosition % 5 !== 0) {
        playerPosition--; // Flyttar spelaren åt väst
        drawMap();
        changeImage();
        checkPosition();
    }
}

function moveEast() {
    if (!gameEnded && (playerPosition + 1) % 5 !== 0) {
        playerPosition++; // Flyttar spelaren åt öst
        drawMap();
        changeImage();
        checkPosition();
    }
}

function checkPosition() {
    currentImage = currentDisplayedImage;
    katterText = document.getElementById('katter-counter');
    livText = document.getElementById('liv-counter');

    if (currentImage === "images/cat.gif") {
        katterCounter++;
        katterText.textContent = katterCounter;
        document.getElementById('platsbeskrivning').textContent = imagesOnMap[playerPosition].description;
        placeImagesOnMap();

    } else if (currentImage === "images/zombie.gif") {
        livCounter--;
        livText.textContent = livCounter;
        document.getElementById('platsbeskrivning').textContent = imagesOnMap[playerPosition].description;
        placeImagesOnMap();

        if (livCounter === 0) {
            document.getElementById('platsbeskrivning').textContent = "Spelet är över. Du har har blivit tagen av zombien 3 gånger 😭☠️.";
            gameEnded = true;
            disableNav();

            setTimeout(function () {
                showRestartButton();
                fetchChuckNorrisJoke();
            }, 4000);
        }

    } else {
        document.getElementById('platsbeskrivning').textContent = imagesOnMap[playerPosition].description;

    }
    checkWin();
}


function showRestartButton() {
    let restartButton = document.getElementById('start');
    restartButton.value = "Starta om spelet";
    restartButton.removeEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);

}

function fetchChuckNorrisJoke() {
    const url = 'https://api.api-ninjas.com/v1/chucknorris';
    const apiKey = 'MMTe829VUDKb7goClTw07Q==nDIU2HjHQOvinwXP';

    fetch(url, {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (result) {

            document.getElementById('platsbeskrivning').textContent = result.joke;
            console.log(result.joke);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}

function checkWin() {
    if (katterCounter === 5 && livCounter > 0) {
        gameEnded = true;
        document.getElementById('game-image').src = "images/partycat.gif";
        document.getElementById('platsbeskrivning').textContent = "Grattis du har hittat alla katter, nu är det fest!";
        showRestartButton();
    }
 
}

function disableNav()
{
    document.getElementById('norr').disabled = true;
    document.getElementById('syd').disabled = true;
    document.getElementById('väst').disabled = true;
    document.getElementById('öst').disabled = true;
}


function restartGame() {
    location.reload();
}


function updateCounters() {
    document.getElementById('katter-counter').textContent = katterCounter;
    document.getElementById('liv-counter').textContent = livCounter;
}