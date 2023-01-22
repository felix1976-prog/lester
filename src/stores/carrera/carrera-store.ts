import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useCarreraStore = defineStore('carrera', {
  state: () => ({
    carrera: [],
    isCarreraOpen: false,
    carreraEdit: false,
  }),

  getters: {
    allCarrera(state) {
      return state.carrera;
    },
  },

  actions: {
    isCarreraToggle() {
      return (this.isCarreraOpen = !this.isCarreraOpen);
    },
    editandoForm(item: boolean) {
      this.carreraEdit = item;
    },
    async fecthCarreras() {
      try {
        const { data } = await api.get('/carreras');
        return (this.carrera = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addCarreras(dto: {
      carrera: string;
      codigo: string;
      facultad_id: string;
      disponible: boolean;
    }) {
      try {
        const { data } = await api.post('/carreras', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
