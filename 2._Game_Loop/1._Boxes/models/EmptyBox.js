//class called EmptyBox
//takes x and y in constructor

class EmptyBox extends Rectangle {
    constructor(x, y, width, height) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}