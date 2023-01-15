import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useFacultadStore = defineStore('facultad', {
  state: () => ({
    facultad: [],
    isFacultadOpen: false,
    facultadEdit: false,
  }),

  getters: {
    allFacultad(state) {
      return state.facultad;
    },
    // isFacultadToggle(state) {
    //   return (state.isFacultadOpen = !state.isFacultadOpen);
    // },
  },

  actions: {
    isFacultadToggle() {
      return (this.isFacultadOpen = !this.isFacultadOpen);
    },
    editandoForm(item: boolean) {
      this.facultadEdit = item;
    },
    async fecthFacultades() {
      try {
        const { data } = await api.get('/facultades');
        return (this.facultad = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addFacultades(dto: { facultad: string; codigo: string }) {
      try {
        const { data } = await api.post('/facultades', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
