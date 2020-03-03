<template lang="pug">
  v-row.login(tag="section")
    v-col.text-center(v-text="title.toUpperCase()" tag="h1" cols="12")
    v-col(v-if="loginPage" cols="12" md="4" offset-md="4")
      v-form
        v-text-field(v-model="email" label="E-mail" required)
        v-text-field(v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" @click:append="show = !show" label="Password" required)
        v-row
          v-col
            v-btn.mr-4(@click="login" color="success") {{ title }}
          v-spacer
          v-col
            v-btn(@click="switchPage" text dark) {{ switchButton }}
              v-icon(dark right) mdi-arrow-right
    v-col(v-else cols="12" md="4" offset-md="4")
      v-form
        v-text-field(v-model="email" label="E-mail" required)
        v-text-field(v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" @click:append="show = !show" label="Password" required)
        v-text-field(v-model="passwordConfirm" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" @click:append="show = !show" label="Password(confirm)" required)
        v-row
          v-col
            v-btn.mr-4(@click="login" color="success") {{ title }}
          v-spacer
          v-col
            v-btn(@click="switchPage" text dark) {{ switchButton }}
              v-icon(dark right) mdi-arrow-right
        v-row(v-if="[...signUpError].length")
          v-col {{ signUpError }}
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      show: false,
      loginPage: true,
      signUpError: ''
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['getUser']),
    title () { return this.loginPage ? 'login' : 'signup' },
    switchButton () { return !this.loginPage ? 'login' : 'signup' }
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user)
    })
  },
  methods: {
    ...mapActions(['setUser']),
    switchPage () {
      this.loginPage = !this.loginPage
    },
    createUser () {

    },
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
