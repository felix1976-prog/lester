<template>
  <q-dialog v-model="isOpen" position="right">
    <q-card>
      <q-card-section>
        <q-avatar size="100px" class="absolute-center shadow-10">
          <!-- <img src="~/assets/images/Open1.png" /> -->
          <q-icon size="1.4em" name="las la-graduation-cap" color="secondary" />
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <div class="text-center q-pt-lg">
          <div class="col text-h6 ellipsis">APMO</div>
          <div class="text-caption">
            Administración por Objetivos Estratégicos
          </div>
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

          <div class="flex flex-center">
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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUtilsComposables } from 'src/composables/utilsComposables';
import { useAuthComposables } from '../../composables/authComposables';

export default defineComponent({
  name: 'LoginComponent',
  setup() {
    const { isOpenLogin, setToggleLogin } = useUtilsComposables();
    const { loguearse } = useAuthComposables();

    const username = ref();
    const password = ref();
    const isOpen = ref(isOpenLogin.value);
    let isPwd = ref(false);
    return {
      isOpen,
      isPwd,
      username,
      password,
      sendLogin: async () => {
        const datos = {
          username: username.value,
          password: password.value,
        };
        await loguearse(datos);
        setToggleLogin();
      },
    };
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #396bac 0%, #54474d 100%);
  /* background-image: url('assets/image.png'); */
}
</style>
