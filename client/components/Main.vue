<template>
  <div>
    <article v-for="definition in definitions" class="definition">
        <div>
          <h2>{{ definition.name }}</h2>
          <div>{{ definition.def }}</div>
          <div>{{ definition.upvote }}</div>
        </div>
    </article>
  </div>
</template>

<script>
module.exports = {
  props: {
    definitions: {type: Array, default: []},
  },
  methods: {

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
