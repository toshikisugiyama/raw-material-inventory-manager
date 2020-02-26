<template>
  <v-container class="pa-0">
    <v-row v-if="!!currentMaterial" tag="section">
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
    <v-row v-if="!!currentInventory" tag="section" class="material">
      <v-col
        v-text="currentInventory.lotCode"
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
                :append-outer-icon="currentMaterial.unit"
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
                :append-outer-icon="currentMaterial.unit"
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
            depressed
            large
          >
            決定
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
export default {
  data () {
    return {
      usedAmount: ''
    }
  },
  computed: {
    ...mapGetters({
      inventories: 'getInventories',
      materials: 'getMaterials'
    }),
    currentMaterial () {
      const currentMaterial = this.materials.find(item => item.controlCode === this.currentInventory.materialControlCode)
      return currentMaterial
    },
    currentInventory () {
      const currentInventory = this.inventories.find(item => item.lotCode === this.$route.params.id)
      return currentInventory
    },
    stockAmount () {
      return this.currentInventory.amount - this.usedAmount
    }
  },
  created () {
    if (!this.currentMaterial || !this.currentInventory) {
      this.$router.push('/')
    }
  },
  methods: {
    async submit () {
      firebase.database().ref('inventories/').child(this.$route.params.id).update({
        'amount': this.stockAmount
      })
      await this.readInventories()
      await this.$router.push('/' + this.currentMaterial.controlCode)
    },
    readInventories () {
      const inventories = []
      const inventoriesRef = firebase.database().ref('/inventories/')
      return inventoriesRef.once('value').then((snapshot) => {
        if (snapshot.val()) {
          Object.keys(snapshot.val()).forEach((element) => {
            inventories.push(snapshot.val()[element])
          })
        }
      }).then(() => {
        this.setInventories(inventories)
      })
    },
    ...mapActions(['setInventories'])
  },
  middleware: 'authenticated'
}
</script>
