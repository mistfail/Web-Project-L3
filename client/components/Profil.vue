<template>
<div id="page">
  <div id="profil">
    <h1>Mon profil</h1>
    <p>Nom :</p>
    <p>Email :</p>
  </div>
  <div id="definition">
    <h1>Mes définitions</h1>
  </div>
  <div id="article">

  </div>
</div>
</template>

<script>
module.exports = {
name: "Profil"
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