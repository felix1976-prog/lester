import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useNomencladoresStore = defineStore('nomencladores', {
  state: () => ({
    sexos: [],
    colorPiel: [],
  }),

  getters: {},

  actions: {
    async getColorPiel() {
      try {
        const { data } = await api.get('/nomencladores/color_piel');
        return (this.colorPiel = data);
      } catch (error) {
        console.log(error);
      }
    },
    async getSexos() {
      try {
        const { data } = await api.get('/nomencladores/sexos');
        return (this.sexos = data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
