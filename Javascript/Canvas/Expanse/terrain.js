class Terrain {
  /*
  * The purpose of the terrain is to assign to each point in space an id of
  * block so that it can display itself no matter where it is generated.
  * It uses a casemap to make assignments.
  */
  constructor(
    blocks=[],
    biomes=[],
    frequency=1/20,
    seed=Math.floor(10**10*Math.random()),
    mg=1/10,
  ) {
    this.blocks = blocks;
    this.biomes = biomes;
    this.frequency = frequency;
    this.seed = seed;
    this.mg = mg;
  }
  showRaw(context, xmin, ymin, xmax, ymax) {
    for (let x=xmin; x<xmax; x++) {
      for (let y=ymin; y<ymax; y++) {
          this.showBlock(context,x,y,1,1);
      }
    }
  }
  show(context, t=57) {
    let [xmin, ymin] = context.plane.fromScreen(new Vector(-context.width/2, -context.height/2)).floor();
    let [xmax, ymax] = context.plane.fromScreen(new Vector(context.width/2, context.height/2)).floor();
    xmin-=1; ymin-=1;
    xmax+=1; ymax+=1;
    for (let x=xmin; x<xmax; x++) {
      for (let y=ymin; y<ymax; y++) {
        this.showBlock(context, x, y);
      }
    }
  }
  showBlock(context, x, y, w=1, h=1, t=0) {
    // this.generate(...this.getEnvironment(x, y)).show(context, x, y, w, h);
    this.getBlock(x, y, w, h).show(context, x, y, w+this.mg, h+this.mg, 0); // might be more efficient in the future
  }
  perlin(x, y, n=3) {
    let v = new Vector();
    for (let i=0; i<n; i++) {
      v.push(noise.perlin2(x*this.frequency+this.seed**10%(10**i), y*this.frequency+this.seed**10%(10**i)));
    }
    return v;
  }
  generate(x, y) {
    return this.perlin(x,y).closestIndex(this.blocks.map(block => block.environment));;
  }
  getBlock(x, y) {
    return this.blocks[this.generate(x, y)];
  }
  /*
  * Return an environment given a position.
  */
  getEnvironment(x, y, n=3, k=1) {
    let a = Array(n);
    for (let i=0; i<n; i++) {
      a[i] = (noise.perlin2(x*this.frequency*k**i+this.seed, y*this.frequency*k**i+this.seed)+1)/2
    }
    return a;
  }
  /*
  * Return a case given the environment.
  */
}
