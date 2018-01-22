<template>
  <main class="main">
    <div class="main__content">
      <p>マッチしました</p>
    </div>
    <moh-login></moh-login>
  </main>

</template>

<script>
  import Login from './Login.vue'
  export default {
    components: {
      mohLogin: Login
    },
  }
</script>

<style lang="scss">
  @import '../assets/sass/setting';
  .main__content {
    width: 100%;
    max-width:$widthM;
    margin:0 auto;
  }

</style>
