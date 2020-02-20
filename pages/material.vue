<template>
  <v-form>
    <v-row>
      <v-col :cols="name.col">
        <v-text-field
          v-model="name.value"
          :label="name.label"
          :type="name.type"
        />
      </v-col>
      <v-col :cols="supplier.col">
        <v-text-field
          v-model="supplier.value"
          :label="supplier.label"
          :type="supplier.type"
        />
      </v-col>
      <v-col :cols="controlCode.col">
        <v-text-field
          v-model="controlCode.value"
          :label="controlCode.label"
          :type="controlCode.type"
        />
      </v-col>
      <v-col :cols="unit.col">
        <v-text-field
          v-model="unit.value"
          :label="unit.label"
          :type="unit.type"
        />
      </v-col>
      <v-col :cols="materialComment.col">
        <v-textarea
          v-model="materialComment.value"
          :label="materialComment.label"
          :type="materialComment.type"
        />
      </v-col>
      <v-col>
        <v-btn
          @click="registerMaterial"
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
import firebase from '@/plugins/firebase'
export default {
  data () {
    return {
      name: { value: '', label: '品名', type: 'text', col: 12 },
      supplier: { value: '', label: '製造者または仕入先', type: 'text', col: 12 },
      controlCode: { value: '', label: '管理コード', type: 'text', col: 6 },
      unit: { value: '', label: '単位', type: 'text', col: 6 },
      materialComment: { value: '', label: '備考', type: 'text', col: 12 },
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
  },
  methods: {
    registerMaterial () {
      const materials = {
        name: this.name.value,
        supplier: this.supplier.value,
        controlCode: this.controlCode.value,
        unit: this.unit.value,
        materialComment: this.materialComment.value,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
      this.writeMaterialData(materials)
      this.$router.push('/')
    },
    writeMaterialData (materials) {
      firebase.database().ref('materials/' + materials.controlCode).set(materials)
    }
  }
  // middleware: 'authenticated'
}
</script>
