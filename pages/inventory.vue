<template>
  <v-form>
    <v-row>
      <v-col :cols="materialControlCode.col">
        <v-text-field
          v-model="materialControlCode.value"
          :label="materialControlCode.label"
          :type="materialControlCode.type"
          :autofocus="!materialCode"
        />
      </v-col>
      <v-col :cols="name.col">
        <v-text-field
          :value="materialName"
          :label="name.label"
          readonly
        />
      </v-col>
      <v-col :cols="lotCode.col">
        <v-text-field
          v-model="lotCode.value"
          :label="lotCode.label"
          :type="lotCode.type"
          :autofocus="!!materialCode"
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
import firebase from '@/plugins/firebase'
export default {
  data () {
    return {
      materialControlCode: { value: '', label: '原材料管理コード', type: 'text', col: 12 },
      lotCode: { value: '', label: '製造ロット番号', type: 'text', col: 12 },
      amount: { value: '', label: '量', type: 'number', col: 12 },
      dead: { value: '', label: '使用期限', type: 'date', col: 12 },
      status: 0,
      inventoryComment: { value: '', label: '備考', type: 'date', col: 12 },
      createdAt: Date.now(),
      updatedAt: Date.now(),
      name: { label: '品名', col: '12' }
    }
  },
  computed: {
    ...mapGetters({
      materials: 'getMaterials',
      materialCode: 'getMaterialCode'
    }),
    currentMaterial () {
      const currentMaterial = this.materials.find(item => item.controlCode === this.materialControlCode.value)
      return currentMaterial
    },
    materialName () { return this.currentMaterial ? this.currentMaterial.name : '' },
    materialUnit () { return this.currentMaterial ? this.currentMaterial.unit : '' }
  },
  created () {
    if (!this.materials.length) {
      alert('受入入力の前に原材料の登録を行って下さい。')
      this.$router.push('/material')
    }
    if (this.materialCode) {
      this.materialControlCode.value = this.materialCode
    }
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
      this.addInventories(inventories)
      this.writeInventoryData(inventories)
      this.$router.push('/' + inventories.materialControlCode)
      if (this.materialCode) {
        this.materialControlCode.value = ''
      }
    },
    writeInventoryData (inventories) {
      firebase.database().ref('inventories/' + inventories.lotCode).set(inventories)
    },
    ...mapActions(['addInventories'])
  }
  // middleware: 'authenticated'
}
</script>
