<template>
 <v-container>
   <v-card
       max-width="375"
       class="mx-auto"
   >
     <v-btn
         icon
         @click="goToList"
     >
       <v-icon>mdi-chevron-left</v-icon>
     </v-btn>
     <v-img
         :src="require('../assets/' + item.picture)"
         height="300px"
         alt="detailPictur"
         dark
     >
       <v-row class="fill-height">
           <v-card-title class="white--text pl-12 pt-12">
             <div class="display-1 pl-12 pt-12">
               {{item.artist}}
             </div>
           </v-card-title>
       </v-row>
     </v-img>

     <v-list two-line>
       {{item.track}}
       <v-btn
           icon
           play
           @click="addFavorite"
       >
         <v-icon>mdi-heart</v-icon>
       </v-btn>
     </v-list>
   </v-card> </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "DetailsArtist",
  data: function () {
    return {}
  },
  computed: {
    ...mapState([
        "item"
    ]),
  },
  methods: {
    goToList() {
      this.$router.push('/artist');
    },
    addFavorite() {
      if (!this.item.favorite) {
        console.log(this.$route.params.id)
        this.$store.dispatch('addToFavorite', this.item.id)
      } else {
        this.$store.dispatch('removeToFavorite', this.item.id)
      }
    }
  }
}
</script>

<style scoped>

</style>
