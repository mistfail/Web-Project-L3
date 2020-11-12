<template>
  <div>
    <form @submit="adDef">
      <h2>Ajouter une nouvelle definition</h2>
      <label>
        <input type="text" v-model="newDef.name" placeholder="Titre de la definition" required>
      </label>
      <label>
        <textarea v-model="newDef.def" required placeholder="Definition"></textarea>
      </label>
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

