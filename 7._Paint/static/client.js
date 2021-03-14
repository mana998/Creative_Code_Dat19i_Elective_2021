const socket = io();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorElement = document.getElementById("color");
const sizeElement = document.getElementById("size");
const outputElement = document.getElementById("output");

let clientPaint = {
    color : "black",
    size : 10,
    drawing : false,
    server : false
}

window.addEventListener("load",
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
);

colorElement.addEventListener("change",
    () => {
        clientPaint.color = colorElement.value;    
    }
)

sizeElement.addEventListener("input",
    () => {
        clientPaint.size = sizeElement.value;    
        outputElement.innerHTML = sizeElement.value;  
    }
)

/*window.addEventListener("resize",
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
);*/

socket.on("other client stop", (data) => {
    data.paint.x *= window.innerWidth;
    data.paint.y *= window.innerHeight;
    ctx.moveTo(data.paint.x, data.paint.y);
    ctx.beginPath();
})

socket.on("other client draw", (data) => {
    data.paint.x *= window.innerWidth;
    data.paint.y *= window.innerHeight;
    draw(data.event, data.paint);
})

function startDrawing(e) {
    ctx.moveTo(e.clientX, e.clientY);
    ctx.beginPath();
    clientPaint.drawing = true;
    draw(e);
}

function stopDrawing(e, paint) {
    paint = paint || clientPaint;
    clientPaint.drawing = false;
    ctx.beginPath();
    if (!paint.server) {
        paint.x = e.clientX / window.innerWidth;
        paint.y = e.clientY / window.innerHeight;
        socket.emit("client stop", {paint: paint})
    }
}

function draw(e, paint) {
    paint = paint || clientPaint;
    if (paint.x && paint.y) {
        e.clientX = paint.x;
        e.clientY = paint.y;
    }
    if (!paint.drawing) return;
    ctx.lineWidth = paint.size;
    ctx.lineCap = "round";
    ctx.strokeStyle = paint.color;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    paint.x = e.clientX / window.innerWidth;
    paint.y = e.clientY / window.innerHeight;
    if (!paint.server) socket.emit("client draw", {event: e, paint: paint})
}

canvas.addEventListener("mousedown", startDrawing)
canvas.addEventListener("mouseup", stopDrawing)
canvas.addEventListener("mousemove", draw);