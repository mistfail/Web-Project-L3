<template>
  <div>
    <article v-for="definition in definitions" class="definition">
        <div>
          <h2>{{ definition.name }}</h2>
          <div>{{ definition.def }}</div>
          <div>{{ definition.upvote }}</div>
        </div>
    </article>
    <button v-on:click="test">Test</button>
  </div>
</template>

<script>
module.exports = {
  props: {
    definitions: {type: Array, default: []},
  },
  methods: {
    test(){
      console.log(this.definitions)
    }
  }
}

</script>

<style scoped>

article {
  display: flex;
  border: 2px solid black;
  margin: 30px 20% 30px 20%;
}
</style>
