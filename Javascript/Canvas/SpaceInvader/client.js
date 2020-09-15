console.log('salut')
import Tensor from '../libs/tensor.js';
import Vector from '../libs/vector.js';
import Matrix from '../libs/matrix.js';
import Motion from '../libs/motion.js';
import Body from '../libs/body.js';

import Point from '../libs/point.js';
import Figure from '../libs/figure.js';
import Form from '../libs/form.js';
import BasePolygon from '../libs/basepolygon.js';
import Square from '../libs/square.js';
import Rectangle from '../libs/rectangle.js';
import Segment from '../libs/segment.js';
import Polygon from '../libs/polygon.js';

import Group from '../libs/group.js';

var canvas = document.getElementById("canvas");

var context = new ContextAdapter(canvas.getContext("2d"));


context.width = canvas.width = window.innerWidth;
context.height = canvas.height = window.innerHeight;

context.plane.units.position = new Vector(0.2, 0.2);

var game = Game.random();
