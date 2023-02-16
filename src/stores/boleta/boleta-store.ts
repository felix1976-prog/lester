import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useBoletaStore = defineStore('boleta', {
  state: () => ({
    boletas: [],
    isBoletaOpen: false,
    boletaEdit: false,
  }),

  getters: {
    allBoletas(state) {
      return state.boletas;
    },
  },

  actions: {
    isBoletaToggle() {
      return (this.isBoletaOpen = !this.isBoletaOpen);
    },

    editandoForm(item: boolean) {
      this.boletaEdit = item;
    },

    async fetchBoletas() {
      try {
        const { data } = await api.get('/boleta');
        return (this.boletas = data);
      } catch (error) {
        console.log(error);
      }
    },

    async addBoletas(dto: {
      nombre: string;
      apellidos: string;
      sexo: string;
      preuniversitario: string;
      provincia: string;
      municipio: string;
      indice_academico: number;
      matematica: number;
      espanol: number;
      historia: number;
      escalafon: number;
      convocatoria: string;
      opcion: number;
      sma: string;
      ci: string;
      fecha: Date | null | string;
    }) {
      try {
        const { data } = await api.post('/boleta', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async editBoleta(dto: {
      id: string;
      nombre: string;
      apellidos: string;
      sexo: string;
      preuniversitario: string;
      provincia: string;
      municipio: string;
      indice_academico: number;
      matematica: number;
      espanol: number;
      historia: number;
      escalafon: number;
      convocatoria: string;
      opcion: number;
      sma: string;
      ci: string;
      fecha: Date | null | string;
    }) {
      try {
        const { data } = await api.patch('/boleta/' + dto.id, {
          nombre: dto.nombre,
          apellidos: dto.apellidos,
          sexo: dto.sexo,
          preuniversitario: dto.preuniversitario,
          provincia: dto.provincia,
          municipio: dto.municipio,
          indice_academico: dto.indice_academico,
          matematica: dto.matematica,
          espanol: dto.espanol,
          historia: dto.historia,
          escalafon: dto.escalafon,
          convocatoria: dto.convocatoria,
          opcion: dto.opcion,
          sma: dto.sma,
          ci: dto.ci,
          fecha: dto.fecha,
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteBoleta(id: string) {
      try {
        const { data } = await api.delete('/boleta/' + id);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
