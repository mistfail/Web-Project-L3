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
      this.$emit('sign-in', this.user)
    }
  }
}
</script>

<style scoped>

</style>