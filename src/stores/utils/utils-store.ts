import { defineStore } from 'pinia';

export const useUtilsStore = defineStore('utils', {
  state: () => ({
    isOpenLogin: false,
    isSideMenuOpen: false,
  }),

  getters: {
    doubleCount(state) {
      // return state.counter * 2;
    },
  },

  actions: {
    setToggleLogin() {
      return (this.isOpenLogin = !this.isOpenLogin);
    },
    toggleSideMenu() {
      return (this.isSideMenuOpen = !this.isSideMenuOpen);
    },
  },
});
