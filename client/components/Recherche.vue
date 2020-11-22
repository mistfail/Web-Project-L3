<template>
  <div>
    <form @submit="recherche">
      <label>
        <input type="text" required placeholder="Définition" id="recherche" v-model="titre">
      </label>
      <button type="submit">Ajouter</button>
    </form>
    <article v-for="definition in definitions" v-if="this.titre === definition.name">
      <div class="fun">
        <h2 class="title">{{ definition.name }}</h2>
        <div class="definition">{{ definition.def }}</div>
        <div class="upvote">
          <button style="background: none; border: none"><img src="../ressources/up-arrow.svg" alt="upvote" class="vote"></button>
          <button style="background: none; border: none"><img src="../ressources/down-arrow.svg" alt="downvote" class="vote"></button>
          <div class="upvote">{{ definition.upvote }}</div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
module.exports = {
name: "Recherche",
  props:{
    definitions : {type : Array}
  },
  data(){
  return {
    titre: "",
    }
  },
  methods:{
  recherche(){
    this.titre = titre
  }
  }
}
</script>

<style scoped>

</style>