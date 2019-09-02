var canvas = document.querySelector("canvas");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');

var cross= function(line1,line2) { //y=a1*x+b1 and y=a2*x+b2
  a1=line1.slope;
  a2=line2.slope;
  b1=line1.intercept;
  b2=line2.intercept;
  x=(b2-b1)/(a1-a2);
  y=(a1*x+b1);
  return (x,y);
}


function Point(x,y,radius=5,color="white") {
  this.position=[x,y];
  this.color=color;
  this.radius=radius;
  this.draw = function() {
    c.beginPath();
    c.arc(this.position[0],this.position[1],this.radius,0,Math.PI*2,false);
    c.strokeStyle=this.color;
    c.stroke();
    c.fill();
  }
}

function Line(point1,point2,color="white") { //y=ax+b => b=y-ax
  x1=point1.position[0];
  y1=point1.position[1];
  x2=point2.position[0];
  y2=point2.position[1];
  this.slope=(y2-y1)/(x1-x2);
  this.intercept=y1-this.slope*x1;
  this.color=color;
  this.draw = function() {
    x1=0;
    y1=this.intercept;
    x2=canvas.width;
    y2=canvas.width*this.slope+this.intercept;
    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.strokeStyle=this.color;
    c.stroke();
  }
}

function Vector(point1,point2,color="white") {
  this.x=point2.x-point1.x
}


var mouse={
  x:undefined,
  y:undefined
}


window.addEventListener("mousemove",
  function(event) {
    mouse.x=event.x;
    mouse.y=event.y;
  }
)


var p1=new Point(0,0);
var p2=new Point(0,1);
var p3=new Point(1,0);
var p4=new Point(1,1);


var l1=new Line(p1,p4);
var l2=new Line(p2,p3);



alert(l1.slope);
alert(l2.slope);



function Main(){
  c.clearRect(0,0,canvas.width,canvas.height);
  l1.draw();
  l2.draw();
  requestAnimationFrame(Main);
}

Main()
