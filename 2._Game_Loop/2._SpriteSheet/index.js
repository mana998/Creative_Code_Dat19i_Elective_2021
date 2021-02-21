const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let lastTime;
const requiredElapsed = 1000 / 30; //30 fps

const distance = 10;

//SPRITES
//money sprite
const money = new Image();
money.src  = "./assets/MonedaD.png";
let goldMoneyImg = new Img(money, 0, 0, 16, 16, 0, 4, 5);
//character sprite
const bard = new Image();
bard.src  = "./assets/bard.png";
const spriteWidth = 32;
const spriteHeight = 32;
let bardDownImg = new Img(bard, 0, 1, spriteWidth, spriteHeight, 0, 1, 3);
let bardLeftImg = new Img(bard, 1, 0, spriteWidth, spriteHeight, 0, 2, 3);
let bardRightImg = new Img(bard, 2, 0, spriteWidth, spriteHeight, 0, 2, 3);
let bardUpImg = new Img(bard, 3, 0, spriteWidth, spriteHeight, 0, 2, 3);

//character
let character = new Character(bardDownImg, canvas.width/2, canvas.height/2);

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

window.addEventListener("keydown", move);

window.addEventListener("keyup", stop);

function stop(e){
    character.src.startColumn = 1;
    character.src.columns = 1;
}

function move(e){
    switch (e.key) {
        case "w":
        case "w":
            character.src = bardUpImg;
            character.y -= distance;
            break;
        case "s":
        case "S":
            character.src = bardDownImg;
            character.y += distance;
            break;
        case "d":
        case "D":
            character.src = bardRightImg;
            character.x += distance;
            break;
        case "a":
        case "A":
            character.src = bardLeftImg;
            character.x -= distance;
            break;
    }
    if (character.y < 0 - spriteHeight/2) {
        character.y = canvas.height - spriteHeight/2;
    } else if (character.y > canvas.height - spriteHeight/2){
        character.y = 0 - spriteHeight/2;
    } else if (character.x < 0 - spriteWidth/2){
        character.x = canvas.width - spriteWidth/2;
    } else if (character.x > canvas.width - spriteWidth/2){
        character.x = 0 - spriteWidth/2;
    }
    character.src.startColumn = 0;
    character.src.columns = 2;
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
        drawImage(character.src, character.x, character.y);
        drawImage(goldMoneyImg, 50, 50);
    }
}

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawImage(img, x, y){
    img.draw(ctx, x, y);
}