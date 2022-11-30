import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';

export const useUsersStore = defineStore('users', {
  state: () => ({
    usuarios: [],
    isEditando: false,
    userEdit: null,
    totalUser: 0,
    userOff: 0,
    userOn: 0,
  }),

  getters: {
    usersAll(state) {
      return state.usuarios;
    },
  },

  actions: {
    //Para editar el usuario activar el form y pasarle la data
    editandoForm(item: boolean) {
      this.isEditando = item;
    },
    //FIN

    async getAllUsers() {
      try {
        const { data } = await api.get('/usuarios');
        this.usuarios = data;

        this.totalUser = data.length;

        // this.userOff = data.filter(
        //   (valor: UserList) => valor.isActive === false
        // ).length;

        // this.userOn = data.filter(
        //   (valor: UserList) => valor.isActive === true
        // ).length;
      } catch (e) {
        Notify.create({
          icon: 'las la-exclamation-triangle',
          position: 'bottom',
          message: `${e}`,
          color: 'negative',
        });
      }
    },
    async addUsers(item: UserAdd) {
      try {
        let statusError = 0;
        const { data } = await api.post('/usuarios', item);
        statusError = data.statusCode;
        if (statusError !== 400) {
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
    async updateActive(item: { id: string; isActive: boolean }) {
      try {
        const { data } = await api.patch('/usuarios/' + item.id, {
          isActive: item.isActive,
        });
        if (data.statusCode !== 400) {
          if (item.isActive) {
            Notify.create({
              icon: 'las la-check-double',
              position: 'bottom',
              message: 'Activado correctamente',
              color: 'positive',
            });
          } else {
            Notify.create({
              icon: 'las la-times-circle',
              position: 'bottom',
              message: 'Desactivado correctamente',
              color: 'negative',
            });
          }
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
          multiLine: true,
        });
      }
    },

    async update(item: usuariosProps) {
      try {
        const { data } = await api.patch('/usuarios/' + item.id, {
          username: item.username,
          nombre: item.nombre,
          isActive: item.isActive,
          rol_id: item.rol_id,
          departamento_id: item.departamento_id,
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
    async updatePassword(item: { id: string; password: string }) {
      try {
        const { data } = await api.patch('/usuarios/' + item.id, {
          password: item.password,
        });
        if (data.statusCode !== 400) {
          Notify.create({
            icon: 'las la-check-double',
            position: 'bottom',
            message: 'Contraseña actualizada correctamente',
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
          multiLine: true,
        });
      }
    },
  },
});
