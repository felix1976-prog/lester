import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useCentroStore = defineStore('centro', {
  state: () => ({
    centro: [],
    isCentroOpen: false,
    centroEdit: false,
  }),

  getters: {
    allCentro(state) {
      return state.centro;
    },
  },

  actions: {
    isCentroToggle() {
      return (this.isCentroOpen = !this.isCentroOpen);
    },
    editandoForm(item: boolean) {
      this.centroEdit = item;
    },
    async fecthCentros() {
      try {
        const { data } = await api.get('/centros');
        return (this.centro = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addCentros(dto: {
      centro: string;
      codigo: string;
      empresa_id: string;
    }) {
      try {
        const { data } = await api.post('/centros', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
