<template>
  <main class="main">
    <div class="main__content">
      <div class="match-image">
        <img :src="targetUser.photoUrl1" v-if="targetUser.photoUrl1">
        <img src="http://placehold.jp/24/cccccc/ffffff/500x500.png?text=moh-app.site" v-else>
      </div>
      <div class="matching-head">
        <div class="my-profile profile-image">
          <img :src="getUser.photoUrl1" alt="">
        </div>
        <div class="matching-head__icon">
          <img src="../assets/images/ico-match.svg" alt="matching">
        </div>
        <div class="your-profile profile-image">
          <img :src="targetUser.photoUrl1" alt="">
        </div>
      </div>
      <div class="tab-content">
        <ul class="tab-select">
          <li class="active">犬種：柴犬</li>
          <li>母親情報</li>
          <li>父親情報</li>
        </ul>

        <section class="tab">
          <img src="../assets/images/infograph.png">
        </section>
      </div>

      <!--<img :src="" alt="">-->
    </div>
    <moh-login></moh-login>
  </main>

</template>
