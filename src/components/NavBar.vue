<template>
  <header class="navbar" :class="{ offline: !networkOnLine }">
    <router-link to="/home">
      <img alt="logo-bento" class="logo" src="@/assets/logo_256x256.jpg" />
      <span class="site-name title-desktop">ErgoNames</span>
      <span class="site-name title-mobile">ErgoNames</span>
    </router-link>
    <div class="links">
      <nav class="nav-links">
        <div class="nav-item">
          <router-link to="/mint">Mint ErgoNames NFT</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/resolve">Resolve ErgoNames NFT</router-link>
        </div>
        <div v-if="!walletConnected" class="nav-item" @click="connectWallet">
          <b-button variant="primary">Connect wallet</b-button>
        </div>
        <div v-if="walletConnected" class="nav-item">
          <b-button disabled variant="success"
            >{{ walletBalance }} ERG</b-button
          >
        </div>
        <div v-if="!networkOnLine" class="nav-item offline-label">Offline</div>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      walletConnected: false,
      walletBalance: 0,
    }
  },
  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle']),
  },
  methods: {
    connectWallet() {
      // eslint-disable-next-line
      ergoConnector.nautilus.connect().then((success) => {
        if (success) {
          // eslint-disable-next-line
          this.walletConnected = true
          // eslint-disable-next-line
          ergo.get_balance().then(bal => {
            this.walletBalance = bal / 1e9
          })
        } else {
          // eslint-disable-next-line
          this.walletConnected = false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.navbar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  right: 0;
  height: $navbar-height;
  background-color: $navbar-color;
  box-sizing: border-box;
  border-bottom: 1px solid #a7a7a7;
  padding: 0.7rem 1.5rem;
  line-height: 2.2rem;

  a {
    display: flex;
    align-items: center;
  }

  .title-desktop {
    display: inline;
  }

  .title-mobile {
    display: none;
  }

  @media (max-width: 500px) {
    padding: 0.7rem 0.7rem;

    .can-hide {
      display: none;
    }

    .title-desktop {
      display: none;
    }

    .title-mobile {
      display: block;
    }
  }

  .site-name {
    font-size: 1.3rem;
    font-weight: 600;
    color: $vue-color;
    position: relative;
  }

  .logo {
    height: 24px;
    padding-right: 8px;
  }

  .links {
    padding-left: 1.5rem;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
    right: 1.5rem;
    top: 0.7rem;
    display: flex;

    .nav-links {
      display: flex;
      align-items: center;
      justify-content: center;

      .nav-item {
        position: relative;
        display: inline-block;
        margin-left: 1.5rem;
        line-height: 2.2rem;

        &:first-child {
          margin-left: 0;
        }

        a {
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          color: $navbar-link-color;
          border-color: #2c3e50;
          line-height: 1.4rem;
          display: inline-block;
          cursor: pointer;
        }

        @mixin activatedLink() {
          margin-bottom: -2px;
          border-bottom: 2px solid $vue-color;
        }

        .router-link-active {
          @include activatedLink;
        }

        @media (hover) {
          :hover {
            @include activatedLink;
          }
        }
      }
    }
  }

  &.offline {
    background: $navbar-offline-color;
    .links .nav-links .nav-item a,
    .site-name {
      color: white;
    }
  }

  .user-picture {
    max-height: 32px;
    margin-left: 1.5rem;
    border-radius: 50%;
  }

  .offline-label {
    padding: 0px 10px;
    border: 1px solid white;
    border-radius: 5px;
    color: white;
    margin-left: 1.5rem;
  }
}
</style>
