import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  getters: {
    _getCurrentUser(state) {
      const user = state.user;
      return user;
    },
  },
  actions: {},
  modules: {},
});
