import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { ProvinciaAdd } from '../../interfaces/provincias.interfaces';
import { PaisList } from '../../interfaces/pais.interfaces';

export const useProvinciasStore = defineStore('provincias', {
  state: () => ({
    provincias: [],
    isProvinciasOpen: false,
    provinciaEdit: false,
    allPaises: <PaisList[]>[],
  }),

  getters: {
    // allProvincias(state) {
    //   return state.provincias;
    // },
  },

  actions: {
    isProvinciasToggle() {
      return (this.isProvinciasOpen = !this.isProvinciasOpen);
    },
    editandoForm(item: boolean) {
      this.provinciaEdit = item;
    },
    async fecthProvincias() {
      try {
        const { data } = await api.get('/provincias');
        return (this.provincias = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addProvincias(dto: ProvinciaAdd) {
      try {
        const { data } = await api.post('/provincias', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
