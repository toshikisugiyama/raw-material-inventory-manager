<template>
  <v-row tag="section" class="login">
    <v-col v-text="this.$route.name.toUpperCase()" tag="h1" cols="12" class="text-center" />
    <v-col cols="12" md="4" offset-md="4">
      <v-form>
        <v-text-field
          v-model="email"
          label="E-mail"
          required
        />
        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          label="Password"
          required
        />
        <v-btn
          @click="login"
          color="success"
          class="mr-4"
        >
          login
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: '',
      show: false
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['getUser'])
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user)
    })
  },
  methods: {
    ...mapActions(['setUser']),
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
        this.$router.push('/')
      }).catch((error) => {
        alert(error)
      })
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.setUser(null)
      }).catch((error) => {
        alert(error)
      })
    }
  }
}
</script>
