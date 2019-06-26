import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Bodyer from '@/components/Bodyer'
import RegService from '@/components/register/Index'
import Depart from '@/components/register/Depart'
import Doctor from '@/components/register/Doctor'
import RegOrder from '@/components/register/RegOrder'
import RegResult from '@/components/register/Result'
import Login from '@/components/Login'
import User from '@/components/User'
import Payment from '@/components/Payment'
import PayResult from '@/components/PayResult'
import Wechat from '@/components/Wechat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Bodyer',
      component: Bodyer
    },
    {
      path: '/header',
      name: 'Header',
      component: Header
    },
    {
      path: '/footer',
      name: 'Footer',
      component: Footer
    },
    {
      path: '/register/service',
      name: 'RegService',
      component: RegService
    },
    {
      path: '/register/depart',
      name: 'Depart',
      component: Depart
    },
    {
      path: '/register/doctor',
      name: 'Doctor',
      component: Doctor
    },
    {
      path: '/register/reg-order',
      name: 'RegOrder',
      component: RegOrder
    },
    {
      path: '/register/reg-result',
      name: 'RegResult',
      component: RegResult
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/pay-result',
      name: 'PayResult',
      component: PayResult
    },
    {
      path: '/wechat',
      name: 'Wechat',
      component: Wechat
    },
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})