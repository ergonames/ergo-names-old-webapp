<template>
  <div class="page-wrapper">
    <h1 class="title">ErgoNames</h1>
    <img
      alt="logo-ergonames"
      width="500"
      class="logo"
      src="@/assets/logo_1000x1000.jpeg"
    />

    <router-link to="/mint">
      <b-button pill variant="primary">Mint ErgoNames NFT →</b-button>
    </router-link>
    <br />
    <router-link to="/send">
      <b-button pill variant="primary">Send to ErgoNames NFT owner →</b-button>
    </router-link>
    <br />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: {
        inner: 'Home',
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc',
        },
      ],
    }
  },
  computed: mapState('app', ['appTitle']),
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;

  .title {
    color: $vue-color;
    font-size: 100px;
    padding-top: 25px;
    font-weight: bolder;
  }

  .logo {
    margin-bottom: 3rem;
  }

  .home-page-title {
    text-align: center;
  }

  .documentation-link {
    display: inline-block;
    font-size: 1.2rem;
    color: #fff;
    background-color: #5d6788;
    padding: 0.8rem 1.6rem;
    border-radius: 4px;
    transition: background-color 0.1s ease;
    box-sizing: border-box;
    text-decoration: none;
    width: fit-content;
    font-weight: 500;
  }
}
</style>
