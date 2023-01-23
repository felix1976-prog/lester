import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import {
  ProvinciaAdd,
  ProvinciaList,
} from '../../interfaces/provincias.interfaces';
import { PaisList } from '../../interfaces/pais.interfaces';
import { states } from '../countries/states';
import { Notify } from 'quasar';

export const useProvinciasStore = defineStore('provincias', {
  state: () => ({
    provincias: [],
    isProvinciasOpen: false,
    provinciaEdit: false,
    allPaises: <PaisList[]>[],
  }),

  getters: {
    // allProvincias(state) {
    //   return state.provincias;
    // },
  },

  actions: {
    isProvinciasToggle() {
      return (this.isProvinciasOpen = !this.isProvinciasOpen);
    },
    editandoForm(item: boolean) {
      this.provinciaEdit = item;
    },
    async fecthProvincias() {
      try {
        const { data } = await api.get('/provincias');
        return (this.provincias = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addProvincias(dto: ProvinciaAdd) {
      try {
        const { data } = await api.post('/provincias', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async llenarProvincias() {
      try {
        // console.log(provinciasJson);
        const { data } = await api.get('/provincias');
        // const data: string | any[] = [];
        if (data) {
          Notify.create({
            icon: 'las la-exclamation-triangle',
            position: 'bottom',
            message: 'Ya están creados las provincias',
            color: 'negative',
          });
          return data;
        } else {
          const allProvincias: Array<ProvinciaAdd> = [];
          const listProvincias: Array<ProvinciaList> = [];
          const { data } = await api.get('/paises');
          this.allPaises = data;

          for (const pais of this.allPaises) {
            console.log(pais);
            const myStates = states.filter(
              (it) => it.id_country + '' == pais.codigo
            );
            console.log(myStates);

            for (const st of myStates) {
              allProvincias.push({
                provincia: st.name,
                codigo: st.id + '',
                pais_id: pais.id,
              });
              const dto = {
                provincia: st.name,
                codigo: st.id + '',
                pais_id: pais.id,
              };
              const { data } = await api.post('/provincias', dto);
              listProvincias.push(data);
            }

            // console.log(
            //   'Final=>',
            //   allProvincias.filter(
            //     (it) => it.pais_id == '6acead8f-9009-4925-9e0b-111dadab97d6'
            //   )
            // );
          }
          // Notify.create({
          //   icon: 'las la-done',
          //   position: 'bottom',
          //   message: 'Provincias insertadas correctamente',
          //   color: 'success',
          // });
          // }
          // console.log('lol', allProvincias);
          console.log('FinalLenght=>', states.length);
          console.log('Final=>', listProvincias);
          // return allProvincias;
        }
      } catch (error) {
        console.log('error', error);
      }
    },
  },
});
