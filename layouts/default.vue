<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-container>
        <v-row>
          <v-col cols="12" class="d-flex justify-space-between align-center">
            <v-toolbar-title v-text="title" @click="toPage('/')" />
            <v-spacer />
            <v-btn
              @click.stop="rightDrawer = !rightDrawer"
              icon
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="rightDrawer = !rightDrawer">
          <v-list-item-action>
            <v-icon light>
              mdi-arrow-right
            </v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item v-for="page in pages" :key="page.path">
          <v-list-item-title v-text="page.name" @click="toPage(page.path)" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false
    }
  },
  computed: {
    ...mapGetters({
      pages: 'getPages'
    }),
    title () {
      const foundPage = this.pages.find(item => item.path === this.$route.path)
      if (foundPage) {
        return foundPage.name
      }
      if (this.$route.path.includes('materials')) {
        return '原材料詳細'
      }
      return '原材料使用'
    }
  },
  methods: {
    toPage (path) {
      this.$router.push(path)
    }
  }
}
</script>
