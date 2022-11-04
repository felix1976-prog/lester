import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useEscuelaStore = defineStore('escuela', {
  state: () => ({
    escuela: null,
    escuelaEdit: null,
    isActive: true,
  }),

  getters: {
    // doubleCount(state) {
    //   return state.counter * 2;
    // },
  },

  actions: {
    activeTogle(item: boolean) {
      this.isActive = item;
    },

    async getActiveEscuela() {
      try {
        const { data } = await api.get('/escuela/activo');
        this.escuela = data;
      } catch (e) {
        // Notify.create({
        //   icon: 'las la-exclamation-triangle',
        //   position: 'bottom',
        //   message: `${e}`,
        //   color: 'negative',
        // });
      }
    },
  },
});
