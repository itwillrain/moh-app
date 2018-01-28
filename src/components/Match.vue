<template>
  <main class="main">
    <div class="main__content">
      <img :src="targetUser.photoUrl1" v-if="targetUser.photoUrl1">
      <img src="http://placehold.jp/24/cccccc/ffffff/500x500.png?text=moh-app.site" v-else>

      <p>{{ targetUser.displayName }}ちゃんとマッチしました</p>
      <!--<img :src="" alt="">-->
    </div>
    <moh-login></moh-login>
  </main>

</template>

<script>
  import Login from './Login.vue'
  import { db } from '../main'
  export default {
    components: {
      mohLogin: Login
    },
    data () {
      return {
        targetUser: ''
      }
    },
    computed: {

    },
    methods: {

    },
    created() {

    },
    beforeCreate() {
      let uid = location.search
      uid = decodeURIComponent(location.search)
      uid = uid.substring(1).split("&")
      uid = uid[0].split("=")
      uid = uid[1]
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
