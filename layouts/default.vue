<template>
  <v-app dark>
    <MainHeader
      :title="title"
      @toggle-drawer="toggleDrawer"
    />
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
        <v-list-item @click.native="toggleDrawer" link>
          <v-icon light>
            mdi-arrow-right
          </v-icon>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-for="page in sideMenus"
          :key="page.path"
          link
        >
          <v-list-item-title
            v-text="page.name"
            @click="toPage(page.path)"
          />
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
import { mapGetters, mapActions } from 'vuex'
import MainHeader from '@/components/MainHeader.vue'
export default {
  components: {
    MainHeader
  },
  data () {
    return {
      drawer: false,
      fixed: false,
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
      if (this.$route.path.includes('edit')) {
        return '原材料使用'
      }
      return '原材料詳細'
    },
    sideMenus () { return this.pages.filter(item => item.menu) }
  },
  methods: {
    toPage (path) {
      this.resetMaterialCode()
      this.$router.push(path)
    },
    toggleDrawer () {
      this.rightDrawer = !this.rightDrawer
    },
    ...mapActions(['resetMaterialCode'])
  }
}
</script>
