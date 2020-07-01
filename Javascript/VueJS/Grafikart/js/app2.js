class NotificationStore {
    constructor() {
        this.state = {
            count: 0
        }
    }
    increment() {
        this.state.count ++;
    }

    decrement() {
        this.state.count--;
    }
}


const notification_store = new NotificationStore();

const counter = {
    data: function() {
        return {
            state: notification_store.state
        }
    },
    template: `<button @click="increment">{{ count }}</button>`,
    computed: {
        count() {
            return this.state.count;
        }
    },
    methods: {
        increment() {
            notification_store.increment();
        }
    }
}

const notifications = {
    components: {counter},
    template: `<div>
        <counter></counter>
        <button @click="addNotification">Incrémenter</button>
    </div>`,
    methods: {
        addNotification() {
            notification_store.increment();
        }
    }

}

new Vue({
    el: '#app',
    data: {
        
    },
    components: {notifications, counter},
})