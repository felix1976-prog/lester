import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { MunicipioAdd } from '../../interfaces/municipios.interfaces';

export const useMunicipiosStore = defineStore('municipios', {
  state: () => ({
    municipios: [],
    isMunicipiosOpen: false,
    municipioEdit: false,
  }),

  getters: {
    // allMunicipios(state) {
    //   return state.municipios;
    // },
  },

  actions: {
    isMunicipiosToggle() {
      return (this.isMunicipiosOpen = !this.isMunicipiosOpen);
    },
    editandoForm(item: boolean) {
      this.municipioEdit = item;
    },
    async fecthMunicipios() {
      try {
        const { data } = await api.get('/municipios');
        return (this.municipios = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addMunicipios(dto: MunicipioAdd) {
      try {
        const { data } = await api.post('/municipios', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
