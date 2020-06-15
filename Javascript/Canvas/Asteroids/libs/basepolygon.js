class BasePolygon extends Figure {
    constructor(color, lineWidth, fill) {
        super();
        this.color = color;
        this.lineWidth = lineWidth;
        this.fill = fill;
    }
    get points() {
        throw "A base polygon must have a points getter."
    }
    set points(pts) {
        throw "A base polygon must have a points setter."
    }
    translate(vector) {
        throw "A base polygon must have a translate method."
    }
    move(...vector) {
        this.translate(Vector.from(vector));
    }
    get length() {
        return this.points.length;
    }
    show(ctx) {
        if (this.fill) {
            ctx.fillStyle = this.color;
        } else {
            ctx.strokeStyle = this.color;
        }
        if (this.lineWidth) {
            ctx.lineWidth = this.lineWidth;
        }
        const points = this.points;
        ctx.beginPath();
        ctx.moveTo(...points[points.length-1]);
        for (const pt of points) {
            ctx.lineTo(...pt);
        }
        ctx.closePath();
        if (this.fill) {
            ctx.fill();
        } else {
            ctx.stroke();
        }
    }
    get center() {
        return Point.average(...this.points);
    }
    set center(point) {
        const v = point.sub(this.center)
        this.translate(v);
    }
    get segments() {
        const segments = [];
        const points = this.points;
        const p = points[0];
        for (const pi of points) {
            segments.push(new Segment(p, pi));
        }
        return segments;
      }
    set segments(segs) {
        // this is naive mapping,
        //because the information is redundant
        this.points = segs.map(s => s.p1);
    }
    showPoints(ctx) {
        for (const point of this.points) {
            point.show(ctx);
        }
    }
    showSegments(ctx) {
        for (const segment of this.segments) {
            segment.show(ctx);
        }
    }
    get area() {
        
    }
    get perimeter() {
        return Math.sum(this.segments.map(s => s.length));
    }
    contains(point) {
        // make a segment which must cross the polygon.
        // then check if it crosses.
        const s = new Segment(point, point.radd(0, this.perimeter))


    }

}