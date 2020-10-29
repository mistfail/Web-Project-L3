<template>
  <div>
    <form @submit.prevent="adDef">
      <h2>Ajouter une nouvelle definition</h2>
      <input type="text" v-model="newDef.name" placeholder="Titre de la definition" required>
      <textarea type="text" v-model="newDef.def" required></textarea>
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
module.exports = {
  props: {

  },
  data () {
    return {
      newDef: {
        name: '',
        def: '',
        upvote: ''
      }
    }
  },
  methods: {
    adDef () {
      this.$emit('add-def', this.newDef)
    }
  }
}

</script>

<style>
textarea{
  width: 50%;
}
</style>

