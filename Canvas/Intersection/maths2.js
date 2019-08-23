var canvas = document.querySelector("canvas");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c=canvas.getContext('2d');

var cross= function(l1,l2) { //y=a1*x+b1 and y=a2*x+b2
  x=(l2.b-l1.b)/(l1.a-l2.a);
  y=(l1.a*x+l1.b);
  return [x,y];
}


function Point(x,y,radius=5,color="white") {
  this.x=x;
  this.y=y;
  this.color=color;
  this.radius=radius;
  this.draw = function() {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.strokeStyle=this.color;
    c.stroke();
    c.fill();
  }
}

function Line(p1,p2,color="white") { //y=ax+b => b=y-ax
  this.a=(p2.y-p1.y)/(p2.x-p1.x);
  this.b=p1.y-this.a*p1.x;
  this.color=color;
  this.draw = function() {
    x1=0;
    y1=this.b;
    x2=canvas.width;
    y2=canvas.width*this.a+this.b;
    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.strokeStyle=this.color;
    c.stroke();
  }
}

function Segment(p1,p2,color="white") { //y=ax+b => b=y-ax
  this.x=[min(p1.x,p2.x),max(p1.x,p2.x)]
  this.y=[min(p1.y,p2.y),max(p1.y,p2.y)]
  this.a=(p2.y-p1.y)/(p1.x-p2.x);
  this.b=p1.y-this.a*p1.x;
  this.color=color;
  this.draw = function() {
    x1=0;
    y1=this.b1;
    x2=canvas.width;
    y2=canvas.width*this.a+this.b;
    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.strokeStyle=this.color;
    c.stroke();
  }
}

function Vector(x,y,color="white") {
  this.x=x;
  this.y=y;
  this.norm=Math.sqrt(this.x**2+this.y**2);
  if      (this.x>0) {this.angle=Math.atan(this.y/this.x);}
  else if (this.x<0) {this.angle=Math.atan(this.y/this.x)+Math.PI;}
  else               {this.angle=0;}

  this.apply=function(p){
    p.x=p.x+this.x;
    p.y=p.y+this.y;
  }
  this.project=function(p) {

  }
  this.crossProduct=function(v) {
    return v.x*this.x+v.y*this.y;
  }
  this.draw=function() {

  }
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



var reverse=new Vector(0,-1);
var center=new Vector(canvas.width/2,canvas.height/2);



//alert(l1.a);
//alert(l2.a);

center.apply(p1);
center.apply(p2);
center.apply(p3);
center.apply(p4);

var l1=new Line(p1,p4);
var l2=new Line(p2,p3);




function Main(){
  c.clearRect(0,0,canvas.width,canvas.height);
  l1.draw();
  l2.draw();
  requestAnimationFrame(Main);
}

Main();
