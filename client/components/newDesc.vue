<template>
  <div id="page">
    <h2>Ajouter une nouvelle definition</h2>
    <form @submit="adDef">
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
  width: 200px;
  margin: 0 20px 0 20px;
}
form{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: auto;
}
h2{
  text-align: center;
}
#page{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

