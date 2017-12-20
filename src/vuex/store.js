import Vue  from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

// import Vueditor from 'vueditor';
// import 'vueditor/dist/style/vueditor.min.css'

Vue.use(Vuex)

let config = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor'
  ],
  fontName: [
    {val: 'arial black'}, 
    {val: 'times new roman'}, 
    {val: 'Courier New'}
  ],
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
  uploadUrl: ''
};


// Vue.use(Vuex);
// Vue.use(Vueditor, config);

export default new Vuex.Store({
  state: {
    username: '',
    email: '',
    token: '',
    role: 0,
    user_id: null,
  },
  mutations: {
    Set_UserInfo(state, userinfo) {
      // console.log(userinfo.userinfo);
      state.email = userinfo.userinfo.email;
      state.username = userinfo.userinfo.name;
      state.user_id = userinfo.userinfo.user_id;
      state.role = userinfo.userinfo.role;
    },
    Set_UserID(state, user) {
      state.user_id = user.user_id;
    },
  },
  actions: {
    SET_USER_INFO({commit}, userinfo) {
      commit('Set_UserInfo', userinfo);
    },
    SET_USER_ID({commit}, user) {
      commit('Set_UserID', user);
    },
  },
  getters: {  
    getUsername: (state) => state.username,
    getUserID: (state) => state.user_id,
    getUserToken: (state) => state.token,
  }
})
