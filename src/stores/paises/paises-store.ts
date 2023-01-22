import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { PaisAdd } from '../../interfaces/pais.interfaces';
import { countries } from '../../stores/countries/countries';
import { Notify } from 'quasar';
export const usePaisesStore = defineStore('paises', {
  state: () => ({
    paises: [],
    isPaisesOpen: false,
    paisEdit: false,
  }),

  getters: {
    allPaises(state) {
      return state.paises;
    },
  },

  actions: {
    isPaisesToggle() {
      return (this.isPaisesOpen = !this.isPaisesOpen);
    },
    editandoForm(item: boolean) {
      this.paisEdit = item;
    },
    async fecthPaises() {
      try {
        const { data } = await api.get('/paises');
        return (this.paises = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addPaises(dto: PaisAdd) {
      try {
        const { data } = await api.post('/paises', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async llenarPaises() {
      try {
        // console.log(paisesJson);
        const { data } = await api.get('/paises');
        // const data: string | any[] = [];
        if (data) {
          Notify.create({
            icon: 'las la-exclamation-triangle',
            position: 'bottom',
            message: 'Ya están creados los países',
            color: 'negative',
          });
          return data;
        } else {
          let allPaises: Array<[]> = [];
          for (const x of countries) {
            const dto = {
              pais: x.name,
              codigo: x.id.toString(),
            };
            allPaises = await api.post('/paises', dto);
          }
          Notify.create({
            icon: 'las la-done',
            position: 'bottom',
            message: 'Paises insertados correctamente',
            color: 'success',
          });
          console.log('lol', allPaises);
          return allPaises;
        }
      } catch (error) {
        console.log('error', error);
      }
    },
  },
});
