<template>
  <main class="main">
    <div class="main__content">
      <div class="match-image">
        <img :src="targetUser.photoUrl1" v-if="targetUser.photoUrl1">
        <img src="http://placehold.jp/24/cccccc/ffffff/500x500.png?text=moh-app.site" v-else>
      </div>
      <dl class="match-title">
        <dt><img src="../assets/images/ico-heart.svg"></dt>
        <dd><img src="../assets/images/ico-match-type.svg"></dd>
      </dl>
      <div class="introduction">
        {{getUser.displayName}}と{{targetUser.displayName}}はマッチしました。
        シミュレートしてみましょう！
      </div>
     <div class="simulation__buttom">
       <button class="button is-danger is-outlined is-rounded"
               @click="simulate">simulate
       </button>
     </div>

    </div>
    <moh-login></moh-login>
  </main>

</template>

)<script>
  import Login from './Login.vue'
  import { db } from '../main'
  import { mapGetters } from 'vuex'
  import { store } from '../store/index.js'
  export default {
    components: {
      mohLogin: Login
    },
    data () {
      return {
        targetUser: '',
      }
    },
    computed: {
      ...mapGetters([
        'getUser',
        'getpartners'
      ])
    },
    methods: {
      simulate() {
        this.$router.push('/simulate?id=' + this.uid )
      }
    },
    created() {

    },
    beforeCreate() {
      let uid = location.search
      uid = decodeURIComponent(location.search)
      uid = uid.substring(1).split("&")
      uid = uid[0].split("=")
      uid = uid[1]
      this.uid = uid
      let targetRef = db.ref('users/' + uid)
      console.log(targetRef)
      targetRef.once('value').then((snapshot)=> {
        const partnerData = snapshot.val()
        console.log(partnerData)
        this.targetUser = partnerData
      })
    }
  }
</script>

<style lang="scss">
  @import '../assets/sass/setting';
  .match-title {
    max-width:280px;
    margin:0 auto;
    padding:1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    dt {
      width: 30%;
      max-width:40px;
    }
    dd {
      width:65%;
    }
  }
  .simulation__buttom {
    margin-bottom:2rem;
    .button {
      width:100%;
      background-color: $wht;
      filter: drop-shadow(0 0 2px rgba(0,0,0,0.3));
      color: $deepGreen;
    }
  }

  .introduction {
    text-align: left;
    padding:1rem;
    font-size:0.825rem;
    background-color: $wht;
    margin-bottom:1rem;
  }

  .matching-head {
    padding:1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__icon {
      background-image: url('../assets/images/dot-line.svg');
      background-repeat: repeat-x;
      background-position: 50% 45%;
      background-size: 100px 20px;
      width:calc(100% - 140px);
      img {
        width: 100%;
        max-width:40px;
      }
    }
    .profile-image {
      img {
        border-radius: 50%;
        border:4px solid $borerColor;
        object-fit: cover;
        height: 60px;
        width: 60px;
      }
    }
  }
  .tab-content {
    margin-bottom: 1rem;
  }
  .tab-select {
    display: flex;
    justify-content: space-around;
    li {
      box-sizing: border-box;
      background-color: $neutralGray;
      border-top:3px solid $neutralGray;
      color: $wht;
      padding:1rem 0;
      width:32.5%;
      margin:0;
      font-weight:800;
    }
    li.active{
      background-color: $wht;
      border-top:3px solid $primaryColor;
      color: $primaryColor;
    }
  }
  section.tab {
    padding:1rem;
    background-color: $wht;
  }
  .match-image {
    img {
      width:280px;
      height:280px;
      object-fit: cover;
      border-radius: 50%;
      border:6px solid $wht;
      filter: drop-shadow(0 0 5px rgba(0,0,0,0.3));
    }
  }

  .main__content {
    text-align: center;
    width: 100%;
    max-width:$widthM;
    margin:0 auto;
  }
  @include break-at($widthPC){
    .main {
      display: flex;
      justify-content: center;
    }
  }

</style>
