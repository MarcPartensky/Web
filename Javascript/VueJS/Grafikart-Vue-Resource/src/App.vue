<template>
  <div id="app">
    <div class="container" style="text-align:center; margin: 5rem" v-if="loading">
      <div class="spinner-grow" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="container" v-if="!loading">
      <div class="row" style="margin: 2rem;" v-for="(user, id) in users" v-bind:key="id">
        <div class="ui card">
          <div class="content" style="text-align:center">
            <div class="header">
              <input type="text" v-model="user.name" style="width:100%">
            </div>
            <div class="meta">
              <a>Friends</a>
              <div class="description">
                {{ user.address.street }}<br>
                {{ user.address.zipcode }} {{ user.address.city }} <br>
              </div>
            </div>
            <div class="container" style="font-size: 0.5rem; text-align:center; padding:0.01rem">
              <div class="btn-group">
                <button type="button" class="alert alert-primary" @click="save(user)">Modifier</button>
                <button type="button" class="alert alert-warning" @click="destroy(user)">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      users: []
    }
  },
  mounted () {
    this.$user = this.$resource('users/{/id}')
    this.$user.query()
      .then(
        response => {
          this.users = response.data
          console.log('succès', response)
        },
        response => {
          console.log('erreur', response)
        })
  },
  methods: {
    save (user) {
      this.loading = true
      this.$user.update({id: user.id}, {name: user.name}).then(
        response => {
          this.users = response.data
          console.log('succès', response)
        },
        response => {
          console.log('erreur', response)
        })
        .then(_ => {
          this.loading = false
        })
    },
    destroy (user) {
      this.loading = true
      this.$user.remove({id: user.id}).then(
        response => {
          this.users = this.users.filter(u => u !== user)
          console.log('succès', response)
        },
        response => {
          console.log('erreur', response)
        })
        .then(_ => {
          this.loading = false
        })
    }
  }
}
</script>
