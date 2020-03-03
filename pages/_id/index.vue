<template lang="pug">
  v-container.pa-0
    v-row(v-if="!!currentMaterial" tag="section")
      v-col(v-text="currentMaterial.controlCode" tag="span" cols="12")
      v-col(v-text="currentMaterial.name" tag="h1" cols="12")
      v-col(v-text="currentMaterial.supplier" tag="span" cols="12")
    v-row.inventories(tag="section")
      template(v-if="!!currentInventories.length")
        v-col(v-for="inventory in currentInventories" :key="inventory.id" cols="12")
          v-card(@click="toInventoryEditor(inventory.lotCode)")
            v-container
              v-row
                v-col.headline.font-weight-bold.py-0.my-1(v-text="inventory.lotCode" tag="h1" cols="12")
                v-col.body-1.py-0.my-1(v-text="inventory.dead + '迄'" tag="span" cols="12")
                v-col.headline.font-weight-bold.py-0.my-1.text-right(v-text="addComma(inventory.amount) + ' ' + currentMaterial.unit" tag="h2" cols="12")
      template(v-else)
        v-col.text-center.my-5.py-5(v-text="noInventory.text" cols="12")
        v-col.text-center(cols="12")
          v-btn(@click="toPage(noInventory.path)") {{ noInventory.button }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      noInventory: {
        text: '在庫はありません。',
        button: '在庫を登録する',
        path: '/inventory'
      }
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
  created () {
    if (!this.currentMaterial) {
      this.$router.push('/')
    }
  },
  methods: {
    toInventoryEditor (lotCode) {
      this.$router.push(`/${lotCode}/edit`)
    },
    addComma (num) {
      if (typeof num === 'number') { return num.toLocaleString() }
      return Number(num).toLocaleString()
    },
    toPage (path) {
      this.setMaterialCode(this.$route.params.id)
      this.$router.push(path)
    },
    ...mapActions(['setMaterialCode'])
  },
  middleware: 'authenticated'
}
</script>
