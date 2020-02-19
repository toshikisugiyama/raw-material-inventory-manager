<template>
  <v-row tag="section" class="material">
    <template v-if="materials.length !== 0">
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
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </template>
    <template v-else>
      <v-col
        v-text="noMaterial"
        cols="12"
      />
    </template>
  </v-row>
</template>

<script>
import firebase from '@/plugins/firebase'
export default {
  data () {
    return {
      noMaterial: '登録された原料はありません。',
      materials: []
    }
  },
  created () {
    return firebase
      .database()
      .ref('/materials/')
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          Object.keys(snapshot.val()).forEach((element) => {
            this.materials.push(snapshot.val()[element])
          })
        }
      })
  },
  methods: {
    toMaterialItem (controlCode) {
      this.$router.push('/' + controlCode)
    }
  }
  // middleware: 'authenticated'
}
</script>
