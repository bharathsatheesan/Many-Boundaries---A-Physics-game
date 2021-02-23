class Ball{
    constructor(x, y, r){
        var options = {
            density : 2,
            friction : 8,
            isStatic : true
        }
        this.body = Bodies.circle(x, y, r, options);
        this.x = x;
        this.y = y;
        this.r = r;
        World.add(world, this.body)
    }

    display(){
        push();
        var position = this.body.position;
        translate(position.x, position.y);
        ellipseMode(CENTER);
        fill("#CBEA68");
        ellipse(0, 0, this.r*2, this.r*2);
        pop();

        push();
        var angle = this.body.angle;
        translate(this.body.position.x, this.body.position.y);
        rotate(angle*75);
        line(15, 0, this.r-30, this.r-15);
        pop();
    }
}