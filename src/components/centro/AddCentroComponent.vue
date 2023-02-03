<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isCentroOpen" position="top" persistent>
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '90%' } : { width: '100%' }"
      >
        <q-card-section>
          <div class="flex column items-center">
            <div class="text-weight-bold">{{ formTitle }}</div>
            <div class="text-grey">{{ formTitle }} el Centro</div>
          </div>
        </q-card-section>

        <q-card-section class="flex column flex-center no-wrap">
          <q-space />
          <q-form class="q-gutter-md validate">
            <div>
              <q-input
                v-if="!centroEdit"
                filled
                type="text"
                v-model="datos.centro"
                label="Centro"
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
                v-model="todo.centro"
                label="Centro"
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
                v-if="!centroEdit"
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
                v-if="!centroEdit"
                filled
                v-model="datos.empresa_id"
                use-input
                input-debounce="0"
                label="Empresa"
                :options="empresa"
                option-value="id"
                option-label="empresa"
                emit-value
                map-options
                @filter="filterFnEmpresa"
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
                v-model="todo.empresa_id"
                use-input
                input-debounce="0"
                label="Empresa"
                :options="empresa"
                option-value="id"
                option-label="empresa"
                emit-value
                map-options
                @filter="filterFnEmpresa"
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
          <q-btn v-if="!centroEdit" icon="las la-check" @click="add" />
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
import { useCentroStore } from '../../stores/centro/centro-store';
import { centroProps } from '../../interfaces/centro.interfaces';
import { empresaProps } from 'src/interfaces/empresa.interfaces';
import { useEmpresaStore } from 'src/stores/empresa/empresa-store';

const $q = useQuasar();
const { addCentros, isCentroToggle, editandoForm, fecthCentros } =
  useCentroStore();
const { isCentroOpen, centroEdit } = storeToRefs(useCentroStore());
const { empresa } = storeToRefs(useEmpresaStore());
//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !centroEdit.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isCentroToggle();
  editandoForm(false);
};

//Insertar usuario
const datos = ref({
  centro: '',
  codigo: '',
  empresa_id: '',
});

const add = async () => {
  let dto = {
    centro: datos.value.centro,
    codigo: datos.value.codigo,
    empresa_id: datos.value.empresa_id,
  };
  await addCentros(dto);
  await fecthCentros();
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  centroUpd?: centroProps;
}
const props = withDefaults(defineProps<Props>(), {
  centroUpd: () => {
    return {
      id: '',
      centro: '',
      codigo: '',
      empresa_id: '',
    };
  },
});
const todo = computed(() => props.centroUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  // await actualizarUsuario(todo.value);
  // await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR
// SELECT
let optionsEmpresa = ref(empresa);
let filterFnEmpresa = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsEmpresa.value = empresa.value
        ?.map((value: empresaProps) => {
          return {
            id: value.id,
            empresa: value.empresa,
            codigo: value.codigo,
          };
        })
        .filter((v) => v.empresa);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsEmpresa.value = empresa.value
      ?.map((value: empresaProps) => {
        return {
          id: value.id,
          empresa: value.empresa,
          codigo: value.codigo,
        };
      })
      .filter((v) => v.empresa.toLowerCase().indexOf(needle) > -1);
  });
};
//Filtrar los select end
</script>
