const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let rect1 = {x: 0, y: 0, width: 50, height: 50, color: "red"}
let rect2 = {x: 25, y: 25, width: 50, height: 50, color: "blue"}

function draw(){
    
}

draw();

window.addEventListener("load",
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
);

window.addEventListener("resize",
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
);

window.addEventListener("mousemove", (event) => {
    ctx.clearRect(0, 0 ,canvas.width, canvas.height);
    rect1.x = event.clientX;
    rect1.y = event.clientY;
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
            rect1.color = "green";
            rect2.color = "yellow";
     } else {
         rect1.color = "red";
         rect2.color = "blue";
     }

    drawSquare(rect1);
    drawSquare(rect2);
});

function drawSquare(square) {
    ctx.fillStyle = square.color;
    ctx.fillRect(square.x - (square.width/2), square.y - (square.height/2), square.width, square.height);
}