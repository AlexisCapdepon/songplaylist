<template>
  <v-container fluid class="d-flex justify-center" data-app>
    <v-row>
       <v-col>
         <v-row class="d-flex justify-center align-center">
           <v-col> <v-text-field v-if="!isFavorite" placeholder="Recherche" v-model="search"></v-text-field> </v-col>
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
import {mapState} from "vuex";

export default {
  name: "about",
  data: function () {
    return {
      search: '',
      dialog: false,
    }
  },
  methods: {
    goToDetails(key) {
      this.$store.dispatch('setItem', key);
      this.$router.push(`/artist/${key}`)
    },
    checkIsFavorite() {
      (this.isFavorite === true) ? this.$store.dispatch('isFavoriteCheck', false) : this.$store.dispatch('isFavoriteCheck', true);
    },
  },
  computed: {
    filterList() {
      if (this.isFavorite) {
        return (this.playlist.filter(item => (item.favorite === true) ));
      }
      return this.playlist.filter(item => {
        if(!this.search) return this.playlist;
        return (item.artist.toLowerCase().includes(this.search.toLowerCase())
            || (item.track.toLowerCase().includes(this.search.toLowerCase())));
      })
    },
    ...mapState([
      "playlist",
      "isFavorite",
    ]),
  },
  watch: {
    isFavorite() {

    }
  },
};
</script>
<style scoped>

</style>