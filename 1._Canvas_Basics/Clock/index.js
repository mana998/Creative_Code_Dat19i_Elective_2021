const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


window.addEventListener("load",
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setup();
        setInterval(setup, 1000);
        console.log("Hello");
    }
);

function setup(){
    let now = new Date();
    let hour = now.getHours().toString(2);
    //console.log(hour);
    let minute = now.getMinutes().toString(2);
    let second = now.getSeconds().toString(2);
    showTime(hour, 200, 200);
    showTime(minute, 200, 250);
    showTime(second, 200, 300);
}

function showTime(time, x, y){
    for (let i = 0; i < time.length; i++){
        drawCircle(x,y, time[i]==1 ? "lightblue" : "darkblue");
        x += 20;
    }
}

function drawCircle(x,y, color){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}