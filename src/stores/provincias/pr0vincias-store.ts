import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import {
  ProvinciaAdd,
  ProvinciaProps,
} from '../../interfaces/provincias.interfaces';
import { PaisList } from '../../interfaces/pais.interfaces';
import { states } from '../countries/states';
import { Notify } from 'quasar';

export const useProvinciasStore = defineStore('provincias', {
  state: () => ({
    provincias: [],
    isProvinciasOpen: false,
    provinciaEdit: false,
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
          const allPaises: Array<PaisList> = [];
          const { data } = await api.get<PaisList>('/paises');
          allPaises.push(data);
          const convertidos = states.map((x) => {
            return {
              id: x.id,
              country: x.id_country.toString(),
              name: x.name,
            };
          });
          for (const x of convertidos) {
            for (const p of allPaises) {
              //   if (p.codigo === x.id_country.toString()) {
              //     const dto = {
              //       provincia: x.name,
              //       codigo: x.id.toString(),
              //       pais_id: p.id,
              //     };
              //     allProvincias.push(dto);
              //     return dto;
              //   }
              if ('144' === x.country) {
                console.log('DTO', p);
              }
            }
            // console.log('DTO', getCodigoPais);
            // allProvincias = await api.post('/provincias', getCodigoPais);
          }
          // console.log('DTO', allPaises);
          // if(){
          Notify.create({
            icon: 'las la-done',
            position: 'bottom',
            message: 'Provincias insertadas correctamente',
            color: 'success',
          });
          // }
          console.log('lol', allProvincias);
          return allProvincias;
        }
      } catch (error) {
        console.log('error', error);
      }
    },
  },
});
