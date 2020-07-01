Vue.component('message', {
    // props: ['type', 'message'],
    props: {
        type : {type: String, default: 'success'},
        message: String,
    },
    template: `<div class="alert" :class="type" role="alert">
    <i class="close icon" @click.prevent="close"></i>
    <div class="header"> {{ header }}</div>
    {{ message }}
    </div>`,
    methods: {
        close() {
            this.$emit('close');
        }
    }
})

Vue.filter('capitalize', function(value) {
    return value.toUpperCase();
})

const supercapitalize = function(value, prefix, suffix) {
    return prefix + value.toUpperCase() + suffix;
}

const supermessage = {
    props: {
        type : {type: String, default: 'success'},
        message: String,
        header: String,
    },
    template: `<div class="alert" :class="type" role="alert">{{ message }}</div>`
}


const counter = {
    data: function () {
        return {
            count : 0
        }
    },
    props: {
        start: {type: Number, default:0}
    },
    computed: {
        total: function () {
            return this.start + this.count;
        }
    },
    methods : {
        increment : function () {this.count++}
    },
    template : `<div>
        <button @click="increment">{{ total }}</button>
    </div>`
}

const formUser = {
    methods: {
        save() {
            this.$emit('input', this.user);
        }
    },
    template: `
    <form @submit.prevent="save">
        <p><slot name="header"></slot></p>
        <div class="form-group">
            <label for="">Prénom</label>
            <input type="text" v-model="user.firstname">
        </div>
        <div class="form-group">
            <label for="">Nom</label>
            <input type="text" v-model="user.lastname">
        </div>
        <button type="submit">Soumettre</button>
        <p><slot name="footer"></slot></p>
    </form>`,
    props: {
        value: Object,
    },
    data () {
        return {
            user: JSON.parse(JSON.stringify(this.value))
        }
    }
}


const vue = new Vue({
    el: '#app',
    data : {
        message: "salut les gens",
        link: "https://websiteofmarcpartensky.herokuapp.com",
        success: true,
        persons: ['marc', 'paul', 'alexandre', 'samy', 'arnaud', 'valentin' ],
        seconds: 0,
        firstname: 'marc',
        lastname: 'partensky',
        alert: false,
        user: {
            firstname: "marc",
            lastname: "partensky"
        }
    },
    components: {
        supermessage,
        counter,
        formUser,
    },
    filters: {
        supercapitalize
    },
    methods: { // methods for all data
        change: function () { // both getter and setter
            this.success = !this.success;
        },
        mounted: function () { // called when the app is mounted (see vuejs lifecycle)
            this.$interval = setInterval(() => {
                this.seconds++;
            }, 1000)
            console.log(this.seconds)
        },
        destroyed: function () { // called when the app is destroyed (see vuejs lifecycle)
            clearInterval(this.$interval);
        },
        showAlert() {
            this.alert = true;
        },
        hideAlert() {
            this.alert = false;
        }
    },
    computed: { // methods for specific data (more efficient)
        cls: function() { // compute only deals with getters by default
           console.log('cls called');
           return this.success === true ? 'success' : 'error';
        },
        fullname: { // but can deal with both getter and setter
            get: function  () {
                return this.firstname + ' ' + this.lastname;
            },
            set: function (value) {
                let parts = value.split(' ');
                this.firstname = parts[0];
                this.lastname = parts[1];
            }
        }
    },
    watch: { // watch for modifications
        firstname: function(value) {
            console.log("j'ai watch ça:", value);
        }
    }
})