<template>
  <article v-for="definition in definitions">
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
</template>

<script>
module.exports = {
name: "Podium",
  props: {
    definitions: {type: Array, default: []},
  },
}
</script>

<style scoped>

</style>