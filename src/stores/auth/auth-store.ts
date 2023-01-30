import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Notify, SessionStorage } from 'quasar';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    me: {
      username: '',
      nombre: '',
      isActive: null,
      rol: 'null',
    },
    isAuthenticated: false,
    token: null,
  }),

  getters: {
    // doubleCount (state) {
    //   return state.counter * 2;
    // }
  },

  actions: {
    async login(dto: { username: string; password: string }) {
      try {
        const { data } = await api.post('/auth/login', dto);
        if (data.status !== 401) {
          api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
          api.defaults.headers.Authorization = `Bearer ${data.token}`;

          this.token = data.token;
          JSON.stringify(SessionStorage.set('token', this.token));
          this.me = data.user;
          JSON.stringify(SessionStorage.set('user', this.me));
          this.isAuthenticated = true;
          Notify.create({
            icon: 'las la-fire-alt',
            position: 'top-right',
            message: `Bienvenido ${data.user.username}`,
            color: 'success',
          });
          this.router.push('/home');
          console.log('data', data);
        } else {
          Notify.create({
            icon: 'las la-exclamation-triangle',
            position: 'bottom',
            message: `${data.message}`,
            color: 'negative',
          });
        }
        return data;
      } catch (error: any) {
        console.log(error.response);
      }
    },
    async logout() {
      // const { data } = await api.get('/auth/logout');

      SessionStorage.clear();
      this.$reset();
      this.isAuthenticated = false;
      Notify.create({
        icon: 'las la-fire-alt',
        position: 'top-right',
        message: 'Hasta luego lo esperamos pronto 🤗',
        color: 'primary',
      });
      this.router.push('/');
    },
  },
  persist: [
    {
      storage: sessionStorage,
    },
  ],
});
