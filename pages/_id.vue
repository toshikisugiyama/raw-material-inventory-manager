<template>
  <v-container class="pa-0">
    <v-row tag="section">
      <v-col
        v-text="getItem(materials, getItem(inventories, inventoryId).materialId).controlCode"
        tag="span"
        cols="12"
      />
      <v-col
        v-text="getItem(materials, getItem(inventories, inventoryId).materialId).name"
        tag="h1"
        cols="12"
      />
      <v-col
        v-text="getItem(materials, getItem(inventories, inventoryId).materialId).supplier"
        tag="span"
        cols="12"
      />
    </v-row>
    <v-row tag="section" class="material">
      <v-col
        v-text="getItem(inventories, inventoryId).lotCode"
        tag="h1"
        cols="12"
        class="headline font-weight-bold py-0 my-1"
      />
      <v-col cols="12">
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="usedAmount"
                :append-outer-icon="getItem(materials, getItem(inventories, inventoryId).materialId).unit"
                type="number"
                label="使用量"
                required
                autofocus
                outlined
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                :value="stockAmount"
                :append-outer-icon="getItem(materials, getItem(inventories, inventoryId).materialId).unit"
                type="number"
                label="在庫"
                readonly
                required
                outlined
              />
            </v-col>
          </v-row>
          <v-btn
            @click="submit"
            :disabled="!usedAmount || stockAmount < 0"
          >
            決定
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      inventoryId: Number(this.$route.path.slice(1).replace(/\/$/, '')),
      usedAmount: ''
    }
  },
  computed: {
    ...mapGetters({
      inventories: 'getInventories',
      materials: 'getMaterials'
    }),
    stockAmount () {
      return this.getItem(this.inventories, this.inventoryId).stockAmount - this.usedAmount
    }
  },
  methods: {
    getItem (array, id) {
      return array.find(item => item.id === id)
    },
    filterItem (array, materialId) {
      return array.filter(item => item.materialId === materialId)
    },
    submit () {
      alert('使用量: ' + this.usedAmount + ', 在庫: ' + this.stockAmount)
    }
  }
  // middleware: 'authenticated'
}
</script>
