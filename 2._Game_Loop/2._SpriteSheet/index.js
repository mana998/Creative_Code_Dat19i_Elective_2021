const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let lastTime;
const requiredElapsed = 1000 / 30; //30 fps

let moneyImg = new Img("./assets/MonedaD.png", 0, 0, 16, 16, 0, 4, 5);

window.addEventListener("load",
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        /*moneyImg.onload = () => {
            setup();
        }*/
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

document.addEventListener("keypress", logKey);

function logKey(e){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    switch (e.code) {
        case "KeyW":
            y -= 30;
            ctx.fillRect(x,y,30,30);
            break;
        case "KeyS":
            y += 30;
            ctx.fillRect(x,y,30,30);
            break;
        case "KeyD":
            x += 30;
            ctx.fillRect(x,y,30,30);
            break;
        case "KeyA":
            x -= 30;
            ctx.fillRect(x,y,30,30);
            break;
    }
}

function setup(){
    draw();
}

function draw(now){
                //img, startx, starty, width, height, posx, posy,  new width, new height
    //ctx.drawImage(moneyImg, 64, 0, 16, 16, 0, 0, 16, 16);
    requestAnimationFrame(draw);
    if (!lastTime) {
        lastTime = now;
    }
    const elapsed = now - lastTime;
    if (elapsed > requiredElapsed) {
        drawBackground();
        moneyImg.draw(ctx, 50, 50);
    }
}

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}