<template>
  <v-container fluid class="d-flex justify-center" data-app>
    <v-row>
       <v-col>
         <v-row>
           <v-col> <v-text-field v-if="!isFavorite" v-model="search"></v-text-field> </v-col>
           <v-col>
             <v-btn v-if="!isFavorite" @click="checkIsFavorite">Favorite</v-btn>
             <v-btn v-if="isFavorite" @click="checkIsFavorite">ALL</v-btn>
           </v-col>
         </v-row>
        <v-list>
          <v-list-item
              v-for="(item, key) in filterList"
              :key="key"
              @click="goToDetails(key)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.track"/>
              <v-list-item-subtitle v-text="item.artist"/>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-img
                  :src="require('../assets/' + item.picture)"
              />
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  name: "about",
  data: function () {
    return {
      search: '',
      dialog: false,
      playlist: [
        {
          url: 'JUL - EN Y _ CLIP OFFICIEL _ D\'OR ET DE PLATINE _ 2015.mp3',
          picture: 'jul.jpg',
          artist: 'RRul',
          favorite: true,
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
      isFavorite: true,
    }
  },
  methods: {
    goToDetails(key) {
      this.$router.push(`/artist/${key}`)
    },
    checkIsFavorite() {
      console.log((this.isFavorite === true) ? this.isFavorite = false : this.isFavorite = true);
    },
  },
  computed: {
    filterList() {
      if (this.isFavorite) {
        console.log('called')
        return (this.playlist.filter(item => (item.favorite === true) ));
      }
      return this.playlist.filter(item => {
        if(!this.search) return this.playlist;
        return (item.artist.toLowerCase().includes(this.search.toLowerCase())
            || (item.track.toLowerCase().includes(this.search.toLowerCase())));
      })
    }
  },
  watch: {
    isFavorite() {

    }
  },
};
</script>
<style scoped>

</style>