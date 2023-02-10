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
                label="Provincia"
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
                label="Provincia"
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
            <div>
              <q-select
                v-if="!provinciaEdit"
                filled
                v-model="datos.pais_id"
                use-input
                input-debounce="0"
                label="Pais"
                :options="paises"
                option-value="id"
                option-label="pais"
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
                v-model="todo.pais_id"
                use-input
                input-debounce="0"
                label="Pais"
                :options="paises"
                option-value="id"
                option-label="pais"
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
import { useProvinciasStore } from '../../stores/provincias/provincias-store';
import { ProvinciaProps } from '../../interfaces/provincias.interfaces';
import { usePaisesStore } from 'src/stores/paises/paises-store';
import { PaisList } from 'src/interfaces/pais.interfaces';

const $q = useQuasar();
const { addProvincias, isProvinciasToggle, editandoForm, fecthProvincias } =
  useProvinciasStore();
const { isProvinciasOpen, provinciaEdit } = storeToRefs(useProvinciasStore());
const { paises } = storeToRefs(usePaisesStore());
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

let optionsRol = ref(paises);
let filterFnPais = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsRol.value = paises.value
        ?.map((value: PaisList) => {
          return {
            id: value.id,
            pais: value.pais,
            codigo: value.codigo,
          };
        })
        .filter((v) => v.pais);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsRol.value = paises.value
      ?.map((value: PaisList) => {
        return {
          id: value.id,
          pais: value.pais,
          codigo: value.codigo,
        };
      })
      .filter((v) => v.pais.toLowerCase().indexOf(needle) > -1);
  });
};

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
      // paisName: '',
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
