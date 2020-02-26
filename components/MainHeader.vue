<template>
  <v-app-bar
    fixed
    app
  >
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex justify-space-between align-center">
          <v-toolbar-title v-text="title" @click="toPage('/')" />
          <v-spacer />
          <v-btn
            @click.stop="toggleDrawer"
            icon
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    toPage (path) {
      this.$router.push(path)
    },
    toggleDrawer () {
      this.$emit('toggle-drawer')
    }
  }
}
</script>
