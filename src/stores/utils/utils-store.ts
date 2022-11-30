import { defineStore } from 'pinia';

export const useUtilsStore = defineStore('utils', {
  state: () => ({
    isOpenLogin: false,
    isSideMenuOpen: false,
    isAddUserOpen: false,
    isEliminarOpen: false,
  }),

  getters: {
    doubleCount(state) {
      return state.isOpenLogin;
    },
  },

  actions: {
    setToggleLogin() {
      return (this.isOpenLogin = !this.isOpenLogin);
    },
    toggleSideMenu() {
      return (this.isSideMenuOpen = !this.isSideMenuOpen);
    },
    addUserToggle() {
      this.isAddUserOpen = !this.isAddUserOpen;
    },
    eliminarToggle() {
      this.isEliminarOpen = !this.isEliminarOpen;
    },
  },
});
