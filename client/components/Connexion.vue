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
    <div id="lien">
      <p>pas inscrit ?</p><router-link to="/Inscription">S'inscrire</router-link>
    </div>
    <h4>{{message}}</h4>
  </form>
</template>

<script>
module.exports  = {
  props:{
    message: ''
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
      this.$emit('connect-user', this.user)
    }
  }
}
</script>

<style scoped>
#user{
  display: flex;
  flex-direction: column;
  align-items: center;
}
input{
  border: none;
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
}
button{
  border: none;
  color : white;
  background-color: black;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
  width: 200px;
}
#lien{
  display: flex;
  align-items: center;
}
</style>