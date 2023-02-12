import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const usePosgradosStore = defineStore('posgrado', {
  state: () => ({
    posgrados: [],
    isPosgradoOpen: false,
    posgradoEdit: false,
  }),

  getters: {
    allPosgrados(state) {
      return state.posgrados;
    },
  },

  actions: {
    isPosgradoToggle() {
      return (this.isPosgradoOpen = !this.isPosgradoOpen);
    },

    editandoForm(item: boolean) {
      this.posgradoEdit = item;
    },

    async fetchPosgrado() {
      try {
        const { data } = await api.get('/posgrados');
        return (this.posgrados = data);
      } catch (error) {
        console.log(error);
      }
    },

    async addPosgrado(dto: {
      nombre: string;
      apellido1: string;
      apellido2: string;
      ci: string;
      sexo: string;
      pais: string;
      provincia: string;
      municipio: string;
      domicilio: string;
      graduado: string;
      fecha_graduado: Date | string | null;
      universidad: string;
      tomo: number;
      folio: number;
      numero_universidad: number;
      centro_laboral: string;
      direccion: string;
      administrador: string;
      telefono: string;
      alojamiento: boolean;
      aceptado: boolean;
      postgrados_disponibleId: string;
    }) {
      try {
        const { data } = await api.post('/posgrados', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async editPosgrado(dto: {
      id: string;
      nombre: string;
      apellido1: string;
      apellido2: string;
      ci: string;
      sexo: string;
      pais: string;
      provincia: string;
      municipio: string;
      domicilio: string;
      graduado: string;
      fecha_graduado: Date | string | null;
      universidad: string;
      tomo: number;
      folio: number;
      numero_universidad: number;
      centro_laboral: string;
      direccion: string;
      administrador: string;
      telefono: string;
      alojamiento: boolean;
      aceptado: boolean;
      postgrados_disponibleId: string;
    }) {
      try {
        const { data } = await api.patch('/posgrados/' + dto.id, {
          nombre: dto.nombre,
          apellido1: dto.apellido1,
          apellido2: dto.apellido2,
          ci: dto.ci,
          sexo: dto.sexo,
          pais: dto.pais,
          provincia: dto.provincia,
          municipio: dto.municipio,
          domicilio: dto.domicilio,
          graduado: dto.graduado,
          fecha_graduado: dto.fecha_graduado,
          universidad: dto.universidad,
          tomo: dto.tomo,
          folio: dto.folio,
          numero_universidad: dto.numero_universidad,
          centro_laboral: dto.centro_laboral,
          direccion: dto.direccion,
          administrador: dto.administrador,
          telefono: dto.telefono,
          alojamiento: dto.alojamiento,
          aceptado: dto.aceptado,
          postgrados_disponibleId: dto.postgrados_disponibleId,
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async deletePosgrado(id: string) {
      try {
        const { data } = await api.delete('/posgrados/' + id);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
