<template>
<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Login</h1>
        <p class="text-xs-center">
          <router-link :to="{name: 'register'}">Don't have an account?</router-link>
        </p>
        <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          ></mcv-validation-errors>
        <form @submit.prevent="onSubmit">
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
          :disabled="isSubmitting">Log in</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import McvValidationErrors from '@/components/ValidationErrors'
import {actionsType} from '@/store/modules/auth'

export default {
  name: "Login",
  components: {
    McvValidationErrors
  },
  data (){
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    // mapState функция из vuex для читабильности и лучшей группировки
    // ... - заспредить внутрь объекта (чтобы можно было новый объект добавить)
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  methods: {
    onSubmit(){
      this.$store.dispatch(actionsType.login, {
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.$router.push({name:'globalFeed'})
      })
    }
  }
}
</script>