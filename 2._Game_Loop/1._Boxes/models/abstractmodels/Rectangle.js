class Rectangle {
    getArea() {
        return this.width * this.height;
    }

    resize(i) {
        this.width += i;
        this.height += i;
    }
}