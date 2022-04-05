<template>
<div class="settings-page" v-if="currentUser">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>
        <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"/>
        <form @submit.prevent="onSubmit">
          <fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="text"
                     placeholder="URL of profile picture"
                     v-model="form.image"
              >
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="text"
                     placeholder="profile username"
                     v-model="form.username"
              >
            </fieldset>
            <fieldset class="form-group">
              <textarea class="form-control form-control-lg"
                     type="text"
                     placeholder="bio"
                     v-model="form.bio"
              />
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="text"
                     placeholder="profile email"
                     v-model="form.email"
              >
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                     type="password"
                     placeholder="profile password"
                     v-model="form.password"
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" type="submit"
                    :disabled="isSubmitting">
              Update Settings
            </button>
          </fieldset>
        </form>
        <!-- Line break for logout button -->
        <hr>
        <button class="btn btn-outline-danger" @click="logOut">
          Or click here to logout.
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapState, mapGetters} from "vuex"
import {gettersType as authGetterTypes} from "@/store/modules/auth";
import McvValidationErrors from "../components/ValidationErrors";
import {actionsType as authActionTypes} from "../store/modules/auth";

export default {
  name: "McvSettings",
  components: {McvValidationErrors},
  computed: {
    ...mapState({
      isSubmitting: state => state.settings.isSubmitting,
      validationErrors: state => state.settings.validationsErrors
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    form() {
      if (this.currentUser) {
        return {
          username: this.currentUser.username,
          bio: this.currentUser.bio,
          image: this.currentUser.image,
          email: this.currentUser.email,
          password: ''
        }
      }
    return {
          username: '',
          bio: '',
          image: '',
          email: '',
          password: ''
        }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(authActionTypes.updateCurrentUser, {currentUserInput: this.form})
    },
    logOut() {
      this.$store.dispatch(authActionTypes.logout).then(() => {
        this.$router.push({name: 'globalFeed'})
      })
    }
  }
}
</script>