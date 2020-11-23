<template>
  <v-container fluid class="d-flex justify-center" data-app>
    <v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-text-field v-model="search" placeholder="Find in playlist"> </v-text-field>
          </v-col>
          <v-col>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  Open Dialog
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">User Profile</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            label="Legal first name*"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-text-field
                            label="Legal middle name"
                            hint="example of helper text only on focus"
                        ></v-text-field>
                        <input type="file" id="file" ref="fileMusic"  class="pa-2" v-on:change="addMusic" />

                        <input type="file" id="picturInput" name="inputName"  v-on:change="console.log(this)" />
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
      dialog: false,
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
    },
    addMusic() {
      console.log(this.$refs.fileMusic.files[0]);
    },
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