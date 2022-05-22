<template>
  <div class="page-wrapper">
    <img
      alt="logo-ergonames"
      width="500"
      class="logo"
      src="@/assets/ergoname-light.png"
    />

    <router-link to="/mint">
      <b-button pill variant="primary">Mint ergo-names NFT →</b-button>
    </router-link>
    <br />
    <router-link to="/send">
      <b-button pill variant="primary">Send to ergo-names NFT owner →</b-button>
    </router-link>
    <br />
    <div>
      <b
        >To use the "connect wallet" feature, please install Yoroi Nightly
        wallet and connect your ERG wallet there.</b
      >
    </div>
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
