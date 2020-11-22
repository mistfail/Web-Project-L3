<template>
  <div>
    <p id="gros">Les meilleurs définitions :</p>
  <article v-for="(definition, index) in podium">
    <p class="position">{{index+1}}</p>
    <div class="fun">
      <h2 class="title">{{ definition.name }}</h2>
      <div class="definition">{{ definition.def }}</div>
      <div class="upvote">
        <button style="background: none; border: none"><img src="../ressources/up-arrow.svg" alt="upvote" class="vote" v-on:click="upVote(definition)"></button>
        <div class="upvote">{{ definition.upvote}}</div>
        <button style="background: none; border: none"><img src="../ressources/down-arrow.svg" alt="downvote" class="vote" v-on:click="downVote(definition)"></button>
        <div class="upvote">{{ definition.downvote }}</div>
      </div>
    </div>
  </article>
    </div>
</template>

<script>
module.exports = {
name: "Podium",
  props: {
    podium:{type: Array}
  },
  methods: {
    upVote(definition){
      definition.upvote = definition.upvote + 1
      this.$emit('up-vote', definition)
    },
    downVote(definition){
      definition.downvote = definition.downvote + 1
      this.$emit('down-vote', definition)
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
.position{
  margin: 20px;
  font-size: 30px;
}
#gros{
  text-align: center;
  font-size: 40px;
}
</style>