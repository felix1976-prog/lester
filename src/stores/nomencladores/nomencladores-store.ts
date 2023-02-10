import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export const useNomencladoresStore = defineStore('nomencladores', {
  state: () => ({
    ActividadLaboral: [],
    Convocatorias: [],
    ClaseEstudiante: [],
    ColorPiel: [],
    DerechoMatricularContinuante: [],
    Escolaridad: [],
    FuentesIngerso: [],
    Ocupacion: [],
    ProcedenciaEscolar: [],
    SectorLaboral: [],
    Sexos: [],
    SituacionCumplimientoSMA: [],
    SituacionEscolarAlMatricular: [],
    SMA: [],
  }),

  getters: {},

  actions: {
    async getActividadLaboral() {
      try {
        const { data } = await api.get('/nomencladores/actividad_laboral');
        return (this.ActividadLaboral = data);
      } catch (error) {
        console.log(error);
      }
    },

    async getConvocatorias() {
      try {
        const { data } = await api.get('/nomencladores/convocatorias');
        return (this.Convocatorias = data);
      } catch (error) {
        console.log(error);
      }
    },

    async getClaseEstudiante() {
      try {
        const { data } = await api.get('/nomencladores/clase_estudiante');
        return (this.ClaseEstudiante = data);
      } catch (error) {
        console.log(error);
      }
    },

    async getColorPiel() {
      try {
        const { data } = await api.get('/nomencladores/color_piel');
        return (this.ColorPiel = data);
      } catch (error) {
        console.log(error);
      }
    },

    async getDerechoMatricularContinuante() {
      try {
        const { data } = await api.get(
          '/nomencladores/dercho_matricular_continuante'
        );
        return (this.DerechoMatricularContinuante = data);
      } catch (error) {
        console.log(error);
      }
    },

    async getEscolaridad() {
      try {
        const { data } = await api.get('/nomencladores/escolaridad');
        return (this.Escolaridad = data);
      } catch (error) {
        console.log(error);
      }
    },

    async getFuentesIngreso() {
      try {
        const { data } = await api.get('/nomencladores/fuentes_ingreso');
        return (this.FuentesIngerso = data);
      } catch (error) {
        console.log(error);
      }
    },

    async getOcupacion() {
      try {
        const { data } = await api.get('/nomencladores/ocupacion');
        return (this.Ocupacion = data);
      } catch (error) {
        console.log(error);
      }
    },

    async getProcedenciaEscolar() {
      try {
        const { data } = await api.get('/nomencladores/procedencia_escolar');
        return (this.ProcedenciaEscolar = data);
      } catch (error) {
        console.log(error);
      }
    },

    async getSectorLaboral() {
      try {
        const { data } = await api.get('/nomencladores/sector_laboral');
        return (this.SectorLaboral = data);
      } catch (error) {
        console.log(error);
      }
    },

    async getSexos() {
      try {
        const { data } = await api.get('/nomencladores/sexos');
        return (this.Sexos = data);
      } catch (error) {
        console.log(error);
      }
    },

    async getSituacionCumplimientoSMA() {
      try {
        const { data } = await api.get(
          '/nomencladores/situacion_cumpliento_sma'
        );
        return (this.SituacionCumplimientoSMA = data);
      } catch (error) {
        console.log(error);
      }
    },

    async getSituacionEscolarAlMatricular() {
      try {
        const { data } = await api.get(
          '/nomencladores/situacion_escolar_matricular'
        );
        return (this.SituacionEscolarAlMatricular = data);
      } catch (error) {
        console.log(error);
      }
    },

    async getSMA() {
      try {
        const { data } = await api.get('/nomencladores/sma');
        return (this.SMA = data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
