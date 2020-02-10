<template>
  <v-row tag="section" class="inventory">
    <v-col cols="12" v-for="inventory in inventories" :key="inventory.id">
      <v-card>
        <v-container>
          <v-row>
            <v-col v-text="getItem(materials, inventory.materialId).controlCode" tag="span" cols="12" class="body-1 py-0 my-1" />
            <v-col v-text="getItem(materials, inventory.materialId).name" tag="h1" cols="12" class="headline font-weight-bold py-0 my-1" />
            <v-col v-text="`(製造番号: ${inventory.lotCode})`" tag="h2" cols="12" class="body-1 py-0 my-1" />
            <v-col v-text="inventory.dead + '迄'" tag="span" cols="12" class="body-1 py-0 my-1" />
            <v-col v-text="inventory.stockQuantity + getItem(materials, inventory.materialId).unit" tag="h3" cols="12" class="headline font-weight-bold py-0 my-1 text-right" />
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
    }
  }
  // middleware: 'authenticated'
}
</script>
