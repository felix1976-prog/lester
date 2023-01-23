import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import {
  MunicipioAdd,
  MunicipioList,
} from '../../interfaces/municipios.interfaces';
import { ProvinciaList } from '../../interfaces/provincias.interfaces';
import { cities } from '../countries/cities';
import { Notify } from 'quasar';

export const useMunicipiosStore = defineStore('municipios', {
  state: () => ({
    municipios: [],
    isMunicipiosOpen: false,
    municipioEdit: false,
    allProvincias: <MunicipioList[]>[],
  }),

  getters: {
    // allMunicipios(state) {
    //   return state.municipios;
    // },
  },

  actions: {
    isMunicipiosToggle() {
      return (this.isMunicipiosOpen = !this.isMunicipiosOpen);
    },
    editandoForm(item: boolean) {
      this.municipioEdit = item;
    },
    async fecthMunicipios() {
      try {
        const { data } = await api.get('/municipios');
        return (this.municipios = data);
      } catch (error) {
        console.log(error);
      }
    },
    async addMunicipios(dto: MunicipioAdd) {
      try {
        const { data } = await api.post('/municipios', dto);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async llenarMunicipios() {
      try {
        const { data } = await api.get('/municipios');
        // const data: string | any[] = [];
        if (data) {
          Notify.create({
            icon: 'las la-exclamation-triangle',
            position: 'bottom',
            message: 'Ya están creados las municipios',
            color: 'negative',
          });
          return data;
        } else {
          // const allMunicipios: Array<MunicipioAdd> = [];
          const listMunicipios: Array<MunicipioList> = [];
          const { data } = await api.get('/provincias');
          this.allProvincias = data;

          // console.log('provincia', this.allProvincias);
          for (const provincia of this.allProvincias) {
            const myCities = cities.filter(
              (it) => it.id_state + '' == provincia.codigo
            );
            // console.log(myCities);

            for (const st of myCities) {
              // allMunicipios.push({
              //   municipio: st.name,
              //   codigo: st.id + '',
              //   provincia_id: pais.id,
              // });
              const dto = {
                municipio: st.name,
                codigo: st.id + '',
                provincia_id: provincia.id,
              };
              console.log('DTO=>', dto);

              const { data } = await api.post('/municipios', dto);
              listMunicipios.push(data);
            }
          }
          // console.log('FinalLenght=>', cities.length);
          console.log('Final=>', listMunicipios);
          // return allMunicipios;
        }
      } catch (error) {
        console.log('error', error);
      }
    },
  },
});
