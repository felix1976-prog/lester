<script setup lang="ts">
import { useAuthComposables } from 'src/composables/authComposables';
import { useUtilsComposables } from 'src/composables/utilsComposables';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const { me } = useAuthComposables();
const { toggleSideMenu, isSideMenuOpen } = useUtilsComposables();
toggleSideMenu();

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Usuarios',
    caption: 'Gestión de Usuarios',
    icon: 'las la-users',
    link: '/users',
  },
  {
    title: 'Boletas',
    caption: 'Gestión de Boletas',
    icon: 'las la-users',
    link: '/boleta',
  },
];

const nomencladores: EssentialLinkProps[] = [
  {
    title: 'Universidad',
    caption: 'Gestinar datos de la Universidad',
    icon: 'las la-user-shield',
    link: '/escuela',
  },
  {
    title: 'Carreas',
    caption: 'Gestinar datos de la Carrera',
    icon: 'las la-user-shield',
    link: '/carrera',
  },
  {
    title: 'Facultad',
    caption: 'Gestinar datos de la Facultad',
    icon: 'las la-user-shield',
    link: '/facultad',
  },
  {
    title: 'Organismo',
    caption: 'Gestinar datos del organismo',
    icon: 'las la-user-shield',
    link: '/organismo',
  },
  {
    title: 'Empresas',
    caption: 'Gestinar datos de la empresa',
    icon: 'las la-user-shield',
    link: '/empresa',
  },
  {
    title: 'Centros',
    caption: 'Gestinar datos del centro',
    icon: 'las la-user-shield',
    link: '/centro',
  },
  {
    title: 'Paises',
    caption: 'Gestionar datos del país',
    icon: 'las la-globe',
    link: '/paises',
  },
  {
    title: 'Provincias',
    caption: 'Gestionar datos de la provincia',
    icon: 'las la-globe',
    link: '/provincia',
  },
  {
    title: 'Municipios',
    caption: 'Gestionar datos del Municipio',
    icon: 'las la-globe',
    link: '/municipio',
  },
];
</script>

<template>
  <div>
    <q-drawer v-model="isSideMenuOpen" show-if-above bordered :breakpoint="400">
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px">
        <q-list bordered class="rounded-borders">
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
          <q-expansion-item
            expand-separator
            icon="assessment"
            label="Nomencladores"
            caption="Listado de Nomencladores"
          >
            <q-card>
              <template v-if="me.rol.toUpperCase() === 'ADMIN'">
                <EssentialLink
                  v-for="link in nomencladores"
                  :key="link.title"
                  v-bind="link"
                />
              </template>
            </q-card>
          </q-expansion-item>
        </q-list>
        <!-- <q-list>
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
        </q-list> -->
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
  </div>
</template>
