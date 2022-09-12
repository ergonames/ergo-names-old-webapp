<template>
  <div class="page-wrapper">
    <h3 class="page-header">Mint your ErgoNames NFT</h3>

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
      <b class="wallet-directions">
        To use the "connect wallet" feature, please install<a class="wallet-link" href="https://github.com/capt-nemo429/nautilus-wallet">Nautilus</a>
        wallet and connect your ERG wallet there.
      </b>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// eslint-disable-next-line
import { resolve_ergoname } from 'ergonames'
import axios from 'axios'

// eslint-disable-next-line
const ergonamesTxLib = import('ergonames-tx-lib')

export default {
  head() {
    return {
      title: {
        inner: 'Mint',
        separator: ' |  ',
        complement: 'ErgoNames',
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
      console.log(this.form.ergoName)
      const resolvedErgoName = await resolve_ergoname(this.form.ergoName).then((data) => {return data })
      console.log(resolvedErgoName)
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

      // eslint-disable-next-line
      const amountToBeSent = 3000000
      // eslint-disable-next-line
      const txInfo = await ergoConnector.nautilus.connect().then(async () => {
          // eslint-disable-next-line
          const addr = await ergo.get_change_address()
          // eslint-disable-next-line
          const txIdBoxId = (await ergonamesTxLib).send_transaction(amountToBeSent, this.form.ergoName, addr).then(data => { return data })
          return txIdBoxId
        })
        // console log error
        .catch((error) => {
          console.log('Cannot send transaction')
          console.log(error)
        })
      console.log(txInfo)
      const apiUrl = process.env.VUE_APP_API_REQUEST_URL
      axios
        .post(
          apiUrl,
          {
            paymentTxId: txInfo[0],
            mintingRequestBoxId: txInfo[1],
          },
          {
            headers:
            {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Headers':'*',
            },
          }
        )
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      this.alertDisplay(txInfo[0])
    },
    alertDisplay(txId) {
      // eslint-disable-next-line
      let explorerLink = 'https://explorer.ergoplatform.com/en/transactions/' + txId
      this.$swal({
        title: 'Transaction ID',
        html: `<a href=${explorerLink}>${txId}</a>`,
        icon: 'success',
        confirmButtonText: 'OK',
      })
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

  .page-header {
    color: white;
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

  .wallet-directions {
    color: white;
  }

  .wallet-link {
    color: rgb(166, 166, 166);
  }

  .wallet-link:hover {
    color: $vue-color;
  }
}
</style>
