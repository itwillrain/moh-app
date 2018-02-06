<template>
  <main class="main">

    <div class="is-loggedin profile-card-list" v-if="currentUser">
      <article class="profile-card" v-for="partner, idx in refinedUsers" :key="partner['.key']">
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
            </div>
            <div class="profile-info__sub">
              <!--<span class="sex">オス</span>-->
              <span :class="genderClass(partner.gender)"
                    class="gender">{{ setGender( partner.gender ) }}</span>
              <span class="area">東京都</span>
            </div>
            <hr>
          </div>
          <div class="control-button">
            <button :class="{'is-liked': isLiked(partner.key)}"
                    class="button is-danger is-outlined is-rounded"
                    :id="partner['key']"
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
  import { moment,jquery } from '../App.vue'
  import Login from './Login.vue'
  export default {
    name: 'Signin',
    data () {
      return {
        email: '',
        password: '',
        message: '',
        applyStatus: 'Apply',
        refinedUsers: []
      }
    },
    components: {
      Carousel,
      Slide,
      mohLogin: Login
    },
    computed: {
      ...mapGetters([
        'getUser',
        'getPartners'
      ]),
      currentUser: function() {
        return this.$store.getters['auth/user'].auth
      }
    },
    methods: {
      showUsers(userData) {
        console.dir(userData)
        const refineArray = Object.values(userData).map((e,i,arr)=>{
          e.key = Object.keys(userData)[i]
          return e
        })
        console.dir(refineArray)
        //自分のUIDを非表示
        this.refinedUsers = refineArray.filter((e,i,arr)=> {
//          console.log(e.gender)
          if (e['.key'] !== this.getUser['.key'] && e.gender !== this.getUser['gender'] && e.gender !== undefined && this.getUser['breed'] === e.breed ){
//            console.warn(e['.key'])
            return e
          }
        })
      },
      genderClass: (gender) => {
        if(gender === 'female'){
          return 'is-female'
        }else{
          return 'is-male'
        }
      },
      isLiked (uid) {
        if(!this.getUser.liked) return
        return Object.keys(this.getUser.liked).includes(uid);
      },
      setGender (gender) {
        if(gender === 'female') {
          return '女の子'
        } else if(gender === 'male'){
          return '男の子'
        } else {
          return '性別未登録'
        }
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
        const targetRef = db.ref('users/' + targetUid)
        targetRef.once('value').then((snapshot)=> {
          const partnerData = snapshot.val()
          if(!partnerData.liked) return
          const targetLiked = partnerData.liked
          const checkMatchStatus = Object.keys(targetLiked).includes(userID)
          if(checkMatchStatus) {
            const matchObj ={
              id1: targetUid,
              id2: userID,
              createAt: moment().format()
            }
            //マッチテーブル追加
            db.ref('match').once('value').then((snapshot)=>{
              const keyArray = Object.keys(snapshot.val())
              let hasMatch = ''
              if( !keyArray.includes(userID + '_' + targetUid) && !keyArray.includes(targetUid + '_' + userID) ) {
                db.ref('/match/' + userID + '_' + targetUid).set(matchObj)
              }
              this.$router.push('/match?id=' + targetUid )
          })
          }
        })

      }
    },
    beforeCreate () {
      const users = db.ref('/users/')
      users.once('value').then((snapshot)=>{
        this.showUsers(snapshot.val())
      })
    }
  }
</script>

<style lang="scss">
  @import "../assets/sass/setting";

  .is-male {
    color:$primaryColor;
  }
  .is-female{
    color:hsl(348, 100%, 61%);
  }
  .main {
    display: block;
  }
  .particles-js {
    background-image: url(/static/img/sky.871d198.jpg);
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #363636;
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
  @include break-at($widthPC){
    .main {
      display: flex;
      justify-content: center;
    }
  }
</style>

