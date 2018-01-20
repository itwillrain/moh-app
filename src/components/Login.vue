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
        <section class="is-sign-in__card button-field">
          <router-link :to="{ name: 'profileLink' }" tag="a" class="">
            <div class="is-sign-in__card-wrap">
              <div class="is-sign-in__image">
                <img v-if="getUser.photoUrl1" :src="getUser.photoUrl1" alt="">
                <img src="https://placehold.jp/50x50.png?text=moh" v-else>
              </div>
              <div class="is-sign-in__info">
                <p class="login-user">
                  <i class="far fa-user-circle"></i><strong>{{ getUser.displayName }}</strong><span>({{ getUser.age }}歳)ちゃん</span>
                </p>
              </div>
            </div>
          </router-link>
          <div class="control">
            <button class="button is-info is-medium" @click="signOut">SIGN OUT</button>
          </div>
          <ul>
            <li v-for="user, idx in showLikedUser()" :key="user['.key']">Applyした犬:{{ user.displayName }}</li>
          </ul>
        </section>
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
        'getUser',
        'getPartners'
      ])
    },
    methods: {
      showLikedUser () {
        if(!this.getUser.liked) return
        let uidArray = this.getUser.liked
        uidArray = Object.keys(uidArray)
        console.log(uidArray)
        let partnersData = this.getPartners
        console.log(partnersData)
        let newData = partnersData.filter((e)=> {
          if( uidArray.includes(e['.key'])) {
            return e
          }
        })
        return newData
      },
      signIn:function ()  {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          user => {
            console.log(user);
            alert('ログインしました');
            this.$router.push('/')
          },
          err => {
            alert(err.message)
          }
        )
      },
      signOut () {
        firebase.auth().signOut().then(function () {
          alert('ログアウトしました');
        }).catch(function () {
          alert('error.');
        })
      },
    },
    created() {

    }
  }
</script>
<style lang="scss">
  @import "~bulma/sass/utilities/initial-variables";
  @import "../assets/sass/setting";
  .login-area {
    max-width:320px;
    width: 100%;
    margin: 0 auto 2rem;
    .control {
      .button {
        margin-bottom:.5rem;
      }
    }
  }
  .login-user {
    margin-bottom:.5rem;
    text-align: left;
    color: $primaryColor;
    padding-bottom:.2rem;
    strong {
      margin-left:.5rem;
      color: $black;
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
