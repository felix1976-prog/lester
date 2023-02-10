<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color: #54474d">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleSideMenu"
        />

        <q-toolbar-title v-if="me?.rol.toUpperCase() === 'ADMINISTRADOR'">
          {{ me?.rol.toUpperCase() === 'ADMINISTRADOR' ? me?.nombre : me?.rol }}
        </q-toolbar-title>

        <q-toolbar-title v-else>
          {{
            me?.rol.toUpperCase() === 'MODERADOR'
              ? me?.username.toUpperCase()
              : me?.rol.toUpperCase()
          }}
        </q-toolbar-title>

        <div>
          <q-btn-dropdown text flat label="" icon="las la-user-tag">
            <div class="row wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Configuraciones</div>
                <q-btn
                  color="primary"
                  icon-color="green"
                  push
                  size="md"
                  :icon="`${$q.dark.isActive ? 'las la-sun' : 'las la-moon'}`"
                  :label="`${$q.dark.isActive ? 'Claro' : 'Oscuro'}`"
                  @click="modoOscuro"
                />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <q-icon name="las la-user-shield" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs text-capitalize">
                  {{ me?.username }}
                </div>
                <q-btn
                  color="primary"
                  label="Salir"
                  push
                  size="sm"
                  v-close-popup
                  @click="salir"
                />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>
    <DrawerComponent />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useUtilsComposables } from '../composables/utilsComposables';

import { useAuthComposables } from 'src/composables/authComposables';

import { useQuasar } from 'quasar';
import DrawerComponent from 'src/components/DrawerComponent.vue';

const $q = useQuasar();
const { me, logout } = useAuthComposables();
const { toggleSideMenu } = useUtilsComposables();

const modoOscuro = () => {
  $q.dark.toggle();
};
// let  tiempo = ref(false);

// toggleDarkMode(){}
toggleSideMenu();
const salir = async () => {
  await logout();
};
</script>
<style>
body.body--dark {
  background: #333333;
}
</style>
