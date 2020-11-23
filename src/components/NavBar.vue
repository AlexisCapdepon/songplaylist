<template>
  <v-app-bar>
    <v-toolbar-title class="pa-2">TapeTonSon</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn text @click="goToPlayers">Player</v-btn>
      <v-btn text @click="goToArtist">Artist</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    goToPlayers () {
      this.$router.push('/')
    },
    goToArtist () {
      this.$router.push('artist')
    }
  }
}
</script>

<style scoped>

</style>