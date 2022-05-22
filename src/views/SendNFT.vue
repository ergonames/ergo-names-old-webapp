<template>
  <div class="page-wrapper">
    <h1 class="home-page-title">{{ appTitle }}</h1>
    <h3>Send to ergo-names NFT owner</h3>

    <br />
    <div>
      <b-form @submit="resolveErgoName" @reset="onReset">
        <b-form-input
          id="input-1"
          v-model="form.ergoName"
          placeholder="Enter ErgoName ID to check ownership"
          required
        ></b-form-input>
        <br />
        <b-button type="submit" variant="primary"
          >Find ergoName NFT Owner</b-button
        >
      </b-form>
      <p v-if="ergoNameFound">
        {{ form.ergoName }} ErgoName belongs to {{ NFTAddress }} address. You
        can send assets to the NFT owner.
      </p>
      <p v-if="ergoNameNotFound">
        Sorry, {{ form.ergoName }} ErgoName ID can't be found. Try searching for
        something else.
      </p>

      <br />

      <b-form v-if="ergoNameFound" @submit="sendAsset" @reset="onReset">
        <b-form-select
          id="input-2"
          v-model="form.asset"
          placeholder="Asset Type"
          :options="assets"
          required
        ></b-form-select>
        <b-form-input
          id="input-3"
          v-model="form.amount"
          type="number"
          placeholder="Amount"
          required
        ></b-form-input>
        <b-button type="submit" variant="primary">Send</b-button>
      </b-form>
      <p v-if="assetTransmissionSuccessful">
        Successfully sent {{ form.amount }} {{ form.asset }} to the ErgoName ID:
        {{ form.ergoName }}. <br />
        <a href="/send">NFT Transaction Link</a>
      </p>
      <p v-if="assetTransmissionFailure">
        Oh no, we couldn't process sending the selected assets to
        {{ form.ergoName }}. <br />
        Please try again later.
      </p>
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
        inner: 'Send to NFT owner',
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
        asset: null,
        amount: 0,
      },
      assets: [{ text: 'Select One', value: null }, 'Ergo', 'Ada', 'NETA'],
      NFTAddress: null,
      ergoNameFound: false,
      ergoNameNotFound: false,
      assetTransmissionSuccessful: false,
      assetTransmissionFailure: false,
    }
  },
  computed: mapState('app', ['appTitle']),
  methods: {
    resolveErgoName(event) {
      event.preventDefault()
      fetch(
        `https://testnet-api.ergonames.com/ergonames/resolve/${this.form.ergoName}`
      )
        .then(async (response) => {
          const data = await response.json()

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
          }

          this.NFTAddress = data.ergo
          if (data.ergo != null) {
            this.ergoNameFound = true
            this.ergoNameNotFound = false
          } else {
            this.ergoNameFound = false
            this.ergoNameNotFound = true
          }
          return null
        })
        .catch((error) => {
          console.error('There was an error!', error)
          // eslint-disable-next-line
          alert('Oops, we encountered an unexpected issue.')
          this.ergoNameAvailable = false
          this.ergoNameUnavailable = false
        })
    },
    sendAsset(event) {
      event.preventDefault()
      // eslint-disable-next-line
      alert(JSON.stringify(this.form))
      // AJAX Call
      this.assetTransmissionSuccessful = true
      this.assetTransmissionFailure = false
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.ergoName = ''
      this.form.asset = null
      this.form.amount = 0
      // Trick to reset/clear native browser form validation state
      this.ergoNameFound = false
      this.ergoNameNotFound = false
      this.assetTransmissionSuccessful = false
      this.assetTransmissionFailure = false
      // TODO: validate if nextTick logic is correct
      this.$nextTick(() => {
        this.ergoNameFound = false
        this.ergoNameNotFound = false
        this.assetTransmissionSuccessful = false
        this.assetTransmissionFailure = false
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
