/*const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");*/

// module aliases
const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: "blue",
        wireframes: false,
        showMouseIndicator: false
    }
});

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
        render: {
            visible: false
        }
    }
})

World.add(engine.world, mouseConstraint);

// create two boxes and a ground
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const ground = Bodies.rectangle(window.innerWidth/2, 610, window.innerWidth, 60, { isStatic: true });

for (let i = 0; i < 300; i++) {
    World.add(engine.world, Bodies.rectangle(random(0, window.innerWidth),random(0, 610),random(0, window.innerWidth/10),random(0, window.innerHeight/10)));
}

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

/*document.addEventListener("load", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})*/

function random(min, max) {
    if (min > max) {
        let temp = min;
        min = max;
        max = temp;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}