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
        const { data } = await api.get('/paises');
        // const data: string | any[] = [];
        if (data.length) {
          Notify.create({
            icon: 'las la-exclamation-triangle',
            position: 'bottom',
            message: 'Ya están creados los países',
            color: 'negative',
          });
        } else {
          let allPaises: Array<[]> = [];
          for (const x of countries) {
            const dto = {
              pais: x.name,
              codigo: x.id.toString(),
            };
            allPaises = await api.post('/paises', dto);
          }
          console.log('lol', allPaises);
          // return getPaises;
        }
      } catch (error) {
        console.log('error', error);
      }
    },
  },
});
