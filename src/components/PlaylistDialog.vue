<template>
  <v-dialog
      v-model="dialog"
      width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn

          icon
          v-bind="attrs"
          v-on="on"
      >
        <v-icon id="dialog-playlist">mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        <h1>Playlist</h1>
        <v-spacer/>
        <div>
          <v-btn v-if="!isFavorite" @click="checkIsFavorite">Favorite</v-btn>
          <v-btn v-if="isFavorite" @click="checkIsFavorite">ALL</v-btn>
        </div>
      </v-card-title>

      <v-list>
        <v-list-item
            v-for="(item, key) in filterList"
            :key="key"
        >
          <v-list-item-action>
            <v-btn
                icon
                play
                @click="selectMusique(key)"
            >
              <v-icon>mdi-play</v-icon>
            </v-btn>
            <v-btn
                icon
                play
                @click="addFavorite(key)"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-list-item-action>
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
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="dialog = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PlaylistDialog",
  props: {
    filterList: {
      required: true,
      type: Array,
    },
    isFavorite: {
      required: true,
      type: Boolean,
    },
  },
  data: function () {
    return {
      dialog: false,
    }
  },
  methods: {
    showDialog(is) {
      this.$store.dispatch('showPlaylist', is);
    },
    checkIsFavorite() {
      (this.isFavorite === true) ? this.$store.dispatch('isFavoriteCheck', false) : this.$store.dispatch('isFavoriteCheck', true);
    },
    addFavorite(key) {
      if (!this.filterList[key].favorite) {
        this.$store.dispatch('addToFavorite', key)
      } else {
        this.$store.dispatch('removeToFavorite', key)
      }
    }
  }
}
</script>

<style scoped>

</style>