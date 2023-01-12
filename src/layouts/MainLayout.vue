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
                  :icon="`${
                    $q.dark.isActive ? 'las la-toggle-on' : 'las la-toggle-off'
                  }`"
                  :label="`${$q.dark.isActive ? 'SI' : 'NO'}`"
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

    <q-drawer v-model="isSideMenuOpen" show-if-above bordered :breakpoint="400">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px">
        <q-list>
          <q-item-label
            header
            :class="`${
              $q.dark.isActive ? 'text-center text-green' : 'text-center'
            }`"
          >
            MENÚ
          </q-item-label>
          <q-item clickable tag="a" to="/">
            <q-item-section avatar>
              <q-icon name="las la-house-damage" color="secondary" />
            </q-item-section>

            <q-item-section>
              <q-item-label
                :class="`${
                  $q.dark.isActive
                    ? 'text-body1 text-uppercase'
                    : 'text-body1 text-uppercase'
                }`"
              >
                INICIO
              </q-item-label>
              <q-item-label
                :class="`${$q.dark.isActive ? 'text-green' : ''}`"
                caption
                >Ir al inicio</q-item-label
              >
            </q-item-section>
          </q-item>
          <template v-if="me.rol.toUpperCase() === 'ADMIN'">
            <EssentialLink
              v-for="link in essentialLinks"
              :key="link.title"
              v-bind="link"
            />
          </template>
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        style="height: 150px; background-color: #54474d"
      >
        <div class="absolute-bottom bg-transparent text-center">
          <q-avatar size="80px" class="q-mb-sm">
            <q-icon
              color="secondary"
              class="row items-center"
              name="las la-user-secret"
            />
          </q-avatar>
          <div class="text-weight-bold text-center">{{ me?.nombre }}</div>
          <div class="text-center text-subtitle1 text-uppercase">
            {{ me?.rol }}
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useUtilsComposables } from '../composables/utilsComposables';

import { useAuthComposables } from 'src/composables/authComposables';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

import { useQuasar } from 'quasar';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Usuarios',
    caption: 'Gestión de Usuarios',
    icon: 'las la-users',
    link: '/users',
  },
  {
    title: 'Universidad',
    caption: 'Gestinar datos de la Universidad',
    icon: 'las la-user-shield',
    link: '/escuela',
  },
  // {
  //   title: 'Facultades',
  //   caption: 'Gestión de Facultades',
  //   icon: 'las la-graduation-cap',
  //   link: '/facultades',
  // },
  // {
  //   title: 'Departamentos',
  //   caption: 'Gestión de Departamentos',
  //   icon: 'las la-school',
  //   link: '/departamentos',
  // },
  // {
  //   title: 'Tipos de Indicadores',
  //   caption: 'Gestión de Tipos de Indicadores',
  //   icon: 'las la-stream',
  //   link: '/tipos',
  // },
  // {
  //   title: 'Indicadores',
  //   caption: 'Gestión de Indicadores',
  //   icon: 'las la-info',
  //   link: '/indicadores',
  // },
  // {
  //   title: 'Evaluaciones',
  //   caption: 'Gestión de Evaluaciones',
  //   icon: 'las la-check-circle',
  //   link: '/evaluaciones',
  // },
  // {
  //   title: 'Evaluaciones de Procesos',
  //   caption: 'Gestión de Evaluaciones de Procesos',
  //   icon: 'las la-clipboard',
  //   link: '/evaluaciones-procesos',
  // },
  // {
  //   title: 'Procesos',
  //   caption: 'Gestión de Procesos',
  //   icon: 'las la-cogs',
  //   link: '/procesos',
  // },
  // {
  //   title: 'Objetivos',
  //   caption: 'Gestión de Objetivos Estratégicos',
  //   icon: 'las la-tasks',
  //   link: '/objetivos',
  // },
  // {
  //   title: 'IMOE',
  //   caption: 'Indicadores y Metas de los Objetivos Específicos',
  //   icon: 'las la-star-half-alt',
  //   link: '/imoe',
  // },
];

const $q = useQuasar();
const { me, logout } = useAuthComposables();
const { toggleSideMenu, isSideMenuOpen } = useUtilsComposables();

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
