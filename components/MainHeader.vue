<template lang="pug">
  v-app-bar(fixed app)
    v-container
      v-row
        v-col.d-flex.justify-space-between.align-center(cols="12")
          v-toolbar-title(v-text="title" @click="toPage('/')")
          v-spacer
          v-btn(@click.stop="toggleDrawer" icon)
            v-icon mdi-menu
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

<style lang="scss" scoped>
.v-toolbar {
  &__title {
    cursor: pointer;
  }
}
</style>
