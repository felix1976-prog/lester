import { store } from 'quasar/wrappers';
import { Cookies, LocalStorage, SessionStorage } from 'quasar';
import { createPinia } from 'pinia';
import { createQuasarCookiesPersistedState } from 'pinia-plugin-persistedstate/quasar';
import { createQuasarWebStoragePersistedState } from 'pinia-plugin-persistedstate/quasar';
import { Router } from 'vue-router';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly router: Router;
  }
}

export default store(({ ssrContext }) => {
  const pinia = createPinia();

  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  pinia.use(createQuasarCookiesPersistedState(cookies));
  pinia.use(createQuasarWebStoragePersistedState(LocalStorage));
  pinia.use(createQuasarWebStoragePersistedState(SessionStorage));

  return pinia;
});
