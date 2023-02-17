import { PosDispAdd } from './../../interfaces/posdisp.interfaces';
import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const usePosDisponibleStore = defineStore('posdisponible', {
  state: () => ({
    posgrados_disponibles: [],
    isPosDispOpen: false,
    posDispEdit: false,
  }),

  getters: {
    // allPobladoDisponible(state) {
    //   return state.posgrados_disponibles;
    // },
  },

  actions: {
    isPosDispToggle() {
      return (this.isPosDispOpen = !this.isPosDispOpen);
    },
    editandoForm(item: boolean) {
      this.posDispEdit = item;
    },
    async fecthPosDisp() {
      try {
        const { data } = await api.get('/postgrados-disponibles');
        return (this.posgrados_disponibles = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addPoblado(dto: PosDispAdd) {
      try {
        const { data } = await api.post('/postgrados-disponibles', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
