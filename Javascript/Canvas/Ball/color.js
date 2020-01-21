/*
* Color namespace.
*/
var Color = {
  /*
  * Return a random color.
  */
  random: function() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i=0; i<6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  /*
  * Create a vector using a color.
  */
  toVector: function(color) {
    const letters = '0123456789ABCDEF';
    let components = [];
    for (let i=0; i<3; i++) {
      let a = letters.indexOf(color[2*i+1]);
      let b = letters.indexOf(color[2*i+2]);
      components.push(a*16+b);
    }
    return new Vector(components);
  },
  /*
  * Create a color using a vector.
  */
  fromVector: function(vector) {
    const letters = '0123456789ABCDEF';
    let v = vector.floor();
    let color = "#";
    for (let i=0; i<3; i++) {
      let b = v[i]%16;
      let a = (v[i]-b)/16;
      color += letters[a];
      color += letters[b];
    }
    return color;
  },

  /*
  * Mix the given colors together.
  */
  mix: function(...colors) {
    let vectors = colors.map(Color.toVector);
    let vector = Vector.average(...vectors);
    return Color.fromVector(vector);
  },
  /*
  * Ligthen a given color using some k factor which must be between 0 and 1.
  */
  lighten: function(color, k=0.5) {
    let v = Color.toVector(color);
    let m = new Vector(255, 255, 255);
    let d = m.sub(v);
    d.imul(k);
    v.iadd(d);
    return Color.fromVector(v);
  },
  /*
  * Ligthen a given color using some k factor which must be between 0 and 1.
  */
  darken: function(color, k=0.5) {
    let v = Color.toVector(color);
    let d = Vector.copy(v);
    d.imul(k);
    v.isub(d);
    return Color.fromVector(v);
  },
}
