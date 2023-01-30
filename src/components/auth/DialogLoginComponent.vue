<template>
  <q-dialog
    v-model="isOpenLogin"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      class=""
      style="width: 400px; max-width: 80vw; height: 500px; max-height: 100vh"
    >
      <q-card-section class="q-pt-lg" style="margin-top: 4em">
        <q-avatar size="100px" class="absolute-center shadow-10">
          <!-- <img src="~/assets/images/Open1.png" /> -->
          <q-icon size="1.4em" name="las la-university" color="secondary" />
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <div class="text-center q-pt-lg">
          <div class="col text-h6 ellipsis">APMO</div>
          <div class="text-caption">Matriculas Online</div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            filled
            v-model="username"
            label="Usuario"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Escriba el usuario']"
          >
            <template v-slot:append>
              <q-icon name="las la-user-secret" />
            </template>
          </q-input>

          <q-input
            :type="isPwd ? 'text' : 'password'"
            filled
            v-model="password"
            label="Contraseña"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'No deje en blanco la contraseña',
            ]"
            @keypress.enter.prevent="sendLogin"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'las la-eye-slash' : 'las la-eye'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="flex justify-evenly">
            <q-btn
              label="Cancelar"
              type="button"
              color="red"
              @click="setToggleLogin"
            />
            <q-btn
              label="Entrar"
              type="button"
              color="primary"
              @click="sendLogin"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {
  QDialog,
  QCard,
  QCardSection,
  QAvatar,
  QIcon,
  QForm,
  QInput,
  QBtn,
} from 'quasar';
import { useAuthComposables } from 'src/composables/authComposables';
import { ref } from 'vue';
import { useUtilsComposables } from '../../composables/utilsComposables';

const { isOpenLogin, setToggleLogin } = useUtilsComposables();
const { loguearse } = useAuthComposables();

const username = ref();
const password = ref();
let isPwd = ref(false);
const sendLogin = async () => {
  const datos = {
    username: username.value,
    password: password.value,
  };
  await loguearse(datos);
  setToggleLogin();
};
</script>
<style>
.bg-image {
  background-image: linear-gradient(120deg, #c0c6e0 1%, #ebe2e6 100%);
  /* background-image: url('assets/image.png'); */
}
</style>
