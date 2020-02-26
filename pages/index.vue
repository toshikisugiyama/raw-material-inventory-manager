<template>
  <client-only placeholder="Loading...">
    <v-row tag="section" class="material">
      <template v-if="!!materials.length">
        <v-col
          v-for="material in materials"
          :key="material.controlCode"
          cols="12"
        >
          <v-card @click="toMaterialItem(material.controlCode)">
            <v-container>
              <v-row>
                <v-col
                  v-text="material.controlCode"
                  tag="span"
                  cols="12"
                  class="body-1 py-0 my-1"
                />
                <v-col
                  v-text="material.name"
                  tag="h1"
                  cols="12"
                  class="headline font-weight-bold py-0 my-1"
                />
                <v-col
                  v-text="material.supplier"
                  tag="span"
                  cols="12"
                  class="body-1 py-0 my-1"
                />
                <v-col
                  v-text="totalAmountWithCommma(material.controlCode) + ' ' + material.unit"
                  tag="span"
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
          v-text="noMaterial.text"
          cols="12"
          class="text-center my-5 py-5"
        />
        <v-col cols="12" class="text-center">
          <v-btn @click="toPage(noMaterial.path)">
            {{ noMaterial.button }}
          </v-btn>
        </v-col>
      </template>
    </v-row>
  </client-only>
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      noMaterial: {
        text: '登録された原料はありません。',
        button: '原材料を登録する',
        path: '/material'
      }
    }
  },
  computed: {
    ...mapGetters({
      materials: 'getMaterials',
      inventories: 'getInventories'
    }),
    data () { return this.readData }
  },
  created () {
    this.readInventories()
    this.readMaterials()
  },
  methods: {
    ...mapActions(['setMaterials', 'setInventories']),
    toPage (path) {
      this.$router.push(path)
    },
    totalAmountWithCommma (controlCode) {
      return this.totalAmount(controlCode).toLocaleString()
    },
    totalAmount (controlCode) {
      const amounts = this.currentInventories(controlCode).map(item => Number(item.amount))
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      if (!amounts.length) { return 0 }
      return amounts.reduce(reducer)
    },
    currentInventories (controlCode) {
      const result = this.inventories.filter(item => item.materialControlCode === controlCode)
      return result
    },
    toMaterialItem (controlCode) {
      this.$router.push('/' + controlCode)
    },
    readMaterials () {
      const materials = []
      const db = firebase.database()
      const ref = db.ref('/materials/')
      return ref.once('value').then((snapshot) => {
        if (snapshot.val()) {
          Object.keys(snapshot.val()).forEach((element) => {
            materials.push(snapshot.val()[element])
          })
        }
      }).then(() => {
        this.setMaterials(materials)
      })
    },
    readInventories () {
      const inventories = []
      const db = firebase.database()
      const ref = db.ref('/inventories/')
      return ref.once('value').then((snapshot) => {
        if (snapshot.val()) {
          Object.keys(snapshot.val()).forEach((element) => {
            inventories.push(snapshot.val()[element])
          })
        }
      }).then(() => {
        this.setInventories(inventories)
      })
    }
  }
  // middleware: 'authenticated'
}
</script>
