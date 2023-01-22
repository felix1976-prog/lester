import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { addEscuelaInterface } from '../../interfaces/escuela.interface';
import { Notify } from 'quasar';

export const useEscuelaStore = defineStore('escuela', {
  state: () => ({
    escuela: [],
    escuelaEdit: false,
    isActive: true,
    isAddEscuelaOpen: false,
  }),

  getters: {
    usersAllEscuelas(state) {
      return state.escuela;
    },
  },

  actions: {
    activeTogle(item: boolean) {
      this.isActive = item;
    },
    //Para editar el usuario activar el form y pasarle la data
    editandoForm(item: boolean) {
      this.escuelaEdit = item;
    },
    addEscuelaToggle() {
      this.isAddEscuelaOpen = !this.isAddEscuelaOpen;
    },
    //FIN

    async getActiveEscuela() {
      try {
        const { data } = await api.get('/escuela/activo');
        this.escuela = data;
        console.log('datalol', this.escuela);
        return this.escuela;
      } catch (e) {
        Notify.create({
          icon: 'las la-exclamation-triangle',
          position: 'bottom',
          message: `${e}`,
          color: 'negative',
        });
      }
    },
    async addEscuela(dto: addEscuelaInterface) {
      try {
        const { data } = await api.post('/escuela/', dto);
        console.log('POST -dto', dto);
        console.log('POST', data);
        return data;
      } catch (e) {
        Notify.create({
          icon: 'las la-exclamation-triangle',
          position: 'bottom',
          message: `${e}`,
          color: 'negative',
        });
      }
    },
  },
});
