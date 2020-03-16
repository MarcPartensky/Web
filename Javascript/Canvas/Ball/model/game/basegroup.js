class BaseGroup extends Group {
    show(context) {
        this.forEach(e => e.show(context));
    }
}


class ActiveGroup extends BaseGroup {
    update(dt) {
        this.forEach(e => e.update(dt));
    }
}