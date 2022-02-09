import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    user: {},
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logOut(state) {
      state.user = null;
    },
  },
  getters: {
    _isAuthenticated: (state) => state.user !== null,

    _getCurrentUser(state) {
      // https://stackoverflow.com/questions/32534602/javascript-built-in-function-to-delete-multiple-keys-in-an-object#:~:text=There%20is%20no%20built%20in,js%20to%20do%20this.&text=There%20is%20no%20built%2Din,method%20to%20the%20Object%20prototype.
      ["_id", "createdAt", "tokens", "updatedAt"].forEach((key) => delete state.user[key]);

      return state.user;
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],
});
