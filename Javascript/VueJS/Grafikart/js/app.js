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