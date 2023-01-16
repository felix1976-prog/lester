<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isPaisesOpen" position="top" persistent>
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '90%' } : { width: '100%' }"
      >
        <q-card-section>
          <div class="flex column items-center">
            <div class="text-weight-bold">{{ formTitle }}</div>
            <div class="text-grey">{{ formTitle }} sus carreras</div>
          </div>
        </q-card-section>

        <q-card-section class="flex column flex-center no-wrap">
          <q-space />
          <q-form class="q-gutter-md validate">
            <div>
              <q-input
                v-if="!paisEdit"
                filled
                type="text"
                v-model="datos.pais"
                label="País"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Escriba el pais']"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.pais"
                label="País"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Escriba el pais']"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <div>
              <q-input
                v-if="!paisEdit"
                filled
                type="text"
                v-model="datos.codigo"
                label="Código"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su código',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user" />
                </template>
              </q-input>
              <q-input
                v-else
                filled
                type="text"
                v-model="todo.codigo"
                label="Código"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su código',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user" />
                </template>
              </q-input>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions class="row flex-center">
          <q-btn icon="las la-times" @click="cerrar" />
          <q-btn v-if="!paisEdit" icon="las la-check" @click="add" />
          <q-btn v-else icon="las la-check" @click="actualizar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { usePaisesStore } from '../../stores/paises/paises-store';
import { paisProps } from '../../interfaces/pais.interfaces';

const $q = useQuasar();
const { addPaises, isPaisesToggle, editandoForm, fecthPaises } =
  usePaisesStore();
const { isPaisesOpen, paisEdit } = storeToRefs(usePaisesStore());
//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !paisEdit.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isPaisesToggle();
  editandoForm(false);
};

//Insertar usuario
const datos = ref({
  pais: '',
  codigo: '',
});

const add = async () => {
  let dto = {
    pais: datos.value.pais,
    codigo: datos.value.codigo,
  };
  await addPaises(dto);
  await fecthPaises();
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  paisUpd?: paisProps;
}
const props = withDefaults(defineProps<Props>(), {
  paisUpd: () => {
    return {
      id: '',
      pais: '',
      codigo: '',
    };
  },
});
const todo = computed(() => props.paisUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  // await actualizarUsuario(todo.value);
  // await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR
</script>
