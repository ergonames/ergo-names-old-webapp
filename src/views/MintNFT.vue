<template>
  <div class="page-wrapper">
    <h1 class="home-page-title">{{ appTitle }}</h1>
    <h3>Mint your ergo-names NFT</h3>

    <br />
    <div>
      <b-form @submit="checkAvailability" @reset="onReset">
        <b-form-input
          id="input-1"
          v-model="form.ergoName"
          placeholder="Enter ErgoName ID to check availability"
          required
        ></b-form-input>
        <br />
        <b-button type="submit" variant="primary">Check availability</b-button>
      </b-form>
      <p v-if="ergoNameAvailable">
        {{ form.ergoName }} ErgoName ID is available. You can claim it by
        spending 1 ERG
      </p>
      <p v-if="ergoNameUnavailable">
        Sorry, {{ form.ergoName }} ErgoName ID is not available. Try searching
        for something else.
      </p>

      <br />

      <b-form v-if="ergoNameAvailable" @submit="mintNFT" @reset="onReset">
        <b-button type="submit" variant="primary">Mint ErgoName NFT</b-button>
      </b-form>
      <p v-if="ergoMintingSuccessful">
        Minting of ErgoName {{ form.ergoName }} is successful. <br />
        You will receive the NFT in your wallet in next block. <br />
        <a href="/mint">NFT Transaction Link</a>
      </p>
      <p v-if="ergoMintingFailure">
        Oh no, minting of ErgoName {{ form.ergoName }} was unsuccessful. <br />
        Please try again later.
      </p>
      <b
        >To use the "connect wallet" feature, please install Nautilus Testnet
        wallet and connect your ERG wallet there.</b
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// eslint-disable-next-line
import { resolve_ergoname } from 'ergonames'

const ergonamesTxLib = import('ergonames-tx-lib')

// function displayTxId(txId) {
//   // eslint-disable-next-line
//   alert(
//     `<a href="https://testnet.ergoplatform.com/en/transactions/${txId}" target='_blank'> Transaction on the explorer</a>`
//   )
// }

export default {
  head() {
    return {
      title: {
        inner: 'Mint ergo-names NFT',
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
  data() {
    return {
      form: {
        ergoName: '',
      },
      NFTAddress: null,
      ergoNameAvailable: false,
      ergoNameUnavailable: false,
      ergoMintingSuccessful: false,
      ergoMintingFailure: false,
    }
  },
  computed: mapState('app', ['appTitle']),
  methods: {
    async checkAvailability(event) {
      event.preventDefault()
      // eslint-disable-next-line
      const ergoName = this.form.ergoName
      console.log(ergoName)
      const resolvedErgoName = null // await resolve_ergoname(ergoName)
      if (resolvedErgoName == null) {
        this.ergoNameAvailable = true
        this.ergoNameUnavailable = false
      } else {
        this.ergoNameAvailable = false
        this.ergoNameUnavailable = true
      }
    },
    async mintNFT(event) {
      event.preventDefault()
      // ================================= Send money ============================
      const amountToBeSent = 520000000
      // eslint-disable-next-line
      const txInfo = await ergoConnector.nautilus.connect().then(async () => {
          // eslint-disable-next-line
        const addr = await ergo.get_change_address()
          // eslint-disable-next-line
        const txIdBoxId = (await ergonamesTxLib).send_transaction(amountToBeSent, this.form.ergoName, addr).then(data => { return data })
          return txIdBoxId
        })
        .catch(() => {
          console.log('Cannot send transaction')
        })
      console.log(txInfo)
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.ergoName = ''
      // Trick to reset/clear native browser form validation state
      this.ergoNameAvailable = false
      this.ergoNameUnavailable = false
      this.ergoMintingSuccessful = false
      this.ergoMintingFailure = false
      // TODO: fixme
      this.$nextTick(() => {
        this.ergoNameAvailable = false
        this.ergoNameUnavailable = false
        this.ergoMintingSuccessful = false
        this.ergoMintingFailure = false
      })
    },
  },
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
