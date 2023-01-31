import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { PobladosAdd } from '../../interfaces/poblados.interfaces';

export const usePobladoStore = defineStore('poblado', {
  state: () => ({
    poblados: [],
    isPobladoOpen: false,
    pobladoEdit: false,
  }),

  getters: {
    // allPoblado(state) {
    //   return state.poblado;
    // },
  },

  actions: {
    isPobladoToggle() {
      return (this.isPobladoOpen = !this.isPobladoOpen);
    },
    editandoForm(item: boolean) {
      this.pobladoEdit = item;
    },
    async fecthPoblado() {
      try {
        const { data } = await api.get('/poblados');
        return (this.poblados = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addPoblado(dto: PobladosAdd) {
      try {
        const { data } = await api.post('/poblados', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
