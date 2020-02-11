<template>
  <v-row tag="section" class="material">
    <v-col v-for="material in materials" :key="material.id" cols="12">
      <v-card @click="toMaterialItem(material.id)">
        <v-container>
          <v-row>
            <v-col v-text="material.controlCode" tag="span" cols="12" class="body-1 py-0 my-1" />
            <v-col v-text="material.name" tag="h1" cols="12" class="headline font-weight-bold py-0 my-1" />
            <v-col v-text="material.supplier" tag="span" cols="12" class="body-1 py-0 my-1" />
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      inventories: 'getInventories',
      materials: 'getMaterials'
    })
  },
  methods: {
    getItem (array, id) {
      return array.find(item => item.id === id)
    },
    toMaterialItem (path) {
      const currentPath = this.$route.path.replace(/\/$/, '')
      this.$router.push(`${currentPath}/${path}`)
    }
  },
  middleware: 'authenticated'
}
</script>
