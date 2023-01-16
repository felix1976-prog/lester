import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useEmpresaStore = defineStore('empresa', {
  state: () => ({
    empresa: [],
    isEmpresaOpen: false,
    empresaEdit: false,
  }),

  getters: {
    allEmpresa(state) {
      return state.empresa;
    },
  },

  actions: {
    isEmpresaToggle() {
      return (this.isEmpresaOpen = !this.isEmpresaOpen);
    },
    editandoForm(item: boolean) {
      this.empresaEdit = item;
    },
    async fecthEmpresas() {
      try {
        const { data } = await api.get('/empresas');
        return (this.empresa = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addEmpresas(dto: {
      empresa: string;
      codigo: string;
      organismo_id: string;
    }) {
      try {
        const { data } = await api.post('/empresas', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
