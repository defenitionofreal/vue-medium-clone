<template>
<nav class="navbar navbar-light">
  <div class="container">
    <router-link class="navbar-brand ng-binding" :to="{name: 'globalFeed'}">Mclone</router-link>
    <!-- Show this for logged out users -->
    <ul class="nav navbar-nav pull-xs-right">

      <li class="nav-item">
        <router-link class="nav-link"
                     :to="{name: 'globalFeed'}"
                     active-class="active"
                     exact>
          Home
        </router-link>
      </li>

      <template v-if="isLoggedIn">
      <li class="nav-item">
        <router-link class="nav-link"
                     :to="{name: 'createArticle'}"
                     active-class="active">
          <i class="ion-compose"></i>&nbsp;New Article
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link"
                     :to="{name: 'settings'}"
                     active-class="active">
          <i class="ion-gear-a"></i>&nbsp;Settings
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link ng-binding"
                     active-class="active"
                     :to="{name: 'userProfile',
                           params: {slug: currentUser.username}}">
          <img class="user-pic" :src="currentUser.image">
            &nbsp;{{ currentUser.username }}
        </router-link>
      </li>
      </template>

      <template v-if="isAnonymous"> v-if="isLoggedIn"
        <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'login'}" active-class="active">
          Sign in
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'register'}" active-class="active">
          Sign up
        </router-link>
    </li>
      </template>

      </ul>

  </div>
</nav>
</template>

<script>
import {mapGetters} from "vuex" // из vuex взять данные состояния через mapState
import {gettersType} from "@/store/modules/auth"

export default {
  name: "McvTopbar",
  computed: {
    ...mapGetters({
      currentUser: gettersType.currentUser,
      isLoggedIn: gettersType.isLoggedIn,
      isAnonymous: gettersType.isAnonymous
    }),
    currentUser() {
      return this.$store.getters[gettersType.currentUser]
    },
    isLoggedIn() {
      return this.$store.getters[gettersType.isLoggedIn]
    },
    isAnonymous() {
      return this.$store.getters[gettersType.isAnonymous]
    }
  }
}
</script>