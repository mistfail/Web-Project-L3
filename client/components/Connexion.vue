<template>
  <form  id="user" @submit="signin">
    <h2>Se connecter</h2>
    <div>
      <label for="email">
        <input type="email" v-model="user.email" id="email" placeholder="email" required>
      </label>
    </div>
    <div id="password">
      <label for="mdp">
        <input type="password" v-model="user.password" id="mdp" placeholder="mot de passe" required>
      </label>
    </div>
    <button type="submit">Connexion</button>
  </form>
</template>

<script>
module.exports  = {
  props:{
    users: {type: Array, default: []},
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      for (let i = 0; i < this.users.length; i++){
        if(this.users[i].email === this.user.email){
           return this.users[i].password === this.user.password
        }
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>