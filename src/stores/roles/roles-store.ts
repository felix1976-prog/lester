import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { RolAdd, RolList, rolesProps } from 'src/interfaces/rol.interfaces';
import { Notify } from 'quasar';

interface rolState {
  roles: Array<RolList> | null;
  isEditando: boolean;
  rolEdit: RolList | null;
}

export const useRolStore = defineStore('rol', {
  state: (): rolState => ({
    roles: [],
    isEditando: false,
    rolEdit: null,
  }),

  getters: {
    rolesAll(state) {
      return state.roles;
    },
  },

  actions: {
    editandoForm(item: boolean) {
      this.isEditando = item;
    },

    async getAllRoles() {
      try {
        const { data } = await api.get('/roles');
        this.roles = data;
      } catch (e) {
        Notify.create({
          icon: 'las la-exclamation-triangle',
          position: 'bottom',
          message: `${e}`,
          color: 'negative',
        });
      }
    },

    async addRoles(item: RolAdd) {
      try {
        const { data } = await api.post('/roles', item);

        if (data.statusCode !== 400) {
          Notify.create({
            icon: 'las la-check-double',
            position: 'bottom',
            message: 'Insertado correctamente',
            color: 'positive',
          });
        } else {
          Notify.create({
            icon: 'las la-exclamation-triangle',
            position: 'bottom',
            message: `${data.message}`,
            color: 'negative',
          });
        }
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

    async updateRol(item: rolesProps) {
      try {
        const { data } = await api.patch('/roles/' + item.id, {
          rol: item.rol,
          rolname: item.rolname,
        });

        if (data.statusCode !== 400) {
          Notify.create({
            icon: 'las la-check-double',
            position: 'bottom',
            message: 'Actualizado correctamente',
            color: 'positive',
          });
        } else {
          Notify.create({
            icon: 'las la-exclamation-triangle',
            position: 'bottom',
            message: `${data.message}`,
            color: 'negative',
          });
          // }
        }
        return data;
      } catch (e: any) {
        Notify.create({
          icon: 'las la-exclamation-triangle',
          position: 'bottom',
          message: `${e.message}`,
          color: 'negative',
          multiLine: true,
        });
      }
    },
  }, //END
});
