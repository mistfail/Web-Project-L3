<template>
<div id="page">
  <div id="profil">
    <h1>Mon profil</h1>
    <p>Nom : {{user[0].name}}</p>
    <p>Email : {{user[0].email}}</p>
  </div>
  <div id="definition">
    <h1>Mes définitions</h1>
    <button v-if="!bool" type="submit" v-on:click="myDefs">Refresh</button>
    <article v-for="def in defs" :key="def.id" style="background: white">
      <h4>{{def.name}}</h4>
      <p>{{def.def}}</p>
      <button v-if="defs !== undefined" v-on:click="deleteDef(def)" type="submit">Supprimer</button>
    </article>
  </div>
  <div id="article">

  </div>
</div>
</template>

<script>
module.exports = {
name: "Profil",
  props:{
    user: {type: Array, default: []},
    definitions: {type: Array, default: []},
    defs : {type: Array, default: []},
    bool : false,
  },
  methods: {
    myDefs(){
      this.bool = true
      for(let i = 0; i < this.definitions.length; i++){
        if(this.user[0].id === this.definitions[i].userid){
          console.log(this.definitions[i])
          this.defs.push(this.definitions[i])
        }
      }
    },
    deleteDef(definition) {
      this.$emit('delete-def', definition)
    }
  }
}
</script>

<style scoped>
#page{
  display: flex;
  flex-direction: row;
}
#profil{
  width: 30%;
  display: flex;
  flex-direction: column;
}
#definition{
  width: 70%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
}
h1{
  align-self: center;
}

</style>