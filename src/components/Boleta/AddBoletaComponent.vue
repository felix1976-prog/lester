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
                dense
                type="text"
                v-model="datos.ci"
                label="Carné"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 10 && val.length < 12) ||
                    'Escriba el carné',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                dense
                type="text"
                v-model="todo.ci"
                label="Carné"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 10 && val.length < 12) ||
                    'Escriba el carné',
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
                dense
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
                dense
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
                dense
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
                dense
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
              <q-select
                v-if="!boletaEdit"
                filled
                dense
                v-model="datos.sexo"
                use-input
                input-debounce="0"
                label="Sexo"
                :options="Sexos"
                emit-value
                map-options
                style="width: 250px"
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Sin Resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                dense
                v-model="todo.sexo"
                use-input
                input-debounce="0"
                label="Sexo"
                :options="Sexos"
                emit-value
                map-options
                style="width: 250px"
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Sin Resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div>
              <q-input
                v-if="!boletaEdit"
                filled
                dense
                type="text"
                v-model="datos.preunivesitario"
                label="Preuniversitario"
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
                dense
                type="text"
                v-model="todo.preunivesitario"
                label="Preuniversitario"
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

            <div>
              <q-select
                v-if="!boletaEdit"
                filled
                dense
                v-model="datos.provincia"
                use-input
                input-debounce="0"
                label="Provincia"
                :options="provincias"
                option-value="codigo"
                option-label="provincia"
                emit-value
                map-options
                style="width: 250px"
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Sin Resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                dense
                v-model="todo.provincia"
                use-input
                input-debounce="0"
                label="Provincia"
                :options="provincias"
                option-value="codigo"
                option-label="provincia"
                emit-value
                map-options
                style="width: 250px"
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Sin Resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div>
              <q-select
                v-if="!boletaEdit"
                filled
                dense
                v-model="datos.municipio"
                use-input
                input-debounce="0"
                label="Municipio"
                :options="municipios"
                option-value="codigo"
                option-label="municipio"
                emit-value
                map-options
                style="width: 250px"
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Sin Resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                v-else
                filled
                dense
                v-model="todo.municipio"
                use-input
                input-debounce="0"
                label="Municipio"
                :options="municipios"
                option-value="codigo"
                option-label="municipio"
                emit-value
                map-options
                style="width: 250px"
                behavior="menu"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Sin Resultados
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div>
              <q-input
                v-if="!boletaEdit"
                filled
                dense
                type="number"
                v-model="datos.inidice_academico"
                label="Índice Académico"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba el índice académico del estudiante',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                dense
                type="number"
                v-model="todo.inidice_academico"
                label="Índice Académico"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Escriba el índice académico del estudiante',
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
                dense
                type="number"
                v-model="datos.matematica"
                label="Matemática"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba la nota de Matemática',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                dense
                type="number"
                v-model="todo.matematica"
                label="Matemática"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba la nota de Matemática',
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
                dense
                type="number"
                v-model="datos.espanol"
                label="Español"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba la nota de Español',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                dense
                type="number"
                v-model="todo.espanol"
                label="Español"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba la nota de Español',
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
                dense
                type="number"
                v-model="datos.historia"
                label="Historia"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba la nota de Historia',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                dense
                type="number"
                v-model="todo.historia"
                label="Historia"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba la nota de Historia',
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
                dense
                type="number"
                v-model="datos.escalafon"
                label="Escalafón"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el escalafón',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                dense
                type="number"
                v-model="todo.escalafon"
                label="Escalafón"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba el escalafón',
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
                dense
                type="text"
                v-model="datos.convocatoria"
                label="Convocatoria"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba la convocatoria',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                dense
                type="text"
                v-model="todo.convocatoria"
                label="Convocatoria"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Escriba la convocatoria',
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
                dense
                type="number"
                v-model="datos.opcion"
                label="Opción"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba el número de la opción',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                dense
                type="number"
                v-model="todo.opcion"
                label="Opción"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba el número de la opción',
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
                dense
                type="text"
                v-model="datos.sma"
                label="SMA"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba el estado del SMA',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>

              <q-input
                v-else
                filled
                dense
                type="text"
                v-model="todo.sma"
                label="SMA"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Escriba el estado del SMA',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="las la-user-plus" />
                </template>
              </q-input>
            </div>

            <div>
              <!-- <div class="q-pa-md" style="max-width: 300px"> -->
              <q-input filled v-model="datos.fecha">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="datos.fecha">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <!-- </div> -->
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
import { computed, ref, onMounted } from 'vue';
import {
  QBtn,
  QCard,
  QCardActions,
  QCardSection,
  QDialog,
  QForm,
  QIcon,
  QInput,
  QSpace,
  useQuasar,
} from 'quasar';
import { storeToRefs } from 'pinia';
import { useBoletaStore } from 'src/stores/boleta/boleta-store';
import { boletaProps } from 'src/interfaces/boleta.interfaces';
import { useNomencladoresStore } from '../../stores/nomencladores/nomencladores-store';
import { useProvinciasStore } from '../../stores/provincias/pr0vincias-store';
import { useMunicipiosStore } from 'src/stores/municipios/municipios-store';

const $q = useQuasar();
const { addBoletas, isBoletaToggle, editandoForm, fetchBoletas, allBoletas } =
  useBoletaStore();
const { isBoletaOpen, boletaEdit } = storeToRefs(useBoletaStore());

// OBTENER LOS NOMENCLADORES NECESARIOS
const { getSexos } = useNomencladoresStore();
const { fecthProvincias } = useProvinciasStore();
const { fecthMunicipios } = useMunicipiosStore();
const { Sexos } = storeToRefs(useNomencladoresStore());
const { provincias } = storeToRefs(useProvinciasStore());
const { municipios } = storeToRefs(useMunicipiosStore());

onMounted(() => {
  if (Sexos.value.length === 0) {
    getSexos();
  }
  if (provincias.value.length === 0) {
    fecthProvincias();
  }
  if (municipios.value.length === 0) {
    fecthMunicipios();
  }
});

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
  ci: '',
  fecha: null,
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
    fecha: datos.value.fecha,
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
      ci: '',
      fecha: null,
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
