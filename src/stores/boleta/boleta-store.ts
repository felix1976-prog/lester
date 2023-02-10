import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useBoletaStore = defineStore('boleta', {
  state: () => ({
    boletas: [],
    isBoletaOpen: false,
    boletaEdit: false
  }),

  getters: {
    allBoletas(state) {
      return state.boletas;
    }
  },

  actions: {
    isBoletaToggle() {
      return(this.isBoletaOpen = !this.isBoletaOpen)
    },

    editandoForm(item: boolean) {
      this.boletaEdit = item
    },

    async fetchBoletas() {
      try {
        const { data } = await api.get('/boleta')
        return (this.boletas = data)
      } catch (error) {
        console.log(error);
      }
    },

    async addBoletas(dto: {
      nombre: string,
      apellidos: string,
      sexo: string,
      preunivesitario: string,
      provincia: string,
      municipio: string,
      inidice_academico: number,
      matematica: number,
      espanol: number,
      historia: number,
      escalafon: number,
      convocatoria: string,
      opcion: number,
      sma: string,
      ci: string
    }) {
      try {
        const { data } = await api.post('/boleta', dto)
        return data
      } catch (error) {
        console.log(error);

      }
    }
  }
});
