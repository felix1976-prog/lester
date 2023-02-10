<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isBoletaOpen" position="top" persistent>
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '90%' } : { width: '100%' }"
      >
        <q-card-section>
          <div class="flex column items-center">
            <div class="text-weight-bold">{{ formTitle }}</div>
            <div class="text-grey">{{ formTitle }} sus boletas</div>
          </div>
        </q-card-section>

        <q-card-section class="flex column flex-center no-wrap">
          <q-space />
          <q-form class="q-gutter-md validate">
            <div>
              <q-input
                v-if="!boletaEdit"
                filled
                type="text"
                v-model="datos.ci"
                label="Carné"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 10 && val.length < 12) || 'Escriba el carné',
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
                v-model="todo.ci"
                label="Carné"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 10 && val.length < 12) || 'Escriba el carné',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>

            <div>
              <q-input
                v-if="!boletaEdit"
                filled
                type="text"
                v-model="datos.nombre"
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el nombre',
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
                label="Nombre"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el nombre',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>

            <div>
              <q-input
                v-if="!boletaEdit"
                filled
                type="text"
                v-model="datos.apellidos"
                label="Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba sus apellidos',
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
                v-model="todo.apellidos"
                label="Apellidos"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba sus apellidos',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user" />
                </template>
              </q-input>
            </div>

            <!-- AQUI VA EL COMBO DE SEXO -->

            <div>
              <q-input
                v-if="!boletaEdit"
                filled
                type="text"
                v-model="datos.preunivesitario"
                label="Preunivesitario"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el carné',
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
                v-model="todo.preunivesitario"
                label="Preunivesitario"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el carné',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>

          </q-form>
        </q-card-section>
        <q-card-actions class="row flex-center">
          <q-btn icon="las la-times" @click="cerrar" />
          <q-btn v-if="!boletaEdit" icon="las la-check" @click="add" />
          <q-btn v-else icon="las la-check" @click="actualizar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { QBtn, QCard, QCardActions, QCardSection, QDialog, QForm, QIcon, QInput, QSpace, useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { useBoletaStore } from 'src/stores/boleta/boleta-store';
import { boletaProps } from 'src/interfaces/boleta.interfaces';

const $q = useQuasar();
const {
  addBoletas,
  isBoletaToggle,
  editandoForm,
  fetchBoletas,
  allBoletas,
} = useBoletaStore();
const { isBoletaOpen, boletaEdit } = storeToRefs(useBoletaStore());
//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !boletaEdit.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isBoletaToggle();
  editandoForm(false);
};

//Insertar usuario
const datos = ref({
  nombre: '',
  apellidos: '',
  sexo: '',
  preunivesitario: '',
  provincia: '',
  municipio: '',
  inidice_academico: 0,
  matematica: 0,
  espanol: 0,
  historia: 0,
  escalafon: 0,
  convocatoria: '',
  opcion: 0,
  sma: '',
  ci: ''
});

const add = async () => {
  let dto = {
    nombre: datos.value.nombre,
    apellidos: datos.value.apellidos,
    sexo: datos.value.sexo,
    preunivesitario: datos.value.preunivesitario,
    provincia: datos.value.provincia,
    municipio: datos.value.municipio,
    inidice_academico: datos.value.inidice_academico,
    matematica: datos.value.matematica,
    espanol: datos.value.espanol,
    historia: datos.value.historia,
    escalafon: datos.value.escalafon,
    convocatoria: datos.value.convocatoria,
    opcion: datos.value.opcion,
    sma: datos.value.sma,
    ci: datos.value.ci,
  };
  await addBoletas(dto);
  allBoletas;
  await fetchBoletas();
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  boleUpd?: boletaProps;
}
const props = withDefaults(defineProps<Props>(), {
  boleUpd: () => {
    return {
      id: '',
      nombre: '',
      apellidos: '',
      sexo: '',
      preunivesitario: '',
      provincia: '',
      municipio: '',
      inidice_academico: 0,
      matematica: 0,
      espanol: 0,
      historia: 0,
      escalafon: 0,
      convocatoria: '',
      opcion: 0,
      sma: '',
      ci: ''
    };
  },
});
const todo = computed(() => props.boleUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  // await actualizarUsuario(todo.value);
  // await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR
</script>
