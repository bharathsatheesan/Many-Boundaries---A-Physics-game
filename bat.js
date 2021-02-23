class Bat {
    constructor(x, y, w, h) {
        var options = {
            restitution : 1,
            density : 4,
            isStatic : true
        }
        this.body = Bodies.rectangle(x, y, w, h, options);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        World.add(world, this.body);
    }

    display() {
        push();
        var position = this.body.position;
        translate(position.x, position.y);
        rectMode(CENTER);
        fill("grey");
        rect(0, 0, this.w, this.h);
        pop();
    }
}