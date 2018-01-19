<template>

  <section class="login-area">
    <!--サインアウト中-->
    <div class="is-sign-out" v-if="!currentUser">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Email" v-model="email">
          <span class="icon is-small is-left"><i class="fa fa-envelope"></i></span>
          <span class="icon is-small is-right"><i class="fa fa-check"></i></span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Password" v-model="password">
          <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
        </p>
      </div>
      <div class="button-field">
        <p class="control">
          <button class="button is-primary is-medium" @click="signIn">LOGIN</button>
          <router-link :to="{ name: 'signUpLink' }" tag="a" class="">Create Account</router-link>
        </p>
      </div>
    </div>
    <!--サインイン中-->
    <div class="is-sign-in" v-else>
      <div class="button-field">
        <section class="is-sign-in__card">
          <router-link :to="{ name: 'profileLink' }" tag="a" class="">
            <div class="is-sign-in__card-wrap">
              <div class="is-sign-in__image">
                <img v-if="getUser.photoUrl1" :src="getUser.photoUrl1" alt="">
                <img src="http://placehold.jp/24/cccccc/ffffff/50x50.png" alt="" v-else>
              </div>
              <div class="is-sign-in__info">
                <p class="login-user"><i class="far fa-user-circle"></i><strong>{{ getUser.displayName }}</strong><span>({{ getUser.age }}歳)ちゃん</span></p>
              </div>
            </div>
          </router-link>
          <div class="control">
            <button class="button is-info is-medium" @click="signOut">SIGN OUT</button>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import firebase from 'firebase'
  export default  {
    data () {
      return {
        email: '',
        password: '',
      }
    },
    computed: {
      currentUser: function() {
        return this.$store.getters['auth/user'].auth
      },
      ...mapGetters([
        'getUser'
      ])
    },
    methods: {
      signIn:function ()  {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          user => {
            alert('success!')
            this.$router.push('/')
          },
          err => {
            alert(err.message)
          }
        )
      },
      signOut () {
        firebase.auth().signOut().then(function () {
          alert('logged out');
        }).catch(function () {
          alert('error.');
        })
      },
    }
  }
</script>
<style lang="scss">
  @import "~bulma/sass/utilities/initial-variables";
  @import "../assets/sass/setting";
  .login-area {
    max-width:320px;
    width: 100%;
    margin-bottom: 2rem;
  }
  .login-user {
    margin-bottom:.5rem;
    text-align: left;
    color: $primaryColor;
    padding-bottom:.2rem;
    strong {
      margin-left:.5rem;
    }
    span {
      color: $black;
    }
  }
  .is-sign-in {
    width:100%;
    &__card-wrap {
      margin-bottom: .5rem;
      display: flex;
      justify-content: flex-start;
      width:100%;
      border-bottom:1px solid $borerColor;
    }
    &__image{
      margin-right:.5rem;
      img {
        border-radius: 100%;
        width:50px;
        height:50px;
      }
    }

  }
  @include break-at ($widthPC) {
    .login-area {
      padding: 1rem 2rem;
    }
    .is-sign-in{
      position: sticky;
      top: 70px;
    }
  }
</style>
