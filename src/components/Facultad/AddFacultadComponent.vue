<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isFacultadOpen" position="top" persistent>
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
                v-if="!facultadEdit"
                filled
                type="text"
                v-model="datos.facultad"
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba la Fcaultad',
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
                v-model="todo.facultad"
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba la Facultad',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <div>
              <q-input
                v-if="!facultadEdit"
                filled
                type="text"
                v-model="datos.codigo"
                label="Descripción"
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
                v-model="todo.codigo"
                label="Descripción"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba su codigo',
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
          <q-btn v-if="!facultadEdit" icon="las la-check" @click="add" />
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
import { useFacultadStore } from 'src/stores/facultad/facultad-store';
import { faculProps } from '../../interfaces/facultad.interfaces';

const $q = useQuasar();
const {
  addFacultades,
  isFacultadToggle,
  editandoForm,
  fecthFacultades,
  allFacultad,
} = useFacultadStore();
const { isFacultadOpen, facultadEdit } = storeToRefs(useFacultadStore());
//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !facultadEdit.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isFacultadToggle();
  editandoForm(false);
};

//Insertar usuario
const datos = ref({
  facultad: '',
  codigo: '',
});

const add = async () => {
  let dto = {
    facultad: datos.value.facultad,
    codigo: datos.value.codigo,
  };
  await addFacultades(dto);
  allFacultad;
  await fecthFacultades();
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  escuelaUpd?: faculProps;
}
const props = withDefaults(defineProps<Props>(), {
  escuelaUpd: () => {
    return {
      id: '',
      facultad: '',
      codigo: '',
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
