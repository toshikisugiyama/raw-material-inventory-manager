<template>
  <v-container class="pa-0">
    <v-row tag="section">
      <v-col
        v-text="currentMaterial.controlCode"
        tag="span"
        cols="12"
      />
      <v-col
        v-text="currentMaterial.name"
        tag="h1"
        cols="12"
      />
      <v-col
        v-text="currentMaterial.supplier"
        tag="span"
        cols="12"
      />
    </v-row>
    <v-row tag="section" class="inventories">
      <template v-if="currentInventories.length > 0">
        <v-col v-for="inventory in currentInventories" :key="inventory.id" cols="12">
          <v-card @click="toInventoryEditor(inventory.lotCode)">
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
                  v-text="inventory.amount + currentMaterial.unit"
                  tag="h2"
                  cols="12"
                  class="headline font-weight-bold py-0 my-1 text-right"
                />
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </template>
      <template v-else>
        <v-col
          v-text="noInventory"
        />
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      noInventory: '在庫はありません。'
    }
  },
  computed: {
    ...mapGetters({
      inventories: 'getInventories',
      materials: 'getMaterials'
    }),
    currentMaterial () {
      const currentMaterial = this.materials.find(item => item.controlCode === this.$route.params.id)
      return currentMaterial
    },
    currentInventories () {
      const currentInventories = this.inventories.filter(item => item.materialControlCode === this.$route.params.id)
      return currentInventories
    }
  },
  methods: {
    toInventoryEditor (lotCode) {
      this.$router.push(`/${lotCode}/edit`)
    }
  }
  // middleware: 'authenticated'
}
</script>
