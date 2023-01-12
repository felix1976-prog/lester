<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isAddUserOpen" position="top" persistent>
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '90%' } : { width: '100%' }"
      >
        <q-card-section>
          <div class="flex column items-center">
            <div class="text-weight-bold">{{ formTitle }}</div>
            <div class="text-grey">{{ formTitle }} sus usuarios</div>
          </div>
        </q-card-section>

        <q-card-section class="flex column flex-center no-wrap">
          <q-space />
          <q-form class="q-gutter-md validate">
            <div>
              <q-input
                v-if="!escuelaEdit"
                filled
                type="text"
                v-model="datos.nombre"
                label="Usuario"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el usuario',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                type="text"
                v-model="todo.nombre"
                label="Usuario"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el usuario',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <div>
              <q-input
                v-if="!escuelaEdit"
                filled
                type="text"
                v-model="datos.descripcion"
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su nombre',
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
                v-model="todo.nombre"
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su nombre',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user" />
                </template>
              </q-input>
            </div>

            <div>
              <q-input
                v-if="!escuelaEdit"
                filled
                type="text"
                v-model="datos.direccion"
                label="Dirección"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba la dirección',
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
                v-model="todo.direccion"
                label="Dirección"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba la dirección',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user" />
                </template>
              </q-input>
            </div>
            <!-- CARGO -->

            <div>
              <q-input
                v-if="!escuelaEdit"
                filled
                type="text"
                v-model="datos.telefono"
                label="Teléfono"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el teléfono',
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
                v-model="todo.telefono"
                label="Teléfono"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el teléfono',
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
          <q-btn v-if="!editandoForm" icon="las la-check" @click="add" />
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
import { useEscuelaStore } from '../../stores/escuela/escuela';
import {
  addEscuelaInterface,
  escuelaInterface,
} from '../../interfaces/escuela.interface';
import { useUtilsComposables } from '../../composables/utilsComposables';

const $q = useQuasar();
const { addEscuela, editandoForm, getActiveEscuela } = useEscuelaStore();
const { addUserToggle, isAddUserOpen } = useUtilsComposables();
const { escuelaEdit } = storeToRefs(useEscuelaStore());

//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !escuelaEdit.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  addUserToggle();
  editandoForm(false);
};

//Insertar usuario
const datos = ref({
  nombre: '',
  descripcion: '',
  direccion: '',
  telefono: '',
  pre_desc: '',
  mat_desc: '',
  pre_inicio: new Date(),
  pre_fin: new Date(),
  mat_inicio: new Date(),
  mat_fin: new Date(),
  activo: true,
});

const add = async () => {
  let dto: addEscuelaInterface = {
    nombre: datos.value.nombre,
    descripcion: datos.value.descripcion,
    direccion: datos.value.direccion,
    telefono: datos.value.telefono,
    pre_desc: datos.value.pre_desc,
    mat_desc: datos.value.mat_desc,
    pre_inicio: datos.value.pre_inicio,
    pre_fin: datos.value.pre_fin,
    mat_inicio: datos.value.mat_inicio,
    mat_fin: datos.value.mat_fin,
    activo: datos.value.activo,
  };
  await addEscuela(dto);

  await getActiveEscuela();
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  escuelaUpd?: escuelaInterface;
}
const props = withDefaults(defineProps<Props>(), {
  escuelaUpd: () => {
    return {
      id: '',
      nombre: '',
      descripcion: '',
      direccion: '',
      telefono: '',
      pre_desc: '',
      mat_desc: '',
      pre_inicio: new Date(),
      pre_fin: new Date(),
      mat_inicio: new Date(),
      mat_fin: new Date(),
      activo: true,
    };
  },
});
const todo = computed(() => props.escuelaUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  // await actualizarUsuario(todo.value);
  // await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR
</script>
