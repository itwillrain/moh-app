<template>
  <ul class="chat-list">
    <li class="chat-info" v-for="partner, idx in matchedUser" :key="partner['.key']">
        <a @click="toDetail(partner.uid)" :id="partner.uid">
        <div class="thumb">
          <img v-if="partner.photoUrl1" :src="partner.photoUrl1" alt="">
          <img src="http://placehold.jp/14/cccccc/ffffff/120x120.png?moh" alt="" v-else>
        </div>
        <div class="info">
          <p class="name">{{partner.displayName}}</p>
          <p class="latest-message" v-if="chatList"> {{ recentChat(partner.uid) }}</p>
        </div>
        </a>
    </li>
  </ul>
</template>
<script>
  import firebase from 'firebase'
  import { firebaseApp, db } from '../../main'
  import { mapGetters ,mapActions } from 'vuex'
  export default {
    data() {
      return {
        matchedUser: [],
        chatList: '',
        chat: 'chat'
      }
    },
    computed: {
      ...mapGetters([
        'getUser',
        'getPartners'
      ])
    },
    methods: {
      toDetail(e) {
        this.$router.push('/chat/detail?id=' + e)
      },
      recentChat(id){
        const chatObj = Object.values(this.chatList).filter((e,i,arr) => {
          if(e.fromId === id) {
            return e
          }
        })
        const currentOne = chatObj[0].chat;
        return currentOne
      }
    },
    beforeCreate() {
      const matchList = db.ref('match')
      matchList.once('value').then((snapshot)=> {
        const matchData = snapshot.val()
        const userID = firebase.auth().currentUser.uid
        const obj = Object.values(matchData)
        let itemsId = []
        obj.forEach((e,i,arr) => {
          if(e.id2 === userID ) {
            itemsId.push(e.id1)
          } else if(e.id1 === userID) {
            itemsId.push(e.id2)
          }
        })
        this.itemsId = itemsId
       })
      const usersdb = db.ref('/users/')
      usersdb.once('value').then((snapshot)=> {
        const users = snapshot.val()
        Object.keys(users).filter((e,i,arr)=> {
          if(this.itemsId.includes(e)) {
            this.matchedUser.push(Object.values(users)[i]);
          }
        })
      })
      const chatdb = db.ref('/chat/')
      chatdb.once('value').then((snapshot)=>{
        const chat = snapshot.val()
        this.chatList  = chat
      })
    }
  }
</script>
<style lang="scss" scopped>
  @import "../../assets/sass/setting";
  .chat-area {
  }
  .chat-list {
    background-color:$wht;
    max-width: $widthM;
    margin: 0 auto;
    li {
      border-bottom: 1px solid $borerColor;
      width: 100%;
      margin: 0;
      a {
        display: flex;
        padding:.5rem;
        justify-content: flex-start;
        align-items: flex-end;
        &:hover {
          background: $paleGray;
        }
      }
    }
    .thumb {
      img {
        object-fit: cover;
        min-width:60px;
        width: 60px;
        height:60px;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
      }
    }
    .info {
      padding: 0.5rem;
      .name {
        font-weight: 600;
        text-align: left;
      }
      .latest-message {
        font-size:14px;
        color: $lightGray;
        &::before {
          content: '\f112';
          font-family: FontAwesome;
          display: inline-block;
          margin-right: 0.5rem;
        }
      }
    }

  }
</style>
