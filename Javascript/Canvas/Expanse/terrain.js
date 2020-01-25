class Terrain {
  /*
  * The purpose of the terrain is to assign to each point in space an id of
  * block so that it can display itself no matter where it is generated.
  * It uses a casemap to make assignments.
  */
  constructor(blockmap, frequency=1/20, seed=Math.floor(10**10*Math.random())) {
    this.blockmap = blockmap;
    this.frequency = frequency;
    this.seed = seed;
  }
  showRaw(context, xmin, ymin, xmax, ymax) {
    for (let x=xmin; x<xmax; x++) {
      for (let y=ymin; y<ymax; y++) {
          this.showBlock(context,x,y,1,1);
      }
    }
  }
  showBlock(context, x, y, w, h) {
    this.generate(...this.getEnvironment(x, y)).show(context, x, y, w, h);
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
  generate(height, temperature, humidity) {

  }

}
