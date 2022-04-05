<template>
<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Register</h1>
        <p class="text-xs-center">
          <router-link :to="{name: 'login'}">Have an account?</router-link>
        </p>
        <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          ></mcv-validation-errors>
        <!--
        @ значит add
        Добавить событие submit к моему методу onSubmit

        v-model - обращение к data()
        -->
        <form @submit.prevent="onSubmit">
          <fieldset class="form-group">
            <input
                class="form-control form-control-lg ng-pristine ng-valid ng-empty ng-touched"
                type="text" placeholder="Username"
                v-model="username">
          </fieldset>
          <fieldset class="form-group">
            <input
                class="form-control form-control-lg ng-pristine ng-valid ng-empty ng-touched"
                type="email" placeholder="Email"
                v-model="email">
          </fieldset>
          <fieldset class="form-group">
            <input
                class="form-control form-control-lg ng-pristine ng-valid ng-empty ng-touched"
                type="password" placeholder="Password"
                v-model="password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right ng-binding" type="submit"
          :disabled="isSubmitting">Sign up</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors'
import {actionsType} from '@/store/modules/auth'  // {} диструктуризация потому что export const

export default {
  name: "McvRegister",
  components: {
    McvValidationErrors
  },
  data (){
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  computed: {
    // isSubmitting как локальная перменная
    isSubmitting(){
      return this.$store.state.auth.isSubmitting // текущеее состояние
    },
    validationErrors(){
      return this.$store.state.auth.validationErrors
    }
  },
  methods: {
    onSubmit(){
      this.$store.dispatch(actionsType.register, {
        email: this.email,
        username: this.username,
        password: this.password
      })
      .then(() => {
        this.$router.push({name:'globalFeed'})  // redirect  // then == success
      })
    }
  }
}
</script>