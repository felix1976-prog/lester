<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isMunicipiosOpen" position="top" persistent>
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '90%' } : { width: '100%' }"
      >
        <q-card-section>
          <div class="flex column items-center">
            <div class="text-weight-bold">{{ formTitle }}</div>
            <div class="text-grey">{{ formTitle }} sus Municipio</div>
          </div>
        </q-card-section>

        <q-card-section class="flex column flex-center no-wrap">
          <q-space />
          <q-form class="q-gutter-md validate">
            <div>
              <q-input
                v-if="!municipioEdit"
                filled
                type="text"
                v-model="datos.municipio"
                label="Municipio"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el municipio',
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
                v-model="todo.municipio"
                label="Municipio"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el municipio',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <div>
              <q-input
                v-if="!municipioEdit"
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
                v-if="!municipioEdit"
                filled
                v-model="datos.provincia_id"
                use-input
                input-debounce="0"
                label="Provincias"
                :options="provincias"
                option-value="id"
                option-label="provincia"
                emit-value
                map-options
                @filter="filterFnPais"
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
                v-model="todo.provincia_id"
                use-input
                input-debounce="0"
                label="Provincias"
                :options="provincias"
                option-value="id"
                option-label="provincia"
                emit-value
                map-options
                @filter="filterFnPais"
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
          </q-form>
        </q-card-section>
        <q-card-actions class="row flex-center">
          <q-btn icon="las la-times" @click="cerrar" />
          <q-btn v-if="!municipioEdit" icon="las la-check" @click="add" />
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
import { useMunicipiosStore } from '../../stores/municipios/municipios-store';
import { MunicipioProps } from '../../interfaces/municipios.interfaces';
import { useProvinciasStore } from 'src/stores/provincias/pr0vincias-store';
import { ProvinciaList } from 'src/interfaces/provincias.interfaces';

const $q = useQuasar();
const { addMunicipios, isMunicipiosToggle, editandoForm, fecthMunicipios } =
  useMunicipiosStore();
const { isMunicipiosOpen, municipioEdit } = storeToRefs(useMunicipiosStore());
const { provincias } = storeToRefs(useProvinciasStore());
//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !municipioEdit.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isMunicipiosToggle();
  editandoForm(false);
};

//Insertar usuario
const datos = ref({
  municipio: '',
  codigo: '',
  provincia_id: '',
});

let optionsRol = ref(provincias);
let filterFnPais = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsRol.value = provincias.value
        ?.map((value: ProvinciaList) => {
          return {
            id: value.id,
            provincia: value.provincia,
            codigo: value.codigo,
          };
        })
        .filter((v) => v.provincia);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsRol.value = provincias.value
      ?.map((value: ProvinciaList) => {
        return {
          id: value.id,
          provincia: value.provincia,
          codigo: value.codigo,
        };
      })
      .filter((v) => v.provincia.toLowerCase().indexOf(needle) > -1);
  });
};

const add = async () => {
  let dto = {
    municipio: datos.value.municipio,
    codigo: datos.value.codigo,
    provincia_id: datos.value.provincia_id,
  };
  await addMunicipios(dto);
  await fecthMunicipios();
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  municipioUpd?: MunicipioProps;
}
const props = withDefaults(defineProps<Props>(), {
  municipioUpd: () => {
    return {
      id: '',
      municipio: '',
      codigo: '',
      provincia_id: '',
      proviciaName: '',
    };
  },
});
const todo = computed(() => props.municipioUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  // await actualizarUsuario(todo.value);
  // await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR
</script>
