<template>
  <main class="main">
    <div class="is-loggedin profile-card-list" v-if="currentUser">
      <article class="profile-card" v-for="partner, idx in refinedPartners" :key="partner['.key']">
        <div class="profile-wrap">
          <div class="profile-photo-slide">
            <carousel :perPage="1" paginationActiveColor="#42b983" paginationColor="#b2ebd1" :paginationSize='5' easing="linear">
              <slide>
                <img v-if="partner.photoUrl1" v-bind:src="partner.photoUrl1" alt="プロフィール写真">
                <img src="http://placehold.jp/24/cccccc/ffffff/500x500.png?text=moh-app.site" v-else>
              </slide>
              <slide v-if="partner.photoUrl2">
                <img v-bind:src="partner.photoUrl2" alt="プロフィール写真">
              </slide>
              <slide v-if="partner.photoUrl3">
                <img v-bind:src="partner.photoUrl3" alt="プロフィール写真">
              </slide>
            </carousel>
          </div>
          <div class="breed">
            <span class="tag is-primary is-rounded" v-if="partner.breed">{{ partner.breed }}</span>
          </div>
          <div class="profile-info">
            <div class="profile-info__head">
              <span class="name">{{ partner.displayName }}</span>
              <span class="age" v-if="partner.age">({{ partner.age }}歳)</span>
              <!--<span class="gender">{{ setGender }}</span>-->
            </div>
            <div class="profile-info__sub">
              <!--<span class="sex">オス</span>-->
              <span class="area">東京都</span>
            </div>
            <hr>
          </div>
          <div class="control-button">
            <button :class="{'is-liked': isLiked(partner['.key'])}"
                    class="button is-danger is-outlined is-rounded"
                    :id="partner['.key']"
                    @click="updateUsersLiked">
              <i class="fas fa-heart"></i><span>{{ applyStatus }}</span></button>
          </div>
          <div class="profile-discription">
            <p>{{ partner.description }}</p>
          </div>
        </div>
      </article>
    </div>
    <moh-login></moh-login>
  </main>
</template>
<script>
  import firebase from 'firebase'
  import { firebaseApp, db } from '../main'
  import { store } from '../store/index.js'
  import { mapGetters } from 'vuex'
  import { Carousel, Slide } from 'vue-carousel'
  import { moment } from '../App.vue'
  import { jquery } from '../App.vue'
  import Login from './Login.vue'
  export default {
    name: 'Signin',
    data () {
      return {
        email: '',
        password: '',
        message: '',
        applyStatus: 'Apply',
      }
    },
    components: {
      Carousel,
      Slide,
      mohLogin: Login
    },
    computed: {
      currentUser: function() {
        return this.$store.getters['auth/user'].auth
      },
      refinedPartners () {
        this.refineData = this.getPartners
//        console.log(this.getUser['.key'])
        let refineData = this.refineData.filter((e,i,arr)=> {
//          console.log(e['.key'])
          if (e['.key'] !== this.getUser['.key']){
//            console.warn(e['.key'])
            return e
          }
        })
        this.refineData = refineData
//        console.log(this.refineData)
        return refineData
      },
      ...mapGetters([
        'getUser',
        'getPartners'
      ])
    },
    methods: {
      isLiked (uid) {
        if(!this.getUser.liked) return
        return Object.keys(this.getUser.liked).includes(uid);
      },
      updateUsersLiked (e) {
        if(this.applyStatus === 'Apply' ) {
          this.applyStatus = 'Done'
        }
        if(this.applyStatus === 'Done' ){
          this.applyStatus = 'Apply'
        }
        //クリックしたUIDを代入
        const targetUid = e.currentTarget.id
        const userID = firebase.auth().currentUser.uid
        db.ref('/users/' + userID + '/liked/' + targetUid).set(
          moment().format()
        )
        //クリックしたUIDのユーザーデータからLIKE一覧を取得
        let partnerData = this.getUser[targetUid]
        let targetRef = db.ref('users/' + targetUid)
        targetRef.once('value').then((snapshot)=> {
          const partnerData = snapshot.val()
          if(!partnerData.liked) return
          const targetLiked = partnerData.liked
          const checkMatchStatus = Object.keys(targetLiked).includes(userID)
          if(checkMatchStatus) {
            alert(partnerData.displayName + 'ちゃんとmatchしました')
          }
        })



      }
    },
    created () {


    }
  }
</script>

<style lang="scss">
  @import "../assets/sass/setting";
  .main {
    display: block;
  }

  .profile-card-list {
    max-width: $widthM;
    margin:0 auto;
  }

  .sign-in {
    padding: .5rem;
    max-width: $widthTab;
    margin:0 auto;
  }
  .profile-photo-slide {
    max-width: $widthTab;
    margin: 0 auto;
  }
  .VueCarousel-slide {
    img {
      width: 100%;
    }
  }
  .profile-wrap {
    margin-bottom:3rem;
  }
  .control-button {
    text-align: center;
    margin-bottom:1rem;
    span {
      margin: 0 .5rem;
    }
    .button.is-danger.is-outlined:focus {
      box-shadow: none;
    }
    .button {
      &.is-liked {
        background-color: $isDone !important;
        border:$isDone;
        color: $wht;
      }
    }
  }
  .profile-info {
    padding: 0 0.5rem;
    text-align: center;
    .name {
      font-size: 20px;
    }
  }
  .profile-info__sub {
    .area {
      font-size:12px;
    }
  }
  .profile-discription {
    padding:.5rem;
  }
  .VueCarousel-pagination {
    position: absolute;
    bottom: 10px;
  }
  .breed {
    text-align: center;
    margin-bottom:.5rem;
  }
  .button-field {
    .control {
      text-align: center;
      .button {
        width:100%;
      }
    }
  }
  @include break-at($widthPC) {
    .main {
      display: flex;
      justify-content: center;
    }
  }
</style>

