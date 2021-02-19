//access canvas element
const canvas = document.getElementById("canvas");
//context
const ctx = canvas.getContext("2d");
//npx budo index.js --live

let x = 0;
let y = 0;
let lastTime;
const requiredElapsed = 1000 / 66.667; //15 fps

window.addEventListener("load",
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setup();
        console.log("Hello");
    }
);

window.addEventListener("resize",
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log("Hello2");
    }
);

function setup() {
    draw();
}

function draw(now) {
    requestAnimationFrame(draw);
    if (!lastTime) {
        lastTime = now;
    }
    const elapsed = now - lastTime;
    if (elapsed > requiredElapsed) {
        ctx.fillStyle = "lightblue";
        ctx.fillRect(0, 0 ,canvas.width, canvas.height);
        if (x < canvas.width && y === 0){
            x++;
        } else if (x === canvas.width && y < canvas.height){
            y++;
        } else if (x > 0 && y === canvas.height){
            x--;
        } else if (x === 0 && y <= canvas.height){
            y--;
        }
        drawCircle(x, y);
        lastTime = now;
    }  
}

function drawCircle(x, y,){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}