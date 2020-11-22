<template>
  <div>
    <form @submit="rechercher">
      <div style="margin: 60px 0 0 400px">
        <label>
          <input type="text" required placeholder="Définition" id="recherche" v-model="titre">
        </label>
        <button type="submit">Rechercher</button>
      </div>
    </form>
    <article v-for="definition in def">
      <div class="fun">
        <h2 class="title">{{ definition.name }}</h2>
        <div class="definition">{{ definition.def }}</div>
        <div class="upvote">
          <button style="background: none; border: none"><img src="../ressources/up-arrow.svg" alt="upvote" class="vote"></button>
          <div class="upvote">{{ definition.upvote}}</div>
          <button style="background: none; border: none"><img src="../ressources/down-arrow.svg" alt="downvote" class="vote"></button>
          <div class="upvote">{{ definition.downvote }}</div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
module.exports = {
name: "Recherche",
  props:{
    definitions : {type : Array},
  },
  data(){
  return {
    titre: "",
    def : {type: Array},
    }
  },
  methods: {
    rechercher(){
      this.def = []
      for(let i = 0; i < this.definitions.length; i++){
        if(this.titre === this.definitions[i].name){
          for(let j = 0; j < this.def.length; j++){
            if(this.definitions[i] === this.def[j]){
              return
            }
          }
          this.def.push(this.definitions[i])
        }
      }
    }
  }
}
</script>

<style scoped>
article {
  display: flex;
  border: 2px solid black;
  margin:60px 20% 30px 20%;
  box-shadow:9px -9px black;
  background-color: white;
  border-radius: 5px;
}
.fun{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.upvote{
  align-self: flex-end;
  margin: 10px;
  display: flex;
  align-items: center;
}
.vote{
  height: 20px;
  margin: 5px;
}
.title{
  border: 2px solid black;
  border-radius: 10px;
  width: 30%;
  text-align: center;
  margin-left: 10px;
  padding: 5px;
}
.definition{
  width: 80%;
  margin-left: 10px;
}
button{
  border: none;
  padding: 5px;
  background-color: #6B3012;
  color: white;
}
</style>