class Img {
    constructor (src, startRow, startColumn, width, height, rows, columns, speed) {
        this.source = new Image()
        this.source.src = src;
        //start of animation
        this.startRow = startRow;
        this.startColumn = startColumn;
        //length of animation
        this.rows = rows;
        this.columns = columns;
        //current position
        this.currentRow = startRow;
        this.currentColumn = startColumn;
        //size
        this.width = width;
        this.height = height;
        //speed higher number means slower
        this.speed = speed;
        this.currentSpeed = 0;
    }

    draw (ctx, x, y) {
        let startWidth = this.startColumn + this.currentColumn * this.width;
        let startHeight = this.startRow + this.currentRow * this.height;
        this.currentSpeed++;
        if (this.currentSpeed === this.speed) {
            this.currentColumn++;
            this.currentSpeed = 0;
        }
        if (this.currentColumn > this.columns) {
            this.currentColumn = this.startColumn;
            this.currentRow++;
            if (this.currentRow > this.rows){
                this.currentRow = this.startRow;
            }
        }
        ctx.drawImage(this.source, startWidth, startHeight, this.width, this.height, x, y, this.width, this.height);
    }
}