import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useOrganismoStore = defineStore('organismos', {
  state: () => ({
    organismos: [],
    isOrganismosOpen: false,
    organismoEdit: false,
  }),

  getters: {
    allOrganismos(state) {
      return state.organismos;
    },
  },

  actions: {
    isOrganismosToggle() {
      return (this.isOrganismosOpen = !this.isOrganismosOpen);
    },
    editandoForm(item: boolean) {
      this.organismoEdit = item;
    },
    async fecthOrganismos() {
      try {
        const { data } = await api.get('/organismos');
        return (this.organismos = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addOrganismos(dto: { organismo: string; codigo: string }) {
      try {
        const { data } = await api.post('/organismos', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
