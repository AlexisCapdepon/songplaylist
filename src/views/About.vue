<template>
  <v-container fluid class="d-flex justify-center">
    <v-col>
    <v-col>
      <v-row>
        <v-col>
          <v-text-field v-model="search" placeholder="Find in playlist"> </v-text-field>
        </v-col>
        <v-col>
          <v-btn> Add</v-btn>
        </v-col>
      </v-row>
    </v-col>
      <v-row>
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
      </v-row>
    </v-col>
  </v-container>

</template>

<script>
export default {
  name: "about",
  data: function () {
    return {
      search: '',
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
  methods: {
    goToDetails(key) {
      this.$router.push(`/artist/${key}`)
    }
  },
  computed: {
    filterList () {
        return this.playlist.filter(item => {
          if(!this.search) return this.playlist;
          return (item.artist.toLowerCase().includes(this.search.toLowerCase())
              || (item.track.toLowerCase().includes(this.search.toLowerCase())));
        })
    }
  },
  watch: {},
};
</script>
<style scoped>

</style>