<template>
  <nav class="header-nav navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'signInLink' }" tag="a" class="navbar-item signin">
        <img src="../assets/images/logo-type.svg" alt="Moh" width="112" height="28">
      </router-link>
      <router-link :to="{ name: 'profileLink' }" tag="a" class="navbar-item profile">
        <span class="icon is-small is-left"><i class="fas fa-user-circle"></i></span>
      </router-link>
      <router-link :to="{ name: 'profileEditLink' }" tag="a" class="navbar-item profile-edit">
        <span class="icon is-small is-left"><i class="fas fa-pencil-alt"></i></span>
      </router-link>
      <router-link :to="{ name: 'chatListLink' }" tag="a" class="navbar-item chat">
        <span class="icon is-small is-left"><i class="fas fa-comment"></i></span>
      </router-link>
      <!--<router-link :to="{ name: 'chatDetailLink' }" tag="a" class="navbar-item"></router-link>-->
    </div>
  </nav>
</template>

<script>

</script>

<style lang="scss" scopped>
  @import "../assets/sass/setting";
  .header-nav {
    position: sticky;
    top:0;
    z-index: 999;
    background-color: $primaryBgColor;
    .navbar-item {
      color: $linkLightColor;
      &::before {
        display: inline-block;
        font-family: FontAwesome;
      }
    }
  }
</style>
