<template>
<form  id="user" @submit.prevent="signup">
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
  <div id="lien">
    <p>déja inscrit ?    </p><router-link to="/Connexion">se connecter</router-link>
  </div>
</form>
</template>

<script>
module.exports  = {
  data() {
    return {
     user: {
       email: '',
       name: 'Guest',
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
#user{
  display: flex;
  flex-direction: column;
  align-items: center;
}
button{
  width: 200px;
}
input{
  margin: 10px;
  padding: 5px;
  border: none;
  border-radius: 5px;
}
button{
  border: none;
  background-color: black;
  color : white;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
}
#lien{
  display: flex;
  align-items: center;
}
</style>