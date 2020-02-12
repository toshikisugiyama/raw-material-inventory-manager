<template>
  <v-container class="pa-0">
    <v-row tag="section">
      <v-col
        v-text="getItem(materials, materialId).controlCode"
        tag="span"
        cols="12"
      />
      <v-col
        v-text="getItem(materials, materialId).name"
        tag="h1"
        cols="12"
      />
      <v-col
        v-text="getItem(materials, materialId).supplier"
        tag="span"
        cols="12"
      />
    </v-row>
    <v-row tag="section" class="material">
      <v-col v-for="inventory in filterItem(inventories, materialId)" :key="inventory.id" cols="12">
        <v-card @click="toInventory(inventory.id)">
          <v-container>
            <v-row>
              <v-col
                v-text="inventory.lotCode"
                tag="h1"
                cols="12"
                class="headline font-weight-bold py-0 my-1"
              />
              <v-col
                v-text="inventory.dead + '迄'"
                tag="span"
                cols="12"
                class="body-1 py-0 my-1"
              />
              <v-col
                v-text="inventory.stockAmount + getItem(materials, materialId).unit"
                tag="h2"
                cols="12"
                class="headline font-weight-bold py-0 my-1 text-right"
              />
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      materialId: Number(this.$route.path.slice(11).replace(/\/$/, ''))
    }
  },
  computed: {
    ...mapGetters({
      inventories: 'getInventories',
      materials: 'getMaterials'
    })
  },
  methods: {
    toInventory (path) {
      this.$router.push(`/${path}`)
    },
    getItem (array, id) {
      return array.find(item => item.id === id)
    },
    filterItem (array, materialId) {
      return array.filter(item => item.materialId === materialId)
    }
  }
  // middleware: 'authenticated'
}
</script>
