//access canvas element
const canvas = document.getElementById("canvas");
//context
const ctx = canvas.getContext("2d");

let score = 0;
draw();

function draw(){
    //clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw a circle
    ctx.beginPath();
    ctx.arc(200, 402, 100, 0, 2 * Math.PI);
    ctx.fillStyle = "#B3DDD1";
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#80BEAF';
    ctx.stroke();

    //draw a straight line
    ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 200);
    ctx.lineWidth = 5;
    // set line color
    ctx.strokeStyle = '#EE9C6C';
    ctx.stroke();

    //draw triangle
    ctx.beginPath();
    ctx.moveTo(200,200);
    ctx.lineTo(300,300);
    ctx.lineTo(100,300);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#F5B994";
    ctx.fill();

    /*document.addEventListener("keydown", logKey);
    function logKey(e){
        if (e.code.match("Key([WSDA])")){
            console.log(e.code[3]);
        }
    }*/

    //score in upper right corner
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.fillText("Score: " + score, canvas.width,50);
    //printScore(score);
}

window.addEventListener("keydown", ({key}) => {
    if (key.match(/^[WSDA]$/i)){
        console.log(key);
        score++;  
        draw();  
        //printScore(score);
    }
});

/*function printScore(score){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText("Score: " + score, canvas.width,50);
}*/

/*
    switch (e.code) {
        case "KeyW":
            console.log("W");
            break;
        case "KeyS":
            console.log("S");
            break;
        case "KeyD":
            console.log("D");
            break;
        case "KeyA":
            console.log("A");
            break;
    }
}*/