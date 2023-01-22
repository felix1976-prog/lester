<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isCarreraOpen" position="top" persistent>
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
                v-if="!carreraEdit"
                filled
                type="text"
                v-model="datos.carrera"
                label="Carrera"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba la Carrera',
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
                v-model="todo.carrera"
                label="Carrera"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba la Carrera',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <div>
              <q-input
                v-if="!carreraEdit"
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
            <div>
              <q-select
                v-if="!carreraEdit"
                filled
                v-model="datos.facultad_id"
                use-input
                input-debounce="0"
                label="Facultad"
                :options="facultad"
                option-value="id"
                option-label="facultad"
                emit-value
                map-options
                @filter="filterFnFacultad"
                style="width: 250px"
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                v-model="todo.facultad_id"
                use-input
                input-debounce="0"
                label="Facultad"
                :options="facultad"
                option-value="id"
                option-label="facultad"
                emit-value
                map-options
                @filter="filterFnFacultad"
                style="width: 250px"
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div>
              <q-checkbox
                v-model="datos.disponible"
                label="Disponible"
                checked-icon="swipe_left"
                unchecked-icon="swipe_right"
                :color="datos.disponible ? 'green' : 'red'"
                keep-color
              />
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions class="row flex-center">
          <q-btn icon="las la-times" @click="cerrar" />
          <q-btn v-if="!carreraEdit" icon="las la-check" @click="add" />
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
import { carreraProps } from '../../interfaces/carrera.interfaces';
import { useCarreraStore } from '../../stores/carrera/carrera-store';
import { useFacultadStore } from 'src/stores/facultad/facultad-store';
import { faculProps } from 'src/interfaces/facultad.interfaces';

const $q = useQuasar();
const { addCarreras, isCarreraToggle, editandoForm, fecthCarreras } =
  useCarreraStore();
const { isCarreraOpen, carreraEdit } = storeToRefs(useCarreraStore());
const { facultad } = storeToRefs(useFacultadStore());
//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !carreraEdit.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isCarreraToggle();
  editandoForm(false);
};

//Insertar usuario
const datos = ref({
  carrera: '',
  codigo: '',
  facultad_id: '',
  disponible: false,
});

const add = async () => {
  let dto = {
    carrera: datos.value.carrera,
    codigo: datos.value.codigo,
    facultad_id: datos.value.facultad_id,
    disponible: datos.value.disponible,
  };
  await addCarreras(dto);
  await fecthCarreras();
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  carreraUpd?: carreraProps;
}
const props = withDefaults(defineProps<Props>(), {
  carreraUpd: () => {
    return {
      id: '',
      carrera: '',
      codigo: '',
      facultad_id: '',
      disponible: false,
    };
  },
});
const todo = computed(() => props.carreraUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  // await actualizarUsuario(todo.value);
  // await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR
// SELECT
let optionsFacultad = ref(facultad);
let filterFnFacultad = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsFacultad.value = facultad.value
        ?.map((value: faculProps) => {
          return {
            id: value.id,
            facultad: value.facultad,
            codigo: value.codigo,
          };
        })
        .filter((v) => v.facultad);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsFacultad.value = facultad.value
      ?.map((value: faculProps) => {
        return {
          id: value.id,
          facultad: value.facultad,
          codigo: value.codigo,
        };
      })
      .filter((v) => v.facultad.toLowerCase().indexOf(needle) > -1);
  });
};
//Filtrar los select end
</script>
