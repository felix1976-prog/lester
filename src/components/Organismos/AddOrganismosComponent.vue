<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isOrganismosOpen" position="top" persistent>
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '90%' } : { width: '100%' }"
      >
        <q-card-section>
          <div class="flex column items-center">
            <div class="text-weight-bold">{{ formTitle }}</div>
            <div class="text-grey">{{ formTitle }} sus Organismo</div>
          </div>
        </q-card-section>

        <q-card-section class="flex column flex-center no-wrap">
          <q-space />
          <q-form class="q-gutter-md validate">
            <div>
              <q-input
                v-if="!organismoEdit"
                filled
                type="text"
                v-model="datos.organismo"
                label="Organismo"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el organismo',
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
                v-model="todo.organismo"
                label="Organismo"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el organismo',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <div>
              <q-input
                v-if="!organismoEdit"
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
          <q-btn v-if="!organismoEdit" icon="las la-check" @click="add" />
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
import { useOrganismoStore } from '../../stores/organismos/organismos-store';
import { organismoProps } from '../../interfaces/organismo.interfaces';

const $q = useQuasar();
const { addOrganismos, isOrganismosToggle, editandoForm, fecthOrganismos } =
  useOrganismoStore();
const { isOrganismosOpen, organismoEdit } = storeToRefs(useOrganismoStore());
//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !organismoEdit.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isOrganismosToggle();
  editandoForm(false);
};

//Insertar usuario
const datos = ref({
  organismo: '',
  codigo: '',
});

const add = async () => {
  let dto = {
    organismo: datos.value.organismo,
    codigo: datos.value.codigo,
  };
  await addOrganismos(dto);
  await fecthOrganismos();
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  organismoUpd?: organismoProps;
}
const props = withDefaults(defineProps<Props>(), {
  organismoUpd: () => {
    return {
      id: '',
      organismo: '',
      codigo: '',
    };
  },
});
const todo = computed(() => props.organismoUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  // await actualizarUsuario(todo.value);
  // await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR
</script>
