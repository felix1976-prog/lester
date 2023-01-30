import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { PaisAdd } from '../../interfaces/pais.interfaces';
export const usePaisesStore = defineStore('paises', {
  state: () => ({
    paises: [],
    isPaisesOpen: false,
    paisEdit: false,
  }),

  getters: {
    allPaises(state) {
      return state.paises;
    },
  },

  actions: {
    isPaisesToggle() {
      return (this.isPaisesOpen = !this.isPaisesOpen);
    },
    editandoForm(item: boolean) {
      this.paisEdit = item;
    },
    async fecthPaises() {
      try {
        const { data } = await api.get('/paises');
        return (this.paises = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addPaises(dto: PaisAdd) {
      try {
        const { data } = await api.post('/paises', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
