<template>
 <div class="profile-edit-area">
   <form action="">
    <h3 class="title is-5">プロフィール編集</h3>
    <div class="field">
      <label class="label">Username</label>
      <div class="control has-icons-left has-icons-right">
        <p></p>
        <input class="input" type="text" placeholder="お名前" :value="getUser.displayName" @input="updateUserDisplayName">
        <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
        <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
      </div>
      <!--<p class="help is-success">This username is available</p>-->
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="Email input" v-model="currentUser.email">
        <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
        <span class="icon is-small is-right"><i class="fas fa-exclamation-triangle"></i>
    </span>
      </div>
      <!--<p class="help is-danger">This email is invalid</p>-->
    </div>

    <div class="field">
      <label class="label">犬種</label>
      <div class="control">
        <div class="select">
          <select :value="getUser.breed" @input="updateUserBreed">
            <option value="" v-for="breed in breedOptions" :value="breed.value">{{ breed.text }}</option>
          </select>
        </div>
        <!--<input class="input" type="text" placeholder="" :value="getUser.breed" @input="updateUserBreed">-->
      </div>
    </div>

    <div class="field">
      <label class="label">Gender</label>
      <div class="control">
        <div class="select">
          <select :value="getUser.gender" @input="updateUserGender">
            <option v-for="gender in genderOptions" v-bind:value="gender.value">{{ gender.text }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <label class="label">Age</label>
      <div class="control">
        <input class="input" type="number" placeholder="" :value="getUser.age" @input="updateUserAge">
      </div>
    </div>

    <div class="field">
      <label class="label">紹介文</label>
      <div class="control">
        <textarea class="textarea" :value="getUser.description" @input="updateUserDesc" placeholder="性格など"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">写真URL</label>
      <div class="control">
        <input class="input" type="text" placeholder="" :value="getUser.photoUrl1" @input="updateUserPhotoUrl1">
      </div>
    </div>

    <div class="field">
      <label class="label">写真URL2</label>
      <div class="control">
        <input class="input" type="text" placeholder="" :value="getUser.photoUrl2" @input="updateUserPhotoUrl2">
      </div>
    </div>

    <div class="field">
      <label class="label">写真URL3</label>
      <div class="control">
        <input class="input" type="text" placeholder="" :value="getUser.photoUrl3" @input="updateUserPhotoUrl3">
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-primary" @click="saveUserProfile" type="button">Submit</button>
      </div>
    </div>
  </form>
 </div>
</template>

<script>
  import firebase from 'firebase'
  import { firebaseApp, db } from '../../main'
  import { mapGetters ,mapActions } from 'vuex'

  export default {
    data() {
      return {
        genderOptions: [
          { text: '男の子', value: 'male' },
          { text: '女の子', value: 'female' }
        ],
        selectedUsers: [],
        breedOptions:[
          { text: '柴犬', value: '柴犬'},
          { text: 'ラブラドール', value: 'ラブラドール' },
          { text: 'ゴールデンレトリーバー', value: 'ゴールデンレトリーバー' },
          { text: 'パグ', value: 'パグ' },
          { text: 'ミニチュア・シュナウザー', value: 'ミニチュア・シュナウザー' },
          { text: 'ボーダー・コリー', value: 'ボーダー・コリー' },
          { text: 'チワワ', value: 'ポメラニアン'},
          { text: 'ビーグル', value: 'ビーグル'},
          { text: 'ボストン・テリア', value: 'ボストン・テリア' },
          { text: 'ダックスフンド ', value: 'ダックスフンド' }
        ]
      }
    },
    computed: {
      currentUser: function() {
        return this.$store.getters['auth/user']
      },
      ...mapGetters([
        'getUser',
        'getPartners'
      ])
    },
    methods: {
      saveUserProfile() {
        let router = this.$router;
        this.addUid(this.currentUser.uid)
        const obj = this.getUser
        delete obj['.key']
        delete obj['.value']
        db.ref('partners/' + this.currentUser.uid ).set(this.getUser);
        db.ref('users/' + this.currentUser.uid ).set(
          obj
        ).then( function() {
          alert('編集が完了しました')
          router.push('/profile/');
        }).catch(function(error) {
          alert(error)
        })

      },
      addUid (uid) {
        this.$store.commit('addUid', uid)
      },
      updateUserAge (e) {
        this.$store.commit('updateUserAge', e.target.value)
      },
      updateUserDesc (e) {
        this.$store.commit('updateUserDesc', e.target.value)
      },
      updateUserDisplayName (e) {
        this.$store.commit('updateUserDisplayName', e.target.value)
      },
      updateUserGender(e) {
        this.$store.commit('updateUserGender', e.target.value)
      },
      updateUserBreed(e) {
        this.$store.commit('updateUserBreed', e.target.value)
      },
      updateUserPhotoUrl1(e) {
        this.$store.commit('updateUserPhotoUrl1', e.target.value)
      },
      updateUserPhotoUrl2(e) {
        this.$store.commit('updateUserPhotoUrl2', e.target.value)
      },
      updateUserPhotoUrl3(e) {
        this.$store.commit('updateUserPhotoUrl3', e.target.value)
      }
    }
  }
</script>

<style lang="scss" scopped>
  @import "../../assets/sass/setting.scss";
  .profile-edit-area {
    max-width: $widthM;
    margin:0 auto;
  }
</style>
