// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
// import 'babel-polyfill'
import './global'
// import VueQuillEditor from 'vue-quill-editor'
// import Vuex from 'vuex';
// import {createEditor} from 'vueditor';
// import 'vueditor/dist/style/vueditor.min.css'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import axios from 'axios';

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '../theme/index.less';

import CryptoJS from 'crypto-js';
import Icon from 'vue-svg-icon/Icon.vue';
import VueParticles from 'vue-particles'
import VueLocalStorage from 'vue-ls';

import VueHtml5Editor from 'vue-html5-editor'

// var Promise = require('es6-promise').Promise;

// Vue.use(Vuex);

let options = {
  namespace: 'vuejs__'
};

// var VueQuillEditor = require('vue-quill-editor')

Vue.use(VueLocalStorage, options);
require('vue2-animate/dist/vue2-animate.min.css')
var TWEEN = require('tween.js');

Vue.config.productionTip = false

Vue.use(iView);
Vue.component('icon', Icon);
Vue.use(VueParticles);

// Vue.use(VueQuillEditor)

Vue.prototype.$request = axios
Vue.prototype.$CryptoJS = CryptoJS

//Vueditor编辑器配置
let textoptions = {
  name: "vue-html5-editor",
  visibleModules: [],
};
Vue.use(VueHtml5Editor,textoptions);
// createEditor('#editorContainer', {
//     toolbar: [
//       'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 
//     ],
//     uploadUrl: '',
//     id: '',
//     classList: []
//   });
// Vue.use(Vueditor, config);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { 
  	App
  	// quillEditor,
   }
})
