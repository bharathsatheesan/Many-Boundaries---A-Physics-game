class Ground {
    constructor(x, y, w, h){
        var options = {
            isStatic : true,
            density : 15
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
        rectMode(CENTER);
        fill("green");
        rect(position.x, position.y, this.w, this.h);
        pop();
    }
}