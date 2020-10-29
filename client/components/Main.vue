<template>
  <div>
    <article v-for="definition in definitions">
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
}
</style>
