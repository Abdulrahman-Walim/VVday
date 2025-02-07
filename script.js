const canvas = document.getElementById('valentineCanvas');
const ctx = canvas.getContext('2d');
const backgroundMusic = document.getElementById('backgroundMusic');
const playMusicButton = document.getElementById('playMusicButton');
const gifContainer = document.getElementById('gifContainer');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isYesClicked = false;

// Show the play music button initially
playMusicButton.style.display = 'block';

playMusicButton.addEventListener('click', () => {
    backgroundMusic.play();
    playMusicButton.style.display = 'none';
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isYesClicked) {
        const img = new Image();
        img.src = 'placeholder.jpg'; // Ensure this image path is correct
        img.onload = () => {
            ctx.drawImage(img, (canvas.width - 200) / 2, (canvas.height - 200) / 2, 200, 200);
            ctx.font = '24px Arial';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText('WILL YOU BE MY VALENTINE FOREVER?', canvas.width / 2, (canvas.height / 2) + 130);
            drawButtons(); // Draw buttons after the image
        };
    } else {
        ctx.font = '48px "Great Vibes", cursive';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText('I love you Rawan. You are the best thing that ever happened to me', canvas.width / 2, canvas.height / 2);
    }
}

function drawButtons() {
    ctx.fillStyle = 'pink';
    ctx.fillRect(yesButton.x, yesButton.y, yesButton.width, yesButton.height);
    ctx.fillRect(noButton.x, noButton.y, noButton.width, noButton.height);

    ctx.fillStyle = 'black';
    ctx.fillText('YES', yesButton.x + yesButton.width / 2, yesButton.y + yesButton.height / 2 + 8);
    ctx.fillText('NO', noButton.x + noButton.width / 2, noButton.y + noButton.height / 2 + 8);
}

let yesButton = { x: canvas.width / 2 - 60, y: (canvas.height / 2) + 160, width: 100, height: 40 };
let noButton = { x: canvas.width / 2 + 60, y: (canvas.height / 2) + 160, width: 100, height: 40 };

canvas.addEventListener('click', (event) => {
    if (isYesClicked) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (mouseX > yesButton.x && mouseX < yesButton.x + yesButton.width &&
        mouseY > yesButton.y && mouseY < yesButton.y + yesButton.height) {
        isYesClicked = true;
        playMusicButton.classList.remove('hidden'); // Show Play Music button
        gifContainer.classList.remove('hidden'); // Show animated GIFs
        
        // Hide the buttons and draw the love message
        yesButton = { x: -100, y: -100, width: 0, height: 0 }; // Move off-screen
        noButton = { x: -100, y: -100, width: 0, height: 0 }; // Move off-screen
        draw(); // Update the canvas to show the love message
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isYesClicked) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (mouseX > noButton.x && mouseX < noButton.x + noButton.width &&
        mouseY > noButton.y && mouseY < noButton.y + noButton.height) {
        moveNoButton();
    }
});

function moveNoButton() {
    noButton.x = Math.random() * (canvas.width - noButton.width);
    noButton.y = Math.random() * (canvas.height - noButton.height);
    draw();
}

// Initial draw
draw();