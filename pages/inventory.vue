<template>
  <v-form>
    <v-row>
      <v-col :cols="materialControlCode.col">
        <v-text-field
          v-model="materialControlCode.value"
          :label="materialControlCode.label"
          :type="materialControlCode.type"
        />
      </v-col>
      <v-col
        v-text="materialName ? materialName : '品名'"
        cols="12"
      />
      <v-col :cols="lotCode.col">
        <v-text-field
          v-model="lotCode.value"
          :label="lotCode.label"
          :type="lotCode.type"
        />
      </v-col>
      <v-col :cols="amount.col">
        <v-text-field
          v-model="amount.value"
          :label="amount.label"
          :type="amount.type"
          :append-outer-icon="materialUnit"
        />
      </v-col>
      <v-col :cols="dead.col">
        <v-text-field
          v-model="dead.value"
          :label="dead.label"
          :type="dead.type"
        />
      </v-col>
      <v-col :cols="inventoryComment.col">
        <v-textarea
          v-model="inventoryComment.value"
          :label="inventoryComment.label"
          :type="inventoryComment.type"
        />
      </v-col>
      <v-col>
        <v-btn
          @click="registerInventory"
          depressed
          large
        >
          決定
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      materialControlCode: { value: '', label: '原材料管理コード', type: 'text', col: 12 },
      lotCode: { value: '', label: '製造ロット番号', type: 'text', col: 6 },
      amount: { value: '', label: '量', type: 'number', col: 6 },
      dead: { value: '', label: '使用期限', type: 'date', col: 12 },
      status: '',
      inventoryComment: { value: '', label: '備考', type: 'date', col: 12 },
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
  },
  computed: {
    ...mapGetters({
      materials: 'getMaterials'
    }),
    currentMaterial () {
      const currentMaterial = this.materials.find(item => item.controlCode === this.materialControlCode.value)
      return currentMaterial
    },
    materialName () { return this.currentMaterial ? this.currentMaterial.name : '' },
    materialUnit () { return this.currentMaterial ? this.currentMaterial.unit : '' }
  },
  methods: {
    registerInventory () {
      const inventories = {
        materialControlCode: this.materialControlCode.value,
        lotCode: this.lotCode.value,
        amount: this.amount.value,
        dead: this.dead.value,
        status: this.status,
        inventoryComment: this.inventoryComment.value,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
      this.setInventories(inventories)
      this.$router.push('/')
    },
    ...mapActions(['setInventories'])
  }
  // middleware: 'authenticated'
}
</script>
