<template>
<form  id="user" @submit="signup">
  <h2>S'inscrire</h2>
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
  <div>
    <label>
      <input type="text" v-model="user.name" id="name" placeholder="Nom">
    </label>
  </div>
  <button type="submit">Inscription</button>
</form>
</template>

<script>
module.exports  = {
  data() {
    return {
     user: {
       email: '',
       name: 'Guest000001',
       password: ''
     }
    }
  },
  methods: {
    signup () {
      this.$emit('sign-up', this.user)
    }
  }
}
</script>

<style scoped>

</style>