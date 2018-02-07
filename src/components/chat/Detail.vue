<template>

  <div class="chat-detail">
    <div v-for="chat in chatList">
      <div v-if="chat.mychat" class="mychat chat-balloon"><span>{{chat.mychat}}</span></div>
      <div v-if="chat.yourchat" class="yourchat chat-balloon"><span>{{chat.yourchat}}</span></div>
    </div>
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
        const chatObj={}
        chatObj.toId = this.sendId
        chatObj.fromId = this.userID
        chatObj.chat = this.chat
        if(!this.chat) return
        db.ref('/chat/').push(chatObj);
        this.chat = ''
      },
      showChat(chatList) {
        if(chatList.toId === this.sendId) {
          let myChat = {
             mychat: chatList.chat
          }
          this.chatList.push(myChat)
        }
        if(chatList.fromId === this.sendId) {
          let yourChat = {
            yourchat: chatList.chat
          }
          this.chatList.push(yourChat)
        }
      }
    },
    created() {
      this.userID = firebase.auth().currentUser.uid
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
    padding-bottom:80px;
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
      font-size:16px;
      width:100%;
      padding:.2rem;
      display: inherit;
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
      padding: 0.2rem 0.5rem;
      background-color: $primaryColor;
      color: $wht;
      margin-bottom:.5rem;
      border-radius: 15px;
    }
  }
  .yourchat {
    text-align: left;
    span {
      background-color: $wht;
      color: $blk;
    }
  }

</style>
