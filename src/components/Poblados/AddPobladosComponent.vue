<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isPobladoOpen" position="top" persistent>
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '90%' } : { width: '100%' }"
      >
        <q-card-section>
          <div class="flex column items-center">
            <div class="text-weight-bold">{{ formTitle }}</div>
            <div class="text-grey">{{ formTitle }} sus Poblado</div>
          </div>
        </q-card-section>

        <q-card-section class="flex column flex-center no-wrap">
          <q-space />
          <q-form class="q-gutter-md validate">
            <div>
              <q-input
                v-if="!pobladoEdit"
                filled
                type="text"
                v-model="datos.poblado"
                label="Poblado"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el poblado',
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
                v-model="todo.poblado"
                label="Poblado"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el poblado',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>
            <div>
              <q-input
                v-if="!pobladoEdit"
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
                v-if="!pobladoEdit"
                filled
                v-model="datos.provincia_codigo"
                use-input
                input-debounce="0"
                label="Provincia"
                :options="provincias"
                option-value="codigo"
                option-label="provincia"
                emit-value
                map-options
                @filter="filterFnProvincias"
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
                v-model="todo.provincia_codigo"
                use-input
                input-debounce="0"
                label="Provincias"
                :options="provincias"
                option-value="codigo"
                option-label="provincia"
                emit-value
                map-options
                @filter="filterFnProvincias"
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
              <q-select
                v-if="!pobladoEdit"
                filled
                v-model="datos.municipio_codigo"
                use-input
                input-debounce="0"
                label="Municipios"
                :options="municipios"
                option-value="codigo"
                option-label="municipio"
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
                v-model="todo.municipio_codigo"
                use-input
                input-debounce="0"
                label="Municipios"
                :options="municipios"
                option-value="codigo"
                option-label="municipio"
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
          <q-btn v-if="!pobladoEdit" icon="las la-check" @click="add" />
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
import { usePobladoStore } from '../../stores/poblados/poblados-store';
import { PobladosProps } from '../../interfaces/poblados.interfaces';
import { ProvinciaList } from 'src/interfaces/provincias.interfaces';
import { useMunicipiosStore } from 'src/stores/municipios/municipios-store';
import { MunicipioList } from 'src/interfaces/municipios.interfaces';
import { useProvinciasStore } from 'src/stores/provincias/provincias-store';

const $q = useQuasar();
const { addPoblado, isPobladoToggle, editandoForm, fecthPoblado } =
  usePobladoStore();
const { isPobladoOpen, pobladoEdit } = storeToRefs(usePobladoStore());
const { municipios } = storeToRefs(useMunicipiosStore());
const { provincias } = storeToRefs(useProvinciasStore());
//Activar el valor del titulo del form
const formTitle = computed(() => {
  return !pobladoEdit.value ? 'Insertar' : 'Editar';
});

//Funcion para cerrar y activar y desactivar las variables editando
const cerrar = () => {
  isPobladoToggle();
  editandoForm(false);
};

//Insertar usuario
const datos = ref({
  poblado: '',
  codigo: 0,
  municipio_codigo: 0,
  provincia_codigo: 0,
});

let optionsRol = ref(municipios);
let filterFnPais = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsRol.value = municipios.value
        ?.map((value: MunicipioList) => {
          return {
            id: value.id,
            municipio: value.municipio,
            codigo: value.codigo,
          };
        })
        .filter((v) => v.municipio);
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    optionsRol.value = municipios.value
      ?.map((value: MunicipioList) => {
        return {
          id: value.id,
          municipio: value.municipio,
          codigo: value.codigo,
        };
      })
      .filter((v) => v.municipio.toLowerCase().indexOf(needle) > -1);
  });
};

// provinias
let optionsProvincias = ref(provincias);
let filterFnProvincias = (
  val: string,
  update: (arg0: { (): void; (): void }) => void
) => {
  if (val === '') {
    update(() => {
      optionsProvincias.value = provincias.value
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
    optionsProvincias.value = provincias.value
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
    poblado: datos.value.poblado,
    codigo: 0,
    municipio_codigo: 0,
    provincia_codigo: 0,
  };
  await addPoblado(dto);
  await fecthPoblado();
};

//Fin Insertar Usuario

//  ACTUALIZAR

interface Props {
  pobladoUpd?: PobladosProps;
}
const props = withDefaults(defineProps<Props>(), {
  pobladoUpd: () => {
    return {
      id: '',
      poblado: '',
      codigo: 0,
      municipio_codigo: 0,
      provincia_codigo: 0,
    };
  },
});
const todo = computed(() => props.pobladoUpd);

const actualizar = async () => {
  console.log('res: ', todo.value);

  // await actualizarUsuario(todo.value);
  // await allUsers();
  cerrar();
};
// FIN  ACTUALIZAR
</script>
