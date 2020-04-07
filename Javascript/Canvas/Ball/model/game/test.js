class Test {
    f() {
        console.log(typeof this);
    }
}

t = new Test()
t.f()