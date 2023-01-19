import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { SessionStorage, Notify } from 'quasar';
import config from 'src/helper/config';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
const api = axios.create({
  // baseURL: 'https://api.example.com'
  baseURL: config.server.hostname,
});
console.log('first', config.server.hostname);
api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
api.defaults.headers.get['Accepts'] = 'application/json';

const token = SessionStorage.getItem('token');

export default boot(({ app, redirect, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api
  console.log('TK', token);
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;

  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response) {
        if (
          err.response.status === 401 &&
          router.currentRoute.value.name !== 'login'
        ) {
          redirect('/');
        }
        Notify.create({
          icon: 'las la-exclamation-triangle',
          position: 'bottom',
          message: `${err.response.data.message}`,
          color: 'negative',
        });
        return err.response.data.message;
        // return Promise.reject(err.response.data);
      }

      if (err.request) {
        return err.request;
        // return Promise.reject(err.request);
      }

      return err.message;
      // return Promise.reject(err.message);
    }
  );
});

export { api };
