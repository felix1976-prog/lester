import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import {
  MatriculasAdd,
  MatriculasList,
} from '../../interfaces/matriculas.interfaces';

export const useMatriculastore = defineStore('matriculas', {
  state: () => ({
    matriculas: [],
    isMatriculasOpen: false,
    matriculasEdit: false,
  }),

  getters: {
    // allMatriculas(state) {
    //   return state.matriculas;
    // },
  },

  actions: {
    isMatriculasToggle() {
      return (this.isMatriculasOpen = !this.isMatriculasOpen);
    },
    editandoForm(item: boolean) {
      this.matriculasEdit = item;
    },
    async fecthMatriculas() {
      try {
        const { data } = await api.get('/matriculas');
        return (this.matriculas = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addMatriculas(dto: MatriculasAdd) {
      try {
        const { data } = await api.post('/matriculas', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async updateMatriculas(dto: MatriculasList) {
      try {
        const { id, ...myUpd } = dto;
        console.log('Kill=> ', myUpd);

        const { data } = await api.patch('/matriculas/' + dto.id, {
          ...myUpd,
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
