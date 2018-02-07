<template>

  <div class="chat-detail">
    <div class="mychat chat-balloon" v-for="chat in chatList"><span>{{chat.chat}}</span></div>
    <div class="form chat-form">
      <div class="textarea-wrap"><textarea id="chat" v-model="chat" cols="30" rows="3"></textarea></div>
      <div class="button-wrap"><button class="button is-primary submit" @click="setMessage()" type="button">送信</button></div>
    </div>

  </div>
</template>

<script>
  import firebase from 'firebase'
  import { firebaseApp, db } from '../../main'
  import { mapGetters ,mapActions } from 'vuex'
  export default {
    data() {
      return {
        chat: '',
        chatList: []
      }
    },
    computed: {

    },
    methods: {
      setMessage(e) {
        const userID = firebase.auth().currentUser.uid
        const chatObj={}
        chatObj.toId = this.sendId
        chatObj.fromId = userID
        chatObj.chat = this.chat
        if(!this.chat) return
        db.ref('/chat/').push(chatObj);
        this.chat = ''
      },
      showChat(chatList) {
        if(chatList.toId === this.sendId) {
          this.chatList.push(chatList)
        }
      }
    },
    created() {
      let uid = location.search
      uid = decodeURIComponent(location.search)
      uid = uid.substring(1).split("&")
      uid = uid[0].split("=")
      uid = uid[1]
      this.sendId = uid

      const chatdb = db.ref('/chat/')
      chatdb.on('child_added', (snapshot)=> {
        let chatList = snapshot.val();
        this.showChat(chatList)
      });
    }
  }
</script>
<style lang="scss">
  @import "../../assets/sass/setting";
  .chat-detail {
    min-height: calc(100vh - 5.25rem);
    position: relative;
    padding-bottom:70px;
  }
  .textarea-wrap {
    padding:.2rem;
  }
  .chat-form {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    bottom:0;
    justify-content: space-between;
    display: flex;
    textarea {
      width:100%;
      padding:.2rem;
    }
    .button-wrap {
      padding:.2rem;
      display: flex;
      align-self: center;
    }
    .submit {
      min-width:80px;
    }
  }
  .main-contents {
    in-height: calc(100vh - 5.25rem);
  }
  .chat-balloon {
    text-align: right;
    span {
      display: inline-block;
      padding:0.5rem;
      background-color: $primaryColor;
      color: $wht;
      margin-bottom:.5rem;
      border-radius: 15px;
    }

  }

</style>
