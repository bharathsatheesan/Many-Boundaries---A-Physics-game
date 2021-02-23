class Hurler{
    constructor(bodyA, pointB){
        var options = {
            bodyA : bodyA,
            pointB : pointB,
            stiffness : 0.04
        }
        this.pointB = pointB;
        this.hurler = Constraint.create(options);
        World.add(world, this.hurler);
    }

    attach(body){
        this.hurler.bodyA = body;
    }
    
    fly(){
        this.hurler.bodyA = null;
    }

    display(){
        if(this.hurler.bodyA){
            push();
            var pointB = this.pointB;
            var pointA = this.hurler.bodyA.position;
            strokeWeight(10);
            line(pointA.x, pointA.y, pointB.x, pointB.y);
            pop(); 
        }       
    }
}