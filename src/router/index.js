import Vue from 'vue'
import Router from 'vue-router'
import Head from 'vue-head'
import Home from '@/views/Home'
import MintNFT from '@/views/MintNFT'
import SendNFT from '@/views/SendNFT'

Vue.use(Router)

/* If you don't know about VueHead, please refer to https://github.com/ktquez/vue-head */

Vue.use(Head, {
  complement: process.env.VUE_APP_TITLE,
})

/* If you don't know about VueRouter, please refer to https://router.vuejs.org/ */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/mint',
      name: 'mint',
      component: MintNFT,
      meta: {
        authNotRequired: true,
      },
    },
    {
      path: '/send',
      name: 'send',
      component: SendNFT,
      meta: {
        authNotRequired: true,
      },
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        authNotRequired: true,
      },
    },
    { path: '*', redirect: '/home' },
  ],
})

/**
 * Handle user redirections
 */
// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default router
