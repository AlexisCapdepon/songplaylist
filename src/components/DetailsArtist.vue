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
         :src="require('../assets/' + artistSelected.picture)"
         height="300px"
         dark
     >
       <v-row class="fill-height">
           <v-card-title class="white--text pl-12 pt-12">
             <div class="display-1 pl-12 pt-12">
               {{artistSelected.artist}}
             </div>
           </v-card-title>
       </v-row>
     </v-img>

     <v-list two-line>
       {{artistSelected.track}}
       <v-btn
           icon
           play
           @click="addFavorite(key)"
       >
         <v-icon>mdi-heart</v-icon>
       </v-btn>
     </v-list>
   </v-card> </v-container>
</template>

<script>
export default {
  name: "DetailsArtist",
  data: function () {
    return {
      playlist: [
        {
          url: 'JUL - EN Y _ CLIP OFFICIEL _ D\'OR ET DE PLATINE _ 2015.mp3',
          picture: 'jul.jpg',
          artist: 'RRul',
          track: 'En Y !',
        },
        {
          url: 'JUL - EN Y _ CLIP OFFICIEL _ D\'OR ET DE PLATINE _ 2015.mp3',
          picture: 'jul.jpg',
          artist: 'Ju',
          track: 'EnY !',
        },
        {
          url: 'JUL - EN Y _ CLIP OFFICIEL _ D\'OR ET DE PLATINE _ 2015.mp3',
          picture: 'jul.jpg',
          artist: 'l',
          track: ' Y !',
        },
      ],
    }
  },
  computed: {
    artistSelected() {
      return this.playlist[this.$route.params.id];
    },
  },
  methods: {
    goToList() {
      this.$router.push('/artist');
    }
  }
}
</script>

<style scoped>

</style>