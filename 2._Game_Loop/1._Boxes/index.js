//access canvas element
const canvas = document.getElementById("canvas");
//context
const ctx = canvas.getContext("2d");
//npx budo index.js --live

let x = 0;
let y = 0;
let lastTime;
const requiredElapsed = 1000 / 15; //15 fps

let firstBox;
let fullBox;
let resize = 1;

window.addEventListener("load",
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setup();
    }
);

window.addEventListener("resize",
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setup();
    }
);

function setup() {
    firstBox = new EmptyBox(canvas.width/4 , canvas.height/4, canvas.width/2, canvas.height/2);
    fullBox = new FillBox(canvas.width/3 , canvas.height/3, canvas.width/3, canvas.height/3);
    //console.log(firstBox.getArea());
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
        //console.log("X ", eb.x, "Y", eb.y);
        firstBox.draw(ctx);
        fullBox.draw(ctx);
        lastTime = now;
    }  
}

function drawCircle(x, y,){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
}