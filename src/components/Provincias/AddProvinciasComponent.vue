<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isProvinciasOpen" position="top" persistent>
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '90%' } : { width: '100%' }"
      >
        <q-card-section>
          <div class="flex column items-center">
            <div class="text-weight-bold">{{ formTitle }}</div>
            <div class="text-grey">{{ formTitle }} sus Provincia</div>
          </div>
        </q-card-section>

        <q-card-section class="flex column flex-center no-wrap">
          <q-space />
          <q-form class="q-gutter-md validate">
            <div>
              <q-input
                v-if="!provinciaEdit"
                filled
                type="text"
                v-model="datos.provincia"
                label="País"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el provincia',
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
                v-model="todo.provincia"
                label="País"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el provincia',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <div>
              <q-input
                v-if="!provinciaEdit"
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
          <q-btn v-if="!provinciaEdit" icon="las la-check" @click="add" />
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
import { useProvinciasStore } from '../../stores/provincias/pr0vincias-store';
import { ProvinciaProps } from '../../interfaces/provincias.interfaces';

const $q = useQuasar();
const { addProvincias, isProvinciasToggle, editandoForm, fecthProvincias } =
  useProvinciasStore();
const { isProvinciasOpen, provinciaEdit } = storeToRefs(useProvinciasStore());
// const {provincias} = storeToRefs(useProvinciasStore())
//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !provinciaEdit.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isProvinciasToggle();
  editandoForm(false);
};

//Insertar usuario
const datos = ref({
  provincia: '',
  codigo: '',
  pais_id: '',
});

const add = async () => {
  let dto = {
    provincia: datos.value.provincia,
    codigo: datos.value.codigo,
    pais_id: datos.value.pais_id,
  };
  await addProvincias(dto);
  await fecthProvincias();
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  provinciaUpd?: ProvinciaProps;
}
const props = withDefaults(defineProps<Props>(), {
  provinciaUpd: () => {
    return {
      id: '',
      provincia: '',
      codigo: '',
      pais_id: '',
    };
  },
});
const todo = computed(() => props.provinciaUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  // await actualizarUsuario(todo.value);
  // await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR
</script>
