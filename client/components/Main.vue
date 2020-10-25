<template>
  <div>
    <article v-for="definition in definitions" :key="definition.id">
        <div>
          <h2>{{definition.id}} : {{ definition.name }}</h2>
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
