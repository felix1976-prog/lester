<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isEmpresaOpen" position="top" persistent>
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
                v-if="!empresaEdit"
                filled
                type="text"
                v-model="datos.empresa"
                label="Empresa"
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
                v-model="todo.empresa"
                label="Empresa"
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
                v-if="!empresaEdit"
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
                v-if="!empresaEdit"
                filled
                v-model="datos.organismo_id"
                use-input
                input-debounce="0"
                label="Organismo"
                :options="organismos"
                option-value="id"
                option-label="organismo"
                emit-value
                map-options
                @filter="filterFnOrganismo"
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
                v-model="todo.organismo_id"
                use-input
                input-debounce="0"
                label="Organismo"
                :options="organismos"
                option-value="id"
                option-label="organismo"
                emit-value
                map-options
                @filter="filterFnOrganismo"
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
          <q-btn v-if="!empresaEdit" icon="las la-check" @click="add" />
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
import { useEmpresaStore } from '../../stores/empresa/empresa-store';
import { useOrganismoStore } from 'src/stores/organismos/organismos-store';
import { empresaProps } from '../../interfaces/empresa.interfaces';
import { organismoProps } from 'src/interfaces/organismo.interfaces';

const $q = useQuasar();
const { addEmpresas, isEmpresaToggle, editandoForm, fecthEmpresas } =
  useEmpresaStore();
const { isEmpresaOpen, empresaEdit } = storeToRefs(useEmpresaStore());
const { organismos } = storeToRefs(useOrganismoStore());
//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !empresaEdit.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isEmpresaToggle();
  editandoForm(false);
};

//Insertar usuario
const datos = ref({
  empresa: '',
  codigo: '',
  organismo_id: '',
});

const add = async () => {
  let dto = {
    empresa: datos.value.empresa,
    codigo: datos.value.codigo,
    organismo_id: datos.value.organismo_id,
  };
  await addEmpresas(dto);
  await fecthEmpresas();
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  empresaUpd?: empresaProps;
}
const props = withDefaults(defineProps<Props>(), {
  empresaUpd: () => {
    return {
      id: '',
      empresa: '',
      codigo: '',
      organismo_id: '',
    };
  },
});
const todo = computed(() => props.empresaUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  // await actualizarUsuario(todo.value);
  // await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR
// SELECT
let optionsOrganismo = ref(organismos);
let filterFnOrganismo = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsOrganismo.value = organismos.value
        ?.map((value: organismoProps) => {
          return {
            id: value.id,
            organismo: value.organismo,
            codigo: value.codigo,
          };
        })
        .filter((v) => v.organismo);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsOrganismo.value = organismos.value
      ?.map((value: organismoProps) => {
        return {
          id: value.id,
          organismo: value.organismo,
          codigo: value.codigo,
        };
      })
      .filter((v) => v.organismo.toLowerCase().indexOf(needle) > -1);
  });
};
//Filtrar los select end
</script>
