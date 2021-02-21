const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let lastTime;
const requiredElapsed = 1000 / 30; //30 fps

const distance = 10;

//SPRITES
//money sprite
const money = new Image();
money.src  = "./assets/MonedaD.png";
let goldMoneyImg = new Img(money, 0, 0, 0, 4, 5, 16, 16, 50, 50);
let goldMoneyImg2 = new Img(money, 0, 0, 0, 4, 5, 16, 16, 100, 100);
let goldMoneyImg3 = new Img(money, 0, 0, 0, 4, 5, 16, 16, 150, 150);

//character sprite
const bard = new Image();
bard.src  = "./assets/bard.png";
const spriteWidth = 32;
const spriteHeight = 32;
let bardDownImg = new Img(bard, 0, 1, 0, 1, 3, spriteWidth, spriteHeight);
let bardLeftImg = new Img(bard, 1, 0, 0, 2, 3, spriteWidth, spriteHeight);
let bardRightImg = new Img(bard, 2, 0, 0, 2, 3, spriteWidth, spriteHeight);
let bardUpImg = new Img(bard, 3, 0, 0, 2, 3, spriteWidth, spriteHeight);

//character
let character = new Character(bardDownImg, spriteWidth, spriteHeight, canvas.width/2, canvas.height/2);

//array of objects
let gameObjects = [];
gameObjects.push(goldMoneyImg, goldMoneyImg2, character, goldMoneyImg3);

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
    character.source.startColumn = 1;
    character.source.columns = 1;
}

function move(e){
    switch (e.key) {
        case "w":
        case "w":
            character.source = bardUpImg;
            character.y -= distance;
            break;
        case "s":
        case "S":
            character.source = bardDownImg;
            character.y += distance;
            break;
        case "d":
        case "D":
            character.source = bardRightImg;
            character.x += distance;
            break;
        case "a":
        case "A":
            character.source = bardLeftImg;
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
    character.source.startColumn = 0;
    character.source.columns = 2;
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
        detectCollisions();
        drawBackground();
        for (const gameObject of gameObjects) {
            if (gameObject.isColliding && !gameObject.source){
                gameObjects.splice(gameObjects.indexOf(gameObject), 1);
            }
            drawImage(gameObject);
        }
    }
}

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawImage(img){
    img.draw(ctx);
}

function detectCollisions(){
    let obj1;
    let obj2;

    // Reset collision state of all objects
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].isColliding = false;
    }

    // Start checking for collisions
    for (let i = 0; i < gameObjects.length; i++) {
        obj1 = gameObjects[i];

        for (let j = i + 1; j < gameObjects.length; j++)
        {
            obj2 = gameObjects[j];

            // Compare object1 with object2
            if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
                obj1.isColliding = true;
                obj2.isColliding = true;
            }
        }
    }
}

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    // Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        return false;
    }
    return true;
}