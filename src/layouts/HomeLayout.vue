<template>
  <q-layout view="hHh lpR fff">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="item-center">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          APMO
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="las la-sign-in-alt"
          @click="setToggleLogin"
        />
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/page1" label="Quiénes Somos" />
        <q-route-tab to="/page2" label="misión" />
        <q-route-tab to="/page3" label="Visión" />
        <q-route-tab to="/page4" label="Postgrados" />
        <q-route-tab to="/page5" label="Matriculas" />
      </q-tabs>
      <DialogComponent />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <div class="q-pa-md">
        <!-- Stack the columns on mobile by making one full-width and the other half-width -->
        <div class="row">
          <div class="col col-md-8 row">
            <div class="col-3">
              <p class="text-h4">
                <span><q-icon size="lg" name="las la-map-marker-alt" /></span>
                Dirección:
              </p>
            </div>
            <div class="col-9">
              <p class="text-h4">Calle mil enter alkjoj aokjkj</p>
            </div>
          </div>
          <div class="col-6 col-md-4">.col-6 .col-md-4</div>
        </div>

        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <div class="row">
          <div class="col-6 col-md-4">.col-6 .col-md-4</div>
          <div class="col-6 col-md-4">.col-6 .col-md-4</div>
          <div class="col-6 col-md-4">.col-6 .col-md-4</div>
        </div>

        <!-- Columns are always 50% wide, on mobile and desktop -->
        <div class="row">
          <div class="col-6">.col-6</div>
          <div class="col-6">.col-6</div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>
<script setup lang="ts">
import DialogComponent from 'src/components/auth/DialogLoginComponent.vue';
import { useUtilsComposables } from 'src/composables/utilsComposables';

const { setToggleLogin } = useUtilsComposables();
</script>
