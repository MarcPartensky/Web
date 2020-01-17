class Matrix {
  constructor(...args) {
    if (args[0] instanceof Array && args.length==1) {
      this.array = args[0];
    } else {
      this.array = Array(...args);
    }
  }

}
