import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueParticles from 'vue-particles'
import Vcomp from './components/index'
import Toast from './components/toast'
import echarts from 'echarts'
import '@/assets/styles/base.scss'
import '@/assets/styles/common.scss'
import '@/assets/iconfont/iconfont.css'
import echartsGL from 'echarts-gl'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import DataV from '@jiaminghi/data-view'

Vue.use(DataV)
Vue.use(vueParticles)
Vue.use(Vcomp)
Vue.config.productionTip = false

Vue.prototype.$Toast = Toast
Vue.prototype.$echarts = echarts
Vue.prototype.$echartsGL = echartsGL
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
	  document.title = to.meta.title;
	}
	next();
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
