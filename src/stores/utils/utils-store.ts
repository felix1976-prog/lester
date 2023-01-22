import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';

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
    async eliminar(title: string, url: string) {
      try {
        const { data } = await api.delete(url);
        if (data.statusCode !== 400)
          Notify.create({
            icon: 'las la-fire-alt',
            position: 'top-right',
            message: 'Registro eliminado',
            color: 'info',
          });
        return data;
      } catch (e: any) {
        Notify.create({
          icon: 'las la-exclamation-triangle',
          position: 'bottom',
          message: `${e.message}`,
          color: 'negative',
        });
      }
    },
  },
});
